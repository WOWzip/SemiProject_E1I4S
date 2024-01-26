package com.web.config;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.web.domain.Member;
import com.web.domain.Role;
import com.web.persistence.MemberRepository;

@Service
public class PrincipalOauthUserService extends DefaultOAuth2UserService {

	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private MemberRepository memberRepository;
	
	// 구글로부터 받은 userRequest 데이터에 대한 후처리 되는 함수
	// 함수 종료시 @AuthenticationPrincipal 어노테이션이 만들어진다.
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		
		// "registrationId" 로 어떤 OAuth 로 로그인 했는지 확인 가능(google, naver 등)
		System.out.println("getClientRegistration : " + userRequest.getClientRegistration());
		System.out.println("getAccessToken : " + userRequest.getAccessToken());
		System.out.println("getAttributes : " + super.loadUser(userRequest).getAttributes());
		// 구글 로그인 버튼 클릭 -> 구글 로그인창 -> 로그인 완료 -> code 를 리턴 (OAuth-Client 라이브러리가 받아줌) -> code 를 통해서 AccessToken 요청 (access 토큰 받음)
		// => "userRequest" 가 감고 있는 정보
		// 회원 프로필을 받아야 하는데 여기서 사용되는것이 loadUser 함수이다 -> 구글로부터 회원 프로필을 받을 수 있다.
		
		// OAuth 로그인 회원가입
		OAuth2User oAuth2User = super.loadUser(userRequest);
		OAuth2UserInfo oAuth2UserInfo = null;
		
		if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
			oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());			// google 이면 google 객체 생성 ->  oAuth2User.getAttributes() 통해 받아온 정보 주입
		} else if(userRequest.getClientRegistration().getRegistrationId().equals("kakao")) {
			oAuth2UserInfo = new KakaoUserInfo((Map<String, Object>)oAuth2User.getAttributes().get("kakao_account"),
                    String.valueOf(oAuth2User.getAttributes().get("id")));
		}
		
		else {
			System.out.println("지원하지 않는 로그인 서비스 입니다.");
		}
		
		// 받아온 값을 따로 저장
		String provider = oAuth2UserInfo.getProvider();
		String providerId = oAuth2UserInfo.getProviderId();
		String username = provider + "_" + providerId;
		String password = passwordEncoder.encode("1234"); // 중요하지 않음 그냥 패스워드 암호화
		String email = oAuth2UserInfo.getEmail();
		String [] email1 = email.split("@", 2);
		Role role = Role.ROLE_USER;
		
		Optional<Member> optional = memberRepository.findById(email);
		Member member = new Member();
		if (!optional.isPresent()) {
			// 닉네임, 전화번호, 주민번호 주소 제외 설정완료
			member = Member.builder()
					.id(email)
					.password(password)
					.name(username)
					.email(email1[0])
					.domain(email1[1])
					.role(role)
					.point(0)
					.totalPoint(0)
					.enabled(true)
					.provider(provider)
					.providerId(providerId)
					.build();
			
			memberRepository.save(member);
		} else {
	    	member = optional.get();
	    }
		
		
		return new PrincipalDetails(member, oAuth2User.getAttributes());
	}
	
	
	
	
}
