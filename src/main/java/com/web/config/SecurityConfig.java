package com.web.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	
	@Autowired
	private PrincipalOauthUserService principalOauthUserService;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.cors()
			.and()
			.csrf().disable()
			.headers().frameOptions().disable()
			.and()
			.authorizeRequests()
			.antMatchers("/").permitAll()
			.antMatchers("/mypage/**").hasAnyRole("USER", "ADMIN")
			.antMatchers("/support/**").hasRole("USER")
			.antMatchers("/board/board").permitAll()						// board 권한
			.antMatchers("/board/board_update").hasAnyRole("USER", "ADMIN") 
			.antMatchers("/board/board_view").hasAnyRole("USER", "ADMIN")
			.antMatchers("/board/board_write").hasAnyRole("USER", "ADMIN") 
			.antMatchers("/board/board_delete").hasAnyRole("USER", "ADMIN") 
			.antMatchers("/board/replyModify").hasAnyRole("USER", "ADMIN") 
			.antMatchers("/rank/**").permitAll()							// 뉴스 랭킹 가이드
			.antMatchers("/guide/character").permitAll()					// 뉴스 랭킹 가이드
			.antMatchers("/guide/characterView").permitAll()				// 뉴스 랭킹 가이드
			.antMatchers("/guide/guide").permitAll()						// 뉴스 랭킹 가이드
			.antMatchers("/guide/characterUpdateForm").hasRole("ADMIN")		// 뉴스 랭킹 가이드
			.antMatchers("/guide/characterWriteForm").hasRole("ADMIN")		// 뉴스 랭킹 가이드
			.antMatchers("/guide/guideUpdateForm").hasRole("ADMIN")			// 뉴스 랭킹 가이드
			.antMatchers("/guide/guideWriteForm").hasRole("ADMIN")			// 뉴스 랭킹 가이드
			.antMatchers("/news/notice").permitAll()						// 뉴스 랭킹 가이드
			.antMatchers("/news/noticeView").permitAll()					// 뉴스 랭킹 가이드
			.antMatchers("/news/noticeWriteForm").hasRole("ADMIN")			// 뉴스 랭킹 가이드
			.antMatchers("/news/noticeUpdateForm").hasRole("ADMIN")			// 뉴스 랭킹 가이드
			.antMatchers("/admin/**").hasRole("ADMIN") 	
			.antMatchers("/pointshop/pointshop").permitAll()				// 다
			.antMatchers("/pointshop/product").permitAll()  				// 다
			.antMatchers("/pointshop/popup").hasAnyRole("USER", "ADMIN") 				// 다
			.antMatchers("/pointshop/purchaseHistory").hasAnyRole("USER", "ADMIN") 				// 다
			.antMatchers("/pointshop/productHistory").hasAnyRole("USER", "ADMIN") 				// 다
			.antMatchers("/pointshop/productInsert").hasRole("ADMIN")
			.antMatchers("/pointshop/productModify").hasRole("ADMIN")
			.and()
			.formLogin()
			.loginPage("/login")// 이쪽 페이지로 이동함
			.defaultSuccessUrl("/")
			.loginProcessingUrl("/login")	// 호출시 비밀번호 인증 페이지 호출
			.usernameParameter("id") 
			.passwordParameter("password")
			.and()
			.logout()
			.logoutUrl("/logout")
			.invalidateHttpSession(true).logoutSuccessUrl("/")
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
			.and() 
			.exceptionHandling().accessDeniedPage("/") // 접근불가 페이지 >> home
			.and()
			.oauth2Login()		// OAuth2 기반의 로그인인 경우
			.loginPage("/login") 	// 인증이 필요한 URL 이면 "/login" 으로 이동
			.successHandler(new MemberLoginSeccessHandler())
			.defaultSuccessUrl("/")
			.failureUrl("/login")	// 로그인 실패 시 login 으로 이동
			.userInfoEndpoint()		// 로그인 성공 후 사용자 정보를 가져온다
			.userService(principalOauthUserService)	// 사용자 정보를 처리할때 사용
			;
		
		
		
		return http.build();
	}
	
	
	
	
}
