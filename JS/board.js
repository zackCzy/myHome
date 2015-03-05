$(function() {
	var o = UM.getEditor("myEditor");
	function n() {
		enableBtn()
	}
	function a() {
		return o.getAllHtml()
	}
	function h() {
		return o.getContent()
	}
	function c() {
		return o.getPlainTxt()
	}
	function d(q, p) {
		o.setContent(q, p)
	}
	function k() {
		o.setDisabled("fullscreen");
		disableBtn("enable")
	}
	function e() {
		o.setEnabled();
		enableBtn()
	}
	function m() {
		return o("myEditor").getContentTxt()
	}
	function g() {
		return o.hasContents()
	}
	function i() {
		o.focus()
	}
	function l() {
		disableBtn();
		o.destroy()
	}
	function j(p) {
		var q = prompt(p, "");
		o.execCommand("insertHtml", q)
	}
	function b() {
		return o.execCommand("getlocaldata")
	}
	var f = $("#logContentHiddent");
	if ($("#logContentHiddent").text().isEmpty().length > 0) {
		d(f.html())
	}
	f = null;
	sendDiary = function(r, q, p) {
		if (!g()) {
			$.notice("viki提醒您！", "文章内容不能为空");
			return
		}
		$
				.ajax({
					url : BASE_PATH + "/user/function_" + p,
					method : "post",
					data : {
						"userlog.logName" : $("#title").val(),
						"userlog.logContent" : h(),
						"userlog.visible" : ($("#visible").text().isEmpty() == "所有人可见"),
						"userlog.type" : $("#type").val(),
						token : $("#token").val(),
						"userlog.id" : document.getElementById("token")
								.getAttribute("title"),
						"userlog.noHtmlLog" : c()
					},
					success : function(s) {
						if (s.isEmpty() == "save user log ok") {
							$.notice("Viki提醒您", r ? "草稿保存成功" : "发布成功,即将跳转！",
									1500, function() {
										if (r) {
											window.location.href = BASE_PATH
													+ "/user/user_draft"
										} else {
											window.location.href = BASE_PATH
													+ "/user/space/"
													+ q.getAttribute("alt")
													+ "/diary"
										}
									})
						} else {
							$.notice("Viki提醒您", " ")
						}
					}
				})
	};
	$(".select").on("click", function(p) {
		var q = $("ul", this);
		if (q.css("display") == "none") {
			$(".select ul").hide(300);
			$(".colorPanel").hide(300);
			q.show(300);
		} else {
			q.hide(300);
		}
	});
	$(".select ul li").on("click", function(p) {
		$("#visible").text($(this).text().isEmpty());
	});
	$(".select").hover(function() {
		this.style.border = "1px solid #02ABE3"
	}, function() {
		this.style.border = "1px solid #CCCCCC"
	})
});