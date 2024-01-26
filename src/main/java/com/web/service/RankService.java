package com.web.service;

import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;

import com.web.domain.Member;

public interface RankService {
	
	public void getRankList(Model model, Member member, Pageable pageable, String searchKeyword); // 랭킹 목록 (페이징, 검색 기능)
	
	

}
