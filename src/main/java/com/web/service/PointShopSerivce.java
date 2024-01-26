package com.web.service;



import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Member;
import com.web.domain.PointShop;

public interface PointShopSerivce {
	
	void insertProduct(MultipartHttpServletRequest mul);
	
	public void getProductList(Model model, PointShop pointShop, Pageable pageable,  String searchKeyword);
	
	int getProduct(Long productNumber, Model model);
	
	void updateProduct(MultipartHttpServletRequest mul);
	
	void deleteProduct(Long productNumber);
	
	void getProductinfo(Long productNumber, Member member, Model model);
	
	void purchaseProduct(Long productNumber, Member member, String ckeckEmail, int quantity);

	void getHistoryList(Model model, Pageable pageable,  String searchKeyword, Member member);
	
	void getProductHistory(Model model, Principal principal, ModelMap modelMap, Long historyNumber);
	
}
