package com.web.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.History;


public interface HistoryRepository extends JpaRepository<History, Long> {
	
	Page<History> findByUserIdAndProductNameContaining(String userId, String searchKeyword, Pageable pageable);
	Page<History> findByUserId(Pageable pageable, String userId);
	
}
