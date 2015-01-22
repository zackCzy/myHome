/**
 *
 */

$(function() {
	var mypage = 1;
	
	$.ajaxSetup({
		accepts: {
			"Accept-Charset": "UTF-8"
		}
	});
	$(".search_user_i input").on("keypress", function(evt) {
		if (evt.keyCode == 13 || evt.charCode == 13) {
			window.open("/myHome/searchSpace/search_user?searchName=" + this.value + "&page=1&pageSize=15", "_blank");
		}
	});
	$(".search_user_i span").on("click", function() {
		window.open("/myHome/searchSpace/search_user?searchName=" + $(this).prev().val() + "&page=1&pageSize=15", "_blank");
	});

	$("body", "html").scrollTop(0);
	window.authority = document.getElementById("authority");
	try {
		$(".view_com").on("click", comClick);
	} catch (e) {}
	try {
		$(".remove_log").on("click", removeLog);
	} catch (e) {}
	try {
		$(".cut_out").on("click", cutClick);
	} catch (e) {}
	try {
		$(".sendComment").on("click", sendClick);
	} catch (e) {}
	$(window).scroll(function() {
		var clientHeight = document.documentElement.scrollTop == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
		var scrollHeight = document.documentElement.scrollTop == 0 ? document.body.scrollHeight : document.documentElement.scrollHeight;
		if (scrollTop < 29 && $(".Home_page_nav").css("position") == "fixed") {
			$(".Home_page_nav").css({
				position: "",
				marginTop: "30px"
			});
		} else if (scrollTop > 29) {
			$(".Home_page_nav").css({
				position: "fixed",
				top: "0px",
				marginTop: "0"
			});
		}

		if (scrollTop > clientHeight * 2) {
			$("#returnHead").stop(true).animate({
				right: "50px"
			}, 300);
		} else {
			$("#returnHead").stop(true).animate({
				right: "-100px"
			}, 300);
		}
		if (clientHeight + scrollTop + 50 >= scrollHeight) {

			if (!window.scrollflag) {
				$(".point_load_status").show(200);
				window.scrollflag = true;
				ajax();
			}
		}

	});
	$("#returnHead").on("click", function(evt) {
		$("body", "html").scrollTop(0);
	});

	function ajax() {
		$.ajax({
			url: "/myHome/json/content_getContent",
			method: 'get',
			dataType: "json",
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			data: {
				page: ++mypage,
				userId: document.getElementById("space_user_id").value,
				newSport: document.getElementById("type").value
			},
			success: function(meg) {
				$(".point_load_status").hide(200);
				if (meg.length > 0) {
					createUserCon(meg);
					window.scrollflag = false;
				}
			}
		});
	}
});
//搜索评论
function comClick() {
	var that = $(this.parentNode).next();
	var _logId = this.getAttribute("alt");
	var smallCom, small_span,
		small_img,
		small_b,
		small_div,
		small_strong,
		small_reply,
		small_reply_area,
		small_reply_input,
		small_reply_input,
		small_reply_bt;
	var reply_area, small_remove, reply_photo_area, reply_photo, reply_name, reply_name, reply_content,
		reply_strong, reply_date, reply_reply, reply_area_two, reply_input, reply_input_bt;
	var _doc = document;
	if (parseInt($("b", this).text()) > 0 && that.attr("alt") != "true") {
		var _JQ_load_box = $(".load_box", that).stop(true).show(200);
		$.ajax({
			url: "/myHome/json/com_com",
			method: 'get',
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			data: {
				logId: _logId
			},
			dataType: "json",
			success: function(json) {
				that.attr("alt", "true");
				var temp = json;
				_JQ_load_box.stop(true).hide(200);
				var disCom = that.children(3).get(0);
				for (var i = 0; i < temp.length; i++) {
					smallCom = _doc.createElement("div");
					smallCom.className = "smallCom";
					small_span = _doc.createElement("span");
					small_img = _doc.createElement("img");
					small_img.setAttribute("src", "/myHome/load/download_getSmallPhoto?id=" + temp[i].id);
					small_span.appendChild(small_img);
					small_span.className = "userPhoto";
					small_b = _doc.createElement("a");
					$(small_b).text( temp[i].name + ":");
					small_b.setAttribute("href", "/myHome/user/space/" + temp[i].account + "/");
					small_b.setAttribute("target", "blank");
					small_div = _doc.createElement("div");
					$(small_div).text( temp[i].comText);


					small_strong = _doc.createElement('strong');
					small_date = _doc.createElement('span');
					$(small_date).text(temp[i].date);
					small_strong.appendChild(small_date);
					small_reply = _doc.createElement('span');
					small_reply.style.background = "url('/myHome/image/reply_ico.png') no-repeat";
					small_reply.style.width = "19px";
					small_reply.style.height = "17px";
					small_reply.style.marginTop = "5px";
					small_reply.setAttribute("title", "回复");
					small_reply.setAttribute("alt", temp[i].id);
					small_strong.appendChild(small_reply);

					small_reply_area = _doc.createElement('div');
					small_reply_area.className = "small_reply_area";
					small_reply_input = _doc.createElement('div');
					small_reply_input.setAttribute("contenteditable", "true");
					small_reply_input.className = "small_reply_input";
					$(small_reply).click(replyClick);

					small_reply_area.appendChild(small_reply_input);

					small_reply_bt = _doc.createElement('input');
					small_reply_bt.setAttribute("type", "button");
					small_reply_bt.className = "small_reply_bt";
					small_reply_bt.value = "评论";
					small_reply_bt.setAttribute("alt", temp[i].commentId);
					$(small_reply_bt).click(sendReplyCom);
					small_reply_area.appendChild(small_reply_bt);


					if (temp[i].comId != undefined) {
						small_remove = _doc.createElement("a");
						small_remove.setAttribute("alt", temp[i].comId);
						small_remove.className = "remove_com";
						$(small_remove).text("删除");
						$(small_remove).click(removeClick);
						small_strong.appendChild(small_remove);
					}
					smallCom.appendChild(small_span);
					smallCom.appendChild(small_b);
					smallCom.appendChild(small_div);
					smallCom.appendChild(small_strong); //--------------------------------------------------
					for (var n = 0; n < temp[i].reviewewCom.length; n++) {
						reply_area = _doc.createElement('div');
						reply_area.className = "reply";
						//回复头像
						reply_photo_area = _doc.createElement('span');
						reply_photo_area.className = "userPhoto";
						reply_photo = _doc.createElement('img');
						reply_photo.setAttribute("src", "/myHome/load/download_getSmallPhoto?id=" + temp[i].reviewewCom[n].id);
						reply_photo_area.appendChild(reply_photo);
						//回复名称
						reply_name = _doc.createElement('a');
						$(reply_name).text( temp[i].reviewewCom[n].comName + "回复" + temp[i].reviewewCom[n].name);
						//回复内容
						reply_content = _doc.createElement('div');
						$(reply_content).text(temp[i].reviewewCom[n].comText);
						//回复时间
						reply_strong = _doc.createElement('strong');
						reply_date = _doc.createElement('span');
						$(reply_date).text( temp[i].reviewewCom[n].date);
						reply_reply = _doc.createElement('span');
						reply_reply.style.background = "url('/myHome/image/reply_ico.png') no-repeat";
						reply_reply.style.width = "19px";
						reply_reply.style.height = "17px";
						reply_reply.style.marginTop = "5px";
						reply_reply.setAttribute("title", "回复");
						reply_reply.setAttribute("alt", temp[i].reviewewCom[n].id);
						$(reply_reply).click(replyClick);
						reply_strong.appendChild(reply_date);
						reply_strong.appendChild(reply_reply); //------------------------------------------

						//再次回复
						reply_area_two = _doc.createElement('div');
						reply_area_two.className = "small_reply_area";
						reply_area_two.style.marginLeft = "55px";
						reply_area_two.style.width = "405px";
						reply_input = _doc.createElement('div');
						reply_input.className = "small_reply_input";
						reply_input.setAttribute("contenteditable", "true");
						reply_input.style.width = "373px";
						reply_input_bt = _doc.createElement('input');
						reply_input_bt.setAttribute("type", "button");
						reply_input_bt.className = "small_reply_bt";
						reply_input_bt.value = "评论";
						reply_input_bt.setAttribute("alt", temp[i].commentId);
						$(reply_input_bt).click(function() {
							sendReplyCom.call(this, 1);
						});

						reply_area_two.appendChild(reply_input);
						reply_area_two.appendChild(reply_input_bt);

						reply_area.appendChild(reply_photo_area);
						reply_area.appendChild(reply_name);
						reply_area.appendChild(reply_content);
						reply_area.appendChild(reply_strong);
						reply_area.appendChild(reply_area_two);

						smallCom.appendChild(reply_area);
					}
					smallCom.appendChild(small_reply_area);
					disCom.appendChild(smallCom);
				}
			}
		});
	}
	if (that.css("display") == "none") {
		that.slideDown(500);
	} else {
		that.slideUp(500);
	}
}

