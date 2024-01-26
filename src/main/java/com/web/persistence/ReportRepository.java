package com.web.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.Inquery;
import com.web.domain.Report;

public interface ReportRepository extends JpaRepository<Report, Long>{
	Page<Report> findByReportWriter(Pageable pageable, String userId);
	Page<Report> findByReportTitleContainingAndReportAnswerIsNull(Pageable pageable, String searchKeyword3);
	Page<Report> findByReportTitleContainingAndReportAnswerIsNotNullAndReportWriter(Pageable pageable, String searchKeyword3, String reportWriter);
	Page<Report> findByReportAnswerIsNull(Pageable pageable);
	Page<Report> findByReportAnswerIsNotNullAndReportWriter(Pageable pageable, String reportWriter);
}
  