package com.web.persistence;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {
	
	Page<Board> findByBoardChoiceAndBoardTitleContaining(Long boardChoice,String searchKeyword, Pageable pageable); // 키워드 제목으로 검색 처리
	
	Page<Board> findByBoardChoiceAndBoardUserIdContaining(Long boardChoice,String searchKeyword, Pageable pageable); // 키워드 작성자으로 검색 처리
	
	Page<Board> findByBoardChoice(Pageable pageable,Long boardChoice); // 페이지(자유/거래/팁&노하우)구분하여 페이지처리
	
	Page<Board> findByBoardTitleContainingAndBoardChoice(String searchKeyword, Long boardChoice,Pageable pageable);  // 페이지(자유/거래/팁&노하우) 구분하여 제목 검색 처리
	   
	Page<Board> findByBoardContentsContainingAndBoardChoice(String searchKeyword, Long boardChoice,Pageable pageable);  // 페이지(자유/거래/팁&노하우) 구분하여 작성자 검색 처리

	List<Board> findByBoardChoice(Long boboardChoice);
	
	Page<Board> findByBoardUserId(Pageable pageable, String userId);
	
	List<Board> findTop4ByOrderByBoardRecommendDesc();
}