function replyClick() {
	var _reply_area = $(this.parentNode.parentNode.lastChild);
	if (_reply_area.css("display") != "none") {
		_reply_area.find(".small_reply_input").focus();
		return false;
	}
	$(".small_reply_area").hide(200);
	var temp = _reply_area.show(200);
	temp.attr("alt", this.getAttribute("alt"));
}

function cutClick() {
	var that = $(this.parentNode);
	that.slideUp(500);
}

function sendReplyCom(type) {
	var that = this;
	if($(that).prev().text().isEmpty().length<=0){
		$(that).prev().shake();
		return false;
	}
	that.disabled = true;
	var date = new Date();
	$.ajax({
		url: "/myHome/user/comment_saveReviewewComment",
		method: 'post',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			'rc.content': $(that).prev().text().isEmpty(),
			'commentID': that.getAttribute("alt"),
			'userId': $(that.parentNode).attr("alt")
		},
		success: function(meg) {
			that.disabled = false;
			if (meg == "you login has expired") {
				login();
				return;
			}
			try {
				var json = JSON.parse(meg);
				var reply_area = document.createElement('div');
				reply_area.className = "reply";
				//回复头像
				var reply_photo_area = document.createElement('span');
				var reply_photo = document.createElement('img');
				reply_photo.setAttribute("src", "/myHome/load/download_getSmallPhoto?id=" + json.comUserID);
				reply_photo_area.appendChild(reply_photo);
				reply_photo_area.className = "userPhoto";
				//回复名称
				var reply_name = document.createElement('a');
				$(reply_name).text(json.userName + " 回复 " + json.replyName);
				//回复内容
				var reply_content = document.createElement('div');
				$(reply_content).text($(that).prev().text());
				//回复时间
				var reply_strong = document.createElement('strong');
				var reply_date = document.createElement('span');
				$(reply_date).text(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes());

				var reply_reply = document.createElement('span');
				reply_reply.style.background = "url('/myHome/image/reply_ico.png') no-repeat";
				reply_reply.style.width = "19px";
				reply_reply.style.height = "17px";
				reply_reply.style.marginTop = "5px";
				reply_reply.setAttribute("title", "回复");
				reply_reply.setAttribute("alt", json.comUserID);
				$(reply_reply).click(replyClick);
				reply_strong.appendChild(reply_date);
				reply_strong.appendChild(reply_reply);

				//再次回复
				var reply_area_two = document.createElement('div');
				reply_area_two.className = "small_reply_area";
				reply_area_two.style.marginLeft = "55px";
				reply_area_two.style.width = "405px";
				var reply_input = document.createElement('div');
				reply_input.className = "small_reply_input";
				reply_input.setAttribute("contenteditable", "true");
				reply_input.style.width = "373px";
				var reply_input_bt = document.createElement('input');
				reply_input_bt.setAttribute("type", "button");
				reply_input_bt.className = "small_reply_bt";
				reply_input_bt.value = "评论";
				reply_input_bt.setAttribute("alt", json.commentId);
				$(reply_input_bt).click(function() {
					sendReplyCom.call(this, 1);
				});

				reply_area_two.appendChild(reply_input);
				reply_area_two.appendChild(reply_input_bt);

				reply_area.appendChild(reply_photo_area);
				reply_area.appendChild(reply_name);
				reply_area.appendChild(reply_content);
				reply_area.appendChild(reply_strong);
				reply_area.appendChild(reply_area_two);

				try {
					$(reply_area).insertBefore($(".small_reply_area", (type == 1 ? that.parentNode.parentNode.parentNode : that.parentNode.parentNode)).eq(-1));
				} catch (e) {}
				$(that.parentNode).hide(300);
			} catch (e) {
				$.notice("viki提醒你!","评论失败!");
			}

		}
	});
}

