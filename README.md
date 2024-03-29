# [프로젝트명] E1I4S 
> 커뮤니티 활성화를 주목적으로 한 게임 홈페이지 제작 <br/>
> 개발 기간 : 2023.11 ~ 2023.12 <br/>
> 개발 인원 : 5명

---

## 자체 평가
팀 프로젝트를 하면서 협업의 중요성을 깨달았습니다. 막힌 부분들을 함께 해결해가면서 새로운 접근 방식을 배울 수 있었습니다. 개인적으로 아쉬운 점은 속도가 느려서 더 구현하고 싶은 것들을 구현하지 못한 것입니다. 추후에  더 공부하여 스케줄 API등 여러 API를  활용해보고 싶습니다. 든든한 팀원들을 만나서 좋았고 다음에는 제가 더 보탬이 되는 팀원으로 함께하고 싶습니다.

---

## 나의 역할
- 프론트: 공지사항, 이벤트, 가이드, 캐릭터소개, 랭킹 페이지 
- 백엔드: 공지사항 CRUD, 이벤트 CRUD, 가이드 CRUD, 캐릭터소개 CRUD, 누적 포인트 순으로 상위 3명 추출하고 랭킹 띄우기  
- 그 외: AWS DB서버 구축 
  
---

## 기술 스택
### 프론트엔드
  <img src="https://img.shields.io/badge/thymeleaf-005F0F?style=for-the-badge&logo=thymeleaf&logoColor=white">  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white">

### 백엔드  
- Java 11
- SpringBoot
- Spring Data JPA
- Spring Security
- Oracle DB
- AWS(LightSail)
- OpenAPI(Google, Kakao, Daum, CoolSMS, Email)

---

## 컨셉 
- ⭐홈페이지 내 유저들에게 이벤트 및 공지사항 등 정보 제공
- 룰렛 랜덤 게임을 할 수 있는 홈페이지를 구현
- 유저들간 소통을 할 수 있는 커뮤니티 제공
- 포인트 상점 기능을 구현하여 게임활동 및 커뮤니티 활성화
- 홈페이지 이용 및 불만사항 개선을 위한 고객센터 구현

---


## 🚩주요기능
### ⭐1. 공지사항/이벤트/가이드/캐릭터소개 <br/>
 >내가 맡은 부분
- 각각 페이지의 CRUD 구현
- 검색기능 구현
- 페이징 처리

### ⭐2. 유저 랭킹 <br/>
>내가 맡은 부분
- 누적 포인트 순으로 랭킹을 뽑아냄
- 상위 3명은 페이지 상단에 고정으로 보여줌

### 3. 메인페이지 <br/>
- 메인 페이지에서 이벤트 및 공지사항 등 정보 제공
- 게임start버튼 클릭 시, 랜덤 룰렛으로 포인트 획득 가능

### 4. 로그인 <br/>
- Security 활용
- Kakao API, Google API 를 이용하여 소셜 로그인 구현 

   
### 5. 회원가입 <br/>
- Daum API 를 이용하여 주소 조회


### 6. 마이페이지 <br/>
- 개인정보 변경, 비밀번호 변경, 회원 탈퇴
- 본인확인용 비밀번호 입력 페이지
- 아이디/비밀번호 찾기 : 입력값이 모두 일치하면 ID 를 해당 이메일로 전송



### 7. 커뮤니티 <br/>
- 자유 게시판, 거래 게시판, 팁&노하우 3가지의 카테고리로 구분하여 CRUD 구현 
- 게시글 작성시 100 포인트 획득
- 조회수 및 추천수 구현
- 댓글 구현


### 8. 포인트 상점 <br/>
- 룰렛 게임 및 게시글 작성 등으로 얻은 포인트로 상품 구매     
- 구매한 상품 정보 이메일 전송


### 9. 고객지원 <br/>
- 문의 및 신고 내역 CRUD 구현
- 답변 완료되면 문자전송
 

### 10. 관리자 고객지원 페이지 <br/>
- 1:1문의, 상품 문의, 신고 내역 3개의 페이지를 한 페이지에서 보여줌  

---

## 역할 분담
|Role|Work|
|---|---|
|팀장|총괄, 고객지원, 관리자 페이지|
|나⭐|AWS 서버구축, 공지사항, 이벤트, 가이드, 캐릭터소개, 랭킹 페이지|
|팀원|회원가입, 로그인(security), 마이페이지|
|팀원|데이터 준비, 커뮤니티 페이지|
|팀원|발표, 포인트 상점 페이지|

