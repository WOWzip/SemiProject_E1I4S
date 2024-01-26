package com.web.config;


import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;

import com.web.domain.Member;

public class SecurityMember extends User{

	private static final long serialVersionUID = 1L;
	private Member member;
	private PrincipalDetails principalDetails;
	
	public SecurityMember(Member member) {
		super(member.getId(), member.getPassword(),
				AuthorityUtils.createAuthorityList(member.getRole().toString()));
		this.member = member;
		System.out.println("시큐리티 멤버");
	}
	
	public SecurityMember(PrincipalDetails principalDetails, Member member) {
		super(member.getId(), member.getPassword(),
				AuthorityUtils.createAuthorityList(member.getRole().toString()));
		System.out.println("시큐리티멤버 디테일스" + principalDetails.getMember());
		this.member = principalDetails.getMember();
		this.principalDetails = principalDetails;
	}
	
}