function sendClick() {
	var that = this;
	var replyTextE = $(that).prev();
	if (replyTextE.text().isEmpty().length <= 0) {
		var temp = replyTextE.css({
			"border": "1px solid #ff4700"
		}).shake(function() {
			temp.css({
				"border": "1px solid #DEDEDE"
			});
		}, 1);
		return;
	}
	that.disabled = true;
	var date = new Date();
	$.ajax({
		url: "/myHome/user/comment_save",
		method: 'post',
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			'c.content':replyTextE.text().isEmpty(),
			'id': $(that).attr("alt")
		},
		success: function(text) {
			that.disabled = false;
			if (text == "you login has expired") {
				login();
				return;
			}
			try {
				var json = JSON.parse(text);
				var element = document.createElement('div');
				element.setAttribute("class", 'smallCom');
				element.style["display"] = "none";
				var span = document.createElement('span');
				var img = document.createElement('img');
				img.src = "/myHome/load/download_getSmallPhoto?id=" + json.id;
				span.appendChild(img);
				span.className = "userPhoto";
				element.appendChild(span);
				var bo = document.createElement('a');
				$(bo).text(json.spaceName + ":");
				bo.setAttribute("target", "blank");
				bo.setAttribute("href", "/myHome/user/space/" + json.name + "/");
				element.appendChild(bo);
				var divo = document.createElement('div');
				$(divo).text(replyTextE.text().isEmpty());
				element.appendChild(divo);

				var small_strong = document.createElement('strong');
				small_date = document.createElement('span');
				$(small_date).text( date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes());
				small_strong.appendChild(small_date);
				var small_reply = document.createElement('span');
				small_reply.style.background = "url('/myHome/image/reply_ico.png') no-repeat";
				small_reply.style.width = "19px";
				small_reply.style.height = "17px";
				small_reply.style.marginTop = "5px";
				small_reply.setAttribute("title", "回复");
				small_reply.setAttribute("alt", json.id);
				small_strong.appendChild(small_reply);

				var small_reply_area = document.createElement('div');
				small_reply_area.className = "small_reply_area";
				var small_reply_input = document.createElement('div');
				small_reply_input.setAttribute("contenteditable", "true");
				small_reply_input.className = "small_reply_input";
				$(small_reply).click(replyClick);

				small_reply_area.appendChild(small_reply_input);

				var small_reply_bt = document.createElement('input');
				small_reply_bt.setAttribute("type", "button");
				small_reply_bt.className = "small_reply_bt";
				small_reply_bt.value = "评论";
				small_reply_bt.setAttribute("alt", json.commentId);
				$(small_reply_bt).click(sendReplyCom);
				small_reply_area.appendChild(small_reply_bt);

				if (json.commentId != undefined) {
					
					var small_remove = document.createElement("a");
					small_remove.setAttribute("alt", json.commentId);
					small_remove.className = "remove_com";
					$(small_remove).text( "删除");
					$(small_remove).click(removeClick);
					small_strong.appendChild(small_remove);
				}

				element.appendChild(small_strong);
				element.appendChild(small_reply_area);
				$("h5", that.parentNode).append(element);
				var count = $(that.parentNode).prev().find(".view_com b");
				count.text(parseInt(count.text()) + 1);
				$(element).slideDown(300);
			} catch (e) {
				$.notice("viki提醒你!","评论失败!");
			}
		}
	});
}

