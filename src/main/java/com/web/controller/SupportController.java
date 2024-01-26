package com.web.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
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
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Inquery;
import com.web.domain.Member;
import com.web.domain.Report;
import com.web.service.MemberService;
import com.web.service.SupportService;

@RequestMapping("/support")
@Controller
public class SupportController {
	
	@Autowired
	private SupportService supportService;
	
	@Autowired
	private MemberService ms;
	
	
	//---------------------------------------------------------------
	// 문의 작성 폼 띄우기
	@GetMapping("/report_bug")
	public String report_bug(Principal principal, ModelMap modelMap){
		if(principal != null) {
			Member member = ms.memberInfo(principal);
			modelMap.addAttribute("member", member);
			return "support/report_bug";
		}
		return "login";
	}
	@GetMapping("/report_1_1") 
	public String report_1_1(Principal principal, ModelMap modelMap){
		if(principal != null) {
			Member member = ms.memberInfo(principal);
			modelMap.addAttribute("member", member);
			return "support/report_1_1";
		}
		return "login";
	}
	//---------------------------------------------------------------
	// 내용 작성 후 제출
	@PostMapping("/inquerySubmit")
	public String inquerySubmit(MultipartHttpServletRequest mul) {
		supportService.insertInquery(mul);
		return "redirect:report_1_1_list";
	}
	@PostMapping("/reportSubmit")
	public String reportSubmit(MultipartHttpServletRequest mul) {
		supportService.insertReport(mul);
		return "redirect:report_bug_list";
	}
	//---------------------------------------------------------------
	// 페이징 기본값 설정 및 리스트 조회
	@GetMapping("/report_1_1_list") 
	public String report_1_1_list(Model model, Inquery inquery,
			@PageableDefault(page = 0, size = 3,sort = "inquerySeq",direction = Sort.Direction.DESC)Pageable pageable,
			Principal principal, ModelMap modelMap){
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.getInqueryList(model, inquery, pageable, member);
		return "support/report_1_1_list";
	}
	@GetMapping("/report_bug_list") 
	public String report_bug_list(Model model, Report report,
								  @PageableDefault(page = 0, size = 3,sort = "reportSeq",direction = Sort.Direction.DESC) Pageable pageable,
								  Principal principal, ModelMap modelMap){
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.getReportList(model, report, pageable, member);
		return "support/report_bug_list";
	}
	//---------------------------------------------------------------
	// seq 값을 이용하여 html에 정보 추가
	@GetMapping("report_1_1_view")
	public String report_1_1_view(Long inquerySeq, Model model,Principal principal, ModelMap modelMap) {
		supportService.getInqueryById(inquerySeq, model);
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "support/report_1_1_view";
	}
	@GetMapping("report_bug_view")
	public String report_bug_view(Long reportSeq, Model model,Principal principal, ModelMap modelMap) {
		supportService.getReportById(reportSeq, model);
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "support/report_bug_view";
	}
	//---------------------------------------------------------------
	// 완료된 목록 페이지에 문의, 신고 리스트 불러오기 및 페이징
	@GetMapping("report_result")
	public String report_result(Inquery inquery, Report report,
							   @Qualifier("pageable1") @PageableDefault(page = 0, size = 7,sort = "inquerySeq",direction = Sort.Direction.DESC) Pageable pageable1,
							   @Qualifier("pageable3") @PageableDefault(page = 0, size = 7,sort = "reportSeq",direction = Sort.Direction.DESC) Pageable pageable3,
							   Model model, String searchKeyword1, String searchKeyword3,
							   Principal principal, ModelMap modelMap){
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		supportService.find2List(inquery, report, pageable1,pageable3, searchKeyword1, searchKeyword3, model, member);
		return "support/report_result";
	}
}
 
