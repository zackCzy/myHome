<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<style type="text/css">
.head {
	font-family: "微软雅黑", "华文细黑", "黑体", arial;
	font-weight: normal;
	font-style: normal;
	width: 100%;
	height: 40px;
	min-width:1000px;
	background: #FEFEFE
		url(${pageContext.request.contextPath}/image/head.png) repeat-x;
	position: fixed;
	top: 0;
	font-size: 13px;
	z-index: 9888;
	-moz-user-select: -moz-none;
	user-select: -moz-none;
}

.head .headLeft {
	margin: -6px 0 0 15px;
	float: left;
	cursor: pointer;
	height:41px;
	overflow:hidden;
}
.head .headLeft a{
	margin: 6px 0 0 ;
	display: block;
}
.head .headUser,.head .headLogin {
	text-align: center;
	color: #333;
}

.head  .headUser {
	width: 160px;
	list-style: none;
	height: 40px;
	float: right;
	line-height: 40px;
	position: relative;
	cursor: pointer;
	z-index: 989;
}

.head  .headUser:hover {
	background: url(${pageContext.request.contextPath}/image/smallLabel.png)
		no-repeat 20px 32px;
}

.head  .headUser div{
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
	width: 9px;
	height: 40px;
	margin-left:15px;
	background: url(${pageContext.request.contextPath}/image/arrow.png)
		no-repeat 0px 18px;
	-webkit-transition:0.3s -webkit-transform ease-out; 
	-moz-transition:0.3s -moz-transform ease-out; 
	-o-transition:0.3s -o-transform ease-out; 
	-ms-transition:0.3s -ms-transform ease-out; 
	transition:0.3s transform ease-out; 
}
.head .headUser ul {
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
	height: auto;
	z-index: 989;
}

.head .headUser ul li {
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

.head .headLogin {
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

.mini_nav{
	 display:block; 
	 clear:both; 
	 width: 100%; 
	 height: 26px;
	 background:url('${pageContext.request.contextPath}/image/top_float_bg.png') 0px -2px;
	 margin:0;
	 padding:0;
	 border:0;
}
.mini_nav_bt{
cursor:pointer; 
color:#FBFBFB;
font-size:13px; 
text-align:center; 
line-height: 18px;
margin:0 auto; 
display:block; 
clear:both; 
width: 159px; 
height:30px;
background:url('${pageContext.request.contextPath}/image/tog.png') 0 0px no-repeat;
}
.mini_nav_content{
 display:block; clear:both; width: 100%;
 height:0px;
 overflow: hidden;
 background: url("${pageContext.request.contextPath}/image/slide.jpg");
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
<div class="head clearFix">
	<div class="headLeft">
		<a href="${pageContext.request.contextPath}" target="_parent"><img
				alt="viki" src="${pageContext.request.contextPath}/image/vikilogo.png"
				id="logo"> </a>
	</div>
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
					<img width=25px height=25px  src="${pageContext.request.contextPath}/load/download_getSmallPhoto?id=${id}">
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
			<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/head.js"></script>
		</c:otherwise>
	</c:choose>
	<div class="mini_nav_content" >
		<div class="mini_nav_content_bg" >
			<ul>
				<li><a href="${pageContext.request.contextPath}">首 页</a><span>|</span></li>
				<li><a href="${pageContext.request.contextPath}/translator">词 典</a><span>|</span></li>
				<li ><a href="${pageContext.request.contextPath}/music">音 乐</a><span>|</span></li>
				<li><a  href="${pageContext.request.contextPath}/user/space/${sgin==null? 'null':sgin}/">空 间</a><span>|</span></li>
				<li><a>Mini_论坛</a></li>
			</ul>
			<h3 style="width:100%;height:79px; text-align: center;line-height:79px;color:#DCDCDC">欢迎访问Vi k i , Vi k i专志为您提供优质的服务!</h2>
		</div>
	</div>
	<div class="mini_nav">
		<div class="mini_nav_bt" >viki 导航</div>
	</div>
</div>

<script type="text/javascript">
	function musicBox() {
		return ${session.id};
	}	
	$(".mini_nav .mini_nav_bt").click(function(){
		var $this=$(this);
		var text=$this.text().isEmpty();
		var con=$(".mini_nav_content");
		if(text=="close"){
			$this.text("viki 导航");
			con.animate({
				height:0
			},350);
		}else{
			$this.text("close");
			con.animate({
				height:318
			},350);
		}
	});
</script>

