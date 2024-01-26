/* notice.js */

function noticeInsert(){
   if(document.noticeInsertForm.noticeTitle.value == ""){
      alert("제목을 입력하세요~");
      document.noticeInsertForm.noticeTitle.focus();
   }
   else if(document.noticeInsertForm.noticeContents.value == ""){
      alert("내용을 입력하세요~");
      document.noticeInsertForm.noticeContents.focus();
   }
   else {
      document.noticeInsertForm.submit();
   }
}

function noticeUpdate(){
   if(document.noticeUpdateForm.noticeTitle.value == ""){
      alert("제목을 입력하세요~");
      document.guideUpdateForm.noticeTitle.focus();
   }
   else if(document.noticeUpdateForm.noticeContents.value == ""){
      alert("내용을 입력하세요~");
      document.noticeUpdateForm.noticeContents.focus();
   }
   else {
      document.noticeUpdateForm.submit();
   }
}