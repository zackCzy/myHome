/**
 * 
 */

$(function(){
	 	var ue = UM.getEditor('myEditor');

	    function createEditor() {
	        enableBtn();
	    }
	    function getAllHtml() {
	        return ue.getAllHtml();
	    }
	    function getContent() {
	        return ue.getContent();
	    }
	    function getPlainTxt() {
	        return ue.getPlainTxt();
	    }
	    function setContent(content,isAppendTo) {
	    	ue.setContent(content, isAppendTo); 
	    }
	    function setDisabled() {
	    	ue.setDisabled('fullscreen');
	        disableBtn("enable");
	    }

	    function setEnabled() {
	    	ue.setEnabled();
	        enableBtn();
	    }

	    function getContentTxt() {
	        //使用editor.getContentTxt()方法可以获得编辑器的纯文本内容
	        return ue('myEditor').getContentTxt();
	    }
	    function hasContent() {
	    	return ue.hasContents();
	    }
	    function setFocus() {
	    	ue.focus();
	    }
	    function deleteEditor() {
	        disableBtn();
	        ue.destroy();
	    }
	    function insertHtml(content) {
	        var value = prompt(content, '');
	        ue.execCommand('insertHtml', value);
	    }
	    function getLocalData () {
	        return ue.execCommand( "getlocaldata" );
	    }
	    var $logDiv=$("#logContentHiddent");
	    if($("#logContentHiddent").text().isEmpty().length>0){
	    	setContent($logDiv.html());
	    }
	    $logDiv=null;
	    sendDiary=function (draft,evt,url_u){
	    	if(!hasContent()){			
	    		$.notice("viki提醒您！","文章内容不能为空");
	    		return
	    	}
	    	$.ajax({
	    		url:BASE_PATH+"/user/function_"+url_u,
	    		method : 'post',
	    		data : {
	    			'userlog.logName':$("#title").val(),
	    			'userlog.logContent':getContent(),
	    			'userlog.visible':($("#visible").text().isEmpty()=="所有人可见"),
	    			'userlog.type':$("#type").val(),
	    			token:$("#token").val(),
	    			'userlog.id':document.getElementById("token").getAttribute("title"),
	    			'userlog.noHtmlLog':getPlainTxt()
	    		},
	    		success:function(msg){
	    			if(msg.isEmpty()=='save user log ok'){			
	    				$.notice("Viki提醒您",draft ? '草稿保存成功' :"发布成功,即将跳转！",1500,function(){						
	    					if(draft){
	    						 window.location.href=BASE_PATH+"/user/user_draft";
	    					}else{
	    						window.location.href=BASE_PATH+"/user/space/"+evt.getAttribute("alt")+"/diary";
	    					}
	    				});
	    			}else{
	    				$.notice("Viki提醒您"," ");
	    			}
	    		}
	    	});	
	    };
	    $(".select").on("click", function(evt){	
			var temp=$("ul",this);		
			if(temp.css("display")=="none"){
				$(".select ul").hide(300);
				$(".colorPanel").hide(300);
				temp.show(300);
			}else{
				temp.hide(300);
			}
		});	
	    $(".select").hover(function(){
			this.style.border="1px solid #02ABE3";
		}, function(){
			this.style.border="1px solid #CCCCCC";
		});
});