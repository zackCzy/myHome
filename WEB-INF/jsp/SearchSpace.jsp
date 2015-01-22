<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib prefix="s" uri="/struts-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<link type="text/css" rel="stylesheet"  href="/myHome/CSS/SearchSpace.css">
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/tool/span.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/JS/searchSpace.js"></script>
		<title>ViKi 查询</title>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<div class="search_message_area">
			<div class="cus-sel-opt-panel">
					<span><s:property value="#type"/></span>
					<ul class="cus-sel-opt-ctn">
						<li  >找人</li>
						<li >V说</li>
						<li >博客</li>
					</ul>
			</div>
			<form action="/myHome/searchSpace/search_" name="searchSpace" method="post">
				<input type="text" value="<s:property value="#searchName"/>" name="searchName"/>
				<input type="hidden" name="pageSize" value="15">
				<input type="button" id="search_bt"/>
			</form>
		</div>
		<div class="display_stand" >
			<div class="search_display_list">
				<h3>搜索结果总共<s:property value="#searchCount" default="0"/>条 </h3>
				<hr style="width:92%;border: 1px solid #CCC;margin:0 auto;border-top:0"/>
				<s:iterator value="#users" var="searchUser">
					<div class="search_result">
						<img src="/myHome/load/download_getSmallPhoto?id=<s:property value="id"/>" width=100px height=100px>
						<p >
							<a class="user_spase_name selectStrong" href="/myHome/user/space/<s:property value="name"/>/">
								<s:property value="userBaseDatum.name"/>
							 </a>
						</p>			 
						<p><s:property value="userBaseDatum.sex"/>,<s:property value="userBaseDatum.addr.equals('请选择,请选择') ?未知: userBaseDatum.addr"/>					
						 <a href="http://viki.linkpc.net/myHome/user/space/<s:property value="name"/>/" target="_blank">http://viki.linkpc.net/myHome/user/space/<s:property value="name"/>/</a></p>
						<p>
							<font color="#FF4700"  >关注:</font>
							<a><s:property value="followUsers.size()"/></a>
							<font color="#FF4700"  >粉丝:</font>
							<a><s:property value="fansUsers.size()"/></a>
						</p>
						<p>简介：<s:property value="searchUser.userBaseDatum.info" default="无"/></p>
					</div>
				</s:iterator>
				<s:iterator value="#smallSpeaks" var="searchUser">
					<div class="search_result">
						<img src="/myHome/load/download_getSmallPhoto?id=<s:property value="user.id"/>" width=100px height=100px>	 
						<p>作者：<a class="user_spase_name" href="/myHome/user/space/<s:property value="user.name"/>/"><s:property value="user.userBaseDatum.name"/></a></p>
						<p >发布日期：
							<a class="user_spase_name" href="/myHome/user/function_readDiary?userId=<s:property value="id"/>" style="font-size:15px;">
								<s:property value="modifyDate"/>
							</a>
						</p>
						<p class="nowarp">
						 	内容：<a class="user_spase_name selectStrong" href="/myHome/user/function_readDiary?userId=<s:property value="id"/>" style="font-size:15px;">
								<s:property value="(noHtmlLog.substring(0,noHtmlLog.length()>150 ? 150 : noHtmlLog.length()))" />
							</a>					 	
						</p>
					</div>
				</s:iterator>
				<s:iterator value="#logs" var="searchUser">
					<div class="search_result">
						<img src="/myHome/load/download_getSmallPhoto?id=<s:property value="user.id"/>" width=100px height=100px>	 
						<p>作者：<a class="user_spase_name" href="/myHome/user/space/<s:property value="user.name"/>/"><s:property value="user.userBaseDatum.name"/></a></p>
						<p >文章标题：
							<a class="user_spase_name selectStrong" href="/myHome/user/function_readDiary?userId=<s:property value="id"/>" style="font-size:15px;">
								《<s:property value="logName"/>》
							</a>
						</p>
						<p >修改日期：
							<a class="user_spase_name" href="/myHome/user/function_readDiary?userId=<s:property value="id"/>" style="font-size:15px;">
								<s:property value="modifyDate"/>
							</a>
						</p>
						<p class="nowarp">
						 	内容：<a class="user_spase_name" href="/myHome/user/function_readDiary?userId=<s:property value="id"/>" style="font-size:15px;">
								<s:property value="noHtmlLog.substring(0,noHtmlLog.length()>150 ? 150 : noHtmlLog.length())"/>
							</a>					 	
						</p>
					</div>
				</s:iterator>					
			</div>
		</div>
	</body>
</html>