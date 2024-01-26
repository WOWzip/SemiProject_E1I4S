package com.web.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.web.domain.Member;
import com.web.persistence.MemberRepository;

@Service
public class RankServiceImpl implements RankService{
 
	@Autowired
	private MemberRepository memberRepo;
	
	// 랭킹 목록 -- 페이징 및 검색기능 추가
	@Override
	public void getRankList(Model model, Member member, Pageable pageable, String searchKeyword) {
		// 상위 3명 뽑기
		List<Member> top1_3 = memberRepo.findTop3ByOrderByTotalPointDesc(); 
		model.addAttribute("top1_3", top1_3);
		
		
		List<Member> rankList = memberRepo.findByOrderByTotalPointDescNickNameDesc();
		System.out.println(rankList);
		if(searchKeyword == null || searchKeyword=="") {
			// 검색한 값이 없을 때, 전체 페이지 보여주기
			Page<Member> memberList = memberRepo.findByOrderByTotalPointDescNickNameDesc(pageable);
			model.addAttribute("memberList", memberList);
			int nowPage = memberList.getPageable().getPageNumber()+1;
			int startPage = Math.max(nowPage -2, 1);
			int endPage = Math.min(nowPage + 2, memberList.getTotalPages());
			model.addAttribute("nowPage", nowPage);
			model.addAttribute("startPage", startPage);
			model.addAttribute("endPage", endPage);
		} else {
			// 닉네임으로 검색 처리
			Member findmember = memberRepo.findByNickName(searchKeyword);
			// 찾은 닉네임의 위치값을 불러옴(순위 뽑기 위함.)
			int rank = rankList.indexOf(findmember) + 1 ;
			model.addAttribute("findmember", findmember);
			model.addAttribute("rank", rank);
		}
	}
}