function stopScroll(event) {
	stopEvent(event);
}

function removeLog() {
	var that = this;
	var obj = {
		title: "<strong class='font-szie:13px;font-weight:300;color:#FB662E' >VIKI提醒您</strong>",
		body: "<p >您真的要删除该文章吗？</p>",
		bt: {
			okVal: "确定",
			noVal: "取消",
			okFn: function() {
				removeLogT(that);
			},
			noFn: function() {
				return false;
			}
		}
	};
	$.texi(obj);
}

function removeLogT(that) {
		that.disabled = true;
		$.ajax({
			url: "/myHome/user/function_removeDiary",
			method: 'get',
			timeout:5000,
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			data: {
				'userId': that.getAttribute("alt")
			},
			success: function(text) {
				that.disabled = false;
				if (text == "removeDiary is ok") {
					var temp = $(that.parentNode.parentNode).slideUp(300, function() {
						this.remove();
					});
				} else {
					$.notice("viki提醒你!","删除日记失败!");
				}
			},
			error:function(){
				$.notice("viki提醒你!","删除日记失败!");
			}
		});
	}
	//======================

function removeClick() {
	var that = this;
	that.disabled = true;
	$.ajax({
		url: "/myHome/user/comment_remove",
		method: 'get',
		timeout:5000,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			'id': this.getAttribute("alt")
		},
		success: function(text) {
			if (text == "remove is ok") {
				that.disabled = false;
				var temp = $(that.parentNode.parentNode).slideUp(300, function() {
					var count = $(that.parentNode.parentNode.parentNode.parentNode).prev().find(".view_com b").eq(0);
					count.html(parseInt(count.html()) - 1);
					temp.remove();
				});
			} else {
				$.notice("viki提醒你!","删除评论失败!");
			}
		},error:function(){
			$.notice("viki提醒你!","删除日记失败!");
		}
	});
}

