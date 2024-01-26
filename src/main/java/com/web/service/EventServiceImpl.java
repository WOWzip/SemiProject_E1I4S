package com.web.service;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Event;
import com.web.domain.Reply;
import com.web.domain.ReplyEvent;
import com.web.persistence.EventRepository;
import com.web.persistence.ReplyEventRepository;

@Service
public class EventServiceImpl implements EventService, FolderPathREPO {

	@Autowired
	private EventRepository eventRepo;
	
	@Autowired
	private ReplyEventRepository replyEventRepository;

	// 1. 이벤트 목록 - 페이징 및 검색 구현
	@Override
	public void getEventList(Model model, Pageable pageable, String searchKeyword, String searchCode) {
		// searchCode : 검색어 구분 (title:제목, contents:내용, titleContents:제목 및 내용)
		// eventChoice: 보기목록 선택(0:진행중인 이벤트, 1:종료된 이벤트)
		Page<Event> endEventList;
		// 1-1. 종료된 이벤트 목록 보기
		if (searchKeyword == null || searchKeyword == "") {
			// 검색한 값이 없을 때, 종료된 이벤트의 전체 페이지 보여주기
			endEventList = eventRepo.findByEventEndDateBefore(pageable, new Date());
		} else {
			// 검색한 값이 있을 때
			if (searchCode.equals("title")) {
				// 제목 키워드로 종료된 이벤트 페이징처리
				endEventList = eventRepo.findByEventEndDateBeforeAndEventTitleContaining(pageable, new Date(),
						searchKeyword);
			} else if (searchCode.equals("contents")) {
				// 내용 키워드로 종료된 이벤트 페이징처리
				endEventList = eventRepo.findByEventEndDateBeforeAndEventContentsContaining(pageable, new Date(),
						searchKeyword);
			} else {
				// 제목 및 내용 키워드로 종료된 이벤트 페이징처리
				endEventList = eventRepo.findByEventEndDateBeforeAndEventContentsContainingOrEventTitleContaining(
						pageable, new Date(), searchKeyword, searchKeyword);
			}
		}
		// 현재 페이지 : Page 객체를 사용하여 현재 인덱스 추출 >> 1로 표시하기 위해 +1
		int nowPage = endEventList.getPageable().getPageNumber() + 1;
		// 전체 페이지
		int totalPage = endEventList.getTotalPages();
		// 시작 페이지 :  현재 페이지의 -2 개 (현재 페이지에서 2개 이전 페이지와 1페이지 중 큰 값으로 처리.)
		int startPage = Math.max(nowPage - 2, 1);
		// 끝 페이지 : 현재 페이지의 + 2 개 (현재 페이지에서 2개 이후 페이지와 전체페이지 중 작은 값으로 처리.)
		int endPage = Math.min(nowPage + 2, endEventList.getTotalPages());
		// 페이징 및 검색 처리한 결과를 model에 담음. 뷰 페이지에서 처리하기 위함.
		model.addAttribute("endEventList", endEventList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("totalPage", totalPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);

		// 1-2. 진행중 이벤트 목록 보기
		Page<Event> proEventList;
		if (searchKeyword == null || searchKeyword == "") {
			// 검색한 값이 없을 때, 진행 중인 이벤트의 전체 페이지 보여주기
			proEventList = eventRepo.findByEventEndDateAfter(pageable, new Date());
		} else {
			// 검색한 값이 있을 때
			if (searchCode.equals("title")) {
				// 제목 키워드로 진행 중인 이벤트 페이징처리
				proEventList = eventRepo.findByEventEndDateAfterAndEventTitleContaining(pageable, new Date(),
						searchKeyword);
			} else if (searchCode.equals("contents")) {
				// 내용 키워드로 진행 중인 이벤트 페이징처리
				proEventList = eventRepo.findByEventEndDateAfterAndEventContentsContaining(pageable, new Date(),
						searchKeyword);
			} else {
				// 제목 및 내용 키워드로 진행 중인 이벤트 페이징처리
				proEventList = eventRepo.findByEventEndDateAfterAndEventContentsContainingOrEventTitleContaining(
						pageable, new Date(), searchKeyword, searchKeyword);
			}
		}
		// 현재 페이지 : Page 객체를 사용하여 현재 인덱스 추출 >> 1로 표시하기 위해 +1
		int nowPage2 = proEventList.getPageable().getPageNumber() + 1;
		// 전체 페이지
		int totalPage2 = proEventList.getTotalPages();
		// 시작 페이지 : 현재 페이지의 -2 개
		int startPage2 = Math.max(nowPage2 - 2, 1);
		// 끝 페이지 : 현재 페이지의 + 2 개
		int endPage2 = Math.min(nowPage2 + 2, proEventList.getTotalPages());

		model.addAttribute("proEventList", proEventList);
		model.addAttribute("nowPage2", nowPage2);
		model.addAttribute("totalPage2", totalPage2);
		model.addAttribute("startPage2", startPage2);
		model.addAttribute("endPage2", endPage2);

	}

	// ***************************************************************************************************************************

	// 2. 이벤트 상세보기 (수정시 값 불러올 때도 이용됨)
	@Override
	public int getEventView(Model model, int eventSeq) {

		// 삭제된 값 찾는경우 에러 방지.
		Optional<Event> optional = eventRepo.findById(eventSeq);
		
		if(optional.isPresent()) {
			// 찾음 >> 뷰페이지 띄움
			Event event = optional.get();
			model.addAttribute("event", event);
			// D-day계산
			Date today = new Date(); // 오늘 날짜
			Long Dday = (event.getEventEndDate().getTime() - today.getTime()) / (24 * 60 * 60 * 1000) + 1; // 오늘부터 종료일까지 남은 일수(오늘 제외)
			model.addAttribute("Dday", Dday);
			return 1; 
		} else {
			// 못찾음 >> 뷰페이지 띄우지 않고 리스트로 돌아감(event.html)
			return 0; 
		}
		
	}


	// ***************************************************************************************************************************

	// 3. 이벤트 등록
	@Override
	public void insertEvent(MultipartHttpServletRequest mul) {
		Event event = new Event();
		// 이벤트 등록 폼에서 입력한 내용을 가져와서 각각을 Event엔티티의 필드에 저장함.
		// 작성자 필드에 저장
		event.setEventWriter(mul.getParameter("eventWriter"));
		// 제목 필드에 저장
		event.setEventTitle(mul.getParameter("eventTitle"));
		// 내용 필드에 저장
		event.setEventContents(mul.getParameter("eventContents"));

		// 시작 날짜 필드에 저장
		String eventStartDate = mul.getParameter("eventStartDate");
		// 종료 날짜 필드에 저장
		String eventEndDate = mul.getParameter("eventEndDate");
		// 날짜 포맷
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		// 문자열을 Date타입으로 변환
		Date startDate = null;
		try {
			startDate = formatter.parse(eventStartDate);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}

		Date endDate = null;
		try {
			endDate = formatter.parse(eventEndDate);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}

		// 이벤트 시작날짜, 종료날짜
		event.setEventStartDate(startDate);
		event.setEventEndDate(endDate);

		// 목록페이지에 보여지는 이벤트 이미지
		MultipartFile file = mul.getFile("file");
		// 상세보기 페이지에서 보여지는 이벤트 이미지
		MultipartFile file2 = mul.getFile("file2");

		if (file.getSize() != 0) {
			// 파일이 있는 경우, 현재시간을 추가하여 파일명 저장하기. (파일명이 겹쳐도 덮어씌우는 것 방지하기 위함.)
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(EVENT_IMAGE_REPO + "/" + sysFileName);
			event.setEventImageName(sysFileName);
			try {
				// 위에서 만든 파일객체의 경로와 파일명으로 실제 업로드 하기위해 transferTo()메서드로 업로드처리를 한다.
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			// 파일이 없는 경우, 이미지 이름을 "nan"으로 처리.
			event.setEventImageName("nan");
		}

		if (file2.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file2.getOriginalFilename();
			File saveFile = new File(EVENT_IMAGE_REPO + "/" + sysFileName);
			event.setEventImageViewName(sysFileName);
			try {
				file2.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			event.setEventImageName("nan");
		}
		eventRepo.save(event);
	}

	// ***************************************************************************************************************************

	// 4. 이벤트 수정
	@Override
	public void updateEvent(MultipartHttpServletRequest mul) {
		int eventSeq = Integer.parseInt(mul.getParameter("eventSeq"));

		// 수정하기 전의 본래의 내용 가져옴.
		Event findEvent = eventRepo.findById(eventSeq).get();
		// 수정한 제목을 가져와서 세팅함.
		findEvent.setEventTitle(mul.getParameter("eventTitle"));
		// 수정한 내용을 가져와서 세팅함.
		findEvent.setEventContents(mul.getParameter("eventContents"));

		// 시작 날짜
		String eventStartDate = mul.getParameter("eventStartDate");
		// 종료 날짜
		String eventEndDate = mul.getParameter("eventEndDate");
		// 날짜 포맷
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		// 문자열을 Date타입으로 변환
		Date startDate = null;
		try {
			startDate = formatter.parse(eventStartDate);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}

		Date endDate = null;
		try {
			endDate = formatter.parse(eventEndDate);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
		// 시작날짜, 종료날짜
		findEvent.setEventStartDate(startDate);
		findEvent.setEventEndDate(endDate);

		// 목록페이지에 보여지는 이벤트 이미지
		MultipartFile file = mul.getFile("file");
		// 상세보기 페이지에서 보여지는 이벤트 이미지
		MultipartFile file2 = mul.getFile("file2");

		if (file.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(EVENT_IMAGE_REPO + "/" + sysFileName);
			findEvent.setEventImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			findEvent.setEventImageName("nan");
		}
		if (file2.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file2.getOriginalFilename();
			File saveFile = new File(EVENT_IMAGE_REPO + "/" + sysFileName);
			findEvent.setEventImageViewName(sysFileName);
			try {
				file2.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			findEvent.setEventImageName("nan");
		}
		// DB에 반영시킴.
		eventRepo.save(findEvent);
	}

	// ***************************************************************************************************************************

	// 5. 이벤트 삭제
	@Override
	public void deleteEvent(Event event) {
		// 이벤트 삭제하면 그 안에 있는 댓글까지 삭제
		List<ReplyEvent> replyEventList = replyEventRepository.findByEventSeqOrderByReplyEventSeqDesc(event.getEventSeq()); 
		for(ReplyEvent replyEvent : replyEventList) {
			replyEventRepository.delete(replyEvent);
		}
		eventRepo.deleteById(event.getEventSeq());
	}

	@Override
	public void wip_event(Model model) {
		// TODO Auto-generated method stub
		List<Event> list = eventRepo.findByEventEndDateAfter(new Date());
		model.addAttribute("widEvent", list);
	}

}
