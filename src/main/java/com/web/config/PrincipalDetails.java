package com.web.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.web.domain.Member;

import lombok.Data;
//시큐리티가 "/login" 주소 요청이 오면 낚아 채서 로그인을 진행해준다.
//로그인을 진행이 완료가 되면 시큐리티 session을 만들어준다.(Security Session(Session안에 특정영역))
//해당 세션안에는 Authentication 타입객체가 들어간다.
//Authentication 은 UserDetails 타입 객체가 들어갈수 있다.
//UserDetails 안에 use(사용자)를 가지고 있는다.


@Data
public class PrincipalDetails implements UserDetails , OAuth2User{

	private Member member;
	private Map<String, Object> attributes;
	
	// 일반 로그인 생성자
	public PrincipalDetails(Member member) {
		System.out.println("일반로그인 생성자다");
		this.member = member;
	}

	// OAuth 로그인 생성자
	public PrincipalDetails(Member member, Map<String, Object> attributes) {
		System.out.println("여긴 소셜로그인생성자");
		this.member = member;
		this.attributes = attributes;
	}
	
	//OAuth2User 인터페이스 메소드
	@Override
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	
	// UserDetails 인터페이스 메소드
	
	// 해당 User의 권한을 리턴하는곳
	// SecurityFilterChain에서 권한을 체크할 때 사용됨
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		System.out.println("principalDetails");
		Collection<GrantedAuthority> collection = new ArrayList<>();
		collection.add(new GrantedAuthority() {
			
			@Override
			public String getAuthority() {
				
				return String.valueOf(member.getRole());
			}
		});
		
		return collection;
	}
	
	@Override
	public String getPassword() {
		return member.getPassword();
	}
	
	@Override
	public String getUsername() {
		return member.getId();	// id값을 username 으로 저장
	}
	
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@Override
	public boolean isEnabled() {
		// 계정의 유효기간 메서드
		
		return false;
	}
	
	@Override
	public String getName() {
		return null;
	}
	
	
	/*
 앞서 스프링 시큐리티 세션 영역에는 Authentication객체가 들어가게 되고 Authentication객체안에는
UserDetails, OAuth2User객체가 들어갈 수 있다.

컨트롤러에서 필요한 Authentication객체를 가져올때 일반 로그인이든 OAuth2 로그인이든 상관없이 동일한 객체를 가져올수 있게 하기 위해서 함께 상속받았다.
	 */
}
