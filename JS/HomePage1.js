/**
 * 
 */

windowLoad(load);

function load(){
	window.authority=document.getElementById("authority");
	var mypage=1;
	document.body.scrollTop=0;
	document.documentElement.scrollTop=0;
	try {
		$Base(".view_com").event("click", comClick);
		$Base(".remove_log").event( "click", removeLog);	
		$Base(".cut_out").event("click",cutClick);
		$Base(".sendComment").event( "click", sendClick);
	} catch (e) {
		// TODO: handle exception
	}
	
	$Base(window).event("scroll", function(){
		var clientHeight = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;
		var scrollTop = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
		var scrollHeight = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
		if(scrollTop<29&&$Base(".Home_page_nav").css("position")=="fixed"){
			$Base(".Home_page_nav").css({
				position:"",
				marginTop:"30px"
			});
		}else if(scrollTop>29){
			$Base(".Home_page_nav").css({
				position:"fixed",
				top:"0px",
				marginTop:"0"
			});
		}
		
		if(scrollTop>clientHeight*2){
			$Base("#returnHead").css({
				bottom:'30px'
			}).active({step:10,t:30,async:{o:100}}).show();
		}else{
			$Base("#returnHead").active({step:10,t:30,async:{o:0}}).hide();
		}
		if(clientHeight+scrollTop+30>=scrollHeight){
			
			if(!window.scrollflag){
				$Base(".point_load_status").show();		
				window.scrollflag=true;
				ajax();			
			}	
		}
		
	});
	$Base("#returnHead").event("click", function(evt){
		if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0){
			document.onmousewheel = function()
			{return false;};
		}
		else{document.addEventListener("DOMMouseScroll",stopScroll ,false);
		}
		addEvent(document, "click", stopScroll);
		var that=this;
		$Base("body").active({
			step:10,
			t:30,
			attr:'s',
			target:0,
			fn:function(){
				 if(navigator.userAgent.indexOf("MSIE")>0||navigator.userAgent.indexOf("Chrome")>0)
				 {document.onmousewheel = function(){return true;};}
				 else{document.removeEventListener("DOMMouseScroll",stopScroll ,false);}
				 removeEvent(document, "click", stopScroll);
			}
		});		
	});
	function ajax(){ 
		stateAjax({
			url:"/myHome/user/function_getDraft",
			method : 'get',
			async : true,
			message : {page:++mypage,
							userId:document.getElementById("space_user_id").value,
							newSport:document.getElementById("space_user_pd").value
			},		
			run:function(text){
				$Base(".point_load_status").hide();
				json=JSON.parse(text);
				if(json.length>0){
					createUserCon(JSON.parse(text));
					window.scrollflag=false;
				}
			}
		});			
	}


}
//搜索评论
function comClick(){
	
	var that=$Base(this).getParent().getNext();
	if(parseInt(this.children[0].innerHTML)>0&&that.get(0,true).alt!="true"){
		that.get(0,true).children[4].style.display="block";
		stateAjax({
			url:"/myHome/json/com_com",
			method : 'get',
			head:{"Accept-Charset":"UTF-8"},
			async : true,
			message : {logId:this.getAttribute("alt")},
			run:function(text){
				that.get(0,true).alt="true";
				var temp=JSON.parse(text);
				that.get(0,true).children[4].style.display="none";
				var disCom=that.get(0,true).children[3];
				for ( var i = 0; i < temp.length; i++) {
					
					var smallCom=document.createElement("div");
					smallCom.className="smallCom";
					var small_span=document.createElement("span");
					var small_img=document.createElement("img");
					small_img.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+temp[i].id);
					small_span.appendChild(small_img);
					small_span.className="userPhoto";
					var small_b=document.createElement("a");
					small_b.innerHTML=temp[i].name+":";
					small_b.setAttribute("href","/myHome/user/space/"+temp[i].account+"/");
					small_b.setAttribute("target","blank");
					var small_div=document.createElement("div");
					small_div.innerHTML=temp[i].comText;
	
					
					var small_strong=document.createElement('strong');
					small_date=document.createElement('span');		
					small_date.innerHTML=temp[i].date;
					small_strong.appendChild(small_date);
					var small_reply=document.createElement('span');
					small_reply.style.background="url('/myHome/image/reply_ico.png') no-repeat";
					small_reply.style.width="19px";
					small_reply.style.height="17px";
					small_reply.style.marginTop="5px";
					small_reply.setAttribute("title", "回复");
					small_reply.setAttribute("alt",temp[i].id);
					small_strong.appendChild(small_reply);
					
					var small_reply_area=document.createElement('div');
					small_reply_area.className="small_reply_area";						
					var small_reply_input=document.createElement('div');					
					small_reply_input.setAttribute("contenteditable","true");
					small_reply_input.className="small_reply_input";			
					addEvent(small_reply, "click", replyClick);
					
					small_reply_area.appendChild(small_reply_input);
					
					var small_reply_bt=document.createElement('input');
					small_reply_bt.setAttribute("type", "button");
					small_reply_bt.className="small_reply_bt";
					small_reply_bt.value="评论";
					small_reply_bt.setAttribute("alt",temp[i].commentId);
					addEvent(small_reply_bt, "click", sendReplyCom);
					small_reply_area.appendChild(small_reply_bt);
					
					
					if(temp[i].comId!=undefined){
						var small_remove=document.createElement("a");
						small_remove.setAttribute("alt",temp[i].comId);
						small_remove.className="remove_com";
						small_remove.innerHTML="删除";
						addEvent(small_remove, "click", removeClick);
						small_strong.appendChild(small_remove);
					}					
					smallCom.appendChild(small_span);
					smallCom.appendChild(small_b);
					smallCom.appendChild(small_div);
					smallCom.appendChild(small_strong);//--------------------------------------------------
					for ( var n = 0; n < temp[i].reviewewCom.length; n++) {
						var reply_area=document.createElement('div');
						reply_area.className="reply";					
						//回复头像
						var reply_photo_area=document.createElement('span');
						reply_photo_area.className="userPhoto";
						var reply_photo=document.createElement('img');
						reply_photo.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+temp[i].reviewewCom[n].id);
						reply_photo_area.appendChild(reply_photo);
						//回复名称
						var reply_name=document.createElement('a');
						reply_name.innerHTML=temp[i].reviewewCom[n].comName+"回复"+temp[i].reviewewCom[n].name;
						//回复内容
						var reply_content=document.createElement('div');
						reply_content.innerHTML=temp[i].reviewewCom[n].comText;
						//回复时间
						var reply_strong=document.createElement('strong');
						var reply_date=document.createElement('span');		
						reply_date.innerHTML=temp[i].reviewewCom[n].date;
						var reply_reply=document.createElement('span');
						reply_reply.style.background="url('/myHome/image/reply_ico.png') no-repeat";
						reply_reply.style.width="19px";
						reply_reply.style.height="17px";
						reply_reply.style.marginTop="5px";
						reply_reply.setAttribute("title", "回复");
						reply_reply.setAttribute("alt",temp[i].reviewewCom[n].id);
						addEvent(reply_reply,"click",replyCommentClick);
						reply_strong.appendChild(reply_date);
						reply_strong.appendChild(reply_reply);//------------------------------------------
						
						//再次回复
						var reply_area_two=document.createElement('div');
						reply_area_two.className="small_reply_area";	
						reply_area_two.style.marginLeft="55px";
						reply_area_two.style.width="405px";
						var reply_input=document.createElement('div');
						reply_input.className="small_reply_input";
						reply_input.setAttribute("contenteditable","true");
						reply_input.style.width="373px";
						var reply_input_bt=document.createElement('input');
						reply_input_bt.setAttribute("type","button");
						reply_input_bt.className="small_reply_bt";
						reply_input_bt.value="评论";
						reply_input_bt.setAttribute("alt",temp[i].commentId);
						addEvent(reply_input_bt,"click",sendReplyCom);
						
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
	if(that.css("display")=="none"){
		that.show();
		var heights=that.css('height');
		that.css({'height':'0px'}).active({
			step:10,t:30,async:{o:100,h:parseInt(heights)},fn:function(){
				that.css({height:"auto"});
			}
		});
	}else {
		that.active({
			step:10,t:30,async:{o:0,h:0},fn:function(){
				that.css({height:"auto"}).hide();
			}
		});
	}
}
function notice(text, fun) {
	var temp = $Base("#point").setCenter().show().css({
		top:"0"
	}).active({
		step : 10,t : 30,
		async : {o : 100,h : 130},
		fn : function() {
			setTimeout(function() {
				temp.active({step : 10,t : 30,async : {o : 0,h : 0},
					fn : function() {
						temp.hide();
						if (typeof fun == 'function')
							fun();}
				});
			}, 1000);
		}
	});
	$Base("#point_cont").innerHTML(text);
}
function replyClick(){
	$Base(".small_reply_area").hide();	
	var temp=$Base(this.parentNode.parentNode.lastChild).show();
	temp.setAttribute("alt",this.getAttribute("alt"));
}
function cutClick(){
	var that=$Base(this).getParent();
	var postion=parseInt(getScroll().top)-parseInt(that.css("height"));
	that.active({
		step:10,t:30,async:{o:0,h:0,s:postion},fn:function(){
			that.css({height:"auto"}).hide();
		}
	});
}
function sendReplyCom(){
	var that=this;
	that.disabled=true;
	var date=new Date();
	stateAjax({
		url:"/myHome/user/comment_saveReviewewComment",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'rc.content':encodeURIComponent($Base(that).getPrevious().innerText()),
			'commentID':that.getAttribute("alt"),
			'userId':$Base(that).getParent().getAttribute("alt")
		},
		run:function(text){
			that.disabled=false;
			try {
				var json=JSON.parse(text);
				
				var reply_area=document.createElement('div');
				reply_area.className="reply";					
				//回复头像
				var reply_photo_area=document.createElement('span');
				var reply_photo=document.createElement('img');
				reply_photo.setAttribute("src","/myHome/load/download_getSmallPhoto?id="+json.comUserID);
				reply_photo_area.appendChild(reply_photo);
				reply_photo_area.className="userPhoto";
				//回复名称
				var reply_name=document.createElement('a');
				reply_name.innerHTML=json.userName+" 回复 "+json.replyName;
				//回复内容
				var reply_content=document.createElement('div');
				reply_content.innerHTML=$Base(that).getPrevious().innerText();
				//回复时间
				var reply_strong=document.createElement('strong');
				var reply_date=document.createElement('span');		
				reply_date.innerHTML=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes();
				
				var reply_reply=document.createElement('span');
				reply_reply.style.background="url('/myHome/image/reply_ico.png') no-repeat";
				reply_reply.style.width="19px";
				reply_reply.style.height="17px";
				reply_reply.style.marginTop="5px";
				reply_reply.setAttribute("title", "回复");
				reply_reply.setAttribute("alt", json.comUserID);
				addEvent(reply_reply,"click",replyCommentClick);
				reply_strong.appendChild(reply_date);
				reply_strong.appendChild(reply_reply);
				
				//再次回复
				var reply_area_two=document.createElement('div');
				reply_area_two.className="small_reply_area";	
				reply_area_two.style.marginLeft="55px";
				reply_area_two.style.width="405px";
				var reply_input=document.createElement('div');
				reply_input.className="small_reply_input";
				reply_input.setAttribute("contenteditable","true");
				reply_input.style.width="373px";
				var reply_input_bt=document.createElement('input');
				reply_input_bt.setAttribute("type","button");
				reply_input_bt.className="small_reply_bt";
				reply_input_bt.value="评论";
				reply_input_bt.setAttribute("alt",json.commentId);
				addEvent(reply_input_bt,"click",sendReplyCom);
				
				reply_area_two.appendChild(reply_input);
				reply_area_two.appendChild(reply_input_bt);
					
				reply_area.appendChild(reply_photo_area);
				reply_area.appendChild(reply_name);
				reply_area.appendChild(reply_content);
				reply_area.appendChild(reply_strong);
				reply_area.appendChild(reply_area_two);
				try {
					var parentTemp=$Base(that).getParent().getParent();
					if(parentTemp.className()!="smallCom"){
						parentTemp=parentTemp.getParent();
					}
					parentTemp.insertBefore(reply_area,parentTemp.get(0,true).lastChild);
				} catch (e) {
				}	
				
			} catch (e) {
				notice("评论失败!");
			}
			
		}
	});	
}
function replyCommentClick(){
	$Base(".small_reply_area").hide();
	var temp=$Base(this).getParent().getNext().show();
	temp.setAttribute("alt",this.getAttribute("alt"));
}
function sendClick(){
	var that=this;
	if($Base(that).getPrevious().innerText().length<=0){
		var temp=$Base(that).getPrevious().css({"border":"1px solid #ff4700"}).shake(function(){
			temp.css({"border":"1px solid #DEDEDE"});
		},1);
		return;
	}	
	that.disabled=true;
	var date=new Date();
	stateAjax({
		url:"/myHome/user/comment_save",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'c.content':encodeURIComponent($Base(that).getPrevious().innerText()),
			'id':$Base(that).get(0,true).alt
		},
		run:function(text){
			that.disabled=false;
			try {
				var json=JSON.parse(text);	

				var element=document.createElement('div');
				element.setAttribute("class", 'smallCom');
				var span=document.createElement('span');
				var img=document.createElement('img');
				img.src="/myHome/load/download_getSmallPhoto?id="+json.id;
				span.appendChild(img);
				span.className="userPhoto";
				element.appendChild(span);
				var bo=document.createElement('a');			
				bo.innerHTML=json.spaceName+":";
				bo.setAttribute("target","blank");
				bo.setAttribute("href","/myHome/user/space/"+json.name+"/");
				element.appendChild(bo);
				var divo=document.createElement('div');
				divo.innerHTML=$Base(that).getPrevious().innerText();
				element.appendChild(divo);
								
				var small_strong=document.createElement('strong');
				small_date=document.createElement('span');		
				small_date.innerHTML=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes();;
				small_strong.appendChild(small_date);
				var small_reply=document.createElement('span');
				small_reply.style.background="url('/myHome/image/reply_ico.png') no-repeat";
				small_reply.style.width="19px";
				small_reply.style.height="17px";
				small_reply.style.marginTop="5px";
				small_reply.setAttribute("title", "回复");
				small_reply.setAttribute("alt",json.id);
				small_strong.appendChild(small_reply);
				
				var small_reply_area=document.createElement('div');
				small_reply_area.className="small_reply_area";						
				var small_reply_input=document.createElement('div');					
				small_reply_input.setAttribute("contenteditable","true");
				small_reply_input.className="small_reply_input";			
				addEvent(small_reply, "click", replyClick);
				
				small_reply_area.appendChild(small_reply_input);
				
				var small_reply_bt=document.createElement('input');
				small_reply_bt.setAttribute("type", "button");
				small_reply_bt.className="small_reply_bt";
				small_reply_bt.value="评论";
				small_reply_bt.setAttribute("alt",json.commentId);
				addEvent(small_reply_bt, "click", sendReplyCom);
				small_reply_area.appendChild(small_reply_bt);
				
				
				
				if(json.comId!=undefined){
					var small_remove=document.createElement("a");
					small_remove.setAttribute("alt",json.comId);
					small_remove.className="remove_com";
					small_remove.innerHTML="删除";
					addEvent(small_remove, "click", removeClick);
					small_strong.appendChild(small_remove);
				}
				
				element.appendChild(small_strong);	
				element.appendChild(small_reply_area);	
				var parent=$Base(that).getNext().get(0,true);
				
				parent.insertBefore(element,parent.firstChild);
				var count=$Base(that).getParent().getPrevious().get(0,true).getElementsByTagName("b")[0];
				$Base(count).innerHTML(parseInt($Base(count).innerHTML())+1);
			} catch (e) {
				notice("评论失败!");
			}
			
		}
	});	
}
function stopScroll(event) {
	stopEvent(event);
}
function removeLog(){
	var that=this;
	that.disabled=true;
	stateAjax({
		url:"/myHome/user/function_removeDiary",
		method : 'get',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'userId':this.getAttribute("alt")
		},
		run:function(text){
			that.disabled=false;
			if(text=="removeDiary is ok"){
				var temp=$Base(that).getParent().getParent().active({
					step:10,
					t:30,
					async:{
						h:"0",
						o:"0",
						mb:"0",
						mt:"0",
						pt:"0",
						pb:"0"
					},fn:function(){
						temp.remove();
					}
				});
			}else{
				notice("删除日记失败!");
			}
		}
	});
	
}
function removeClick(){
	var that=this;
	that.disabled=true;
	stateAjax({
		url:"/myHome/user/comment_remove",
		method : 'get',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'id':this.getAttribute("alt")
		},
		run:function(text){
			if(text=="remove is ok"){
				that.disabled=false;
				var temp=$Base(that).getParent().getParent().active({
					step:10,t:10,async:{h:0,o:0,mt:0},fn:function(){		
						var count=$Base(that).getParent().getParent().getParent().getParent().getPrevious().get(0,true).getElementsByTagName("b")[0];
						$Base(count).innerHTML(parseInt($Base(count).innerHTML())-1);
						temp.remove();
					}
				});
			}else{
				notice("删除评论失败!");
			}
		}
	});
}
function sendSmallSpeak(that){
	var content=$Base("#shuoshuo");
	if(content.innerText().isEmpty().length<=0){			
		content.css({
			border:"1px solid #FF4700"
		}).shake(function(){
			content.css({
				border:"1px solid #dedede"
			});
		});
		return
	}
	that.disabled=true;
	stateAjax({
		url:"/myHome/user/function_saveSpeak",
		method : 'post',
		head:{"Accept-Charset":"UTF-8"},
		async : true,
		message : {
			'userlog.logName':encodeURIComponent( "微说"),
			'userlog.noHtmlLog':encodeURIComponent(content.innerText()),
			'userlog.visible':true,
			token:that.getAttribute("alt")
		},
		run:function(text){
			that.disabled=false;
			try {
				json=JSON.parse(text);
				try {
					if($Base(".userNotice").remove());
				} catch (e) {
					// TODO: handle exception
				}
				
				createUserCon(JSON.parse(text),$Base(".con_user_box").get(0, true));
			} catch (e) {
				notice("发布失败!");
			}
		}
	});
}

