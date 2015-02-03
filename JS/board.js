/**
 * 
 */

$(load);
function load(){
	
	$("body").on("click", function(evt){
		var node=getEvtObj(evt);
		if(node.className.indexOf('pointPanel')==-1){
			$(".colorPanel").hide(300);
		}	
		try {
			if(node.parentNode.className.indexOf('select')==-1){
				$(".select ul").hide(300);
			}
		} catch (e) {	}	
	});
	
	
	$("#backcolor").append($(".colorPanel").clone(true));
	$(".select span").on("click", function(evt){	
		var temp=$(this).next();		
		if(temp.css("display")=="none"){
			$(".select ul").hide(300);
			$(".colorPanel").hide(300);
			temp.show(300);
		}else{
			$(this).next().hide(300);
		}
	});	
	$(".select").hover(function(){
		this.style.border="1px solid #02ABE3";
	}, function(){
		this.style.border="1px solid #CCCCCC";
	});
	
	$(".pointPanel").on("click", function(evt){	
		var temp=$(this).next();	
		if(temp.css("display")=="none"){
			$(".select ul").hide(300);
			$(".colorPanel").hide(300);
			temp.show(300);
			$(".colorStatu").css({
				background:""
			});
		}else{
			temp.hide(300);
		}
	});	

	$(".trimColor").on("click", function(){
		window.iframeDocument.execCommand(this.parentNode.parentNode.id,false, "#FFFFFF");
		$(".colorStatu").css({
			background:"#ffffff"
		});
		$(".colorPanel").hide(300);
	});
	
	$(".select ul li").on("click", clickSelect);
		
	window.iframe = document.createElement("iframe");
	window.iframe.style.width = "903px";
	window.iframe.style.height = "480px";
	window.iframe.style.margin = "10px 40px";
	window.iframe.frameborder="0" ;
	window.iframe.scroll="no" ;
	window.iframe.tabindex="20";
	
	//"this.height =   document.frames["ifrname"].document.body.scrollHeight" id="ifrid"   scrolling=""
	
	document.getElementById("context").appendChild(window.iframe);
	window.iframeDocument = window.iframe.contentDocument|| window.iframe.contentWindow.document;
	//contenteditable="true"
	//window.iframeDocument.designMode = "on";
	window.iframeDocument.open();
	window.iframeDocument.write('<html xmlns="http://www.w3.org/1999/xhtml"><head>'+	
			'<script type="text/javascript" src="/myHome/JS/tool/span.js"></script>'+		
			'<script type="text/javascript" src="/myHome/JS/tool/box.js"></script>'+
			'</head>'+
			'<body  contenteditable="true" spellcheck="true" style="background:#FFFFFF; overflow:hidden; height:auto;width:100%;word-break : break-all;padding:0;border:0;">'+
			document.getElementById("textarea").value+'</body></html>'
	);

	window.iframeDocument.close();

	
	$(".smallBox").tabEvent(function(evt){	
		window.iframeDocument.execCommand(this.getAttribute("title"),false,0);
		$(this).css({
			background: '#ffffff',
			border:'1px solid #ECECEC'
		});	
	},function(evt){
		window.iframeDocument.execCommand(this.getAttribute("title"),false,0);
		$(this).css({
			background: '',
			border:'1px solid #f6f6f6'
		});	
	});
	$(".colorPanel ul li").on("mouseover", function(evt){
		var that=this;
		$(".colorStatu").css({background:that.style.background});
	}).on("click", function(){
		var that=this;
		window.iframeDocument.execCommand(that.parentNode.parentNode.parentNode.id, false,that.getAttribute("title"));
		$(".colorPanel").hide(300);
	});

}

function sendDiary(draft,evt,url_u){
	if($(window.iframeDocument.getElementsByTagName("body")[0]).text().isEmpty().length<=0){			
		$.notice("viki提醒您！","文章内容不能为空");
		return
	}
	$.ajax({
		url:"/myHome/user/function_"+url_u,
		method : 'post',
		data : {
			'userlog.logName':$("#title").val(),
			'userlog.logContent':$(window.iframeDocument.getElementsByTagName("body")[0]).html(),
			'userlog.visible':($("#visible").text().isEmpty()=="所有人可见"),
			'userlog.type':$("#type").val(),
			token:$("#token").val(),
			'userlog.id':document.getElementById("token").getAttribute("title"),
			'userlog.noHtmlLog':$(window.iframeDocument.getElementsByTagName("body")[0]).text()
		},
		success:function(text){
			if(text.isEmpty()=='save user log ok'){			
				$.notice("Viki提醒您",draft ? '草稿保存成功' :"发布成功,即将跳转！",1500,function(){						
					if(draft){
						 window.location.href="/myHome/user/user_draft";
					}else{
						window.location.href="/myHome/user/space/"+evt.getAttribute("alt")+"/diary";
					}
				});
			}else{
				$.notice("Viki提醒您","发布失败");
			}
		}
	});	
}
function clickSelect() {
	$(this.parentNode).prev().html(this.innerHTML);
	try {
		window.iframeDocument.execCommand(this.parentNode.parentNode.id, false,this.getAttribute("title"));
	} catch (e) {}
	
	$B(this.parentNode).hide(300);
}
function box(){
	var bodyH=$(window.iframeDocument.getElementsByTagName("body")[0]).css("height");
	if(parseInt(bodyH)>480){
		window.iframe.style.height=bodyH;
	}
}