package com.web.config;

import java.util.Optional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.web.domain.Member;
import com.web.persistence.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PrincipalService implements UserDetailsService {

	
	private final MemberRepository memberRepository;
	
	// 시큐리티 session => Authentication => UserDetails
	// 여기서 리턴된 값이 Authentication 안에 들어간다. (리턴 될 때 들어간다).
	// 그리고 시큐리티 session 안에 Authentication 이 들어간다
	// 함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		System.out.println("principalService");
		Optional<Member> optional = memberRepository.findById(username);
		if (!optional.isPresent()) {	// 유저가 있으면 정보 가져옴
			System.out.println("정보 없");
			throw new UsernameNotFoundException(username + "사용자 없음..");
		} else {
			Member member = optional.get();
			if (member.getProvider() == null) {
				System.out.println("일반멤버?");
				return new SecurityMember(member);
			}
			System.out.println(optional.get());
			PrincipalDetails principalDetails = new PrincipalDetails(member);
			System.out.println("여기맞아?????????????????? " + principalDetails.getMember());
			
			return new SecurityMember(new PrincipalDetails(member), member);
		}
	}
	
	
}
