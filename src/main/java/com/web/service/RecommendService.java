package com.web.service;


public interface RecommendService {
	// 이미지 클릭 시 recommend entity 생성
	public void save(String userId, Long boardSeq);
	// 이미지 클릭 시 recommend entity 삭제
	public void delete(String userId, Long boardSeq);
	
}
