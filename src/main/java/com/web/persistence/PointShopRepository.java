package com.web.persistence;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.web.domain.PointShop;
public interface PointShopRepository extends JpaRepository<PointShop, Long> {
	Page<PointShop> findByproductNameContaining(String searchKeyword, Pageable pageable);
	PointShop findByProductName(String productName);
}