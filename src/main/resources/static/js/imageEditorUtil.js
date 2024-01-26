function submitForm()
{
    var isFileSelected = false;
    for (var i = 0; i < $('input[type=file]').length; i++)
    {
        if ($('#File' + (i + 1)).val() != '')
            isFileSelected = true;

    }
    if (!isFileSelected)
    {
        alert('파일을 입력해 주세요.');
        return false;
    }

	
    var fd = new FormData(document.getElementById("m_form"));

    $.ajax({
        url: "/Community/Common/Popup/ImageUploader/Upload/MapleStory",
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
		success: function(data) {
			if (data.Code == 0) {
				uploadImgFilesComplete(data.Files);
			}
			else {
				alert(data.Message);
			}
		},
		error: function(a, b, c) {
			alert('이미지 삽입 중 오류가 발생하였습니다\n잠시 후 다시 시도하세요.');
		}
    })

    return true;
}


function onSubmitFiles()
{
    $('input[type=file]').attr('name', 'files');
    return true;
}

function uploadImgFilesComplete(strJson)
{
    editorProc01.unlockEditorSec();
    editorProc01.setSelection();

    var objFiles = strJson;
    var n4ImageCount = editorProc01.returnResultImageCount();
    var n4MovieCount = editorProc01.returnResultVodCount();

    if ((n4ImageCount + n4MovieCount + objFiles.length) > 30)
    {
        alert('파일은 최대 30개까지 올릴 수 있습니다.');
        return false;
    }

    var innerImage = '';
    for (var i = 0; i < objFiles.length; ++i)
    {
        if (objFiles[i].n8FileSN != '') {
            var fileSN = objFiles[i].strFileURL.split("/");
            objFiles[i].n8FileSN = fileSN[fileSN.length - 1].split(".")[0];
            innerImage += '<img src="https://file.nexon.com/NxFile/download/FileDownloader.aspx?oidFile=' + objFiles[i].n8FileSN + '" border="0" />';
			if (i == (objFiles.length - 1)) innerImage += '<input id="imgfocus"/>';
        }
    }
    if (editorProc01.varGetSelection.length != 1)
    {
        editorProc01.varGetSelection.deleteContents();
        editorProc01.varGetSelection.insertNode(editorProc01.varGetSelection.createContextualFragment(innerImage));

        /* if (editorProc01.editWindow.document.selection)
        {
            editorProc01.editWindow.focus();
            editorProc01.varGetSelection.pasteHTML(innerImage);
        }
        else
        {
            editorProc01.editWindow.document.getElementsByTagName('body')[0].innerHTML += innerImage;
        } */
    }
    else
    {
        alert("이미지가 추가되지않았습니다.\n 선택영역이 잘못되었습니다.");
        return false;
    }
    editorLayer.clearLayer('editorLayerSec', editorProc01);
    $(editorProc01.editWindow.document.getElementById('imgfocus')).focus().remove();

    return false;
}

