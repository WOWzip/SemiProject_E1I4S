package com.web.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Inquery;
import com.web.domain.Member;
import com.web.domain.Report;
import com.web.persistence.InqueryRepository;
import com.web.persistence.MemberRepository;
import com.web.persistence.ReportRepository;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

@Service
public class SupportServiceImpl implements SupportService, FolderPathREPO {
	
	@Autowired
	private InqueryRepository inqueryRepo;
	@Autowired
	private ReportRepository reportRepo;
	@Autowired
	private MemberRepository memberRepository;
	
	// 문의 내용 작성시 정보를 받아 레코드 생성
	@Override
	public void insertInquery(MultipartHttpServletRequest mul) {
		Inquery inquery = new Inquery();
		inquery.setInqueryWriter(mul.getParameter("inqueryWriter"));
		inquery.setInqueryTitle(mul.getParameter("inqueryTitle"));
		inquery.setInqueryContent(mul.getParameter("inqueryContent"));
		inquery.setInquerySelect(mul.getParameter("inquerySelect"));
		// 첨부파일이 첨부되면 파일 이름앞에 년월일시분초-를 추가하여 저장
		MultipartFile file = mul.getFile("file");
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(INQUERY_IMAGE_REPO + "/" + sysFileName); 
			inquery.setFile(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			// 첨부파일이 없을 때 DB에 nan으로 저장
			inquery.setFile("nan");
		}
		inqueryRepo.save(inquery);
	}
	
	// 문의내역 html 을 열 때 자신이 작성한 문의 내역을 불러옴
	@Override
	public void getInqueryList(Model model, Inquery inquery, Pageable pageable, Member member) {
		// TODO Auto-generated method stub
		// 멤버정보를 받아서 문의 작성자와 동일한 문의를 페이징하여 보여줌
		String userId = member.getId();
		// id값으로 조회하여 페이징
		Page<Inquery> inqueryList = inqueryRepo.findByInqueryWriter(pageable, userId);
		// 현재 페이지 : Page 객체를 사용하여 현재 인덱스 추출 >> 1로 표시하기 위해 +1
		int nowPage = inqueryList.getPageable().getPageNumber()+1;
		// 시작 페이지 : 현재 페이지의 -2 개
		int startPage = Math.max(nowPage - 2, 1);
		// 시작 페이지 : 현재 페이지의 +2 개
		int endPage = Math.min(nowPage + 2, inqueryList.getTotalPages());
		
		model.addAttribute("inqueryList", inqueryList);
		model.addAttribute("nowPage",nowPage);
		model.addAttribute("startPage",startPage);
		model.addAttribute("endPage",endPage);
	}
	//-----------------------------------------------------------------
	@Override
	public void insertReport(MultipartHttpServletRequest mul) {
		Report report = new Report();
		report.setReportWriter(mul.getParameter("reportWriter"));
		report.setReportTitle(mul.getParameter("reportTitle"));
		report.setReportContent(mul.getParameter("reportContent"));
		report.setReportSelect(mul.getParameter("reportSelect"));
		MultipartFile file = mul.getFile("file");
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(REPORT_IMAGE_REPO + "/" + sysFileName); 
			report.setFile(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			report.setFile("nan");
		}
		reportRepo.save(report);
	}
	
