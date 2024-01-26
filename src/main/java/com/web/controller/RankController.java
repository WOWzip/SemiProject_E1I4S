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
import org.springframework.web.bind.annotation.RequestMapping;

import com.web.domain.Member;
import com.web.service.MemberService;
import com.web.service.RankService;


@RequestMapping("rank")
@Controller
public class RankController {
	
	@Autowired
	private RankService rankService;
	@Autowired
	private MemberService ms;
	
	// 1. 랭킹 보기(누적 포인트 순) - 페이징 및 검색 구현
	@GetMapping("/rank")
	public String rankList(Model model, Member member, 
						   @PageableDefault(page = 0, size = 6,sort = "totalPoint",direction = Sort.Direction.DESC)Pageable pageable, 
						   String searchKeyword,
						   Principal principal, ModelMap modelMap) {
		rankService.getRankList(model, member, pageable, searchKeyword);
		if(principal != null) {
			Member member2 = ms.memberInfo(principal);
			modelMap.addAttribute("member", member2);
			return "/rank/rank";
		} else {
			return "/rank/rank";
		}
	} 
	
	
}
