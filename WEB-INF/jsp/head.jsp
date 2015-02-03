<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style type="text/css">
#head {
	font-family: "微软雅黑", "华文细黑", "黑体", arial;
	font-weight: normal;
	font-style: normal;
	width: 100%;
	height: 40px;
	background: #FEFEFE
		url(${pageContext.request.contextPath}/image/head.png) repeat-x;
	position: fixed;
	top: 0;
	font-size: 13px;
	z-index: 9888;
	-moz-user-select: -moz-none;
}

#head .headLeft {
	margin: -5px 0 0 15px;
	float: left;
	cursor: pointer;
}
#head .headLeft a{
	margin: 6px 0 0 ;
	display: block;
}
#head .headUser,#head .headLogin {
	text-align: center;
	color: #333;
}

#head  .headUser {
	width: 160px;
	list-style: none;
	height: 40px;
	float: right;
	line-height: 40px;
	position: relative;
	cursor: pointer;
	z-index: 989;
}

#head  .headUser:hover {
	background: url(${pageContext.request.contextPath}/image/smallLabel.png)
		no-repeat 20px 32px;
}

#head  .headUser div{
	display: block;
	height: 40px;
	color: #F22E00;
	float: left;
	font-size: 13px;
	text-shadow: 0 2px 3px #CFCFCF;
	text-align: right;
}

.headUser span:hover {
	color: #ff6900;
	text-decoration: underline;
}

.headUser i {
	display: block;
	float: left;
	width: 22px;
	height: 40px;
	background: url(${pageContext.request.contextPath}/image/arrow.png)
		no-repeat 10px 18px;
}

.weatherPanel {
	width: 0px;
	height: 0px;
	background: #ccc;
}

.weatherPanel span {
	display: block;
	width: 600px;
	height: 20px;
	background: #00f;
}

.wedtherHover {
	width: 230px;
	height: 40px;
	background: #f1c;
	line-height: 50px;
}

#head .headUser ul {
	list-style: none;
	width: 134px;
	position: absolute;
	border: 1px solid #CECECE;
	border-top: 0;
	border-radius: 8px;
	box-shadow: 4px 3px 4px rgba(0, 0, 0, 0.05), 0 2px 5px
		rgba(0, 0, 0, 0.5);
	top: 40px;
	right: -10px;
	background: #fafafa;
	overflow: hidden;
	display: none;
	height: 0;
	opacity: 0;
	filter: alpha(opacity =         0);
	z-index: 989;
}

#head .headUser ul li {
	line-height: 40px;
	width: 110px;
	margin: 9px auto;
	border-bottom: 1px dashed #DDDDDD;
}

.headUser ul li a {
	width: 110px;
	height: 40px;
	display: block;
	text-decoration: none;
	background: #fafafa;
	border-radius: 10px;
	color: #999;
}

.headUser ul li a:hover {
	background: #ECECEC;
	color: #79B612;
	text-decoration: none;
}

#head .headLogin {
	width: 170px;
	height: 40px;
	float: right;
	text-align: left;
	line-height: 38px;
	text-shadow: 0 2px 3px #CFCFCF;
}

.headLogin  a,.headLogin  a:ACTIVE,.headLogin  a:LINK,.headLogin  a:VISITED,.front
	{
	cursor: pointer;
	color: #6C6C6C;
	text-decoration: none;
	text-shadow: 0 2px 3px #CFCFCF;
}

.front {
	float: right;
	display: block;
	width: 80px;
	height: 40px;
	line-height: 40px;
	text-align: center;
}

.headLogin  a:hover,.front:hover {
	text-decoration: underline;
}

