<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String basePath = request.getContextPath();
	String path = request.getScheme() + "://" + request.getServerName()
			+ ":" + request.getServerPort() + basePath;
%>
<html>
<head>
	<%@include file="../meta/indexMeta.jsp"%>
	<link rel="stylesheet" type="text/css"
	href="<%=path%>/csss/imgareaselect-default.css" />
	<script type="text/javascript" src="<%=path%>/JS/tool/JQ_plugs.js"></script>
	<script type="text/javascript"
		src="<%=path%>/scripts/jquery.imgareaselect.pack.js"></script>
	<script type="text/javascript" src="<%=path%>/scripts/jQueryRotate.js"></script>
	<script type="text/javascript" src="<%=path%>/JS/tool/ajaxfileupload.js"></script>
	<style type="text/css">
	.body,h2{
		margin:0;
		border:0 none;
		padding:0;
	}
	.UserPhotoMess{
		width:600px;
		height:500px;
		margin:40px auto 0;
		text-align: center;
	}
	</style>
	<title>${sgin}_头像修改</title>
</head>
<body>
	<%@ include file="/WEB-INF/jsp/head.jsp"%>	
	<div class="UserPhotoMess">
		<h2>${sgin}_头像修改</h2>
		<iframe align="top" width="790px" height="670px" src="user_photo"></iframe>
		<div>
			<div style="margin: 0 0 0 30px;">
				<div class="portrait_left">
					<div id="picture"
						style="border: 1px solid #000000; overflow: hidden; position: relative; height: auto; width: 280px; margin: 0 auto;">
						<img id="avatar" width="280" alt="请上传头像"
							src="<%=path%>/load/download_getPhoto?id=${id}">
					</div>
					<form id="aaa1" name="photoSize" method="post" action="<%=path%>/load/download_uploadUserPhoto" enctype="multipart/form-data" target="hidden_frame">
						<!--通过生成尺寸和旋转角度 后台获取尺寸和旋转角度再进行裁剪-->
						<input id="id_top" type="hidden" name="top" value="90">
						<input id="id_left" type="hidden" name="left" value="61">
						<input id="id_right" type="hidden" name="right" value="201">
						<input id="id_bottom" type="hidden" name="bottom" value="200">
						<input id="rotation" type="hidden" value="0" name="rotation">
					</form>
					<div class="portrait_revolve">
						<div class="revolve_left"></div>
						<a href="javascript:;" class="revol_left_txt"
							onClick="avatarrotateleft();">向左旋转</a>
						<a href="javascript:;" class="revol_right_txt"
							onClick="avatarrotateright();">向右旋转</a>
						<div class="revolve_right"></div>
					</div>
					<label class="btn-choose-file" style="margin: 20px 50px 0 0px;">
						选择照片
						<input id="myFile" type="file" name="myFile"
							style="width: 0px; height: 0px;" onchange="box(this);"
							change="box(this);" />
					</label>
					<input type="button" class="btn-choose-file"
						onclick="submit_avatar();" value="确定"
						style="line-height: 20px; float: left; margin: 20px 0 0 50px; text-indent: 0px;" />
				</div>
			
				<div class="portrait_right">
					<p class="portrait_right_txt">
						您上传的头像会自动生成小尺寸头像，
						<br>
						请注意小尺寸的头像是否清晰
					</p>
					<div class="portrait_right_bottom">
						<div class="portrait1">
							<div id="img_big_preview" class="img_preview">
								<img id="avatar1" alt="头像预览"
									src="<%=path%>/load/download_getPhoto?id=${id}"
									style="width: <s:property value="#photo[0]+'px'"/>; height: <s:property value="#photo[1]+'px'"/>; margin-left:<s:property value="#photo[2]+'px'"/>; margin-top:<s:property value="#photo[3]+'px'"/>;">
							</div>
							<p>
								大尺寸头像，180×180
							</p>
						</div>
					</div>
					<div class="portrait2">
						<div id="img_small_preview" class="img_preview">
							<img id="avatar2" alt="预览"
								src="<%=path%>/load/download_getPhoto?id=${id}"
								style="width:  <s:property value="#photo[0]/3.7586+'px'"/>; height:<s:property value="#photo[1]/3.7586+'px'"/>; margin-left:<s:property value="#photo[2]/5+'px'"/> ; margin-top:<s:property value="#photo[3]/8+'px'"/>;">
						</div>
						<p>
							中尺寸头像
						</p>
						<p>
							50×50
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
<script type="text/javascript">
	function box(node){
		var fileSize=getFileSize(node);
		var fileName=node.value.toUpperCase();
		String.prototype.myEndsWith=function (str){
			return this.replace(new RegExp(str+"$","igm"),"");
		};
		String.prototype.myFristWith=function (str){
			return this.replace(new RegExp("^"+str,"igm"),"");
		};
		
		var isUpload=fileName.myEndsWith('.JPG')? true:fileName.myEndsWith('.PNG') ? true :fileName.myEndsWith('.GIF') ? true:false;	
		
		if(isUpload){
			if(fileSize>1000000){	
				$.notice("VIki提示您","请选择小于1MB的图片");
			}else{
				
				ajaxFileUpload();
			}
		}else {
			$.notice("VIki提示您","暂支持jpg,png,gif格式");
		}
	}
	 function ajaxFileUpload(){
         $.ajaxFileUpload( {
          url:'<%=path%>/load/upload_uploadUserPhoto',            //需要链接到服务器地址
          secureuri:false,
          fileElementId:'myFile',                        //文件选择框的id属性       
          dataType: 'json',
          success: function (data, status)            //相当于java中try语句块的用法
          {
        	var src="<%=path%>/load/download_downLoadPhoto?id="+data.id+"&ran?"+Math.random();
        	document.getElementById("avatar").src=src;
      		document.getElementById("avatar1").src=src;
      		document.getElementById("avatar2").src=src;
          },
          error: function (data, status, e){
          	$.notice("VIki提示您","服务器正忙，请稍后再试");
          }
      });    
    }	
	$(document).ready(function() {	
		function adjust(el, selection) {
			var scaleX = $(el).width() / (selection.width || 1);
			var scaleY = $(el).height() / (selection.width || 1);
			$(el + ' img').css({
				width : Math.round(scaleX * $('#avatar').width()) + 'px',
				height : Math.round(scaleY * $('#avatar').height()) + 'px',
				marginLeft : '-' + Math.round(scaleX * selection.x1) + 'px',
				marginTop : '-' + Math.round(scaleY * selection.y1) + 'px'
			});
		}
		function preview(img, selection) {
			adjust('#img_small_preview', selection);
			adjust('#img_big_preview', selection);
		}
		$('img#avatar').imgAreaSelect({
			aspectRatio : "4:4",
			x1 : 60,
			y1 : 60,
			x2 : 200,
			y2 : 200,
			onSelectEnd : function(img, selection) {
				$('#id_top').val(selection.y1);
				$('#id_left').val(selection.x1);
				$('#id_right').val(selection.x2);
				$('#id_bottom').val(selection.y2);
			},
			onSelectChange : preview
		});
	});

	var value = 0;
	function avatarrotateleft() {
		value -= 90;
		$('#avatar').rotate({
			animateTo : value
		});
		$('#avatar1').rotate({
			animateTo : value
		});
		$('#avatar2').rotate({
			animateTo : value
		});
	}
	function avatarrotateright() {
		value += 90;
		$('#avatar').rotate({
			animateTo : value
		});
		$('#avatar1').rotate({
			animateTo : value
		});
		$('#avatar2').rotate({
			animateTo : value
		});
	}
	function select_avatar() {
		$('#avatar_id').click();
	}
	function uploadavatar() {
		$('#avatar_form').submit();
	}
	function submit_avatar() {		
		$('#rotation').val(value);
		var _doc=document;
		var that=_doc.getElementById("avatar1");
		$.ajax({
			url:'<%=path%>/load/upload_saveUserPhoto',
			method : 'get',
			data : {
				top : _doc.forms['photoSize']['top'].value,
				left : _doc.forms['photoSize'].left.value,
				bottom : _doc.forms['photoSize'].bottom.value,
				right : _doc.forms['photoSize'].right.value,
				rotation : _doc.forms['photoSize'].rotation.value,
				imgsize : parseInt(that.style.width) + ","
						+ parseInt(that.height) + ","
						+ parseInt(that.style.marginLeft) + ","
						+ parseInt(that.style.marginTop)
			},
			success : function(text) {
				if (text == "you login has expired") {
					$.notice("VIki提示您", "您离开太久了，重新刷新下吧");
				} else if (text == "{'save':'ok'}") {
					$.notice("VIki提示您", "头像修改成功");
				} else {
					$.notice("VIki提示您", "头像修改失败");
				}
			}
		});
	}
</script>