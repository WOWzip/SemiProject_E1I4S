package com.web.controller;

import java.security.Principal;
import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.web.config.PrincipalDetails;
import com.web.config.SecurityMember;
import com.web.domain.Member;
import com.web.persistence.MemberRepository;
import com.web.service.BoardService;
import com.web.service.EventService;
import com.web.service.MemberService;
import com.web.service.NoticeService;

@Controller
public class LoginController {

	@Autowired
	private MemberService memberService;
	
	private MemberRepository memberRepository;
	private HttpSession httpSession;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private EventService eventService;

	@Autowired
	private BoardService boardService;

	@Autowired
	private NoticeService noticeService;

	@GetMapping("/googleLogin")
	public void google() {

	}

	@GetMapping("/")
	public String index(Principal principal, ModelMap modelMap, Model model) {
		// 이벤트 배너에 추가
		eventService.wip_event(model);
		// 추천 top4 추가
		boardService.top4_reco(model);
		// 공지사항 최근순 4개 추가
		noticeService.recentNotice(model);
		if (principal != null) {
			Member member = memberService.memberInfo(principal);
			System.out.println(member.getSocialSecuNum());
			if (member.getSocialSecuNum() == null || member.getSocialSecuNum()=="") {
				return "join/socialJoin";
			}
			modelMap.addAttribute("member", member);
			return "index";
		}

		return "index";
	}

	@ResponseBody
	@RequestMapping(value = "findIdAndPwd", produces = "application/json; charset=UTF-8", method = RequestMethod.POST)
	public HashMap<String, String> findIdAndPwd(@RequestParam("id") String id,
			@RequestParam("password") String password) {
		HashMap<String, String> map = new HashMap<>();
		Member member = memberService.findByid(id);

		System.out.println(member);
		if (member == null) {
			map.put("msg", "ID를 확인해 주세요");
			return map;
		}

		boolean checkPassword = passwordEncoder.matches(password, member.getPassword()); // 맞으면 true 반환
		System.out.println(checkPassword);
		if (checkPassword == false) {
			map.put("msg", "비밀번호를 확인해 주세요");
			return map;
		} else {
			map.put("msg", "로그인");
			return map;
		}
	}

	@GetMapping("/login")
	public void login(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	@GetMapping("/logout")
	public void logout() {
	}

	@GetMapping("/testhf")
	public void testhf() {
	}
	
	@GetMapping("oauth/login")
	public void oauthLogin() {
		
	}

}
