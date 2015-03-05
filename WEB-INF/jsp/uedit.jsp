<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<title>${title}_Viki空间</title>
		<link href="<%=path %>/CSS/themes/default/css/umeditor.css" type="text/css" rel="stylesheet">
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/board.css">
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
			UEDITOR_HOME_URL = "/ueditor/";//从项目的根目录开始
		</script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/JS/uedit/umeditor.config.js"></script>
	    <script type="text/javascript" charset="utf-8" src="<%=path %>/JS/uedit/umeditor.min.js"> </script>
	    <script type="text/javascript" charset="utf-8" src="<%=path %>/JS/uedit/lang/zh-cn/zh-cn.js"></script>
		<script type="text/javascript" charset="utf-8" src="<%=path %>/JS/board.js"></script>	
	</head>
	<body>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<div style="visibility: hidden;width:0;height:0;overflow: hidden;" id="logContentHiddent">
			<s:property value="#log.getLogContent()" escapeHtml="false"/>
		</div>
		<form action="#" name="createText" >
			<div id="context" style="width:100%;display: block;">
				<div class="wordContent">
					<input type="text"  type="text" spellcheck="false"
						autocomplete="off" name="title" placeholder="输入标题" tabindex="10"
						stash-placeholder="输入标题" id="title" value='<s:property value="#log.logName"/>'>
					<hr style="width:100%;"/>
				</div>
				<script id="myEditor" type="text/plain" style="width:1024px;height:500px;margin:0 auto;"></script>
				<div style="width:1024px;margin:0 auto;background:#fff">
					<input type="hidden" value="${logToken}" id="token" title="${logid}">		
					<div class="setting">
						<input type="text"  spellcheck="false"
						autocomplete="off" name="type" placeholder="添加标签，以逗号或回车隔开" tabindex="10"
						stash-placeholder="添加标签，以逗号或回车隔开" id="type" value="<s:property value="#log.type"/>">
						<div id="draft" class="select">
							<i>∨</i>
							<span id="visible"><s:property value="#log.visible==1?'所有人可见':'仅自己可见'" default="所有人可见"/></span>
							<ul>
								<li>所有人可见</li>
								<li>仅自己可见</li>
							</ul>
						</div>
					</div>
					<div class="sendText">
						<input type="button" value="保存" name="save" alt="${sgin}" onclick="sendDiary(false,this,'<s:property value="#diary"/>')">
						<input type="button" value="浏览" name="look">			
						<input type="button" value="保存草稿" name="saveDraft" alt="${sgin}" onclick="sendDiary(true,this,'<s:property value="#draft"/>')">
					</div>
				</div>
			</div>
		</form>
	</body>
</html>
