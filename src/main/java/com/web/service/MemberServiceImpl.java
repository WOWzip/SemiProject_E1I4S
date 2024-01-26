package com.web.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.web.domain.Member;
import com.web.persistence.MemberRepository;

@Service
public class MemberServiceImpl implements MemberService {

	@Autowired
	private MemberRepository memberRepo;
	
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void joinMember(Member member) {
		memberRepo.save(member);
	}
	
	// 회원 중복 체크
	@Override
	public int checkJoinName(String name, String socialSecuNum, String phoneNumber) {
		System.out.println(socialSecuNum);
		System.out.println(phoneNumber);
		List<Member> list = memberRepo.socialSecuNumCheck(socialSecuNum);
		List<Member> list2 = memberRepo.phoneNumberCheck(phoneNumber);
		System.out.println(list);
		System.out.println(list2);
		if (list.isEmpty() && list2.isEmpty()) {
			return 0;	// 둘다 중복
		} else if (list.isEmpty()) {
			return 1;	// 전화번호 중복
		} else
		return 2;	// 주민번호 중복
	}
	
	// 아이디 중복체크
	@Override
	public boolean idCheck(String id) {
		Optional<Member> member = memberRepo.findById(id);
		
		if(!member.isPresent()) {
			System.out.println("사용가능 " + id);
			return true;  // 사용 가능
		}
		System.out.println("사용불가" + id);
		return false;	// 중복 아이디
	}

	@Override
	public boolean phoneNumberCheck(String phoneNumber) {
		List<Member> member = memberRepo.phoneNumberCheck(phoneNumber);
		if (member.isEmpty()) {
			return true;
		}

		return false;
	}
	
	// id 로 멤버객체 리턴
	@Override
	public Member findByid(String id) {
		Member member = new Member();
		Optional<Member> optional = memberRepo.findById(id);
		if (optional.isPresent()) {
			member = optional.get();
		} else {
			return null;
		}
		return member;
	}
	
	
	
	// 시큐리티 name 값으로 멤버 정보 가져오기
	@Override
	public Member memberInfo(Principal principal){
		String id = principal.getName();
		Optional<Member> findMember = memberRepo.findById(id);
		if (findMember.isPresent()) {
			return findMember.get();
		} else {
			return null;
		}
	}
	
	@Override
	public Member updateInfo(Member member) {
		Member findMember = memberRepo.findById(member.getId()).get();
		
		findMember.setNickName(member.getNickName());
		findMember.setPhoneNumber(member.getPhoneNumber());
		findMember.setEmail(member.getEmail());
		findMember.setDomain(member.getDomain());
		findMember.setAddr(member.getAddr());
		memberRepo.save(findMember);
		
		Optional<Member> changeMember = memberRepo.findById(member.getId());
		
		return changeMember.get();
	}
	
	@Override
	public Member updatePw(Member member) {
		Member findMember = memberRepo.findById(member.getId()).get();
		
		findMember.setPassword(member.getPassword());
		memberRepo.save(findMember);
		
		Optional<Member> changeMember = memberRepo.findById(member.getId());
		
		return changeMember.get();
	}
	
	@Override
	public void deleteMember(Member member) {
		memberRepo.delete(member);
	}
	// 룰렛으로 포인트 저장
	@Override
	public void savePoint(Member member) {
		// TODO Auto-generated method stub
		memberRepo.save(member);
	}
	
	// 이름, 주민번호, 전화번호로 아이디 찾기
	@Override
	public int findIdForNumAndPhone(String name, String socialSecuNum, String phoneNumber) {
		System.out.println(name+1);
		System.out.println(socialSecuNum+1);
		System.out.println(phoneNumber+1);
		Member member = memberRepo.findByNameAndSocialSecuNumAndPhoneNumber(name, socialSecuNum, phoneNumber);
		System.out.println(member);
		if(member != null) {
			//email
			String memberMail = member.getEmail() + "@" +  member.getDomain();
			SimpleMailMessage message = new SimpleMailMessage();
		    message.setSubject("E1I4S 아이디 찾기");
		    message.setTo(memberMail);

		    StringBuilder emailContent = new StringBuilder();
		    emailContent.append("E1I4S 에서 아이디 찾기를 하셨습니다.\n");
		    emailContent.append("조회된 ID : ").append(member.getId());
		   

		    message.setText(emailContent.toString());
		    javaMailSender.send(message);
		    return 1; // 정보 찾음
			}
		return 0; // 정보 없음
	}
	// 이름, 주민번호, 전화번호, 아이디로 비밀번호 찾기
	@Override
	public int findPwForNumAndPhoneAndId(String name, String socialSecuNum, String phoneNumber, String id) {
		System.out.println(name+1);
		System.out.println(socialSecuNum+1);
		System.out.println(phoneNumber+1);
		Member member = memberRepo.findByIdAndNameAndSocialSecuNumAndPhoneNumber(id, name, socialSecuNum, phoneNumber);
		System.out.println(member);
		if(member != null) {
			return 1; // 정보 찾음
		}
		return 0; // 정보 없음
	}
	
	// social
	// 주민번호 중복 체크
	@Override
	public int checkSocialSecuNum(String socialSecuNum) {
		List<Member> list = memberRepo.socialSecuNumCheck(socialSecuNum);
		System.out.println(list);
		if (list.isEmpty()) {
			return 0; // 사용가능
		}
		return 1; // 주민번호 중복

	}
}