	@Override
	public void getReportList(Model model, Report report, Pageable pageable, Member member) {
		// TODO Auto-generated method stub
		String userId = member.getId();
		Page<Report> reportList = reportRepo.findByReportWriter(pageable, userId); 
		int nowPage = reportList.getPageable().getPageNumber()+1;
		int startPage = Math.max(nowPage - 2, 1);
		int endPage = Math.min(nowPage + 2, reportList.getTotalPages());
		
		model.addAttribute("reportList", reportList);
		model.addAttribute("nowPage",nowPage);
		model.addAttribute("startPage",startPage);
		model.addAttribute("endPage",endPage);
	}
	//-------------------------------------------------------------------------------------------------------------------------------------
	// 관리자페이지에서 문의 종류에 따라 페이징
	// 3개의 리스트를 html 에 추가
	@Override
	public void find3List(Inquery inquery, Report report, Pageable pageable1, Pageable pageable2, Pageable pageable3,
						  String searchKeyword1, String searchKeyword2, String searchKeyword3, Model model) {
		// TODO Auto-generated method stub
		// 1:1 문의
		Page<Inquery> inqueryList1;
		// 첫 번째 검색창에서 키워드
		if(searchKeyword1!=null) {
			// 키워드가 들어왔을 때 1:1문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			inqueryList1 = inqueryRepo.findByInquerySelectAndInqueryTitleContainingAndInqueryAnswerIsNull(pageable1, "1", searchKeyword1);
		}else {
			// 키워드가 들어오지 않았을 때 1:1문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			inqueryList1 = inqueryRepo.findByInquerySelectAndInqueryAnswerIsNull(pageable1, "1");
		}
		int nowPage1 = inqueryList1.getPageable().getPageNumber()+1;
		int startPage1 = Math.max(nowPage1 - 2, 1);
		int endPage1 = Math.min(nowPage1 + 2, inqueryList1.getTotalPages());
		
		model.addAttribute("inqueryList1", inqueryList1);
		model.addAttribute("nowPage1",nowPage1);
		model.addAttribute("startPage1",startPage1);
		model.addAttribute("endPage1",endPage1);
		
		// 상품관련 문의
		// 두 번째 검색창에서 키워드
		Page<Inquery> inqueryList2;
		if(searchKeyword2!=null) {
			// 키워드가 들어왔을 때 상품관련 문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			inqueryList2 = inqueryRepo.findByInquerySelectAndInqueryTitleContainingAndInqueryAnswerIsNull(pageable2, "2", searchKeyword2);
		}else {
			// 키워드가 들어오지 않았을 때 상품관련 문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			inqueryList2 = inqueryRepo.findByInquerySelectAndInqueryAnswerIsNull(pageable2, "2");
		}
		int nowPage2 = inqueryList2.getPageable().getPageNumber()+1;
		int startPage2 = Math.max(nowPage2 - 2, 1);
		int endPage2 = Math.min(nowPage2 + 2, inqueryList2.getTotalPages());
		
		model.addAttribute("inqueryList2", inqueryList2);
		model.addAttribute("nowPage2",nowPage2);
		model.addAttribute("startPage2",startPage2);
		model.addAttribute("endPage2",endPage2);
		
		// 신고 문의
		// 세 번째 검색창에서 키워드
		Page<Report> reportList;
		if(searchKeyword3!=null) {
			// 키워드가 들어왔을 때 신고 문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			reportList = reportRepo.findByReportTitleContainingAndReportAnswerIsNull(pageable3, searchKeyword3);
		}else {
			// 키워드가 들어오지 않았을 때 신고 문의 중 키워드를 포함하고 답변이 아직 없는 상태의 리스트
			reportList = reportRepo.findByReportAnswerIsNull(pageable3);
		}
		int nowPage3 = reportList.getPageable().getPageNumber()+1;
		int startPage3 = Math.max(nowPage3 - 2, 1);
		int endPage3 = Math.min(nowPage3 + 2, reportList.getTotalPages());
		
		model.addAttribute("reportList", reportList);
		model.addAttribute("nowPage3",nowPage3);
		model.addAttribute("startPage3",startPage3);
		model.addAttribute("endPage3",endPage3);
	}
	//-------------------------------------------------------------------------------------------------------------------------------------
	
	// 고객센터 완료목록
	// 2개의 리스트를 html 에 추가
	@Override
	public void find2List(Inquery inquery, Report report, Pageable pageable1, Pageable pageable3,
						  String searchKeyword1, String searchKeyword3, Model model, Member member) {
		// TODO Auto-generated method stub
		Page<Inquery> inqueryList1;
		if(searchKeyword1!=null) {
			inqueryList1 = inqueryRepo.findByInqueryTitleContainingAndInqueryAnswerIsNotNullAndInqueryWriter(pageable1, searchKeyword1, member.getId());
		}else {
			inqueryList1 = inqueryRepo.findByInqueryAnswerIsNotNullAndInqueryWriter(pageable1, member.getId());
		}
		int nowPage1 = inqueryList1.getPageable().getPageNumber()+1;
		int startPage1 = Math.max(nowPage1 - 4, 1);
		int endPage1 = Math.min(nowPage1 + 5, inqueryList1.getTotalPages());
		
		model.addAttribute("inqueryList", inqueryList1);
		model.addAttribute("nowPage1",nowPage1);
		model.addAttribute("startPage1",startPage1);
		model.addAttribute("endPage1",endPage1);
		
		Page<Report> reportList;
		if(searchKeyword3!=null) {
			reportList = reportRepo.findByReportTitleContainingAndReportAnswerIsNotNullAndReportWriter(pageable3, searchKeyword3, member.getId());
		}else {
			reportList = reportRepo.findByReportAnswerIsNotNullAndReportWriter(pageable3, member.getId());
		}
		int nowPage3 = reportList.getPageable().getPageNumber()+1;
		int startPage3 = Math.max(nowPage3 - 4, 1);
		int endPage3 = Math.min(nowPage3 + 5, reportList.getTotalPages());
		
		model.addAttribute("reportList", reportList);
		model.addAttribute("nowPage3",nowPage3);
		model.addAttribute("startPage3",startPage3);
		model.addAttribute("endPage3",endPage3);
	}
	//-------------------------------------------------------------------------------------------------------------------------------------
	
