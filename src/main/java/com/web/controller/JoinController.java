package com.web.controller;

import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.method.P;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Member;
import com.web.domain.Role;
import com.web.service.MemberService;

@RequestMapping("/join")
@Controller
public class JoinController {

	@Autowired
	private MemberService ms;

	@Autowired
	private PasswordEncoder encoder;

	@GetMapping("/joinAgree")
	public void joinAgree(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	@PostMapping("/joinCheck")
	public void joinCheck(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	// 중복 회원 체크
	@ResponseBody
	@PostMapping("/checkJoinName")
	public HashMap<String, String> checkJoinName(@RequestParam("name") String name,
			@RequestParam("socialSecuNum") String socialSecuNum, @RequestParam("phoneNumber") String phoneNumber) {

		HashMap<String, String> map = new HashMap<>();

		int check = ms.checkJoinName(name, socialSecuNum, phoneNumber);
		System.out.println(check);
		if (check == 0) { // 가능
			map.put("result", "ok");
			return map;
		} else if (check == 1) { // 전화번호 중복
			map.put("result", "phone");
			return map;
		}
		map.put("result", "secuNum"); // 주민번호 중복
		return map;
	}

	@PostMapping("/join")
	public void join(@RequestParam("name") String name, @RequestParam("socialSecuNum") String socialSecuNum,
			@RequestParam("phoneNumber") String phoneNumber, ModelMap modelMap) {
		Member member = new Member();
		member.setName(name);
		member.setPhoneNumber(phoneNumber);
		member.setSocialSecuNum(socialSecuNum);
		System.out.println(member.toString());
		modelMap.addAttribute("member", member);
		System.out.println(modelMap.toString());
	}

	// 아이디 체크
	@ResponseBody
	@RequestMapping(value = "/checkId", method = RequestMethod.POST)
	public String textAjax(@RequestParam("id") String id) {
		boolean idCheck = ms.idCheck(id);
		System.out.println(id + "111");
		if (idCheck == true) {
			id = "YES";
			return id; // 사용가능
		} else {
			return null;
		}
	}

	@PostMapping("/joinSuccess")
	public void joinSuccess(Member member) {
		member.setPassword(encoder.encode(member.getPassword()));
		ms.joinMember(member);
	}
	@PostMapping("/SocialJoin")
	public void SocialJoin(Member member) {
		member.setPassword(encoder.encode(member.getPassword()));
		ms.joinMember(member);
	}

	@GetMapping("/findMember")
	public void findMember(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	@GetMapping("/findId")
	public void findId(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	@GetMapping("/findPw")
	public void findPw(ModelMap modelMap) {
		Member member = new Member();
		modelMap.addAttribute("member", member);
	}

	@ResponseBody
	@RequestMapping(value = "/findIdForNumAndPhone", method = RequestMethod.POST)
	public HashMap<String, String> findIdForNumAndPhone(String name, String socialSecuNum, String phoneNumber) {
		System.out.println(name);
		System.out.println(socialSecuNum);
		System.out.println(phoneNumber);
		int a = ms.findIdForNumAndPhone(name, socialSecuNum, phoneNumber);
		System.out.println(a);
		HashMap<String, String> map = new HashMap<>();
		if (a == 1) {
			map.put("msg", "회원 ID를 해당 이메일로 발송했습니다.");
			return map;
		} else {
			map.put("msg", "존재하지 않는 회원 정보입니다.");
			return map;
		}
	}

	@ResponseBody
	@RequestMapping(value = "/findPwForNumAndPhoneAndId", method = RequestMethod.POST)
	public HashMap<String, Integer> findPwForNumAndPhoneAndId(String name, String socialSecuNum, String phoneNumber,
			String id) {
		System.out.println(name);
		System.out.println(socialSecuNum);
		System.out.println(phoneNumber);
		System.out.println(id);
		int a = ms.findPwForNumAndPhoneAndId(name, socialSecuNum, phoneNumber, id);
		System.out.println(a);
		HashMap<String, Integer> map = new HashMap<>();
		if (a == 1) {
			map.put("result", 1); // 정보 찾음
			return map;
		} else {
			map.put("result", 0); // 정보 없음
			return map;
		}
	}

	@PostMapping("findPw2")
	public String findPw2(String id, RedirectAttributes ra) {
		Member member = ms.findByid(id);
		ra.addFlashAttribute(member);
		return "redirect:findPw2";
	}

	@GetMapping("findPw2")
	public void findPw22() {

	}

	// 수정완료
	@PostMapping("/infoPwdUpdate")
	public String infoPwdUpdateCom(String id, String password) {
		System.out.println(password);
		Member member = ms.findByid(id);
		member.setPassword(encoder.encode(password));
		Member setPw = ms.updatePw(member);
		return "redirect:/login";
	}

	// 관리자 회원가입 --------
	@ResponseBody
	@PostMapping("/checkCode")
	public HashMap<String, String> checkCode(String adminCode) {
		System.out.println(adminCode);
		HashMap<String, String> map = new HashMap<>();
		if (adminCode.equals("admin")) {
			map.put("code", "ok");
			return map;
		}
		map.put("code", "no");
		return map;
	}

	@GetMapping("/joinAdmin")
	public void joinAdmin() {
	}
	
	@GetMapping("/socialJoin")
	public void socialJoin() {
	}
	
	@PostMapping("/socialJoin")
	public String socialJoinSuccess(@AuthenticationPrincipal AuthenticationPrincipal authenticationPrincipal, Member member, ModelMap model) {
		System.out.println(member);
		Member social = ms.findByid(member.getId());
		
		System.out.println(social);
		social.setPassword(encoder.encode(member.getPassword()));
		social.setNickName(member.getNickName());
		social.setPhoneNumber(member.getPhoneNumber());
		social.setSocialSecuNum(member.getSocialSecuNum());
		social.setAddr(member.getAddr());
		
		System.out.println(social);
//		Member newMember = new Member();
		ms.joinMember(social);
//		model.addAttribute("member", newMember);
		return "redirect:/";
	}
	
	
	// 주민번호 중복체크
	@ResponseBody
	@PostMapping("/checkSocialSecuNum")
	public HashMap<String, String> checkSocialSecuNum(@RequestParam("socialSecuNum") String socialSecuNum) {

		System.out.println(socialSecuNum);
		
		HashMap<String, String> map = new HashMap<>();

		int check = ms.checkSocialSecuNum(socialSecuNum);
		System.out.println(check);
		if (check == 0) {
			map.put("result", "ok");
			return map;
		} else {
			map.put("result", "fail");
			return map;
		}
		
	}
}