.contentPoint {
	width: 220px;
	height: 130px;
	background: #EFEFEF
		url(${pageContext.request.contextPath}/image/contentPoint.png);
	border: 3px solid #58CAFA;
	border-top: 0;
	position: absolute;
	display: none;
	text-align: center;
	line-height: 90px;
	height: 0;
	opacity: 0;
	filter: alpha(opacity =     0);
	z-index: 9889;
	border-radius: 0 0 8px 8px;
	text-shadow: 0 2px 3px #CFCFCF;
	box-shadow: 3px 3px 2px rgba(0, 0, 0, 0.05), 5px 5px 3px
		rgba(0, 0, 0, 0.1);
	font-size: 14px;
	color: #898989;
	font-weight: bold;
}

.music {
	float: right;
	width: 120px;
	height: 39px;
	position: relative;
	z-index: 10;
}

.music strong {
	height: 27px;
	display: block;
	text-align: center;
	cursor: pointer;
	background: #E4E4E4;
	border-radius: 25px;
	margin: 6px 0;
	line-height: 27px;
}

.musicDisplay {
	position: absolute;
	width: 300px;
	height: 0px;
	background: url("/myHome/image/trans.png");
	left: -170px;
	top: -50px;
	box-shadow: 4px 3px 2px rgba(0, 0, 0, 0.03), 3px 2px 1px
		rgba(0, 0, 0, 0.4);
	overflow: hidden;
	z-index: 1;
	border: 1px solid #1B1E23;
	border-radius: 0 0 10px 10px;
}

#scrollBar {
	display: none;
	height: 260px;
	width: 5px;
	float: right;
	background: #1C1E24;
	margin-top: 10px;
	position: relative;
	border-radius: 5px;
}

.musicDisplay ul {
	float: left;
	width: 260px;
	line-height: 30px;
	list-style: none;
	cursor: pointer;
	text-indent: 1em;
	color: #FBFBFB;
	margin: 10px 10px 0 0;
	scrollbar-arrow-color: #A9C50B;
	scrollbar-base-color: #A9C50B;
	scrollbar-dark-shadow-color: #A9C50B;
	scrollbar-face-color: #A9C50B;
	position: absolute;
	top: 0;
	left:6px;
}

#head_list_display {
	width: 290px;
	margin: 10px 0 0 4px;
	overflow: hidden;
	height: 270px;
	position: relative;
}

.musicDisplay li {
	width: 260px;
	height: 30px;
	margin: 6px 0;
	border-bottom: 1px dashed #474747;
}

.musicDisplay li:hover{
	background: #5CAAE6;
}

.playList {
	width: 280px;
	margin: 3px auto;
}

.playList a,.playList b {
	float: right;
	color: #5CAAE6;
}

.playList a:LINK {
	float: right;
	color: #5CAAE6;
}
.mini_nav{
	 display:block; clear:both; width: 100%; height: 30px;background:url(' /myHome/image/top_float_bg.png');
}
.mini_nav_bt{
cursor:pointer; 
color:#FBFBFB;
font-size:13px; 
text-align:center; 
line-height: 25px;
margin:0 auto; 
display:block; 
clear:both; 
width: 159px; 
height:30px;
background:url(' /myHome/image/tog.png') 0 5px no-repeat;
}
.mini_nav_content{
display:block; clear:both; width: 100%;
 height:39px;
 overflow: hidden;
 background: url("/myHome/image/slide.jpg");
 background-size:cover;
}	
.mini_nav_content_bg{
 height:279px;
 width:800px;
 margin:39px auto 0;
}
.mini_nav_content_bg ul{
 height:100px;
 width:800px;
 display: block;
 list-style:none;
margin:100px 0 20px;
}
.mini_nav_content_bg li{
text-align:center;
 height:100px;
 width:160px;
 display: block;
 float: left;
 line-height:100px;
cursor: pointer;
font-family: "微软雅黑","宋体";
}
.mini_nav_content_bg li a{
 font-size:21px;
 color:#fcfcfc;
 font-weight:bold;
 text-decoration: none;
}
.mini_nav_content_bg span{
font-size:30px;
float: right;
line-height:95px;
 color:#fcfcfc;
}
.mini_nav_content_bg li a:hover{
 border-right:0;
  color:#A9C50B;
}