	// 문의 뷰 페이지에서 문의 번호(SEQ) 값으로 정보 띄우기
	@Override
	public void getInqueryById(Long inquerySeq, Model model) {
		// TODO Auto-generated method stub
		Optional<Inquery> optional = inqueryRepo.findById(inquerySeq);
		Inquery inquery = optional.get();
		model.addAttribute("inquery", inquery);
	}
	
	
	@Override
	public void getReportById(Long reportSeq, Model model) {
		// TODO Auto-generated method stub
		Optional<Report> optional = reportRepo.findById(reportSeq);
		Report report = optional.get();
		model.addAttribute("report", report);
	}
	//---------------------------------------------------------------------------------------
	// 관리자 페이지에서 확인 클릭 시 자동 답변
	// sms 전송
	@Override
	public void answerInq(Long inquerySeq) {
		// TODO Auto-generated method stub
		Optional<Inquery> optional = inqueryRepo.findById(inquerySeq);
		Inquery inquery = optional.get();
		inquery.setInqueryAnswer(inquery.getInqueryWriter()+" 안녕하세요,"
				+ "\r\n"
				+ "고객님의 문의에 감사드립니다. 저희에게 연락 주셔서 기쁩니다.\r\n"
				+ "\r\n"
				+ "문의하신 내용에 대한 자세한 도움을 드리기 위해 추가 정보를 제공해주시면 더 신속하고 정확한 답변을 드릴 수 있을 것입니다. "
				+ "\r\n"
				+ "어떤 도움이 필요하신지 자세히 알려주시면 감사하겠습니다.\r\n"
				+ "\r\n"
				+ "또한, 고객님의 소중한 의견을 항상 환영합니다. 언제든지 저희에게 연락 주시기 바랍니다.\r\n"
				+ "\r\n"
				+ "감사합니다.");
		inqueryRepo.save(inquery);
		Member member = memberRepository.findById(inquery.getInqueryWriter()).get();
		String num = member.getPhoneNumber();
		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(API_KEY, SECRET_KEY, "https://api.coolsms.co.kr");
		Message message = new Message();
		message.setFrom("");
		message.setTo(num);
		message.setText(member.getId() + " 님이 접수하신 문의 내용에 대한 답변이 처리 되었습니다.");

		try {
			// send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
			messageService.send(message);
		} catch (NurigoMessageNotReceivedException exception) {
			// 발송에 실패한 메시지 목록을 확인할 수 있습니다!
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}
	}

	@Override
	public void answerRep(Long reportSeq) {
		// TODO Auto-generated method stub
		Optional<Report> optional = reportRepo.findById(reportSeq);
		Report report = optional.get();
		report.setReportAnswer(report.getReportWriter()+" 안녕하세요,"
				+ "\n"
				+ "고객님의 문의에 감사드립니다. 저희에게 연락 주셔서 기쁩니다.\n"
				+ "\n"
				+ "문의하신 내용에 대한 자세한 도움을 드리기 위해 추가 정보를 제공해주시면 더 신속하고 정확한 답변을 드릴 수 있을 것입니다. "
				+ "\n"
				+ "어떤 도움이 필요하신지 자세히 알려주시면 감사하겠습니다.\n"
				+ "\n"
				+ "또한, 고객님의 소중한 의견을 항상 환영합니다. 언제든지 저희에게 연락 주시기 바랍니다.\n"
				+ "\n"
				+ "감사합니다.");
		reportRepo.save(report);
		Member member = memberRepository.findById(report.getReportWriter()).get();
		String num = member.getPhoneNumber();
		DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(API_KEY, SECRET_KEY, "https://api.coolsms.co.kr");
		Message message = new Message();
		message.setFrom("");
		message.setTo(num);
		message.setText(member.getId() + " 님이 접수하신 문의 내용에 대한 답변이 처리 되었습니다.");

		try {
			// send 메소드로 ArrayList<Message> 객체를 넣어도 동작합니다!
			messageService.send(message);
		} catch (NurigoMessageNotReceivedException exception) {
			// 발송에 실패한 메시지 목록을 확인할 수 있습니다!
			System.out.println(exception.getFailedMessageList());
			System.out.println(exception.getMessage());
		} catch (Exception exception) {
			System.out.println(exception.getMessage());
		}
	}
	//---------------------------------------------------------------------------------------
	// 관리자 페이지에서 확인 클릭 시 수동 답변
	@Override
	public void answerInq2(Long inquerySeq, String inqueryAnswer) {
		// TODO Auto-generated method stub
		Optional<Inquery> optional = inqueryRepo.findById(inquerySeq);
		Inquery inquery = optional.get();
		inquery.setInqueryAnswer(inqueryAnswer);
		inqueryRepo.save(inquery);
	}

	@Override
	public void answerRep2(Long reportSeq, String reportAnswer) {
		// TODO Auto-generated method stub
		Optional<Report> optional = reportRepo.findById(reportSeq);
		Report report = optional.get();
		report.setReportAnswer(reportAnswer);
		reportRepo.save(report);
	}
	
	
}
 




