var NxImageEditorPage = new function __ImageEditorPage()
{
    this.winCam = null;
    this.isPopupClose = true;

    this.ResizeWindows = function (_stageWidth, _stageHeight) {
        //!> IE 버전 마다 팝업 크기가 달라짐으로 버전 체크를 하여 크기를 설정한다.  
        var _keyword = "MSIE";
        var _varsion = null;

        var _varsionLength = 1;
        var _emptyLength = 1;

        var _browInfo = navigator.userAgent.toLowerCase();
        var _startPoint = _browInfo.indexOf(_keyword.toLowerCase());

        if (+_startPoint > -1) {
            _startPoint = (+_startPoint + _keyword.length) + _emptyLength;
            _varsion = _browInfo.substring(_startPoint, (_startPoint + _varsionLength));

            switch (+_varsion) {
                case 6: _stageHeight += 24; break;
                case 7: _stageHeight += 24; break;
                case 8: _stageHeight += 24; break;
            }
        }

        window.resizeTo(_stageWidth, _stageHeight);
    }

    this.CloseWindow = function () {
        if (NxImageEditorPage.isPopupClose) {

            if (NgbUrl.GetQueryString('CallBackCancel') != '') {
                try {
                    eval('opener.' + NgbUrl.GetQueryString('CallBackCancel') + '();');
                    return true;
                }
                catch (e) {
                    alert('부모창을 찾을수없습니다.');
                    return true;
                }

                //window.close();
            }
        }
    }

    this.OpenCam = function () {
        this.winCam = window.open('imageeditor_cam.html', 'cam', 'width=530,height=400');
    }

    this.g_interval = null;
    this.Scroll = function (direction) {
        this.g_interval = window.setInterval('document.getElementById( "scroll_list" ).doScroll( "' + direction + '" );', 10);
    }

    this.EndScroll = function () {
        window.clearInterval(this.g_interval);
    }

    this.GoImageUploader = function () {
        if (confirm('메뉴 탭을 이동할 경우 편집중인 이미지들을 잃게 됩니다. 이동 하시겠습니까?')) {
            if (this.winCam != null)
                this.winCam.close();

            this.isPopupClose = false;
            location.href = 'ImageUploader.aspx?' + this.GetQueryString();
        }
    }

    this.GoImageEditor = function () {
        if (NgbBrowser.msie()) {
            if (confirm('메뉴 탭을 이동할 경우 편집중인 이미지들을 잃게 됩니다. 이동 하시겠습니까?')) {
                this.isPopupClose = false;
                location.href = 'ImageEditor.aspx?' + this.GetQueryString();
            }
        }
        else {
            alert('지원하지 않는 브라우저 입니다.');
            return false;
        }
    }

    this.GetQueryString = function () {
        var strLocation = location.href;

        if (strLocation.indexOf('?') != -1)
            strLocation = strLocation.substring(strLocation.indexOf('?') + 1);
        else
            strLocation = '';

        return strLocation;
    }
}

