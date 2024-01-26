package com.web.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.web.domain.Member;
import com.web.persistence.MemberRepository;
import com.web.service.MemberService;

@Controller
public class MyPageController {

	@Autowired
	private MemberService ms;

	private final MemberRepository memberRepo;
	private final PasswordEncoder passwordEncoder;
	private OAuth2AuthorizedClientService authorizedClientService;

	public MyPageController(MemberRepository memberRepo, PasswordEncoder passwordEncoder) {
		this.memberRepo = memberRepo;
		this.passwordEncoder = passwordEncoder;
	}

	@GetMapping("/mypage/mypage")
	public void myPage(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
	}

	@GetMapping("/mypage/info")
	public void info(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
	}

	// 멤버 정보 infoUpdate 페이지에 띄우기
	@GetMapping("/mypage/infoUpdate")
	public String infoUpdate(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "mypage/infoUpdate";
	}

	// 전화번호 체크
	@ResponseBody
	@PostMapping("/mypage/checkPhoneNumber")
	public HashMap<String, String> checkPhoneNumber(@RequestParam("phoneNumber") String phoneNumber) {
		boolean check = ms.phoneNumberCheck(phoneNumber);
		HashMap<String, String> map = new HashMap<>();
		if (check == true) {
			map.put("result", "YES");
			return map; // 사용가능
		}
		map.put("result", "NO");
		return map;
	}

	// 멤버 정보 수정
	@PostMapping("/mypage/infoUpdateSuccess")
	public String infoUpdateSuccess(Member member, Model model) {
		Member newMember = ms.updateInfo(member);
		model.addAttribute("member", newMember);
		return "/mypage/mypage";
	}

	// 비밀번호 수정
	@GetMapping("/mypage/infoPwdUpdate")
	public String infoPwdUpdate(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "mypage/infoPwdUpdate";
	}

	// 수정완료
	@PostMapping("/mypage/infoPwdUpdate")
	public String infoPwdUpdateCom(Member member, Model model) {
		member.setPassword(passwordEncoder.encode(member.getPassword()));
		Member setPw = ms.updatePw(member);
		model.addAttribute("member", setPw);
		return "/mypage/mypage";
	}

	// 비밀번호 확인
	@GetMapping("/mypage/checkPassword")
	public void checkPassword(Principal principal, ModelMap modelMap, int select) {
		System.out.println(select);
		Member member = ms.memberInfo(principal);
		System.out.println(member.toString());
		modelMap.addAttribute("member", member);

	}
	
	@PostMapping("/mypage/passwordOk")
	public String passwordOk (int select) {
		if (select == 0) {
			return "redirect:/mypage/infoUpdate";
		} else if (select == 1) {
			return "redirect:/mypage/infoPwdUpdate";
		} else {
		return "redirect:/mypage/deleteMember";
		}
	}

	// 회원 탈퇴
	// 비밀번호 확인 제출
	@ResponseBody
	@PostMapping("/mypage/checkPw")
	public HashMap<String, String> checkPw(@RequestParam("id") String id, @RequestParam("password") String password) {
		System.out.println(id);
		System.out.println(password);
		Member member = ms.findByid(id);

		boolean pwCheck = passwordEncoder.matches(password, member.getPassword()); // matches() 사용시 암호화된 비밀번호를 뒤에 적음

		HashMap<String, String> map = new HashMap<>();
		if (pwCheck == true) {
			map.put("result", "true");
			System.out.println(map);
			return map;
		}
		map.put("result", "fail");
		System.out.println(map);
		return map;
	}

	// 회원 탈퇴 페이지
	@GetMapping("/mypage/deleteMember")
	public void deleteMemberPage(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
	}

	// 탈퇴
	@PostMapping("/mypage/deleteComplete")
	public String deleteMember(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		ms.deleteMember(member);
		SecurityContextHolder.clearContext();
		return "mypage/deleteComplete";
	}

}
