package com.web.service;

import java.io.File;
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

import com.web.domain.Board;
import com.web.domain.Event;
import com.web.domain.Notice;
import com.web.persistence.NoticeRepository;

@Service
public class NoticeServiceImpl implements NoticeService, FolderPathREPO {

	@Autowired
	private NoticeRepository noticeRepo;
	
	// 1. 공지 목록(전체, 공지, 점검) -- 페이징 및 검색기능 추가 // 공지, 점검 선택 ( noticeChoice => 공지:1,
	// 점검:2, 그 외에는 전체 )
	@Override
	public void getNoticeList(Model model, Pageable pageable, String searchKeyword, String searchCode,
			Long noticeChoice) {

		Page<Notice> noticeList;
		// 1-1. 공지목록만 보기
		if (noticeChoice == 1L) {
			// 제목으로 검색처리
			if (searchCode.equals("title")) {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findByNoticeChoice(noticeChoice, pageable);
				} else {
					noticeList = noticeRepo.findByNoticeTitleContainingAndNoticeChoice(searchKeyword, noticeChoice,
							pageable); 
				}
			}

			// 내용으로 검색 처리
			else {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findByNoticeChoice(noticeChoice, pageable); 
				} else {
					noticeList = noticeRepo.findByNoticeContentsContainingAndNoticeChoice(searchKeyword, noticeChoice,
							pageable); 
				}
			}
		}

		// 1-2. 점검 목록만 보기
		else if (noticeChoice == 2L) {
			// 제목으로 검색처리
			if (searchCode.equals("title")) {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findByNoticeChoice(noticeChoice, pageable);
				} else {
					noticeList = noticeRepo.findByNoticeTitleContainingAndNoticeChoice(searchKeyword, noticeChoice,
							pageable);
				}
			}

			// 내용으로 검색 처리
			else {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findByNoticeChoice(noticeChoice, pageable); 
				} else {
					noticeList = noticeRepo.findByNoticeContentsContainingAndNoticeChoice(searchKeyword, noticeChoice,
							pageable);
				}
			}
		}

		// 1-3. 전체목록(공지&점검) 보기
		else {
			// 제목으로 검색처리
			if (searchCode.equals("title")) {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findAll(pageable);
				} else {
					noticeList = noticeRepo.findByNoticeTitleContaining(searchKeyword, pageable); 
				}
			}

			// 내용으로 검색 처리
			else {
				if (searchKeyword == null) {
					noticeList = noticeRepo.findAll(pageable); 
				} else {
					noticeList = noticeRepo.findByNoticeContentsContaining(searchKeyword, pageable);
				}
			}
		}
		int nowPage = noticeList.getPageable().getPageNumber() + 1; // 현재 페이지
		int totalPage = noticeList.getTotalPages(); // 전체 페이지
		int startPage = Math.max(nowPage - 2, 1); // 시작 페이지
		int endPage = Math.min(nowPage + 2, noticeList.getTotalPages()); // 끝 페이지
		model.addAttribute("noticeList", noticeList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("totalPage", totalPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
	}

	// *****************************************************************************************************************************************

	// 2.공지 보기
	@Override
	public int getNoticeView(Model model, Long noticeSeq) {

		// 삭제된 값 찾는경우 에러 방지.
		Optional<Notice> optional = noticeRepo.findById(noticeSeq);
		
		if(optional.isPresent()) {
			// 찾음 >> 뷰페이지 띄움
			Notice notice = optional.get();
			model.addAttribute("notice", notice);
			return 1; 
		} else {
			// 못찾음 >> 뷰페이지 띄우지 않고 리스트로 돌아감(event.html)
			return 0; 
		}

	}

	// *****************************************************************************************************************************************

	// 3.공지 등록
	@Override
	public void insertNotice(MultipartHttpServletRequest mul) {
		Notice notice = new Notice();
		notice.setNoticeWriter(mul.getParameter("noticeWriter"));
		notice.setNoticeTitle(mul.getParameter("noticeTitle"));
		notice.setNoticeContents(mul.getParameter("noticeContents"));
		notice.setNoticeChoice(Long.parseLong(mul.getParameter("noticeChoice")));

		MultipartFile file = mul.getFile("file");

		if (file.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(NOTICE_IMAGE_REPO + "/" + sysFileName);
			notice.setNoticeImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			notice.setNoticeImageName("nan");
		}
		noticeRepo.save(notice);
	}

	// 4.공지 수정
	@Override
	public void updateNotice(MultipartHttpServletRequest mul) {
		System.out.println("check1");
		System.out.println(mul.getParameter("noticeSeq"));
		long noticeSeq = Long.parseLong(mul.getParameter("noticeSeq"));

		Notice findNotice = noticeRepo.findById(noticeSeq).get(); // 수정하기 전의 내용 가져옴
		findNotice.setNoticeTitle(mul.getParameter("noticeTitle")); // 수정한 공지글 제목을 가져와서 세팅함.
		findNotice.setNoticeContents(mul.getParameter("noticeContents")); // 수정한 공지글 내용을 가져와서 세팅함.
		System.out.println(mul.getParameter("noticeChoice"));
		findNotice.setNoticeChoice(Long.parseLong(mul.getParameter("noticeChoice"))); // 수정한 공지글 선택(공지/점검)을 가져와서 세팅함.

		MultipartFile file = mul.getFile("file");

		if (file.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(NOTICE_IMAGE_REPO + "/" + sysFileName);
			findNotice.setNoticeImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			findNotice.setNoticeImageName("nan");
		}

		noticeRepo.save(findNotice); // DB에 반영시킴.

	}

	// 5.공지 삭제
	@Override
	public void deleteNotice(Notice notice) {
		noticeRepo.deleteById(notice.getNoticeSeq());
	}
	// 인덱스용 최근 공지사항 4개 
	@Override
	public void recentNotice(Model model) {
		// TODO Auto-generated method stub
		List<Notice> recent4 = noticeRepo.findTop4ByOrderByNoticeSeqDesc(); 
		model.addAttribute("recentNotice", recent4);
	}

}
