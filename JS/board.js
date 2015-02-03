/**
 * 
 */

windowLoad(load);
function load(){
	
	$Base("body").event("click", function(evt){
		var node=getEvtObj(evt);
		if(node.className.indexOf('pointPanel')==-1){
			$Base(".colorPanel").hide();
		}	
		try {
			if(node.parentNode.className.indexOf('select')==-1){
				$Base(".select ul").hide();
			}
		} catch (e) {	}	
	});
	
	
	$Base("#backcolor").appendChild($Base(".colorPanel").cloneNode(true));
	$Base(".select span").event("click", function(evt){	
		var temp=$Base(this).getNext();		
		if(temp.css("display")=="none"){
			$Base(".select ul").hide();
			$Base(".colorPanel").hide();
			temp.show();
		}else{
			$Base(this).getNext().hide();
		}
	});	
	$Base(".select").hover(function(){
		this.style.border="1px solid #02ABE3";
	}, function(){
		this.style.border="1px solid #CCCCCC";
	});
	
	$Base(".pointPanel").event("click", function(evt){	
		var temp=$Base(this).getNext();	
		if(temp.css("display")=="none"){
			$Base(".select ul").hide();
			$Base(".colorPanel").hide();
			temp.show();
			$Base(".colorStatu").css({
				background:""
			});
		}else{
			temp.hide();
		}
	});	

	$Base(".trimColor").event("click", function(){
		window.iframeDocument.execCommand(this.parentNode.parentNode.id,false, "#FFFFFF");
		$Base(".colorStatu").css({
			background:"#ffffff"
		});
		$Base(".colorPanel").hide();
	});
	
	$Base(".select ul li").event("click", clickSelect);
		
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

	
	$Base(".smallBox").tabEvent(function(evt){	
		window.iframeDocument.execCommand(this.getAttribute("title"),false,0);
		$Base(this).css({
			background: '#ffffff',
			border:'1px solid #ECECEC'
		});	
	},function(evt){
		window.iframeDocument.execCommand(this.getAttribute("title"),false,0);
		$Base(this).css({
			background: '',
			border:'1px solid #f6f6f6'
		});	
	});

//	$Base(document.forms['createText'].save).event("click", function(){	
//		sendDiary.call(this,false);
//	});
//	$Base(document.forms['createText'].saveDraft).event("click", function(){	
//		sendDiary.call(this,true);
//	});
	$Base(".colorPanel ul li").event("mouseover", function(evt){
		$Base(".colorStatu").css({background:this.style.background});
	}).event("click", function(){
		window.iframeDocument.execCommand(this.parentNode.parentNode.parentNode.id, false,this.getAttribute("title"));
		$Base(".colorPanel").hide();
	});

}

function sendDiary(draft,evt,url_u){
	if($Base(window.iframeDocument.getElementsByTagName("body")[0]).innerText().isEmpty().length<=0){			
		notice("文章内容不能为空");
		return
	}
	stateAjax({
		url:"/myHome/user/function_"+url_u,
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'userlog.logName':encodeURIComponent( $Base("#title").get(0,true).value),
			'userlog.logContent':encodeURIComponent($Base(window.iframeDocument.getElementsByTagName("body")[0]).innerHTML()),
			'userlog.visible':($Base("#visible").innerHTML()=="所有人可见"),
			'userlog.type':encodeURIComponent($Base("#type").get(0,true).value),
			token:$Base("#token").get(0,true).value,
			'userlog.id':document.getElementById("token").getAttribute("title"),
			'userlog.noHtmlLog':$Base(window.iframeDocument.getElementsByTagName("body")[0]).innerText()
		},
		run:function(text){
			if(text.isEmpty()=='save user log ok'){			
				notice(draft ? '草稿保存成功' :"发布成功,即将跳转！",function(){						
					if(draft){
						 window.location.assign("/myHome/user/user_draft");
					}else{
						 window.location.assign("/myHome/user/space/"+evt.getAttribute("alt")+"/diary");
					}
				});
			}else{
				notice("发布失败");
			}
		}
	});	
}
function clickSelect() {
	$Base(this.parentNode).getPrevious().innerHTML(this.innerHTML);
	try {
		window.iframeDocument.execCommand(this.parentNode.parentNode.id, false,this.getAttribute("title"));
	} catch (e) {}
	
	$Base(this.parentNode).hide();
}
function box(){
	var bodyH=$Base(window.iframeDocument.getElementsByTagName("body")[0]).css("height");
	if(parseInt(bodyH)>480){
		window.iframe.style.height=bodyH;
	}
}