.account_info{
float:left;margin:7px 10px 0 15px;border:1px solid #ACACAC;box-shadow: 2px 2px 1px rgba(0, 0, 0, 0.05), 3px 3px 2px rgba(0, 0, 0, 0.1);
}
</style>
<%-- 全局通知 --%>
<div class="contentPoint" id="point">
	<span
		style="color: #FF4700; margin: 25px 0 0; line-height: 20px; height: 20px; display: block;">Viki您!</span>
	<div id="point_cont"></div>
</div>
<div id="lock"></div>
<div id="head" class="clearFix">
	<div class="headLeft">
		<a href="${pageContext.request.contextPath}" target="_parent"><img
				alt="viki" src="${pageContext.request.contextPath}/image/vikilogo.png"
				id="logo"> </a>
	</div>
	
		<!--  
			<div class="headLeft">
		<iframe name="weather_inc" style="margin:10px 0;" frameborder="0" allowtransparency="true" src="http://tianqi.xixik.com/cframe/1" width="280" height="40" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</div>
		-->
	
	<c:choose>
		<c:when test="${sgin==null}">
			<div class="headLogin" style="width: 270px">
				<span
					style="color: #F22E00; font-size: 13px; border-radius: 10px; text-shadow: 0 2px 3px #CFCFCF;">
					亲，快来登陆吧&nbsp;&nbsp;</span>
				<a id="headLogin">登录</a>&nbsp;|&nbsp;
				<a href="${pageContext.request.contextPath}/application">注册</a>&nbsp;&nbsp;|&nbsp;&nbsp;
				<a href="${pageContext.request.contextPath}">ViKi 首页</a>
			</div>
			<%@ include file="/WEB-INF/jsp/login.jsp"%>
		</c:when>
		<c:otherwise>
			<a href="${pageContext.request.contextPath}" class="front">VIKI 首页</a>
			<div class="headUser">
				<div  class="account_info" style="width:25px; height:25px;">
					<img width=25px height=25px  src="/myHome/load/download_getSmallPhoto?id=${id}">
				</div>
				<div><span>${sgin}</span></div><i></i>
				<ul id="headList">
					<li><a href="${pageContext.request.contextPath}/user/user_datum">个人信息</a>
					</li>
					<li><a href="${pageContext.request.contextPath}/user/space/${sgin}/">个人空间</a>
					</li>
					<li><a href="${pageContext.request.contextPath}/exit">退出</a>
					</li>
				</ul>
			</div>
			<script type="text/javascript" src="/myHome/JS/tool/head.js"></script>
		</c:otherwise>
	</c:choose>
</div>
<div class="mini_nav_content" >
	<div class="mini_nav_content_bg" >
		<ul>
			<li><a href="/myHome/">首 页</a><span>|</span></li>
			<li><a href="/myHome/translator">词 典</a><span>|</span></li>
			<li ><a href="/myHome/music">音 乐</a><span>|</span></li>
			<li><a  href="/myHome/user/space/${sgin==null? 'null':sgin}/">空 间</a><span>|</span></li>
			<li><a>Mini_论坛</a></li>
		</ul>
		<h3 style="width:100%;height:79px; text-align: center;line-height:79px;color:#DCDCDC">欢迎访问Vi k i , Vi k i专志为您提供优质的服务!</h2>
	</div>
</div>
<div class="mini_nav">
	<div class="mini_nav_bt" >viki 导航</div>
</div>
<script type="text/javascript">
				function musicBox() {
					return ${session.id};
				}	
				$Base(".mini_nav_bt").tabEvent(function(){
					this.innerHTML="close";
					$Base(".mini_nav_content").active({
						step:10,t:10,async:{
							h:318
						}
					});
				},function(){
					this.innerHTML="viki 导航";
					$Base(".mini_nav_content").active({
						step:10,t:10,async:{
							h:39
						}
					});
				});
</script>