function sendSmallSpeak(that) {
	var content = $("#shuoshuo");
	var contentText = content.text().isEmpty();
	if (contentText.length <= 0) {
		content.css({
			border: "1px solid #FF4700"
		}).shake(function() {
			content.css({
				border: "1px solid #dedede"
			});
		});
		return
	}
	that.disabled = true;
	$.ajax({
		url: "/myHome/user/function_saveSpeak",
		method: 'post',
		timeout:5000,
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		data: {
			'userlog.logName': "微说",
			'userlog.noHtmlLog': contentText,
			'userlog.visible': true,
			token: that.getAttribute("alt")
		},
		success: function(text) {
			that.disabled = false;
			try {
				json = JSON.parse(text);
				try {
					if ($(".userNotice").remove());
				} catch (e) {
					// TODO: handle exception
				}
				createUserCon(JSON.parse(text),$("home_content_display"));
			} catch (e) {
				$.notice("viki提醒你!","发布失败!");
			}
		},
		error:function(){
			$.notice("viki提醒你!","发布失败!");
		}
	});
}


function createUserCon(json, element) {
	var prentEL = $(".home_content_display");
	var flag = window.authority != 0;
	var log_div, userPhoto, logDate, logName, logContent, content_div, linkContent, com_div, deleteLog, spanEdit,
		edit, visibel, comment, cbox, cbox_h5, cbox_area, cbox_input, cbox_dis, cbox_b, loadbox;
	var _doc = document;
	for (var j = 0; j < json.length; j++) {
		//创建日记div
		log_div = _doc.createElement("div");
		log_div.className = "con_user_box";
		log_div.style.display = "none";
		//加载用户头像
		userPhoto = _doc.createElement("img");
		userPhoto.src = "/myHome/load/download_getSmallPhoto?id=" + json[j].user[0].id;
		userPhoto.className = "user_photo";
		userPhoto.width = "40";
		userPhoto.height = "40";
		//创建日期
		logDate = _doc.createElement("span");
		$(logDate).text(json[j].modifyDate);
		//创建动态作者
		logName = _doc.createElement("a");
		$(logName).text(json[j].user[0].name);
		logName.className = "user_name";
		logName.setAttribute("href", "/myHome/user/space/" + json[j].user[0].account + "/");
		logName.setAttribute("target", "_blank");
		//创建动态内容
		logContent = _doc.createElement("div");
		logContent.className = "content_user_li";
		if (json[j].logName != decodeURIComponent("微说")) {
			$(logContent).html("<strong class='logTitle'>《" + json[j].logName + "》</strong><br>");
		}
		content_div = _doc.createElement("div");
		$(content_div).text( json[j].noHtmlLog);

		logContent.appendChild(content_div);

		linkContent = _doc.createElement("a");
		linkContent.appendChild(logContent);
		if (json[j]["smallSpeak"] == "false") {
			linkContent.setAttribute("href", "/myHome/user/function_readDiary?userId=" + json[j].id);
		}
		linkContent.setAttribute("target", "_blank");

		//评论框
		com_div = _doc.createElement("div");
		com_div.className = "comment_box";
		if (flag) {
			deleteLog = _doc.createElement("span");
			$(deleteLog).text("删除");
			deleteLog.setAttribute("alt", json[j].id);
			$(deleteLog).click(removeLog);
			com_div.appendChild(deleteLog);
			if (json[j]["smallSpeak"] == "false") {
				spanEdit = _doc.createElement("span");
				edit = _doc.createElement("a");
				$(edit).text("编辑");
				edit.setAttribute("target", "_blank");
				edit.setAttribute("href", "/myHome/user/function_modifyDiary?userId=" + json[j].id);
				spanEdit.appendChild(edit);
				com_div.appendChild(spanEdit);
			}
		}
		visibel = _doc.createElement("span");
		$(visibel).text( "浏览(" + json[j].visibleNum + ")");
		comment = _doc.createElement("span");
		comment.innerHTML = "评论(<b>" + json[j].commentNum + "</b>)";
		comment.setAttribute("alt", json[j].id);
		comment.className = "view_com";
		com_div.appendChild(comment);
		com_div.appendChild(visibel);
		$(comment).click(comClick);
		//评论区
		cbox = _doc.createElement("div");
		cbox.className = "comment";
		cbox_h5 = _doc.createElement("h5");
		$(cbox_h5).text("评论：");
		cbox_area = _doc.createElement("div");
		cbox_area.setAttribute("contenteditable", "true");
		cbox_area.className = "commentArea";


		cbox_input = _doc.createElement("input");
		cbox_input.value = "评论";
		cbox_input.setAttribute("type", "button");
		cbox_input.className = "sendComment";
		cbox_input.setAttribute("alt", json[j].id);
		$(cbox_input).click(sendClick);
		cbox_dis = _doc.createElement("div");
		cbox_dis.className = "displayComment";
		cbox_b = _doc.createElement("b");
		cbox_b.className = "cut_out";
		$(cbox_b).text("↑  收起");
		$(cbox_b).click(cutClick);
		loadbox = _doc.createElement("div");
		$(loadbox).text("正在拼了命的,为您加载!");
		loadbox.className = "load_box";

		cbox.appendChild(cbox_h5);
		cbox.appendChild(cbox_area);
		cbox.appendChild(cbox_input);
		cbox.appendChild(cbox_dis);
		cbox.appendChild(loadbox);
		cbox.appendChild(cbox_b);

		log_div.appendChild(userPhoto);
		log_div.appendChild(logDate);
		log_div.appendChild(logName);
		log_div.appendChild(linkContent);
		log_div.appendChild(com_div);
		log_div.appendChild(cbox);
		if(element!=null){
			$(log_div).insertAfter($("#addContent")).slideDown(300);
		}else{
			$(log_div).appendTo(".home_content_display").slideDown(300);
		}
	}
};