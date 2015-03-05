/**
 * 
 */
$(load);
function load(){
	try {
			
	} catch (e) {}
	$(".smallCom .remove_com").on("click", function(){
		var that=this;
		send(BASE_PATH+"/user/comment_remove",{
			'id':this.getAttribute("rel")
		},'remove is ok',"删除成功","删除失败",function(){			
			$(that.parentNode.parentNode).slideUp(350,function(){
				this.remove();
				$("#count").html(parseInt(this.innerHTML)-1);
			});
		});
	});
	$("#sendComment").on("click",sendClick);
	$(".replyHyperlink").click(sendReply);
}
function sendReply(flag){
	var $infomation=$("span",this);
	$("#commentArea").html("").html("<b>@"+this.getAttribute("rel")+":</b>&nbsp;<br/>").attr("alt",$infomation.attr("rel"));
	
	var parentTemp=this.parentNode.parentNode;
	window.reply={
		commentID:$infomation.attr("alt"),
		userId: $infomation.attr("rel"),
		parentDom:parentTemp.className=="smallCom" ? parentTemp:parentTemp.parentNode
	};
}
function sendClick(){
	var that=this;
	var _input=$("#commentArea");
	var date=new Date();
	if(_input.attr("alt")=="1"){
		var content=_input.text().isEmpty().replace(/^@(.*?):/,"");
		content=content.replace(/$<br\/>/,"");
		if(content.length<=0){
			_input.css({"border":"1px solid #ff4700"}).shake(function(){
				$(this).css({"border":"1px solid #DEDEDE"});
			},1);
			return;
		}	
		$.ajax({
			url: BASE_PATH+"/user/comment_saveReviewewComment",
			type: 'post',
			contentType: "application/x-www-form-urlencoded;charset=UTF-8",
			data: {
				'rc.content': content,
				'commentID': window.reply.commentID,
				'userId': window.reply.userId
			},
			success: function(meg) {
				if (meg == "you login has expired") {
					$("#headLogin").trigger("click");
					return;
				}
				_input.attr("alt","2").text("");
				if(window.reply.dom==undefined){
					window.reply.dom=$("<div class='reply'>"+
						"<span class='userPhoto'>"+
							"<img >"+
						"</span>"+
						"<a href='' target='_blank' class='user_name'></a>"+
						"<div></div>"+
						"<strong>"+
							"<span class='reply_date'></span>"+
							"<a href='#comment' class='replyHyperlink' rel=''>"+
								"<span  class='replyicon' title='回复' alt='' rel=''></span>"+
							"</a>"+
						"</strong>"+
					"</div>");
				}
				var msgJson=JSON.parse(meg);
				var $reply=window.reply.dom.clone(true);
				$reply.find("img").attr("src",BASE_PATH+"/load/download_getSmallPhoto?id="+msgJson.comUserID).end()
				.find(".user_name").attr("href",BASE_PATH+"/user/space/"+msgJson.account+"/>")
				.text(msgJson.userName+"回复："+msgJson.replyName).end().find("div").text(content).end()
				.find(".reply_date").text(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '  ' + date.getHours() + ':' + date.getMinutes()).end()
				.find(".replyHyperlink").attr("rel",msgJson.userName).click(sendReply)
				.find("span").attr("alt",msgJson.commentId)
				.attr("rel",msgJson.comUserID);
				$reply.appendTo(window.reply.parentDom);
			}
		});
	}else{
		if(_input.text().isEmpty().length<=0){
			_input.css({"border":"1px solid #ff4700"}).shake(function(){
				$(this).css({"border":"1px solid #DEDEDE"});
			},1);
			return;
		}	
		$.ajax({
			url:BASE_PATH+"/user/comment_save",
			method : 'post',
			data : {
				'c.content':$(that).prev().text(),
				'id':$(that).attr("alt")
			},
			success:function(text){
				if(text=="you login has expired"){
					$("#headLogin").trigger("click");
					return false;
				}
				try {
					var json=JSON.parse(text);	
					var element=document.createElement('div');
					element.setAttribute("class", 'smallCom');
					var span=document.createElement('span');
					var img=document.createElement('img');
					img.src=BASE_PATH+"/load/download_getSmallPhoto?id="+json.id;
					span.appendChild(img);
					element.appendChild(span);
					var bo=document.createElement('a');			
					bo.innerHTML=json.spaceName+":";
					bo.setAttribute("target","blank");
					bo.setAttribute("href",BASE_PATH+"/user/space/"+json.name+"/");
					element.appendChild(bo);
					var divo=document.createElement('div');
					divo.innerHTML=$(that).prev().text();
					element.appendChild(divo);
					
					var small_strong=document.createElement('strong');
					var $small_strong_date=$("<span class='reply_date'>"+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes()+"</span>");
					
					var $replyIcon=$("<a href='#comment' class='replyHyperlink'>" +
						"<span class='replyicon' title='回复' alt="+json.commentId+" rel="+json.id+">1</span>" +
					"</a>").attr("rel",json.spaceName).click(sendReply);
					
					$(small_strong).append($small_strong_date).append($replyIcon);
					if(json.commentId!=undefined){
						var small_remove=document.createElement("a");
						small_remove.setAttribute("alt",json.commentId);
						small_remove.className="remove_com";
						small_remove.innerHTML="删除";
						$(small_remove).click(removeClick);
						small_strong.appendChild(small_remove);
					}
					
					element.appendChild(small_strong);
	
					var parent=$(that).next().get(0);
					$.notice("viki提醒您！","评论成功!");
					parent.insertBefore(element,parent.firstChild);
					var $cont=$(".userAction a:eq(1) span");
					$cont.text(parseInt($cont.text())+1);
				} catch (e) {
					console.log(e)
					$.notice("viki提醒您！","评论失败!");
				}
				
			}
		});	
	}	
}
function send(url,obj,cond,isok,iserror,fn){
	$.ajax({
		url:url,
		type : 'post',
		head:{"Accept-Charset":"UTF-8"},
		data : obj,
		success:function(text){
			if(text=="you login has expired"){
				$.notice("viki提醒您！","登录过期");
			}else if(text.isEmpty()==cond){	
				if(fn)fn();
				$.notice("viki提醒您！",isok);
			}else{
				$.notice("viki提醒您！",iserror);
			}
		}
	});	
}
function removeClick(){
	var that=this;
	$.ajax({
		url:BASE_PATH+"/user/comment_remove",
		type : 'get',
		data : {
			'id':that.getAttribute("alt")
		},
		success:function(text){
			if(text=="remove is ok"){
				$.notice("viki提醒您！","删除评论成功!");
				$(that.parentNode.parentNode).slideUp(350,function(){
					var $cont=$(".userAction a:eq(1) span");
					$cont.text(parseInt($cont.text())-1);
					this.remove();
				});
			}else{
				$.notice("viki提醒您！","删除评论失败!");
			}
		}
	});
}
function removeLog(acc,evt){
	$.ajax({
		url:BASE_PATH+"/user/function_removeDiary",
		type : 'get',
		data : {
			'userId':evt.getAttribute("rel")
		},
		success:function(text){
			if(text=="removeDiary is ok"){
				$.notice("viki提醒您！","删除日记成功，即将跳转！!",300,function(){
					window.location.href=BASE_PATH+"/user/space/"+acc+"/diary";
				});			
			}else{
				$.notice("viki提醒您！","删除日记失败!");
			}
		}
	});
}