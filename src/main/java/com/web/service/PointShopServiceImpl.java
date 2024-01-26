package com.web.service;

import java.io.File;
import java.security.Principal;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Point;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.History;
import com.web.domain.Member;
import com.web.domain.PointShop;
import com.web.persistence.HistoryRepository;
import com.web.persistence.MemberRepository;
import com.web.persistence.PointShopRepository;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.mail.javamail.JavaMailSender;


@Service
public class PointShopServiceImpl implements PointShopSerivce, FolderPathREPO {

	@Autowired
	private PointShopRepository pointShopRepo; // mapper
	
	@Autowired
	private MemberRepository memberRepo;
	
	@Autowired
	private HistoryRepository historyRepo;
	
	@Autowired
	private JavaMailSender javaMailSender;

	@Override
	public void insertProduct(MultipartHttpServletRequest mul) {
		PointShop pointShop = new PointShop();
		pointShop.setProductName(mul.getParameter("productName"));
		pointShop.setProductContents(mul.getParameter("productContents"));
		pointShop.setProductPoint(Integer.parseInt(mul.getParameter("productPoint")));
		pointShop.setProductInventory(Integer.parseInt(mul.getParameter("productInventory")));

		MultipartFile file = mul.getFile("productImage");

		if (file.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-"); // 지금 시간저장
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename(); // 시간 + 내가 올린 파일이름
			File saveFile = new File(PRODUCT_IMAGE + "/" + sysFileName);
			pointShop.setProductImage(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			pointShop.setProductImage("nan");
		}

		pointShopRepo.save(pointShop);
	}

	@Override
	public void getProductList(Model model, PointShop pointShop, Pageable pageable, String searchKeyword) {
		Page<PointShop> productList;
		if(searchKeyword == null) {
			productList = pointShopRepo.findAll(pageable);
		} else {
			productList = pointShopRepo.findByproductNameContaining(searchKeyword, pageable);
		}
		
		int nowPage = 0;
		nowPage = productList.getPageable().getPageNumber() + 1;
		int startPage = Math.max(nowPage - 4, 1);
		int endPage = Math.min(nowPage + 5, productList.getTotalPages());

		model.addAttribute("productList", productList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
	}

	@Override
	public int getProduct(Long productNumber, Model model) {
		// TODO Auto-generated method stub
		Optional<PointShop> optional = pointShopRepo.findById(productNumber);
		if(optional.isPresent()) {
			PointShop pointShop = optional.get();
			model.addAttribute("product", pointShop);
			return 1; //상품 있음
		}else {
			return 0; //상품 없음
		}
	}

	@Override
	public void updateProduct(MultipartHttpServletRequest mul) {
		// TODO Auto-generated method stub
		Long productNumber = Long.parseLong(mul.getParameter("productNumber"));
		PointShop pointShop = pointShopRepo.findById(productNumber).get();
		pointShop.setProductName(mul.getParameter("productName"));
		pointShop.setProductContents(mul.getParameter("productContents"));
		pointShop.setProductPoint(Integer.parseInt(mul.getParameter("productPoint")));
		pointShop.setProductInventory(Integer.parseInt(mul.getParameter("productInventory")));

		MultipartFile file = mul.getFile("productImage");

		if (file.getSize() != 0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-"); // 지금 시간저장
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename(); // 시간 + 내가 올린 파일이름
			File saveFile = new File(PRODUCT_IMAGE + "/" + sysFileName);
			pointShop.setProductImage(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			pointShop.setProductImage("nan");
		}

		pointShopRepo.save(pointShop);
	}

	@Override
	public void deleteProduct(Long productNumber) {
		// TODO Auto-generated method stub
		pointShopRepo.deleteById(productNumber);

	}
	
	@Override
	public void getProductinfo(Long productNumber, Member member, Model model) {
		// TODO Auto-generated method stub
		Optional<PointShop> optional = pointShopRepo.findById(productNumber);
		PointShop pointShop;
		if(optional != null) {
			pointShop = optional.get();
		}else {
			pointShop = null;
			System.out.println("다시");
		}
		model.addAttribute("product", pointShop);
	}

	@Override
	public void purchaseProduct(Long productNumber, Member member, String ckeckEmail, int quantity) {
		// TODO Auto-generated method stub
		Optional<PointShop> optional = pointShopRepo.findById(productNumber);
		PointShop pointShop;
		if(optional != null) {
			pointShop = optional.get();
		}else {
			pointShop = null;
			System.out.println("다시");
		}
		int resPoint = pointShop.getProductPoint()*quantity;
		member.setPoint(member.getPoint() - resPoint);
		pointShop.setProductInventory(pointShop.getProductInventory()-quantity);
		pointShopRepo.save(pointShop);
		memberRepo.save(member);
		
		History history = new History();
		history.setUserId(member.getId());
		history.setUserNickName(member.getNickName());
		history.setProductName(pointShop.getProductName());
		history.setProductQuantity(quantity);
		history.setProductPoint(pointShop.getProductPoint());
		historyRepo.save(history);
		// sms 
		String num = member.getPhoneNumber();
		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(API_KEY, SECRET_KEY, "https://api.coolsms.co.kr");
		Message messageSms = new Message();
		messageSms.setFrom("01071007885");
		messageSms.setTo(num);
		messageSms.setText(member.getId() + " 님 구매한 상품의 정보는 구매내역에서 확인하세요.");

		try {
			// send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
			messageService.send(messageSms);
		} catch (NurigoMessageNotReceivedException exception) {
			// 발송에 실패한 메시지 목록을 확인할 수 있습니다!
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}
		
		
		//email
		int check = Integer.parseInt(ckeckEmail);
		String memberMail = member.getEmail() + "@" +  member.getDomain();
		
		SimpleMailMessage message = new SimpleMailMessage();
		if (check == 1) {
			
			try {
	            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
	            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

	            helper.setSubject("E1I4S 상품구매 내역");
	            helper.setTo(memberMail);

	            StringBuilder emailContent = new StringBuilder();
	            emailContent.append("E1I4S 에서 상품을 구매해주셔서 진심으로 감사드립니다\n");
	            emailContent.append("구매한 상품 : ").append(pointShop.getProductName()).append("\n");
	            emailContent.append("구매하신 상품 가격 : ").append(pointShop.getProductPoint()).append(" point\n");
	            emailContent.append("구매한 상품 수량 : ").append(quantity).append(" 개\n");

	            MimeMultipart multipart = new MimeMultipart();

	            // 텍스트 내용 추가
	            MimeBodyPart textBodyPart = new MimeBodyPart();
	            textBodyPart.setText(emailContent.toString());
	            multipart.addBodyPart(textBodyPart);
	            
	            
	            
	            // 이미지 첨부
	            String imageFolderPath = "D:\\\\_SemiProject\\\\WorkSpace\\\\E1I4S_v9\\\\src\\\\main\\\\resources\\\\static\\\\productImage";
	            String imageName = pointShop.getProductImage();
	            
	            String additionFilePath = "D:\\_SemiProject\\WorkSpace\\E1I4S_v9\\src\\main\\resources\\static\\img\\pointshop";
	            String additionFileName = "barcode.png";
	            
	            File imageFile = new File(imageFolderPath, imageName); // 이미지 파일 경로
	            File additionalImageFile = new File(additionFilePath, additionFileName);
	            
	            if (imageFile.exists()) {
	                DataSource dataSource = new FileDataSource(imageFile);
	                MimeBodyPart imageBodyPart = new MimeBodyPart();
	                imageBodyPart.setDataHandler(new DataHandler(dataSource));
	                imageBodyPart.setFileName(imageName); // 이미지 파일명 설정
	                multipart.addBodyPart(imageBodyPart);
	            }
	            if (additionalImageFile.exists()) {
	            	DataSource additionaldateSource = new FileDataSource(additionalImageFile);
	            	MimeBodyPart additionalImageBodyPart = new MimeBodyPart();
	            	additionalImageBodyPart.setDataHandler(new DataHandler(additionaldateSource));
	            	additionalImageBodyPart.setFileName(additionFileName);	
	            	multipart.addBodyPart(additionalImageBodyPart);
	            }

	            mimeMessage.setContent(multipart);

	            javaMailSender.send(mimeMessage);
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
	    }
	}
	
	@Override
	public void getHistoryList(Model model, Pageable pageable, String searchKeyword,
			Member member) {
		// TODO Auto-generated method stub
		String id = member.getId();
		Page<History> historyList;
		
		
		if(searchKeyword == null) {
			historyList = historyRepo.findByUserId(pageable, id);
		} else {
			historyList = historyRepo.findByUserIdAndProductNameContaining(id, searchKeyword, pageable);
		}
		int nowPage = 0;
		nowPage = historyList.getPageable().getPageNumber() + 1;
		int startPage = Math.max(nowPage - 4, 1);
		int endPage = Math.min(nowPage + 5, historyList.getTotalPages());

		model.addAttribute("historyList", historyList);
		model.addAttribute("nowPage", nowPage);
		model.addAttribute("startPage", startPage);
		model.addAttribute("endPage", endPage);
		
	}

	@Override
	public void getProductHistory(Model model, Principal principal, ModelMap modelMap, Long historyNumber) {
		
		History history = new History();
		history = historyRepo.findById(historyNumber).get();
		PointShop pointShop = pointShopRepo.findByProductName(history.getProductName());
		
		model.addAttribute("pointShop",pointShop);
		model.addAttribute("history",history);
	}
	
	
}
