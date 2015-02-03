<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath+"/myHome/"; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Mini词典</title>
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/public/main.css" />
		<link rel="stylesheet" type="text/css" href="<%=path%>/CSS/translator.css" />
		<script type="text/javascript" src="<%=path%>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path%>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/plugObject/Texi.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/tool/json2.js"></script>
		<script type="text/javascript" src="<%=path%>/JS/translator.js"></script>
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<audio id="myPlayer" src=""></audio>
		<div class="trans_nav clearFix">
			<ul class="blank">
				<li onclick="noporint(this)"></li>
				<li onclick="noporint(this)"></li>
				<li id="tranlster">
					<a href="#head"></a>
				</li onclick="noporint(this)">
				<li onclick="noporint(this)"></li>
				<li onclick="noporint(this)"></li>
			</ul>
			<ul class="about">
				<li>
					主页
				</li>
				<li>
					词典
				</li>
				<li>
					翻译
				</li>
				<li>
					百科
				</li>
				<li>
					资料中心
				</li>
			</ul>
			<div class="nav_button">
				<ul class="block">
					<li>
						主页
					</li>
					<li>
						词典
					</li>
					<li>
						翻译
					</li>
					<li>
						百科
					</li>
					<li>
						资料中心
					</li>
				</ul>
			</div>
		</div>


		<div id="search" class="clearFix">
			<p>
				原文：
			</p>
			<div class="return" id="transRetuen"></div>
			<div id="language">
				<input type="button" id="cut" value="自动检测" name="zh" />
				<ul class="langBn">
					<li id="query">
						查询
					</li>
					<li id='empty'>
						清空
					</li>
				</ul>
				<ul class="language">
					<li id="zh" style="width: 300px;">
						自动检测
					</li>
					<li id="en">
						多→英
					</li>
					<li id="zh">
						多→汉
					</li>
					<li id="jp">
						多→日
					</li>
					<li id="ko">
						多→韩
					</li>
					<li id="ru">
						多→俄
					</li>
					<li id="fr">
						多→法
					</li>
					<li id="sp">
						多→西
					</li>
					<li id="de">
						多→德
					</li>
					<li>
						多→意
					</li>
					<li>
						多→马
					</li>
					<li>
						多→越
					</li>
					<li>
						多→瑞
					</li>
					<li>
						多→泰
					</li>
					<li>
						多→菲
					</li>
					<li id="cte">
						汉→粤
					</li>
					<li id="zh">
						粤→汉
					</li>
				</ul>
			</div>
			<div class="textAreas" style="position: absolute; left: 45px;">
				<div contenteditable="true" id='searchText' class="textarea">&nbsp;&nbsp;</div>
				<!-- 
				<textarea rows="1" cols="20"
					style='overflow: scroll; overflow-x: hidden; overflow-y: hidden;'
					class="textA" id='searchText'></textarea>
									<textarea rows="1" cols="20" readonly="readonly"
					style='overflow: scroll; overflow-y: hidden;; overflow-x: hidden'
					class="textA" id="searchResult"></textarea>
				 -->
				<div class="textSound"></div>
			</div>
			<div class="textAreas" style="position: absolute; right: 45px;">
				<div contenteditable="true" class="textarea" readonly="readonly" id="searchResult">&nbsp;&nbsp;</div>
				<div class="textSound">
					<span id="sreachState">正在查询……</span>
					<input type="button" id='sound' />
				</div>
			</div>
		</div>
	</body>
</html>