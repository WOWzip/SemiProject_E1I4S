package com.web.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.PageRequest;
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

import com.web.domain.Inquery;
import com.web.domain.Member;
import com.web.domain.Report;
import com.web.service.MemberService;
import com.web.service.SupportService;


@RequestMapping("/admin")
@Controller
public class AdminController {
	
	@Autowired
	private SupportService supportService;
	
	@Autowired
	private MemberService ms;
	
	//---------------------------------------------------------------
	// 한 페이지에 3개의 리스트 가져오기
	@GetMapping("/report_admin")
	public String report_admin(Inquery inquery, Report report,
							   // @Qualifier 를 사용하여 각 Pageable을 구분할 수 있도록 하고 html에서 page 값을 넘길 때 @Qualifier에서 정한 이름
							   // ex) name_page=n 과 같은 방식으로 넘겨 페이징
							   // @PageableDefault page : 페이지 인덱스, size 출력 수, sort 정렬의 기준, direction = Sort.Direction 오름차순 내림차순 결정
							   @Qualifier("pageable1") @PageableDefault(page = 0, size = 7,sort = "inquerySeq",direction = Sort.Direction.DESC) Pageable pageable1,
							   @Qualifier("pageable2") @PageableDefault(page = 0, size = 7,sort = "inquerySeq",direction = Sort.Direction.DESC) Pageable pageable2,
							   @Qualifier("pageable3") @PageableDefault(page = 0, size = 7,sort = "reportSeq",direction = Sort.Direction.DESC) Pageable pageable3,
							   Model model, String searchKeyword1, String searchKeyword2, String searchKeyword3,
							   Principal principal, ModelMap modelMap){
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.find3List(inquery, report, pageable1,pageable2,pageable3, searchKeyword1,searchKeyword2, searchKeyword3, model);
		return "admin/report_admin";
	}
	//---------------------------------------------------------------
	// seq 값으로 정보 가져오기
	@GetMapping("/report_view_admin")
	public String report_view_admin(Long inquerySeq, Model model, Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.getInqueryById(inquerySeq, model);
		return "admin/report_view_admin";
	}
	@GetMapping("/report_view_admin2")
	public String report_view_admin2(Long reportSeq, Model model, Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.getReportById(reportSeq, model);
		return "admin/report_view2_admin";
	}
	//---------------------------------------------------------------
	// seq값으로 문의 정보 가져와서 자동답변하기
	@GetMapping("answer1")
	public String answer1(Long inquerySeq) {
		supportService.answerInq(inquerySeq);
		return "redirect:report_admin";
	}
	@GetMapping("answer2")
	public String answer2(Long reportSeq) {
		supportService.answerRep(reportSeq);
		return "redirect:report_admin";
	}
	// seq값으로 문의 정보 가져와서 수동답변하기
	@GetMapping("answer3")
	public String answer3(Long inquerySeq, String inqueryAnswer) {
		System.out.println(inquerySeq);
		System.out.println(inqueryAnswer);
		supportService.answerInq2(inquerySeq, inqueryAnswer);
		return "redirect:report_admin";
	}
	@GetMapping("answer4")
	public String answer4(Long reportSeq, String reportAnswer) {
		System.out.println(reportSeq);
		System.out.println(reportAnswer);
		supportService.answerRep2(reportSeq, reportAnswer);
		return "redirect:report_admin";
	}
}
