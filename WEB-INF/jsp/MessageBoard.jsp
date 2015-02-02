<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%String path=pageContext.getRequest().getServletContext().getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>${title}_Viki空间</title>
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/public/main.css">
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/board.css">
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/board.js"></script>
	</head>
	<body>
	
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<form action="#" name="createText" >
			<input type="hidden" value="${token}" id="token" title="${logid}">
			<div class="messagePanel">
				<div class="wordTool clearFix" >
					<div id="fontname" class="select">
						<i>▲</i>
						<span  unselectable="on">arial</span>		
						<ul>
							<li title="微软雅黑"  unselectable="on">微软雅黑</li>
							<li title="宋体"  unselectable="on">宋体</li>
							<li title="楷体"  unselectable="on">楷体</li>
							<li title="黑体"  unselectable="on">黑体</li>
							<li title="隶书"  unselectable="on">隶书</li>
							<li title="arial"  unselectable="on">arial</li>
							<li title="black"  unselectable="on">black</li>
						</ul>
					</div>
					<div id="fontsize" class="select">
						<i>▲</i>
						<span  unselectable="on">16px</span>
						<ul>
							<li style="font-size:14px; height:20px; line-height:20px;" title="1"  unselectable="on">12px</li>
							<li style="font-size:14px; height:20px; line-height:20px;" title="2"  unselectable="on">14px</li>
							<li style="font-size:16px; height:24px; line-height:24px;" title="3"  unselectable="on">16px</li>
							<li style="font-size:18px; height:26px; line-height:26px;" title="4"  unselectable="on">18px</li>
							<li style="font-size:20px; height:28px; line-height:28px;" title="5"  unselectable="on">20px</li>
							<li style="font-size:24px; height:30px; line-height:30px;" title="6"  unselectable="on">24px</li>
							<li style="font-size:36px; height:40px; line-height:40px;" title="7"  unselectable="on">36px</li>
						</ul>
					</div>
					<div  class="smallBox" title="bold" >
						<strong unselectable="on">B</strong>
					</div>
					<div class="smallBox" title="italic">
						<i unselectable="on">I</i>
					</div>
					<div class="smallBox" title="underline">
						<strong style="text-decoration: underline;" unselectable="on">U</strong>
					</div>
					<div  id="forecolor" class="colorsmallBox" style="position: relative;">
						<span class="pointPanel" unselectable="on" style="width:25;height:24px;display: block;">A</span>
						<div class="colorPanel" >
							<input type="button" class="colorStatu"><input type="button" value="清空颜色" class="trimColor">
							<p>主题颜色</p>
							<hr style="width:210px;margin:-1px auto 0;background: #DDDDDD;"/>
							<ul >
								<li style="background:#FFFFFF;margin-left:10px;" title="#FFFFFF" unselectable="on"></li>
								<li style="background:#000000;" title="#000000" unselectable="on"></li>
								<li style="background:#EEECE1;" title="#EEECE1" unselectable="on"></li>
								<li style="background:#1F497D;" title="#1F497D" unselectable="on"></li>
								<li style="background:#4F81BD;" title="#4F81BD" unselectable="on"></li>
								<li style="background:#C0504D;" title="#C0504D" unselectable="on"></li>
								<li style="background:#9BBB59;" title="#9BBB59" unselectable="on"></li>					
								<li style="background:#8064A2;" title="#8064A2" unselectable="on"></li>
								<li style="background:#F79646;" title="#F79646" unselectable="on"></li>
								<li style="background:#F2F2F2;margin-left:10px;" title="#F2F2F2" unselectable="on"></li>
								<li style="background:#7F7F7F;" title="#7F7F7F" unselectable="on"></li>
								<li style="background:#DDD9C3;" title="#DDD9C3" unselectable="on"></li>
								<li style="background:#C6D9F0;" title="#C6D9F0" unselectable="on"></li>
								<li style="background:#DBE5F1;" title="#DBE5F1" unselectable="on"></li>
								<li style="background:#F2DCDB;" title="#F2DCDB" unselectable="on"></li>
								<li style="background:#EBF1DD;" title="#EBF1DD" unselectable="on"></li>					
								<li style="background:#E5E0EC;" title="#E5E0EC" unselectable="on"></li>
								<li style="background:#FDEADA;" title="#FDEADA" unselectable="on"></li>
								<li style="background:#D8D8D8;margin-left:10px;" title="#D8D8D8" unselectable="on"></li>
								<li style="background:#595959;" title="#595959" unselectable="on"></li>
								<li style="background:#C4BD97;" title="#C4BD97" unselectable="on"></li>
								<li style="background:#8DB3E2;" title="#8DB3E2" unselectable="on"></li>
								<li style="background:#B8CCE4;" title="#B8CCE4" unselectable="on"></li>
								<li style="background:#E5B9B7;" title="#E5B9B7" unselectable="on"></li>
								<li style="background:#D7E3BC;" title="#D7E3BC" unselectable="on"></li>					
								<li style="background:#CCC1D9;" title="#CCC1D9" unselectable="on"></li>
								<li style="background:#FBD5B5;" title="#FBD5B5" unselectable="on"></li>
								<li style="background:#BFBFBF;margin-left:10px;" title="BFBFBF" unselectable="on"></li>
								<li style="background:#3F3F3F;" title="#3F3F3F" unselectable="on"></li>
								<li style="background:#938953;" title="#938953" unselectable="on"></li>
								<li style="background:#548DD4;" title="#548DD4" unselectable="on"></li>
								<li style="background:#95B3D7;" title="#95B3D7" unselectable="on"></li>
								<li style="background:#D99694;" title="#D99694" unselectable="on"></li>
								<li style="background:#C3D69B;" title="#C3D69B" unselectable="on"></li>					
								<li style="background:#B2A2C7;" title="#B2A2C7" unselectable="on"></li>
								<li style="background:#FAC08F;" title="#FAC08F" unselectable="on"></li>
								<li style="background:#A5A5A5;margin-left:10px;" title="#A5A5A5" unselectable="on"></li>
								<li style="background:#262626;" title="#262626" unselectable="on"></li>
								<li style="background:#494429;" title="#494429" unselectable="on"></li>
								<li style="background:#17365D;" title="#17365D" unselectable="on"></li>
								<li style="background:#366092;" title="#366092" unselectable="on"></li>
								<li style="background:#953734;" title="#953734" unselectable="on"></li>
								<li style="background:#76923C;" title="#76923C" unselectable="on"></li>					
								<li style="background:#5F497A;" title="#5F497A" unselectable="on"></li>
								<li style="background:#E36C09;" title="#E36C09" unselectable="on"></li>
								<li style="background:#7F7F7F;margin-left:10px;" title="#7F7F7F" unselectable="on"></li>
								<li style="background:#0C0C0C;" title="#0C0C0C" unselectable="on"></li>
								<li style="background:#1D1B10;" title="#1D1B10" unselectable="on"></li>
								<li style="background:#0F243E;" title="#0F243E" unselectable="on"></li>
								<li style="background:#244061;" title="#244061" unselectable="on"></li>
								<li style="background:#632423;" title="#632423" unselectable="on"></li>
								<li style="background:#4F6128;" title="#4F6128" unselectable="on"></li>					
								<li style="background:#3F3151;" title="#3F3151" unselectable="on"></li>
								<li style="background:#974806;" title="#974806" unselectable="on"></li>
							</ul>
							<br style="clear: both;">
							<p style="clear: both;">标准颜色</p>
							<hr style="width:210px;margin:-1px auto 0;background: #DDDDDD;"/>
							<ul>
								<li style="background:#C00000;margin-left:10px;"  title="#C00000"></li>
								<li style="background:#FF0000;" title="#FF0000"  unselectable="on"></li>
								<li style="background:#FFC000;"  title="#FFC000"  unselectable="on"></li>
								<li style="background:#FFFF00;"  title="#FFFF00"  unselectable="on"></li>
								<li style="background:#92D050;"  title="#92D050"  unselectable="on"></li>
								<li style="background:#00B050;"  title="#00B050"  unselectable="on"></li>
								<li style="background:#00B0F0;"  title="#00B0F0"  unselectable="on"></li>					
								<li style="background:#0070C0;"  title="#0070C0"  unselectable="on"></li>
								<li style="background:#7030A0;"  title="#7030A0"  unselectable="on"></li>
							</ul>
						</div>
					</div>
					<div  id="backcolor" class="colorsmallBox" style="position: relative;">
						<span class="pointPanel" unselectable="on" style="width:25;height:24px;display: block;">A</span>
					</div>
				</div>
				
				<div class="wordContent">
					<input type="text"  type="text" spellcheck="false"
						autocomplete="off" name="title" placeholder="输入标题" tabindex="10"
						stash-placeholder="输入标题" id="title" value='<s:property value="#log.logName"/>'>
					<hr style="width:890px;margin:0 auto 20px;"/>
				</div>
				<div id="context" style="width:100%;background: #FFFFFF;display: block;"></div>

				<textarea id="textarea" style="width:0px;height:0px"><s:property value="#log.logContent"/></textarea>
				<div class="wordfoot" id="wordFoot">
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
			</div>
			</div>

			<div class="sendText">
				<input type="button" value="保存" name="save" alt="${sgin}" onclick="sendDiary(false,this,'<s:property value="#diary"/>')">
				<input type="button" value="浏览" name="look">			
				<input type="button" value="保存草稿" name="saveDraft" alt="${sgin}" onclick="sendDiary(true,this,'<s:property value="#draft"/>')">
			
			</div>
		</form>
	</body>
</html>