var NxImageEditor = new function __ImageEditor()
{
    this.n4FileMaxCount = 10;
    this.ImageBasePath = "https://ssl.nexon.com/S2/Portal/Nexon/Nexon2007/image/editor_i/";
    this.ToolList = ["resize", "effect", "text", "draw", "frame"];
    this.ToolBoxKitList = [null, "kit_talkbox1", "kit_talkbox2", "kit_talkbox3", "kit_talkbox4", "kit_talkbox5"];
    this.ButtonList = ["kit_crop", "kit_effect1", "kit_effect2", "kit_paint1", "kit_paint2", "kit_paint3", "kit_paint4", "kit_paint5", "kit_paint6", "kit_paint7", "kit_paint8", "bt_picker"];
    this.ImageEditorURL = document.location.href.toLowerCase();
    this.ImageEditorBaseURL = this.ImageEditorURL.substr(0, this.ImageEditorURL.indexOf(".aspx"));

    this.SetToolBox = function (effect, divPostfix, buttonPrefix) {
        if (!NxImageEditor.CheckParameterValidation(effect, "효과를 지정하세요.") ||
			!NxImageEditor.CheckParameterValidation(divPostfix, "툴영역의 이름을 지정하세요.") ||
			!NxImageEditor.CheckParameterValidation(buttonPrefix, "버튼의 이름을 지정하세요."))
            return false;

        for (var i in NxImageEditor.ToolList) {
            var div = document.getElementById(NxImageEditor.ToolList[i] + divPostfix);
            var img = document.getElementById(buttonPrefix + NxImageEditor.ToolList[i]);

            if (NxImageEditor.ToolList[i] == effect) {
                div.style.display = "inline";
                img.src = NxImageEditor.ImageBasePath + "tabr_" + NxImageEditor.ToolList[i] + "_on.gif";
            }
            else {
                div.style.display = "none";
                img.src = NxImageEditor.ImageBasePath + "tabr_" + NxImageEditor.ToolList[i] + ".gif";
            }
        }

        NxImageEditor.SetButton('');
    }

    this.SetButton = function (id) {
        for (var i in NxImageEditor.ButtonList) {
            var tid = NxImageEditor.ButtonList[i];
            if (tid == id)
                document.getElementById(tid).src = NxImageEditor.ImageBasePath + tid + "_down.gif";
            else
                document.getElementById(tid).src = NxImageEditor.ImageBasePath + tid + ".gif";
        }
    }

    this.ChangeToolBox = function () {
        var index = ImageEditorUtil_GetBoxType();
        for (var i in NxImageEditor.ToolBoxKitList) {
            if (NxImageEditor.ToolBoxKitList[i] == null) continue;

            if (i == index)
                document.getElementById(NxImageEditor.ToolBoxKitList[i]).src = NxImageEditor.ImageBasePath + NxImageEditor.ToolBoxKitList[i] + "_down.gif";
            else
                document.getElementById(NxImageEditor.ToolBoxKitList[i]).src = NxImageEditor.ImageBasePath + NxImageEditor.ToolBoxKitList[i] + ".gif";
        }
    }

    this.SetApplyAll = function ()
    {
        var isChecked = ImageEditorUtil_GetApplyAll();

        document.getElementById('chkApplyAll1').checked = isChecked;
        document.getElementById('chkApplyAll2').checked = isChecked;
    }

    this.AddToUserPaletteColor = function ()
    {
        var color = NxImageEditor.toColorString(ImageEditorUtil_GetFgColor());

        NxImageEditor.SetUserPaletteColorList(document.getElementById('color_history1'), color);
        NxImageEditor.SetUserPaletteColorList(document.getElementById('color_history2'), color);
    }

    this.SetUserPaletteColorList = function (palette, color)
    {
        if (palette != null && color != null) {
            var child = palette.children;

            for (var i = 0; i < child.length; ++i)
                if (child[i].style.backgroundColor == color) return;

            for (var i = child.length - 1; i > 0; i--)
                child[i].style.backgroundColor = child[i - 1].style.backgroundColor;

            child[0].style.backgroundColor = color;
        }
    }

    this.toColorString = function (color)
    {
        var color = Number(color & 0x00FFFFFF).toString(16);
        var count = 6 - color.length;

        for (var i = 0; i < count; ++i)
            color = "0" + color;

        return "#" + color;
    }

    this.SetFrameShape = function () {
        var index = ImageEditorUtil_GetFrame();

        for (var i = 1; i < 9; i++) {
            var img = document.getElementById('kit_frame' + i);

            if (i == index)
                img.src = NxImageEditor.ImageBasePath + img.id + "_down.gif";
            else
                img.src = NxImageEditor.ImageBasePath + img.id + ".gif";
        }
    }

    this.SetFont = function () {
        var obj = document.getElementById('statusV');

        obj.style.fontWeight = (ImageEditorUtil_GetFontStyle_IsBold()) ? 'bold' : 'normal';
        obj.style.fontStyle = (ImageEditorUtil_GetFontStyle_IsItalic()) ? 'italic' : 'normal';
        obj.style.textDecoration = (ImageEditorUtil_GetFontStyle_IsUnderline()) ? 'underline' : 'none';

        obj.style.fontFamily = ImageEditorUtil_GetFontFamily();
        obj.style.fontSize = ImageEditorUtil_GetFontSize();
        document.getElementById('ddFonts').value = ImageEditorUtil_GetFontFamily();
        document.getElementById('ddFontSizes').value = ImageEditorUtil_GetFontSize();

        document.getElementById('btn_bold').src = NxImageEditor.ImageBasePath + ((ImageEditorUtil_GetFontStyle_IsBold()) ? 'kit_font1_down.gif' : 'kit_font1.gif');
        document.getElementById('btn_italic').src = NxImageEditor.ImageBasePath + ((ImageEditorUtil_GetFontStyle_IsItalic()) ? 'kit_font2_down.gif' : 'kit_font2.gif');
        document.getElementById('btn_underline').src = NxImageEditor.ImageBasePath + ((ImageEditorUtil_GetFontStyle_IsUnderline()) ? 'kit_font3_down.gif' : 'kit_font3.gif');
    }

    this.CheckParameterValidation = function (param, message) {
        if (param == null || param == '') {
            alert(message);
            return false;
        }

        return true;
    }

    this.Upload = function (n4FileService, n4GameCode) {
        if (ImageEditorUtil_GetEditItemCount() == 0) {
            alert("업로드할 파일을 입력하세요.");
            return false;
        }

        if (!NxImageEditor.CheckParameterValidation(n4FileService, "파일서비스 코드를 입력하세요.") ||
			!NxImageEditor.CheckParameterValidation(n4GameCode, "maskGameCode를 입력하세요."))
            return false;

        var stFiles = '';
        var child = document.getElementById('FileList').children;
        var strUploaderURL = NxImageEditor.ImageEditorBaseURL + "_uploader.aspx?n4fileservicecode=" + n4FileService.toString() + "&n4gamecode=" + n4GameCode.toString();

        for (var i = 0; i < child.length; i++) {
            var tokens = child[i].path.split('\\');
            var strFileName = tokens[tokens.length - 1].split('.')[0] + '.jpg';
            var oidFile = NpfImageEditor.UploadEditItem(strUploaderURL, child[i].children[0].key, strFileName);

            //alert( oidFile );

            stFiles += oidFile + ',';
        }

        stFiles = stFiles.substr(0, stFiles.length - 1);

        if (NgbUrl.GetQueryString('CallBackComplete') != '') {
            if (NgbUrl.GetQueryString('CallBackComplete').toLowerCase().indexOf('gnxeditor') > -1) {
                var splitLen = stFiles.split(',').length;
                if (splitLen == 0)
                    splitLen = 1;

                var arry = new Array(splitLen);
                for (var i = 0; i < (splitLen) ; i++) {
                    if (splitLen == 1) {
                        arry[i] = new ArrayInfo(stFiles);
                    }
                    else
                        arry[i] = new ArrayInfo(stFiles.split(',')[i]);
                }

                var strFileName = "";
                for (var j = 0; j < arry.length; j++) {
                    opener.GnxEditor_CallBack.UploadImgFileComplete(arry[j].oidFile, arry[j].oidFile, strFileName);
                }
            }
            else {
                alert(11111);
                eval('opener.' + NgbUrl.GetQueryString('CallBackComplete') + '( "' + stFiles + '" );');
            }
            window.close();
        }
        else {
            alert(stFiles);
            window.close();
        }
    }

    this.ArrayInfo = function (oidFile) {
        this.oidFile = oidFile;
        this.oidthumbFile = 0;
        this.strFileName = null;
    }
}

