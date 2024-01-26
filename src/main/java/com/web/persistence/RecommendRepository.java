package com.web.persistence;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.web.domain.Recommend;

@Repository
public interface RecommendRepository extends JpaRepository<Recommend, Long>{
	// 로그인 아이디, 게시판 번호로 추천 여부 확인
	Recommend findByUserIdAndBoardSeq(String userId, Long boardSeq);
	List<Recommend> findByBoardSeq(Long boardSeq);
}
