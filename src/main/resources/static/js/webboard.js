
var WEBBOARD = (function () {
    var instance;
    var _submitting = false;

    function initiate() {
        //public
        return {
            initializeEditor: function() {

                Createm_HtmlEditor();

                $("#btnWrite").click(function () {

                    var strTitle = $.trim($('#Title').val());
                    var strContent = $("iframe#editWindow.editWindow").contents().find("body").html();
                    var bytesLimit = (1024 * 190);
                    //var hashtag = WEBBOARD.extractHash($("#hashtag").val());
                    var hashResult = WEBBOARD.extractHash($("#hashtag").val());
                    if (!hashResult.isvalid) {
                        alert(hashResult.message);
                        return false;
                    }
                    var hashtag = hashResult.tags;
                    $("#hashtag").val(hashtag);
                    var redirectTo = ($('#redirectTo').val() === '') ? '/' : $('#redirectTo').val();
                    var no = $("#no").val();
                    var onlyText = editorProc01.returnResultText();

                    if (strTitle === '') {
                        alert('제목을 입력하세요.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (strTitle.length < 2) {
                        alert('제목은 두글자 이상 입력해 주세요.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (COMMON && strTitle.length > COMMON.maxTitleLength) {
                        alert('제목은 ' + COMMON.maxTitleLength +'글자를 넘을 수 없습니다.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (onlyText.trim() == '') {
                        alert('내용을 입력해야 합니다.');
                        return false;
                    }
                    else if (!UTILITY.checkStringBytes(strContent, bytesLimit)) {
                        alert('게시글 본문에 등록 가능한 허용 용량을 ' + (UTILITY.getStringBytes(strContent) - bytesLimit) + ' Byte 초과 하였습니다.');
                        return false;
                    }
                    else if (!CommunityBoard_m_HtmlEditor_CheckValidation()) {
                        return false;
                    }

                    if (no !== '' && no !== '0') {
                        //put (modify)
                        var frmSelector = '#frmCreate';
                        var postTo = $(frmSelector).attr('action');

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: 'put',
                            data: $(frmSelector).serialize(),
                            callback: function (data) {
                                if (data.Code === 0) {
                                    window.location.href = redirectTo;
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    }
                    else {
                        //post (create)
                        $('#frmCreate').submit();
                    }   
                });
            },
            initializeBugReportEditor: function () {

                Createm_HtmlEditor();

                $('.bug_btn_wrap .btn03_b').bind('click', function (e) {

                    var strTitle = $.trim($('.seal_col input[name=Title]').val());
                    var type = $('.seal_col .sort_wrap2 select').val();
                    var strContent = $("iframe#editWindow.editWindow").contents().find("body").html();
                    var bytesLimit = (1024 * 190);

                    if (strTitle === '') {
                        alert('제목을 입력하세요.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (strTitle.length < 2) {
                        alert('제목은 두글자 이상 입력해 주세요.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (COMMON && strTitle.length > COMMON.maxTitleLength) {
                        alert('제목은 ' + COMMON.maxTitleLength + '글자를 넘을 수 없습니다.');
                        $('#Title').focus();
                        return false;
                    }
                    else if (!UTILITY.checkStringBytes(strContent, bytesLimit)) {
                        alert('게시글 본문에 등록 가능한 허용 용량을 ' + (UTILITY.getStringBytes(strContent) - bytesLimit) + ' Byte 초과 하였습니다.');
                        return false;
                    }

                    else if (!CommunityBoard_m_HtmlEditor_CheckValidation()) {
                        return false;
                    }
                    var $form = $("#frmCreate");
                    $('#frmCreate input[name=Title]').val(strTitle);
                    $('#frmCreate input[name=ArticleCategorySN]').val(type);
                    $('input[name=attachFileSN]').appendTo($form);
                    $('input[name=attachFileName]').appendTo($form);
                    //$('#frmCreate').attr('action', $(e.currentTarget).attr('href'));
                    $('#frmCreate').submit();
                });

                $('.add_file_btn a').bind('click', function (e) {
                    e.preventDefault();
                    var url = $(e.currentTarget).attr('href');
                    var pop = window.open(url, 'popFileUpload', 'width=490,height=400,scrollbars=0');
                });
            },
            extractHash: function (txt) {
                var tags = [];
                txt = txt.replace(/#[^#\s,;]+/gm, function (tag) {
                    tags.push(tag);
                    //if (WEBBOARD.validateHash(txt)) {
                    //    tags.push(tag);
                    //}
                });

                var tagTemp = '';
                var isvalid = true;
                var message = '';
                for (var i = 0; i < tags.length; i++) {
                    tagTemp = tags[i].replace('#', '');
                    if (tagTemp.length < 2)
                        return { isvalid: false, message: '각 태그는 2자 이상으로 작성해야 합니다.', tags: '' };
                    if (tagTemp.length > 12)
                        return { isvalid: false, message: '각 태그는 최대 12자를 넘을 수 없습니다.', tags: '' };
                    if (WEBBOARD.validateHash(tagTemp))
                        return { isvalid: false, message: '태그에 허용되지 않는 문자가 있습니다.', tags: '' };
                }
                if (tags.length > 15)
                    return { isvalid: false, message: '태그는 최대 15개까지 추가할 수 있습니다.', tags: '' };
                
                return { isvalid: isvalid, message: message, tags: tags.join(',') };
            },
            validateHash: function (hash) {
                var deny_pattern = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|\*]+$/;
                if (deny_pattern.test(hash)) {
                    return false;
                }
                return true;
            },
            getArticleList: function (url, refreshTargetSelector, page, search, orderBy) {
                $.ajax({
                    url: url,
                    method: 'get',
                    async: false,
                    data: { page: page, search: search, orderBy: orderBy },
                    success: function (data) {
                        $(refreshTargetSelector).html(data);
                    },
                    error: function (a, b) {
                        alert('error');
                    }
                });
            },
            getArticleView: function (url, refreshTargetSelector) {
                $.ajax({
                    url: url,
                    method: 'get',
                    async: false,
                    success: function (data) {
                        $(refreshTargetSelector).html(data);
                    },
                    error: function (a, b) {
                        alert('error');
                    }
                });
            },
            deleteArticle: function (no) {
                if (confirm('삭제하시겠습니까?')) {
                    var redirectTo = $('#frmDelete input[name=redirectTo]').val();
                    
                    var frmSelector = '#frmDelete';
                    var postTo = $(frmSelector).attr('action');

                    UTILITY.submitAsync2({
                        submitTo: postTo,
                        method: 'delete',
                        data: $(frmSelector).serialize(),
                        callback: function (data) {
                            if (data.Code === 0) {
                                window.location.href = redirectTo;
                            }
                            else {
                                alert(data.Message);
                            }
                        },
                        useCache: false
                    });
                }
            },
            createComment: function (parentNo, replyToNo, replyToName, obj) {

                //가장 가까운 comment 내용을 추출
                var comment = $(obj).closest('div .ctracker').find('textarea[name = comment]').val().trim();
                if (comment === '') {
                    alert('내용이 없습니다.');
                    return;
                }
                if (COMMON && comment.length > COMMON.maxCommentLength) {
                    alert('댓글은 ' + COMMON.maxCommentLength + '글자를 넘을 수 없습니다.');
                    return false;
                }
                var emoticonNo = getCommentEmoticonNo(obj);     //이모티콘 추출
                var imageSN = getCommentImageSN(obj);           //첨부이미지 추출
                var postTo = $('#frmComment').attr('action');
                var token = $('#frmComment input[name=__RequestVerificationToken]').val();

                UTILITY.submitAsync2({
                    submitTo: postTo,
                    method: 'post',
                    data: {
                        __RequestVerificationToken: token,
                        parentCommentSN: parentNo,
                        replyToNo: replyToNo,
                        replyToName: replyToName,
                        comment: comment,
                        emoticonNo: emoticonNo,
                        imageSN: imageSN
                    },
                    callback: function (data) {
                        if (data.Code === 0) {
                            if (parentNo === 0) {
                                WEBBOARD.getCommentList(1);
                            }
                            else {
                                var comment_page = $('.reply_wrap input[name=comment_page]').val();
                                WEBBOARD.getCommentList(comment_page);
                            }
                        }
                        else {
                            alert(data.Message);
                        }
                    },
                    useCache: false
                });
            },
            modifyComment: function (commentNo, obj) {

                //가장 가까운 comment 내용을 추출
                var comment = $(obj).closest('div .ctracker').find('textarea[name = comment]').val().trim();
                if (comment === '') {
                    alert('내용이 없습니다.');
                    return;
                }
                if (COMMON && comment.length > COMMON.maxCommentLength) {
                    alert('댓글은 ' + COMMON.maxCommentLength + '글자를 넘을 수 없습니다.');
                    return false;
                }
                var emoticonNo = getCommentEmoticonNo(obj);     //이모티콘 추출
                var imageSN = getCommentImageSN(obj);           //첨부이미지 추출
                var putTo = $('#frmComment').attr('action') + '/' + commentNo;
                var token = $('#frmComment input[name=__RequestVerificationToken]').val();
                
                UTILITY.submitAsync2({
                    submitTo: putTo,
                    method: 'put',
                    data: {
                        __RequestVerificationToken: token,
                        commentSN: commentNo,
                        comment: comment,
                        emoticonNo: emoticonNo,
                        imageSN: imageSN
                    },
                    callback: function (data) {
                        if (data.Code === 0) {
                            var comment_page = $('.reply_wrap input[name=comment_page]').val();
                            WEBBOARD.getCommentList(comment_page);
                        }
                        else {
                            alert(data.Message);
                        }
                    },
                    useCache: false
                });
            },
            deleteComment: function (commentNo) {
                if (confirm('삭제하시겠습니까?')) {

                    var deleteTo = $('#frmComment').attr('action') + '/' + commentNo;
                    var token = $('#frmComment input[name=__RequestVerificationToken]').val();

                    UTILITY.submitAsync2({
                        submitTo: deleteTo,
                        method: 'delete',
                        callback: function (data) {
                            if (data.Code === 0) {
                                var comment_page = $('.reply_wrap input[name=comment_page]').val();
                                WEBBOARD.getCommentList(comment_page);
                            }
                            else {
                                alert(data.Message);
                            }
                        },
                        useCache: false
                    });
                }
            },
            getCommentList: function (page) {

                var url = $('#frmComment').attr('action') + '?page=' + page; 

                $.ajax({
                    url: url,
                    method: 'get',
                    //async: false,
                    success: function (data) {
                        if (data === null || data === '')
                            alert('error!');
                        else {
                            $('#ajaxRefresh').html(data);
                            ajax_reply();
                        }   
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });
            },
            getRecommentList: function (obj) {

                var $target = $(obj).parent().prev();
                var page = $target.siblings('input[name=rcpno]').val() * 1 + 1;
                var commentNo = $target.siblings('input[name=cno]').val();
                var cidx = $target.siblings('input[name=cidx]').val();
                var state = $target.siblings('input[name=rcst]').val();
                var url = $('#frmComment').attr('action') + '/' + commentNo + '/comment' + '?page=' + page;

                if (state === '1') {
                    reply_more(cidx);
                    return;
                }

                $.ajax({
                    url: url,
                    method: 'get',
                    //async: false,
                    success: function (data) {
                        if (data === null || data === '') {
                            alert('답글의 마지막입니다.');
                            $target.siblings('input[name=rcst]').val(1);
                            $(obj).text('답글 접기');
                            $(obj).html('<img src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/reply_more_on.png" alt="답글 접기" />답글 접기');
                        }
                        else {
                            $target.append(data);
                            $target.siblings('input[name=rcpno]').val(page);
                            bindUnitButtonEvent();

                            //답글이 몇개 왔는지 카운트
                            var count = (data.match(/reply_gray_info/g) || []).length;
                            if (count < 3) {
                                $target.siblings('input[name=rcst]').val(1);
                                $(obj).text('답글 접기');
                                $(obj).html('<img src="https://ssl.nexon.com/s2/game/maplestory/renewal/common/reply_more_on.png" alt="답글 접기" />답글 접기');
                            }
                        }
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });

            },
            recommendArticle: function (no, sign) {
                
                var postTo = $('#frmRecommend').attr('action');
                if (sign)
                    postTo = postTo + '/' + sign;

                var redirectTo = $('#frmRecommend input[name=redirectTo]').val();

                UTILITY.submitAsync2({
                    submitTo: postTo,
                    method: 'put',
                    data: $('#frmRecommend').serialize(),
                    callback: function (data) {
                        if (data.Code === 0) {
                            $('.recomref').text(data.Value.Total);
                        }
                        else {
                            alert(data.Message);
                        }
                    },
                    useCache: false
                });
            },
            getRecommendUserList: function (page, order) {

                var url = $('#frmRecommend').attr('action') + '?page=' + page + '&order=' + order;

                $.ajax({
                    url: url,
                    method: 'get',
                    async: false,
                    success: function (data) {
                        if (data === null || data === '')
                            alert('error!');
                        else {
                            $('.popup_char_id').html(data);
                            ajax_reply();
                        }
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });
            },
            giveCustomOrderValue: function (no, orderingType) {
                //var postTo = $('#frmRecommend').attr('action');
                //var redirectTo = $('#frmRecommend input[name=redirectTo]').val();

                //submitBy('#frmRecommend', 'put', function (point) {
                //    $('.recomref').text(point);
                //});
            },
            getNotificationList: function () {
                $.ajax({
                    url: '/Common/Character/Data/Notification',
                    async: false,
                    success: function (data) {
                        $('.notice_banner_wrap').html(data.view);
                        $('.notification_numb span').text(data.count + '개');
                        $('.login_after_info .notice_button .data_numb').text(data.count);
                        login_info_active(0);
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });
            },
            deleteNotification: function (no, obj) {
                $.ajax({
                    url: '/Common/Character/Data/Notification/Delete/' + no,
                    async: false,
                    success: function (data) {
                        if (data.Code === 0) {
                            $('.notification_numb span').text(data.Message + '개');
                            $('.login_after_info .notice_button .data_numb').text(data.Message);
                            open_close(obj);
                        }
                        else {
                            alert(data.Message);
                        }
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                })
            },

            searchOnBoard: function (period) {
                var board = $('.board_search_wrap select[name=search_board]').val();
                var type = $('.board_search_wrap select[name=search_type]').val();
                var text = $('.board_search_wrap input[name=search_text]').val();

                if (text === '') {
                    alert('검색어를 입력하세요.');
                    //location.href = '/Community/' + board;
                    return;
                }
                if (text.length < 2) {
                    alert('검색어는 2글자 이상만 가능합니다.');
                    return;
                }
                if (text.length > 12) {
                    alert('검색어는 최대 12자 이하만 허용됩니다.');
                    return;
                }
                if (type !== 'h' && type !== 'n' && type !== 't') {
                    alert('검색조건을 선택하세요.');
                    return;
                }

                if (type === 'h') {    //hashtag
                    location.href = '/Common/Search/Community?t=' + encodeURI(text);
                }   
                else {                //title, writer
                    if (board === 'All') {   //커뮤니티 전체 검색
                        if (type === 't')
                            location.href = '/Common/Search/Community/Title' + '?w=' + encodeURI(text);
                        else
                            location.href = '/Common/Search/Community/Writer' + '?w=' + encodeURI(text);
                    }
                    else {
                        var search = (type === 't') ?
                            UTILITY.generateSearchParameter({ t: text, pd: (period < 1) ? 1 : period })     //제목검색은 period > 1 에만 유효
                            : UTILITY.generateSearchParameter({ n: text });
                        location.href = '/Community/' + board + '?search=' + search;
                    }   
                }
            },
            reportArticle: function () {
               
            },


            CUSTOM: {
                COORDINATION: {
                    createArticle: function () {
                        var frmSelector = '#frmArticle';
                        var no = $(frmSelector).find('input[name=no]').val();
                        no = (no) ? (no === '') ? 0 : no * 1 : 0;

                        var baseUrl = $(frmSelector).attr('action');
                        var postTo = (no > 0) ? baseUrl + '/' + no : baseUrl;
                        var method = (no > 0) ? 'put' : 'post';
                        var content = $(frmSelector).find('textarea[name=CommunityBoard_m_HtmlEditor_strContent_OnlyHtml]').val().trim();
                        $(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val(content);
                        var text = $(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val();
                        var title = $(frmSelector).find('input[name=Title]').val();
                        var token = $(frmSelector).find('input[name=__RequestVerificationToken]').val();

                        if (content == '') {
                            alert('내용을 입력하세요.');
                            return;
                        }
                        if (content.length > 70) {
                            alert('최대 70자까지 입력할 수 있습니다.');
                            return;
                        }

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: method,
                            data: {
                                __RequestVerificationToken: token,
                                no: no,
                                Title: title,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyText: text,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyHtml: content
                            },
                            callback: function (data) {
                                if (data.Code === 0) {
                                    WEBBOARD.CUSTOM.COORDINATION.refreshList();
                                    cody_wr_close();
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    },
                    deleteArticle: function (no) {
                        if (confirm('삭제하시겠습니까?')) {
                            var baseUrl = '/Community/Coordination/'; 
                            
                            UTILITY.submitAsync2({
                                submitTo: baseUrl + no,
                                method: 'delete',
                                callback: function (data) {
                                    if (data.Code === 0) {
                                        WEBBOARD.CUSTOM.COORDINATION.refreshList();
                                    }
                                    else {
                                        alert(data.Message);
                                    }
                                },
                                useCache: false
                            });
                        }
                    },
                    giveStar: function (no, obj) {

                        var percent = $(obj).parent().parent().next().find('.star_count:eq(0)').width() / $(obj).parent().parent().next().find('.star_count:eq(0)').parent().width() * 100;
                        var point = Math.round(percent / 20);
                        var content = $(obj).parent().parent().next().find('textarea[name=comment]').val();
                        var token = $(obj).parent().parent().next().find('input[name=__RequestVerificationToken]').val();

                        if (content === '') {
                            alert('내용을 작성해야 합니다.');
                            return;
                        }
                        if (COMMON && content.length > COMMON.maxCommentLength) {
                            alert('내용은 ' + COMMON.maxCommentLength + '글자를 넘을 수 없습니다.');
                            return false;
                        }

                        var baseUrl = '/community/coordination/';
                        var postTo = baseUrl + no + '/star';

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: 'post',
                            data: { comment: content, __RequestVerificationToken: token, point: point },
                            callback: function (data) {
                                if (data.Code === 0) {
                                    WEBBOARD.CUSTOM.COORDINATION.refreshList();
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    },
                    getCommentList: function (no, obj) {

                        var pageObj = $(obj).parent().parent().find('input[name=reply_page]');
                        var page = pageObj.val() * 1 + 1;
                        var url = '/community/coordination/' + no + '/comment?page=' + page;
                        //댓글 더보기
                        $.ajax({
                            url: url,
                            method: 'get',
                            //async: false,
                            success: function (data) {
                                if (data === null || data.trim() === '')
                                    alert('마지막입니다.');
                                else {
                                    if (page === 1) {
                                        $(obj).parent().parent().find('ul').html(data);     //첫페이지이면 덮어쓴다
                                    }
                                    else {
                                        $(obj).parent().parent().find('ul').append(data);   //이후부턴 아래에 추가
                                    }
                                    
                                    //ajax_reply();
                                    pageObj.val(page);
                                }
                            },
                            error: function (a, b) {
                                alert('error!');
                            }
                        });
                    },
                    deleteComment: function (articleNo, commentNo) {
                        if (confirm('삭제하시겠습니까?')) {
                            var baseUrl = '/Community/Coordination/'; 
                            var postTo = baseUrl + articleNo + '/comment/' + commentNo;

                            UTILITY.submitAsync2({
                                submitTo: postTo,
                                method: 'delete',
                                callback: function (data) {
                                    if (data.Code === 0) {
                                        WEBBOARD.CUSTOM.COORDINATION.refreshList();
                                    }
                                    else {
                                        alert(data.Message);
                                    }
                                },
                                useCache: false
                            });
                        }
                    },
                    openModifyWindow: function (obj, no) {
                        var frmSelector = '#frmArticle';
                        var content = $(obj).parent().parent().find('.char_txt p').html();
                        $(frmSelector).find('input[name=no]').val(no);
                        $(frmSelector).find('textarea[name=CommunityBoard_m_HtmlEditor_strContent_OnlyHtml]').val(content);
                        cody_wr_open();
                    },
                    refreshList: function () {

                        //목록 갱신
                        var url = '/Community/Coordination';
                        if (COMMON.articleSearchDescriptor && COMMON.articleSearchDescriptor.orderBy > 0) {
                            url = url + '?search=' + UTILITY.generateSearchParameter({ ob: 1 });
                        }
                        WEBBOARD.getArticleList(url, '.cody_wrap_list', 1);

                        //별점주기 관련 버튼에 이벤트 재연결
                        cody_scroll_custom();
                        $(".app_wr_btn").unbind('click').bind('click', function () {
                            var insert_btn = $(this).next(".repley_insert_btn");
                            var text_area_wrap = $(this).parents(".app_write_wrap").find(".app_write_pop");
                            $(this).hide();
                            insert_btn.show();
                            text_area_wrap.fadeIn();
                        });
                        $(".cancle_repley").unbind('click').bind('click', function () {
                            var a = $(this).parents(".repley_insert_btn");
                            var b = a.prev(".app_wr_btn");
                            var c = a.next(".app_write_pop");
                            a.hide();
                            b.show();
                            c.fadeOut();
                        });
                        $(".star_input li").click(function () {
                            var idx = $(this).index() + 1;
                            var el = $(this).parents("ul").prev("span.star_count");
                            el.animate({ "width": idx * 20 + "%" }, 300);
                        });
                    }
                },
                N23COORDINATION: {
                    createArticle: function () {
                        var frmSelector = '#frmArticle';
                        var no = $(frmSelector).find('input[name=no]').val();
                        no = (no) ? (no === '') ? 0 : no * 1 : 0;

                        var baseUrl = $(frmSelector).attr('action');
                        var postTo = (no > 0) ? baseUrl + '/' + no : baseUrl;
                        var method = (no > 0) ? 'put' : 'post';
                        var content = $(frmSelector).find('textarea[name=CommunityBoard_m_HtmlEditor_strContent_OnlyHtml]').val().trim();
                        $(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val(content);
                        var text = $(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val();
                        //var title = $(frmSelector).find('input[name=Title]').val();
                        var title = $(frmSelector).find('textarea[name=Title]').val().trim();
                        var token = $(frmSelector).find('input[name=__RequestVerificationToken]').val();

                        const encoder = new TextEncoder();

                        if (content == '') {
                            alert('코디 소개를 입력하세요.');
                            return;
                        }
                        if (encoder.encode(content).length > 210) {
                            alert('최대 한글 70자까지 입력할 수 있습니다.');
                            return;
                        }

                        if (title == '') {
                            alert('코디 컨셉을 입력하세요.');
                            return;
                        }
                        if (encoder.encode(title).length > 75) {
                            alert('최대 한글 25자까지 입력할 수 있습니다.');
                            return;
                        }

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: method,
                            data: {
                                __RequestVerificationToken: token,
                                no: no,
                                Title: title,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyText: text,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyHtml: content
                            },
                            callback: function (data) {
                                if (data.Code === 0) {
                                    WEBBOARD.CUSTOM.N23COORDINATION.refreshList();                                    
                                    cody_wr_close();
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    },
                    deleteArticle: function (no) {
                        if (confirm('삭제하시겠습니까?')) {
                            var baseUrl = '/Community/N23Coordination/';

                            UTILITY.submitAsync2({
                                submitTo: baseUrl + no,
                                method: 'delete',
                                callback: function (data) {
                                    if (data.Code === 0) {
                                        WEBBOARD.CUSTOM.N23COORDINATION.refreshList();                                        
                                    }
                                    else {
                                        alert(data.Message);
                                    }
                                },
                                useCache: false
                            });
                        }
                    },
                    openModifyWindow: function (obj, no) {
                        var frmSelector = '#frmArticle';
                        var content = $(obj).parent().parent().find('.char_txt p').html();
                        var title = $(obj).parent().parent().find('.cody_set_info span').html();
                        $(frmSelector).find('input[name=no]').val(no);
                        $(frmSelector).find('textarea[name=CommunityBoard_m_HtmlEditor_strContent_OnlyHtml]').val(content);
                        $(frmSelector).find('textarea[name=Title]').val(title);
                        cody_wr_open();
                    },
                    recommendArticle: function (no) {

                        var postTo = $('#frmRecommend').attr('action').replace('{0}', no);
                        
                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: 'post',
                            data: $('#frmRecommend').serialize(),
                            callback: function (data) {
                                if (data.Code === 0) {
                                    $('#recomref_' + no).text(data.Value.Total);
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    },
                    refreshList: function () {
                        //목록 갱신
                        var url = '/Community/N23Coordination';
                        if (COMMON.articleSearchDescriptor && COMMON.articleSearchDescriptor.orderBy > 0) {
                            url = url + '?search=' + UTILITY.generateSearchParameter({ ob: 1 });
                        }
                        //WEBBOARD.getArticleList(url, '.cody_list_wrap2', 1);
                        window.location = url;
                    }
                },
                DISCUSSION: {
                    recommendArticle: function (no, sign) {

                        var postTo = $('#frmRecommend').attr('action').replace('{0}', no);
                        postTo = (sign) ? postTo + '/' + sign : postTo;

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: 'put',
                            data: $('#frmRecommend').serialize(),
                            callback: function (data) {
                                if (data.Code === 0) {
                                    var likeSelector = (sign === 'Positive') ? 'like_' + no : 'dislike_' + no;
                                    var like2Selector = (sign === 'Positive') ? 'like2_' + no : 'dislike2_' + no;
                                    var likeValue = (sign === 'Positive') ? data.Value.Positive : data.Value.Negative;
                                    var like2Value = (sign === 'Positive') ? data.Value.Positive + '명<em>UP</em>' : data.Value.Negative + '명<em>DOWN</em>';
                                    $('.' + likeSelector).text(likeValue);
                                    $('.' + like2Selector).html(like2Value);

                                    WEBBOARD.CUSTOM.DISCUSSION.refreshPodium();
                                }
                                else {
                                    alert(data.Message);
                                }
                            },
                            useCache: false
                        });
                    },
                    refreshPodium: function () {
                        $.ajax({
                            url: '/Community/Discussion/Podium',
                            method: 'get',
                            async: false,
                            data: { page: 1 },
                            success: function (data) {
                                $('.pop_list').html(data);
                            },
                            error: function (a, b) {
                                alert('error');
                            }
                        });
                    }
                },
                CONTEST: {
                    initializeContestEditor: function () {

                        Createm_HtmlEditor();

                    },
                    createArticle: function () {
                        var frmSelector = '#frmCreate';
                        //var no = $(frmSelector).find('input[name=no]').val();
                        //no = (no) ? (no === '') ? 0 : no * 1 : 0;

                        var baseUrl = $(frmSelector).attr('action');
                        var postTo = baseUrl; //(no > 0) ? baseUrl + '/' + no : baseUrl;
                        var method = 'post'; //(no > 0) ? 'put' : 'post';
                        //var content = $(frmSelector).find('textarea[name=CommunityBoard_m_HtmlEditor_strContent_OnlyHtml]').val();
                        var content = $("#editWindow").contents().find('body').html();
                        //$(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val(content);
                        //var text = $(frmSelector).find('input[name=CommunityBoard_m_HtmlEditor_strContent_OnlyText]').val();
                        var text = $(frmSelector).find('input[name=__RequestVerificationToken]').val();
                        var title = $.trim($("#layerForm").find('input[name=Title]').val());
                        var articleCategorySN = $(frmSelector).find('input[name=ArticleCategorySN]').val();
                        var articleSubCategorySN = $(frmSelector).find('input[name=ArticleSubCategorySN]').val();
                        var articleCategory2SN = $(frmSelector).find('input[name=ArticleCategory2SN]').val();
                        var token = $(frmSelector).find('input[name=__RequestVerificationToken]').val();
                        var oidImageFiles = editorProc01.returnResultImageList()

                        //경고문구 제거(1번 문구)
                        if (content.indexOf(contest_message_delete1) > -1)
                            content = content.replace(contest_message_delete1, "");

                        //경고문구 제거(4번 문구)
                        if (content.indexOf(contest_message_delete4) > -1)
                            content = content.replace(contest_message_delete4, "");
                                                
                        if (articleSubCategorySN == 0) {
                            alert('[공모전 지원 분야]를 선택하여 주세요.');
                            return;
                        }
                        if (title == '') {
                            alert('출품작 제목을 입력하세요.');
                            return;
                        }
                        var editorImageCount = editorProc01.returnResultImageCount();
                        if (editorImageCount <= 0) {
                            alert('출품작이 없습니다.필수 도트 파일을 첨부해주세요.');
                            return;
                        }

                        UTILITY.submitAsync2({
                            submitTo: postTo,
                            method: method,
                            data: {
                                __RequestVerificationToken: token,
                                //no: no,
                                Title: title,
                                ArticleCategorySN: articleCategorySN,
                                ArticleSubCategorySN: articleSubCategorySN,
                                ArticleCategory2SN: articleCategory2SN,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyText: text,
                                CommunityBoard_m_HtmlEditor_strContent_OnlyHtml: content,
                                CommunityBoard_m_HtmlEditor_oidImageFiles: oidImageFiles
                            },
                            callback: function (data) {
                                if (data.Code === 0) {
                                    IsPageReload = 1;                                    
                                    close('layerForm');
                                    //alert("접수 완료:" + data.articleSN);
                                    WEBBOARD.CUSTOM.CONTEST.viewArticle(data.articleSN);
                                }
                                else {
                                    alert(data.Message);

                                }
                            },
                            useCache: false
                        });
                    },
                    viewArticle: function (no) {

                        if (no == "" || no == "0") {                            
                            return;
                        }
                        
                        UTILITY.submitAsync2({
                            submitTo: "/promotion/2021/20210624/AwardsOpen/" + no,
                            method: "post",
                            data: {   
                            },
                            callback: function (data) {
                                if (data.Code === 0) {
                                    //alert(data.Info);
                                    $("#layerCheck").find('input[name=viewApplyCharacter]').val(data.Info.serverName + " | " + data.Info.characterName);
                                    $("#layerCheck").find('input[name=viewApplyCategory]').val(data.Info.subcategoryName);
                                    $("#layerCheck").find('input[name=viewApplyTitle]').val(data.Info.title);
                                    $("#viewApplyContent").html(data.Info.content);
                                    layerOpen('layerCheck');
                                }
                                else {
                                    alert(data.Message);                                    
                                }
                            },
                            useCache: false
                        });
                    }
                }
            }
        };
    }

    //private
    function getCommentEmoticonNo(obj) {
        var emoticon = $(obj).closest('div .ctracker').find('.emoticon_sum img');
        var emoticonNo = 0;
        if (emoticon.length > 0) {
            emoticon = emoticon.attr('src');
            emoticon = emoticon.replace('https://ssl.nexon.com/s2/game/maplestory/renewal/common/sum_emoticon', '');
            emoticonNo = emoticon.replace('.png', '');
        }

        return emoticonNo;
    }
    function getCommentImageSN(obj) {

        var imageSN = $(obj).closest('div .ctracker').find('.emoticon_sum input[name=image_sn]').val();
        
        return (imageSN === '') ? 0 : imageSN;
    }

    if (!instance) instance = initiate();
    return instance;
}());

var TOPICDISCUSSIONBOARD = (function () {
    var instance;
    var _submitting = false;

    function initiate() {
        //public
        return {            
            getTop10List: function (category, subcategory, indexNum) {
                var url = "/Community/TopicDiscussion/GetDiscussionListTop10?category=" + category + "&subcategory=" + subcategory;

                if (!_submitting) {
                    _submitting = true;
                    $.ajax({
                        url: url,
                        method: 'get',
                        //async: false,
                        success: function (data) {
                            if (data === null || data === '')
                                alert('error!');
                            else {
                                $('#ajaxTop10Refresh').html(data);

                                $('html, body').animate({
                                    scrollTop: $(".contents_wrap2").offset().top
                                }, 500);

                                history.pushState(indexNum, "", document.URL);
                            }
                        },
                        error: function (a, b) {
                            alert('error!');
                        }
                    });
                    _submitting = false;
                }
            },
            getPageList: function (page, search) {
                var url = "/Community/TopicDiscussion/list?page=" + page + "&search=" + search;
                if (!_submitting) {
                    _submitting = true;
                    $.ajax({
                        url: url,
                        method: 'get',
                        //async: false,
                        success: function (data) {
                            if (data === null || data === '')
                                alert('error!');
                            else {
                                $('#ajaxDiscussionPageRefresh').html(data);
                            
                                $('html, body').animate({
                                    scrollTop: $(".contents_wrap2").offset().top
                                }, 500);

                                history.pushState(page + "||" + search, "", document.URL);
                            }
                        },
                        error: function (a, b) {
                            alert('error!');
                        }
                    });              
                    _submitting = false;
                }
            },
            answerArticleContent: function (no) {
                if (no == "" || no == "0") 
                    return;

                var url = "/Community/TopicDiscussion/GetAnswerArticleContent/" + no;
                if (!_submitting) {
                    _submitting = true;
                    $.ajax({
                        url: url,
                        method: 'post',                        
                        success: function (data) {
                            if (data.Code === 0) {                                                  
                                $("#answerContentZone").html(data.Info);                                
                            }
                            else {
                                //alert(data.Message);
                            }
                        },
                        error: function (a, b) {
                            alert('error!');
                        }
                    });
                    _submitting = false;
                }
            },
            recommendArticle: function (no, sign) {

                var postTo = $('#frmRecommend').attr('action').replace('{0}', no);
                postTo = (sign) ? postTo + '/' + sign : postTo;

                UTILITY.submitAsync2({
                    submitTo: postTo,
                    method: 'put',
                    data: $('#frmRecommend').serialize(),
                    callback: function (data) {
                        if (data.Code === 0) {
                            var likeSelector = (sign === 'Positive') ? 'like_' + no : 'dislike_' + no;
                            var like2Selector = (sign === 'Positive') ? 'like2_' + no : 'dislike2_' + no;
                            var likeValue = (sign === 'Positive') ? data.Value.Positive : data.Value.Negative;
                            var like2Value = (sign === 'Positive') ? data.Value.Positive + '명<em>UP</em>' : data.Value.Negative + '명<em>DOWN</em>';
                            $('.' + likeSelector).text(likeValue);
                            $('.' + like2Selector).html(like2Value);
                        }
                        else {
                            alert(data.Message);
                        }
                    },
                    useCache: false
                });
            },
            moveRespectiveTopicAllList: function (category, subcategory, category2) {
                window.location = "/Community/TopicDiscussion/list?search=" + UTILITY.generateSearchParameter({ c: category, sc: subcategory, c2: category2});
            },
            searchOnBoard: function (period) {
                //var board = $('.board_search_wrap select[name=search_board]').val();
                var type = $('.board_search_wrap select[name=search_type]').val();
                var text = $('.board_search_wrap input[name=search_text]').val();
                var c = $('#now_viewData').attr('data-category');
                var sc = $('#now_viewData').attr('data-subcategory');
                var c2 = $('#now_viewData').attr('data-category2');

                if (text === '') {
                    //alert('검색어를 입력하세요.');                    
                    //return;

                    //패스 초기화
                    period = 1;
                }
                if (text != '' && text.length < 2) {
                    alert('검색어는 2글자 이상만 가능합니다.');
                    return;
                }
                if (text.length > 12) {
                    alert('검색어는 최대 12자 이하만 허용됩니다.');
                    return;
                }
                if (type !== 'h' && type !== 'n' && type !== 't') {
                    alert('검색조건을 선택하세요.');
                    return;
                }

                if (type === 'h') {    //hashtag
                    location.href = '/Common/Search/Community?t=' + encodeURI(text);
                }
                else {                //title, writer                    
                    var search = (type === 't') ?
                        UTILITY.generateSearchParameter({ t: text, c: c, sc: sc, c2: c2, pd: (period < 1) ? 1 : period })     //제목검색은 period > 1 에만 유효
                        : UTILITY.generateSearchParameter({ n: text, c: c, sc: sc, c2: c2 });
                    location.href = '/Community/TopicDiscussion/List?search=' + search;                    
                }
            }
        };
    }

    if (!instance) instance = initiate();
    return instance;
}());

var EVENTBOARD = (function () {
    var instance;
    var _submitting = false;

    function initiate() {
        //public
        return {
            createComment: function () {
                var redirectTo = ($('#redirectTo').val() === '') ? '/' : $('#redirectTo').val();
                var frmSelector = '#frmComment';
                
                //댓글
                var comment = $(frmSelector + ' textarea[name=comment]').val().trim();
                //comment = $.trim(comment);
                if (comment === '') {
                    alert('내용이 없습니다.');
                    return;
                }
                if (COMMON && comment.length > COMMON.maxCommentLength) {
                    alert('댓글은 ' + COMMON.maxCommentLength + '글자를 넘을 수 없습니다.');
                    return false;
                }

                var postTo = $(frmSelector).attr('action');
                var token = $('#frmComment input[name=__RequestVerificationToken]').val();
                $.ajax({
                    url: postTo,
                    type: 'post',
                    data: {
                        __RequestVerificationToken: token,
                        comment: comment,
                        emoticonNo: 0
                    },
                    async: false,
                    success: function (data) {
                        if (data.Code === 0)
                            EVENTBOARD.getCommentList(1);
                        else
                            alert(data.Message);
                    },
                    error: function (a, b) {
                        alert('error');
                    }
                });
            },
            deleteComment: function (commentNo) {
                if (confirm('삭제하시겠습니까?')) {

                    var action = $('#frmDeleteComment').attr('action') + '/' + commentNo;
                    $('#frmDeleteComment').attr('action', action);
                    var redirectTo = $('#frmDeleteComment input[name=redirectTo]').val();

                    submitBy('#frmDeleteComment', 'delete', function () {
                        var comment_page = $('.reply_wrap input[name=comment_page]').val();
                        EVENTBOARD.getCommentList(comment_page);
                    });
                }
            },
            getCommentList: function (page) {

                var url = $('#frmComment').attr('action') + '?page=' + page;

                $.ajax({
                    url: url,
                    method: 'get',
                    //async: false,
                    success: function (data) {
                        if (data === null || data === '')
                            alert('error!');
                        else {
                            $('#ajaxRefresh').html(data);
                            ajax_reply();
                        }
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });
            }
        };
    }

    //private
    function submitBy(frmSelector, method, callback) {
        if (method.toLowerCase() !== 'put' && method.toLowerCase() !== 'delete')
            return;
        if (_submitting) {
            alert('처리중입니다.');
            return;
        }
        _submitting = true;

        var postTo = $(frmSelector).attr('action');

        $.ajax({
            type: method,
            url: postTo,
            async: false,
            data: $(frmSelector).serialize(),
            success: function (data) {
                _submitting = false;
                if (data.Code === 0) {
                    if (data.Value)
                        callback(data.Value);
                    else
                        callback();
                }
                else
                    alert(data.Message);
            },
            error: function (a, b) {
                _submitting = false;
                alert(b);
            }
        });
    }

    if (!instance) instance = initiate();
    return instance;
}());

var NXBOARD = (function () {
    var instance;
    var _submitting = false;

    function initiate() {
        //public
        return {
            createComment: function () {
                var redirectTo = ($('#redirectTo').val() === '') ? '/' : $('#redirectTo').val();
                var frmSelector = '#frmComment';

                //댓글
                var comment = $(frmSelector + ' textarea[name=comment]').val().trim();
                //comment = $.trim(comment);
                if (comment === '') {
                    alert('내용이 없습니다.');
                    return;
                }
                if (COMMON && comment.length > COMMON.maxCommentLength) {
                    alert('댓글은 ' + COMMON.maxCommentLength + '글자를 넘을 수 없습니다.');
                    return false;
                }

                var postTo = $(frmSelector).attr('action');
                var token = $('#frmComment input[name=__RequestVerificationToken]').val();
                $.ajax({
                    url: postTo,
                    type: 'post',
                    data: {
                        __RequestVerificationToken: token,
                        comment: comment,
                        emoticonNo: 0
                    },
                    async: false,
                    success: function (data) {
                        if (data.Code === 0)
                            NXBOARD.getCommentList(1);
                        else
                            alert(data.Message);
                    },
                    error: function (a, b) {
                        alert('error');
                    }
                });
            },
            deleteComment: function (commentNo) {
                if (confirm('삭제하시겠습니까?')) {

                    var action = $('#frmDeleteComment').attr('action') + '/' + commentNo;
                    $('#frmDeleteComment').attr('action', action);
                    var redirectTo = $('#frmDeleteComment input[name=redirectTo]').val();

                    submitBy('#frmDeleteComment', 'delete', function () {
                        var comment_page = $('.reply_wrap input[name=comment_page]').val();
                        NXBOARD.getCommentList(comment_page);
                    });
                }
            },
            getCommentList: function (page) {

                var url = $('#frmComment').attr('action') + '?page=' + page;

                $.ajax({
                    url: url,
                    method: 'get',
                    //async: false,
                    success: function (data) {
                        if (data === null || data === '')
                            alert('error!');
                        else {
                            $('#ajaxRefresh').html(data);
                            ajax_reply();
                        }
                    },
                    error: function (a, b) {
                        alert('error!');
                    }
                });
            }
        };
    }

    //private
    function submitBy(frmSelector, method, callback) {
        if (method.toLowerCase() !== 'put' && method.toLowerCase() !== 'delete')
            return;
        if (_submitting) {
            alert('처리중입니다.');
            return;
        }
        _submitting = true;

        var postTo = $(frmSelector).attr('action');

        $.ajax({
            type: method,
            url: postTo,
            async: false,
            data: $(frmSelector).serialize(),
            success: function (data) {
                _submitting = false;
                if (data.Code === 0) {
                    if (data.Value)
                        callback(data.Value);
                    else
                        callback();
                }
                else
                    alert(data.Message);
            },
            error: function (a, b) {
                _submitting = false;
                alert(b);
            }
        });
    }

    if (!instance) instance = initiate();
    return instance;
}());



var CHARACTER = (function () {
    var instance;
    var _submitting = false;

    function initiate() {
        return {

        };
    }

    if (!instance) instance = initiate();
    return instance;
}());