function createUserCon(json,element){
	var prentEL=$Base(".home_content_display");
	var flag=window.authority!=undefined;
	for ( var j = 0; j <json.length; j++) {
		//创建日记div
		var log_div=document.createElement("div");
		log_div.className="con_user_box";
		//加载用户头像
		var userPhoto=document.createElement("img");
		userPhoto.src="/myHome/load/download_getSmallPhoto?id="+json[j].user[0].id;
		userPhoto.className="user_photo";
		userPhoto.width="40";
		userPhoto.height="40";
		//创建日期
		var logDate=document.createElement("span");
		logDate.innerHTML=json[j].modifyDate;
		//创建动态作者
		var logName=document.createElement("a");
		logName.innerHTML=json[j].user[0].name;
		logName.className="user_name";
		logName.setAttribute("href","/myHome/user/space/"+json[j].user[0].account+"/");
		logName.setAttribute("target","_blank");
		//创建动态内容
		var logContent=document.createElement("div");
		logContent.className="content_user_li";		
		if(json[j].logName!="微说"){		
			logContent.innerHTML=	"<strong class='logTitle'>《"+ json[j].logName+"》</strong><br>";
		}
		var content_div=document.createElement("div");
		content_div.innerHTML=json[j].noHtmlLog;
		
		logContent.appendChild(content_div);
		
		var linkContent=document.createElement("a");
		linkContent.appendChild(logContent);
		if(json[j]["smallSpeak"]=="false"){
			linkContent.setAttribute("href","/myHome/user/function_readDiary?userId="+json[j].id);
		}
		linkContent.setAttribute("target","_blank");
		
		//评论框
		var com_div=document.createElement("div");
		com_div.className="comment_box";
		if(flag){
			var deleteLog=document.createElement("span");
			deleteLog.innerHTML="删除";
			deleteLog.setAttribute("alt",json[j].id);	
			addEvent(deleteLog, "click", removeLog);		
			com_div.appendChild(deleteLog);
			if(json[j]["smallSpeak"]=="false"){		
				var spanEdit=document.createElement("span");
				var edit=document.createElement("a");
				edit.innerHTML="编辑";
				edit.setAttribute("target","_blank");
				edit.setAttribute("href","/myHome/user/function_modifyDiary?userId="+json[j].id);
				spanEdit.appendChild(edit);
				com_div.appendChild(spanEdit);
			}
		}
		var visibel=document.createElement("span");
		visibel.innerHTML="浏览("+json[j].visibleNum+")";
		var comment=document.createElement("span");
		comment.innerHTML="评论(<b>"+json[j].commentNum+"</b>)";
		comment.setAttribute("alt",json[j].id);
		comment.className="view_com";
		com_div.appendChild(comment);
		com_div.appendChild(visibel);
		addEvent(comment,"click", comClick);
		//评论区
		var cbox=document.createElement("div");
		cbox.className="comment";
		var cbox_h5=document.createElement("h5");
		cbox_h5.innerHTML="评论：";		
		var cbox_area=document.createElement("div");
		cbox_area.setAttribute("contenteditable","true");
		cbox_area.className="commentArea";


		var cbox_input=document.createElement("input");		
		cbox_input.value="评论";
		cbox_input.setAttribute("type","button");
		cbox_input.className="sendComment";
		cbox_input.setAttribute("alt",json[j].id);
		addEvent(cbox_input, "click", sendClick);		
		var cbox_dis=document.createElement("div");
		cbox_dis.className="displayComment";
		var cbox_b=document.createElement("b");
		cbox_b.className="cut_out";
		cbox_b.innerHTML="↑&nbsp;收起";
		addEvent(cbox_b,"click",cutClick);	
		var loadbox=document.createElement("div");
		loadbox.innerHTML="正在拼了命的,为您加载!";
		loadbox.id="load_box";
		
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
			prentEL.insertBefore(log_div, element);
		}else{
			prentEL.appendChild(log_div);
		}
	}
}






