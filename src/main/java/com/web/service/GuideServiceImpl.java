package com.web.service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.web.domain.Event;
import com.web.domain.Guide;
import com.web.domain.Inquery;
import com.web.persistence.GuideRepository;

@Service
public class GuideServiceImpl implements GuideService, FolderPathREPO{

	@Autowired
	private GuideRepository guideRepo;
	
	// 가이드 목록
	@Override
	public void getGuideList(Model model, Guide guide){
		List<Guide> guideList = (List<Guide>)guideRepo.findAll(); 
		model.addAttribute("guideList", guideList);
	}
	
	// 가이드 등록
	@Override
	public void insertGuide(MultipartHttpServletRequest mul) {
		Guide guide = new Guide();
		guide.setGuideWriter(mul.getParameter("guideWriter"));
		guide.setGuideTitle(mul.getParameter("guideTitle"));
		guide.setGuideContents(mul.getParameter("guideContents"));
		
		MultipartFile file = mul.getFile("file");
		
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(GUIDE_IMAGE_REPO + "/" + sysFileName); 
			guide.setGuideImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		} else {
			guide.setGuideImageName("nan");
		}
		guideRepo.save(guide); 
	}
	
	// 가이드 보기
	@Override
	public int getGuide(Model model, Long guideNum) {
		// 삭제된 값 찾는경우 에러 방지.
		Optional<Guide> optional = guideRepo.findById(guideNum);
		
		if(optional.isPresent()) {
			// 찾음 >> 뷰페이지 띄움
			Guide guide = optional.get();
			model.addAttribute("guide", guide);
			return 1; 
		} else {
			// 못찾음 >> 뷰페이지 띄우지 않고 리스트로 돌아감(event.html)
			return 0; 
		}
	}
	
	// 가이드 수정
	@Override
	public void updateGuide(MultipartHttpServletRequest mul) {
		long guideNum = Long.parseLong(mul.getParameter("guideNum"));
		Guide findGuide = guideRepo.findById(guideNum).get(); // 수정하기 전의 본래의 내용 가져옴
		findGuide.setGuideTitle(mul.getParameter("guideTitle")); // 수정한 제목을 가져와서 세팅함.
		findGuide.setGuideContents(mul.getParameter("guideContents")); // 수정한 내용을 가져와서 세팅함.
		
		MultipartFile file = mul.getFile("file");
		
		if(file.getSize() !=0) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss-");
			Calendar calendar = Calendar.getInstance();
			String sysFileName = sdf.format(calendar.getTime());
			sysFileName += file.getOriginalFilename();
			File saveFile = new File(GUIDE_IMAGE_REPO + "/" + sysFileName); 
			findGuide.setGuideImageName(sysFileName);
			try {
				file.transferTo(saveFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			findGuide.setGuideImageName("nan");
		}
		guideRepo.save(findGuide); // DB에 반영시킴.
	}
	
	// 가이드 삭제
	@Override
	public void deleteGuide(Guide guide) {
		guideRepo.deleteById(guide.getGuideNum()); 
	}

}
