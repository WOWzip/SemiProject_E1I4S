package com.web.service;

import java.security.Principal;

import com.web.domain.Member;

public interface MemberService {

	public void joinMember(Member member);

	public Member memberInfo(Principal principal);
	
	public Member updateInfo(Member member);
	
	public Member updatePw(Member member);
	
	public boolean idCheck(String id);
	
	public void deleteMember(Member member);
	
	public Member findByid(String id);
	
	public int checkJoinName(String name, String socialSecuNum, String phoneNumber);
	
	public boolean phoneNumberCheck(String phoneNumber);
	
	public void savePoint(Member member);
	
	public int findIdForNumAndPhone(String name, String socialSecuNum, String phoneNumber);
	
	public int findPwForNumAndPhoneAndId(String name, String socialSecuNum, String phoneNumber, String id);
	
	public int checkSocialSecuNum(String socialSecuNum);
}