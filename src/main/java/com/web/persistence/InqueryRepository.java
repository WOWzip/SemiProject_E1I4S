package com.web.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Inquery;
 
public interface InqueryRepository extends JpaRepository<Inquery, Long>{ 
	Page<Inquery> findByInqueryWriter(Pageable pageable, String userId);
	Page<Inquery> findByInquerySelectAndInqueryTitleContainingAndInqueryAnswerIsNull(Pageable pageable, String inquerySelect, String searchKeyword1);
	Page<Inquery> findByInquerySelectAndInqueryAnswerIsNull(Pageable pageable, String inquerySelect);
	Page<Inquery> findByInqueryTitleContainingAndInqueryAnswerIsNotNullAndInqueryWriter(Pageable pageable, String searchKeyword1, String inqueryWriter);
	Page<Inquery> findByInqueryAnswerIsNotNullAndInqueryWriter(Pageable pageable, String inqueryWriter);
	
}
