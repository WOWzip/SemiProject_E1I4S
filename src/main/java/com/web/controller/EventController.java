package com.web.controller;

import java.security.Principal;
import java.util.Date;

import javax.mail.Session;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Event;
import com.web.domain.Member;
import com.web.domain.ReplyEvent;
import com.web.service.EventService;
import com.web.service.MemberService;
import com.web.service.ReplyEventService;

@RequestMapping("/news")
@Controller
public class EventController {

	// 이벤트 
	@Autowired
	private EventService eventService; 
	
	// 이벤트 댓글
	@Autowired
	private ReplyEventService replyEventService; 
	
	// 멤버
	@Autowired
	private MemberService ms; 
	

	// 1. 이벤트 목록 - 페이징 및 검색 구현
	@RequestMapping("/event")
	public String event(Model model,
						@PageableDefault(page = 0, size = 6, sort = "eventSeq", direction = Sort.Direction.DESC)Pageable pageable,
						String searchKeyword, @RequestParam(defaultValue = "") String searchCode,
						Principal principal, ModelMap modelMap) {
		// page : 현재페이지. 0부터 시작
		// size : 한 페이지에 노출할 데이터 건수. 6개씩 띄운다.
		// sort : 정렬 조건. eventSeq기준으로 정렬. (기본: 오름차순 정렬)
		// direction : 정렬 방향. (ASC:오름차순, DESC:내림차순)
		// searchKeyword : 검색 키워드
		// searchCode : 검색어 구분 (title:제목, contents:내용, titleContents:제목 및 내용) 
		// eventChoice: 보기목록 선택(0:진행중인 이벤트, 1:종료된 이벤트)
		
		 if(principal != null) {
			 // 멤버이면, 멤버의 정보를 가져와서 modelMap에 담아둠.
			 Member member = ms.memberInfo(principal);
			 modelMap.addAttribute("member", member);
		 } else { 
			 // 멤버가 아니면, 비어있는 멤버객체 생성(일반 페이지 접근 가능하도록 하기 위함.)
			 Member member = new Member();
			 modelMap.addAttribute("member", member);
		 }
		
		 // 서비스에서 정의한 getEventList() 메서드를 통해 현재 진행중인 혹은 종료된 이벤트의 페이징 및 검색 처리한 결과를 가져옴.
		eventService.getEventList(model, pageable, searchKeyword, searchCode);
		return "/news/event";
		
	}
	
	// *********************************************************************************************************************************

	
	// 2. 이벤트 상세보기  -- 수정함
	@RequestMapping("/eventView")
	public String eventView(Model model, int eventSeq, Principal principal, ModelMap modelMap, RedirectAttributes ra) {
		Member member = new Member();
		int a = eventService.getEventView(model, eventSeq);
		// seq 값으로 조회하여 모델에 추가 후 seq값 없을 때 조회 불가능한 에러 잡기
		if(a == 1) { // seq값으로 조회 성공
			if(principal != null) {
				member = ms.memberInfo(principal);
			} 
			modelMap.addAttribute("member", member);
			// 이벤트 정보 불러올 때 댓글정보도 같이 불러오기
			replyEventService.replyEventList(model, eventSeq);
			return "news/eventView";
		} else { // seq 값으로 조회 실패
			// 이벤트 첫 페이지로 이동
			ra.addAttribute("eventChoice", 0);
			return "redirect:event";
		} 
	}
	
	// ********************************************************************************************************************************
	
	/*** 관리자 역할 ***/
	// 관리자 로그인이 안 되어있으면 로그인 창으로 이동시키기
	// 1. 이벤트 등록 폼
	@GetMapping("/eventWriteForm") 
	public String eventWriteForm(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);	
		return "/news/eventWriteForm";
	}
	
	// 1-2. 이벤트 등록
	@PostMapping("/eventInsert")
	public String eventInsert(MultipartHttpServletRequest mul) {
		eventService.insertEvent(mul);
		// 이벤트 목록으로 가기
		return "redirect:event"; 
	}
	
	
	// 2-1. 이벤트 수정 폼
	@GetMapping("/eventUpdateForm")
	// 이전에 있던 데이터를 불러옴.
	public String eventUpdateForm(Model model, int eventSeq, Principal principal, ModelMap modelMap) { 
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		eventService.getEventView(model, eventSeq);
		return "/news/eventUpdateForm";
	}
	
	
	// 2-2. 이벤트 수정
	@PostMapping("/eventUpdate") 
	public String eventUpdate(MultipartHttpServletRequest mul) {
		eventService.updateEvent(mul);
		// 공지글 목록으로 가기
		return "redirect:event"; 
	}
	
	
	// 3. 이벤트 삭제
	@GetMapping("/eventDelete") 
	public String eventDelete(Event event) {
		eventService.deleteEvent(event);
		return "redirect:event"; 
	}
	
	
	
	// ********************************************************************************************************************************

	
	/*** 댓글 Controller ***/
	//----------------------------------------------------------

	// 댓글 등록 
	@PostMapping("/replyEventForm")
	public String replyEventWrite(ReplyEvent replyEvent, int eventSeq, RedirectAttributes ra, String eventChoice, String page) {
		replyEventService.replyEventWrite(replyEvent, eventSeq);
		ra.addAttribute("eventSeq", replyEvent.getEventSeq());
		ra.addAttribute("eventChoice", eventChoice);
		ra.addAttribute("page", page);
		return "redirect:eventView";
	}
	
	//----------------------------------------------------------

	// 댓글 수정 폼 띄우기
	@GetMapping("/replyModify")
	public String replyEventModify(Long replyEventSeq, Model model) {
		replyEventService.replyEventModify(replyEventSeq, model);
		return "news/replyModify";
	}

	//----------------------------------------------------------

	// 댓글 삭제 
	@GetMapping("/replyDelete")
	public String replyEventDelete(Long replyEventSeq, RedirectAttributes ra,String eventChoice, String page) {
		replyEventService.replyEventDelete(replyEventSeq, ra);
		ra.addAttribute("eventChoice", eventChoice);
		ra.addAttribute("page", page);
		return "redirect:eventView";
	}
	
	//----------------------------------------------------------
	
	// 댓글 수정
	@PostMapping("/replyModifyForm")
	public String replyModifyForm(ReplyEvent replyEvent, RedirectAttributes ra) {
		System.out.println(replyEvent);
		replyEventService.replyEventModify2(replyEvent);
		ra.addAttribute("replyEventSeq", replyEvent.getReplyEventSeq());
		return "redirect:replyModify";
	}
	
}
	
	