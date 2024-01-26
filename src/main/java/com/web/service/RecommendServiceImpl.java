package com.web.service;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.domain.Board;
import com.web.domain.Member;
import com.web.domain.Recommend;
import com.web.persistence.BoardRepository;
import com.web.persistence.MemberRepository;
import com.web.persistence.RecommendRepository;

@Service
public class RecommendServiceImpl implements RecommendService{

	@Autowired
	private RecommendRepository recommendRepo;
	
	@Autowired
	private BoardRepository boardRepo;
	
	@Autowired
	private MemberRepository memberRepository;
	
	// 이미지 클릭 시 recommend entity 생성
	@Override
	public void save(String userId, Long boardSeq) {
		// 이미지 클릭시 로그인 한 id와 게시판 Seq를 set 후 저장
		Recommend recommend = new Recommend();
		recommend.setBoardSeq(boardSeq);
		recommend.setUserId(userId);
		recommendRepo.save(recommend);
		
		// 추천이 되었으니 게시판 객체에 추천수 + 1
		Board board = boardRepo.findById(boardSeq).get();
		board.setBoardRecommend(board.getBoardRecommend()+1);
		boardRepo.save(board);
		
		// 게시글이 추천을 받게 되면 50p 지급  (포인트, 누적 포인트 추가 )
		Member member = memberRepository.findById(board.getBoardUserId()).get();
		member.setPoint(member.getPoint() + 50);
		member.setTotalPoint(member.getTotalPoint() + 50);
				
		memberRepository.save(member);
	}
	
	// 이미지 클릭 시 recommend entity 삭제
	@Override
	public void delete(String userId, Long boardSeq) {
		// TODO Auto-generated method stub
		// 이미지 클릭시 로그인 한 id와 게시판 Seq로 추천객체 조회 후 삭제
		Recommend recommend = recommendRepo.findByUserIdAndBoardSeq(userId,boardSeq); 
		recommendRepo.delete(recommend);
		
		// 게시판 객체의 추천수 - 1
		Board board = boardRepo.findById(boardSeq).get();
		board.setBoardRecommend(board.getBoardRecommend()-1);
		boardRepo.save(board);
		
		// 게시글이 추천을 취소 당하면 50p가 차감됩니다 (포인트, 누적 포인트 차감 )
		Member member = memberRepository.findById(board.getBoardUserId()).get();
		member.setPoint(member.getPoint() - 50);
		member.setTotalPoint(member.getTotalPoint() - 50);
				
		memberRepository.save(member);

	} 
	 

	
}
