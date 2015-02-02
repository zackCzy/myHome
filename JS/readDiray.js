/**
 * 
 */
$(load);
function load(){
	try {
		$(".smallCom").hover(function(){
			$(this.getElementsByTagName("a")[2]).show();
		}, function(){
			$(this.getElementsByTagName("a")[2]).hide();
		});		
	} catch (e) {}
	$(".smallCom a").on("click", function(){
		var that=this;
		send("/myHome/user/comment_remove",{
			'id':this.getAttribute("rel")
		},'remove is ok',"删除成功","删除失败",function(){			
			$(that.parentNode.parentNode).slideUp(350,function(){
				this.remove();
				$("#count").html(parseInt(this.innerHTML)-1);
			});
		});
	});
	$("#sendComment").on("click",sendClick);
}
function sendClick(){
	var that=this;
	if($(that).prev().text().length<=0){
		$(that).prev().css({"border":"1px solid #ff4700"}).shake(function(){
			$(that).css({"border":"1px solid #DEDEDE"});
		},1);
		return;
	}	
	var date=new Date();
	$.ajax({
		url:"/myHome/user/comment_save",
		method : 'post',
		data : {
			'c.content':$(that).prev().text(),
			'id':$(that).attr("alt")
		},
		success:function(text){
			try {
				var json=JSON.parse(text);	
				var element=document.createElement('div');
				element.setAttribute("class", 'smallCom');
				var span=document.createElement('span');
				var img=document.createElement('img');
				img.src="/myHome/load/download_getSmallPhoto?id="+json.id;
				span.appendChild(img);
				element.appendChild(span);
				var bo=document.createElement('a');			
				bo.innerHTML=json.spaceName+":";
				bo.setAttribute("target","blank");
				bo.setAttribute("href","/myHome/user/space/"+json.name+"/");
				element.appendChild(bo);
				var divo=document.createElement('div');
				divo.innerHTML=$(that).prev().text();
				element.appendChild(divo);
				
				var small_strong=document.createElement('strong');
				small_strong.innerHTML=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'&nbsp'+date.getHours()+':'+date.getMinutes();
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
				$.notice("viki提醒您！","评论失败!");
			}
			
		}
	});	
}
function send(url,obj,cond,isok,iserror,fn){
	$.ajax({
		url:url,
		method : 'post',
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
		url:"/myHome/user/comment_remove",
		method : 'get',
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
		url:"/myHome/user/function_removeDiary",
		method : 'get',
		data : {
			'userId':evt.getAttribute("rel")
		},
		success:function(text){
			if(text=="removeDiary is ok"){
				$.notice("viki提醒您！","删除日记成功，即将跳转！!",300,function(){
					window.location.href="/myHome/user/space/"+acc+"/diary";
				});			
			}else{
				$.notice("viki提醒您！","删除日记失败!");
			}
		}
	});
}