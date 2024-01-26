package com.web.controller;



import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.web.domain.Member;
import com.web.domain.PointShop;
import com.web.service.MemberService;
import com.web.service.PointShopSerivce;

@RequestMapping("pointshop")
@Controller
public class PointShopController {
	
	@Autowired
	private PointShopSerivce pointShopService;
	
	@Autowired
	private MemberService ms;
	
	// 상품리스트보기
	@GetMapping("/pointshop")
	public String pointShop(Model model, PointShop pointShop,
	         @PageableDefault(page = 0, size = 3,sort = "productNumber",direction = Sort.Direction.DESC) Pageable pageable,
	         String searchKeyword, Principal principal, ModelMap modelMap){
		pointShopService.getProductList(model, pointShop, pageable, searchKeyword);
		if(principal != null) {
			Member member = ms.memberInfo(principal);
			modelMap.addAttribute("member", member);
			return "/pointshop/pointshop";
		}else {
			Member member = new Member();
			modelMap.addAttribute("member", member);
			return "/pointshop/pointshop";
			
		}

	}
	
	// 상품상세보기
		@GetMapping("/product")
		public String product(Long productNumber, Model model, Principal principal, ModelMap modelMap) {
			pointShopService.getProduct(productNumber, model);
			if(principal != null) {
				Member member = ms.memberInfo(principal);
				modelMap.addAttribute("member", member);
				return "/pointshop/product";
			}else {
				Member member = new Member();
				modelMap.addAttribute("member", member);
				return "/pointshop/product";
			}
		}
		
	
	//상품수정폼하기
	@GetMapping("/productModify")
	public String productModify(Long productNumber, Model model, Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		int a = pointShopService.getProduct(productNumber, model);
		if(a==1) {
			return "/pointshop/productModify";
		} else {
			return "redirect:pointshop";
		}
	}

	
	// 상품수정하기
	@PostMapping("/update")
	public String productModify(MultipartHttpServletRequest mul) {
		pointShopService.updateProduct(mul);
		return "redirect:pointshop";
	}
	
	
	// 상품등록폼가기
	@GetMapping("/productInsert")
	public String productInsertForm(Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		return "/pointshop/productInsert";
		
	}
	
	// 상품등록하기
	@PostMapping("/insert")
	public String productInsert(MultipartHttpServletRequest mul) {
		pointShopService.insertProduct(mul);
		return "redirect:pointshop";
	}
	
	// 상품삭제하기
	@GetMapping("/productDelete")
	public String productDelete(Long productNumber) {
		pointShopService.deleteProduct(productNumber);
		return "redirect:pointshop";
	}
	
	// 상품구매폼가기
	@GetMapping("/popup")
	public String productPurchaseForm(Long productNumber, Model model, Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		pointShopService.getProductinfo(productNumber, member, model);
		return "/pointshop/popup";
	}
	
	// 상품구매하기
	@PostMapping("/productPurchase")
	public String productPurchase(Long productNumber, RedirectAttributes ra, String ckeckEmail, Principal principal, ModelMap modelMap,
									@RequestParam("quantity") int quantity) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		pointShopService.purchaseProduct(productNumber, member, ckeckEmail, quantity);
		ra.addAttribute("productNumber", productNumber); 
		return "redirect:popup";
	}
	
	
	// 구매내역보기
	@GetMapping("/purchaseHistory")
	public String history(Model model,
			@PageableDefault(page = 0, size = 10, sort = "historyNumber", direction = Sort.Direction.DESC) Pageable pageable,
			String searchKeyword, Principal principal, ModelMap modelMap) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		pointShopService.getHistoryList(model, pageable, searchKeyword, member);
		return "/pointshop/purchaseHistory";

	}
	
	//구매내역 상세보기
	@GetMapping("/productHistory")
	public String productHistory(Model model, Principal principal, ModelMap modelMap, Long historyNumber) {
		Member member = ms.memberInfo(principal);
		modelMap.addAttribute("member", member);
		
		pointShopService.getProductHistory(model, principal, modelMap, historyNumber);
		return "/pointshop/productHistory";
	}
}
  