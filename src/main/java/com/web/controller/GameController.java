package com.web.controller;

import java.security.Principal;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.domain.Member;
import com.web.service.MemberService;

@RequestMapping("/game")
@Controller
public class GameController {
	
	@Autowired
	private MemberService ms;
	
	@GetMapping("/game")
	public void game(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
	}
	
	@ResponseBody
	@RequestMapping(value = "/pointUp", method = RequestMethod.POST)
	public HashMap<String, Integer> pointUp(@RequestParam("point") int point, String id) {
		System.out.println(point);
		System.out.println(id);
		Member member = ms.findByid(id);
		member.setPoint(member.getPoint()+point-20);
		member.setTotalPoint(member.getTotalPoint()+point-20);
		ms.savePoint(member);
		HashMap<String, Integer> map = new HashMap<>();
		map.put("point", point);
		return map;
	}
	
}