var NxImageUploader;
function __ImageUploader() {

    this.n4MaxFileMegaByteSize = 5;
    this.n4FileCount = 3;
    this.n4FileMaxCount = 10;
    this.objFileCount = [];

    for (var i = 0; i < this.n4FileMaxCount; i++)
    {
        this.objFileCount[i] = {};
        this.objFileCount[i].index = i + 1;

        if (this.objFileCount[i].index > this.n4FileCount)
            this.objFileCount[i].display = "none";
        else
            this.objFileCount[i].display = "block";
    }

    this.fileTotalCount = function ()
    {
        var totalCount = 0;
        for (var i = 0; i < this.objFileCount.length; i++) {
            if (this.objFileCount[i].display == "block") totalCount++;
        }
        return totalCount;
    }

    this.Add = function ()
    {
        if (this.fileTotalCount() == this.n4FileMaxCount)
        {
            alert('파일은 최대 ' + this.n4FileMaxCount.toString() + '개까지 추가가 가능합니다');
            return;
        }
        if (this.objFileCount[9].display == "block")
        {
            for (var i = 0; i < this.objFileCount.length; i++)
            {
                if (this.objFileCount[i].display == "none") {
                    this.n4FileCount = this.objFileCount[i].index - 1;
                    break;
                }
            }
        }
        if (this.AppendFile())
        {
            this.n4FileCount++;
            this.SetFileCount();
        }
    }

    this.AppendFile = function ()
    {
        var n4FileIndex = this.n4FileCount + 1;
        var fileList = document.getElementById("fileList");

        if (typeof (fileList) == "object") {
            this.objFileCount[n4FileIndex - 1].display = "block";
            document.getElementById("liFile" + n4FileIndex.toString()).style.display = "block";
            return true;
        }
        else
            return false;
    }

    this.Delete = function (index) {
        if (index == 10) this.n4FileCount = 9;
        var objFileDiv = document.getElementById('liFile' + index);
        if (typeof (objFileDiv) == "object") {
            this.objFileCount[index - 1].display = "none";
            document.getElementById('File' + index).value = "";
            objFileDiv.style.display = "none";
            this.SetFileCount();
        }
    }

    this.SetFileCount = function () {
        var objFileCount = document.getElementById('divFileCount');
        if (typeof (objFileCount) == "object")
            objFileCount.innerHTML = this.fileTotalCount();
    }

}