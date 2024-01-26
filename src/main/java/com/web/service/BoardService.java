package com.web.service;

import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Board;
import com.web.domain.Member;

public interface BoardService {
	// 게시글 목록 
	public void board(Model model, Board board, Pageable pageable, String searchCode, String searchKeyword, Long boardChoice);

	// 게시글 상세페이지 
	public int board_view(Model model, Long boardSeq);

	// 게시글 글 쓰기 
	public void board_write(MultipartHttpServletRequest mul);
	
	// 게시글 글 수정 시 정보데이터 & seq 같이 보내기 + 페이징처리 
	public void getBoard(Long boardSeq,Model model);
	
	// 게시글 글 수정 
	public void board_update(MultipartHttpServletRequest mul);
	
	// 게시글 글 삭제 
	public void board_delete(Board board);
	
	// 게시글 공지사항 
	public void boardNotice(Model model);
	
	// 추천 여부 확인
	public void checkRecommend(Model model, Long boardSeq, Member member);
	
	// 내가 쓴 글 
	public void myBoardList(Model model,Board board,Pageable pageable, Member member);
	
	// 인덱스용 이벤트 불러오기(리스트)
	public void top4_reco(Model model);
}
