/* event.js */

function eventInsert(){
	const nowDate = new Date();
	//document.writeln(nowDate);
   if(document.eventInsertForm.eventTitle.value == ""){
      alert("제목을 입력하세요~");
      document.eventInsertForm.eventTitle.focus();
   }
   else if(document.eventInsertForm.eventStartDate.value == ""){
      alert("시작날짜를 입력하세요~");
      document.eventInsertForm.eventStartDate.focus();
   }
   else if(document.eventInsertForm.eventEndDate.value == ""){
      alert("종료날짜를 입력하세요~");
      document.eventInsertForm.eventEndDate.focus();
   }
   else if(document.eventInsertForm.eventContents.value == ""){
      alert("내용을 입력하세요~");
      document.eventInsertForm.eventContents.focus();
   }
   else {
      document.eventInsertForm.submit();
   }
}

function eventUpdate(){
	const nowDate = new Date();
	//document.writeln(nowDate);
   if(document.eventUpdateForm.eventTitle.value == ""){
      alert("제목을 입력하세요~");
      document.eventUpdateForm.eventTitle.focus();
   }
   else if(document.eventUpdateForm.eventStartDate.value == ""){
      alert("시작날짜를 입력하세요~");
      document.eventUpdateForm.eventStartDate.focus();
   } 
   else if(document.eventUpdateForm.eventEndDate.value == ""){
      alert("종료날짜를 입력하세요~");
      document.eventUpdateForm.eventEndDate.focus();
   }
   else if(document.eventUpdateForm.eventContents.value == ""){
      alert("내용을 입력하세요~");
      document.eventUpdateForm.eventContents.focus();
   }
   else {
      document.eventUpdateForm.submit();
   }
}