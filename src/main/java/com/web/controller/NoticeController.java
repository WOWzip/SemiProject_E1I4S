package com.web.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Member;
import com.web.domain.Notice;
import com.web.service.MemberService;
import com.web.service.NoticeService;


@RequestMapping("/news")
@Controller
public class NoticeController {
	@Autowired
	private MemberService ms;
	
	@Autowired 
	private NoticeService noticeService;
	
	// 페이징 및 검색 구현
	// 1. 공지사항 목록(전체, 공지, 점검) // 멤버 넘기는거 확인  
	@RequestMapping("/notice")
	public String notice(Model model,
						 @PageableDefault(page = 0, size = 10, sort = "noticeSeq", direction = Sort.Direction.DESC)Pageable pageable,
						 String searchKeyword, @RequestParam(defaultValue = "") String searchCode, String noticeChoice,
						 Principal principal, ModelMap modelMap) { 
		// searchCode : 검색어 구분 (title:제목, contents:내용) , noticeChoice: 보기목록 선택(1:공지, 2:점검)
		
		Long noticeChoiceL = 0L; // noticeChoice를 Long타입으로 변환하는 용도
		 if(noticeChoice == null || noticeChoice =="") { // noticeChoice가 비어있으면, Long타입 0 으로 처리.
			noticeChoiceL = 0L;
		}else if(noticeChoice != null) { // noticeChoice가 비어있지 않으면, String을 Long타입으로 변환.
			noticeChoiceL = Long.parseLong(noticeChoice);
		} 
		if(principal != null) {
			Member member = ms.memberInfo(principal);
			modelMap.addAttribute("member", member);
		} else {
			Member member = new Member();
			modelMap.addAttribute("member", member);
		}
		noticeService.getNoticeList(model, pageable, searchKeyword, searchCode, noticeChoiceL);
		return "/news/notice";
	}
	
	// ******************************************************************************************************
	
	
	// 2. 공지사항 상세 보기 -- 수정함
	@RequestMapping("/noticeView")
	public String noticeView(Model model, Long noticeSeq, Principal principal, ModelMap modelMap, RedirectAttributes ra) {
		Member member = new Member();
		int a = noticeService.getNoticeView(model, noticeSeq);
		// seq 값으로 조회하여 모델에 추가 후 seq값 없을 때 조회 불가능한 에러 잡기
		if(a == 1) { // seq값으로 조회 성공
			if(principal != null) {
				member = ms.memberInfo(principal);
			} 
			modelMap.addAttribute("member", member);
			return "news/noticeView";
		} else { // seq 값으로 조회 실패
			// 공지사항 첫 페이지로 이동
			ra.addAttribute("noticeChoice", 0);
			return "redirect:notice";
		} 
	}
	
	// ******************************************************************************************************
	
	
	/* 관리자 로그인이 안 되어있으면 로그인 창으로 이동시키기*/
	// 관리자 역할
	// 1. 공지사항 등록 폼
	@GetMapping("/noticeWriteForm") 
	public String noticeWriteForm(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "/news/noticeWriteForm";
		
	}
	
	// 1-2. 공지사항 등록
	@PostMapping("/noticeInsert") 
	public String noticeInsert(MultipartHttpServletRequest mul) {
		noticeService.insertNotice(mul);
		return "redirect:notice"; // 공지글 목록으로 가기
		
	}
	
	
	// 2. 공지사항 수정 폼
	// 이전에 있던 데이터를 가져올 수 있도록 함. 
	@GetMapping("/noticeUpdateForm")
	public String noticeUpdateForm(Model model, Long noticeSeq,Principal principal, ModelMap modelMap) { 
		noticeService.getNoticeView(model, noticeSeq);
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "/news/noticeUpdateForm";
	}
	
	// 2-2. 공지사항 수정
	@PostMapping("/noticeUpdate") 
	public String noticeUpdate(MultipartHttpServletRequest mul) {
		noticeService.updateNotice(mul);
		return "redirect:notice"; // 공지글 목록으로 가기
	}

	// 3. 공지사항 삭제
	@GetMapping("/noticeDelete") 
	public String noticeDelete(Notice notice, Long noticeChoice, RedirectAttributes ra) {
		noticeService.deleteNotice(notice);
		ra.addAttribute("noticeChoice", noticeChoice);
		return "redirect:notice";
	}
	
}

