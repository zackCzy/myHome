<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="homePageHead.jsp" %>
			<div class="home_content_display_wrap">
				<div class="home_list_display">
					<div class="logList_right">
						<h5>最新发布</h5>
						<ul>
							<s:iterator value="#newhostLogs" var="newLog" >					
								<li><a target="_blank" title="<s:property value="logName"/>" href="<%=path %>/user/function_r_readDiary?logId=<s:property value="id"/>"><s:property value="logName"/></a></li>
							</s:iterator>
						</ul>
					</div>
					<div class="logList_right">
						<h5>热门博文</h5>
						<ul>
							<s:iterator value="#hostLogs" var="newLog" >					
								<li><a target="_blank" title="<s:property value="logName"/>" href="<%=path %>/user/function_r_readDiary?logId=<s:property value="id"/>"><s:property value="logName"/></a></li>
							</s:iterator>
						</ul>
					</div>
					<div class="logList_right">
						<h5>评论最多</h5>
						<ul>
							<s:iterator value="#conhostLogs" var="newLog" >					
								<li><a target="_blank" title="<s:property value="logName"/>" href="<%=path %>/user/function_r_readDiary?logId=<s:property value="id"/>"><s:property value="logName"/></a></li>
							</s:iterator>
						</ul>
					</div>
				</div>
				<div class="home_content_display">
					<div style="float: left;" id="addContent">
						<div style="width:100%;height:20px; margin:15px 0 20px 15px;background: url('<%=path %>/image/iconbtn.png') no-repeat;"></div>
						<div contenteditable="true" id="shuoshuo">&nbsp;&nbsp;</div>
						<div style="width:100%;height:50px;">
							<input alt="${token}" type="button" style="border-radius:15px;cursor:pointer;float:right;width:100px; height:30px;background: #5CAAE6" value="发表" onclick="sendSmallSpeak(this)">
						</div>	
					</div>
					<s:iterator value="#dynamic" var="newLog" >
						<div class="con_user_box">
							<a href="<%=path %>/user/space/<s:property value="user.name"/>/">
								<img class="user_photo" width="40" height="40" src="<%=path %>/load/download_getSmallPhoto?id=<s:property value="user.id"/>" />
							</a>
							<span><s:property value="modifyDate"/></span>
							<a class="user_name" href="<%=path %>/user/space/<s:property value="user.name"/>/" target="_blank"><s:property value="user.userBaseDatum.name"/></a>
							<s:if test="smallSpeak">
								<a target="_blank">
									<div class="content_user_li">
										<div> 
											<s:property value="noHtmlLog" />
										</div>
									</div>
								</a>
							</s:if>
							<s:else>
								<a href="<%=path %>/user/function_r_readDiary?logId=<s:property value="id" />" target="_blank">
									<div class="content_user_li">
										<strong class="logTitle">《<s:property value="logName" />》</strong>
										<br>
										<div><s:property value="noHtmlLog.substring(0,noHtmlLog.length()>350 ? 350 : noHtmlLog.length())"/></div>
									</div>
								</a>
							</s:else>	
							<div class="comment_box">
								<span alt=" <s:property value="id" />" class="remove_log">删除</span>
								<s:if test="user.id==#session.id&&!smallSpeak">
									<span>
										<a target="_blank" href="<%=path %>/user/function_modifyDiary?logId=<s:property value="id" />">编辑</a>
									</span>
								</s:if>
								<span class="view_com"  alt="<s:property value="id" />">
								评论(<b><s:property value="commentNum" default="0"/></b>)
								</span>
								<span>浏览(<s:property value="visibleNum" default="0"/>)</span>
							</div>
							<div class="comment">
								<h5>评论：</h5>
								<div class="commentArea" contenteditable="true"></div>
								<input class="sendComment" type="button" value="评论" alt="<s:property value="id"/>" />
								<div class="displayComment"></div>
								<div class="load_box">正在拼了命的,为您加载!</div>
								<b class="cut_out">↑ 收起</b>
							</div>		
						</div>
					</s:iterator>
				</div>
				<div class="load_user_contenr">
					<div class="point_load_status" >
						<span >正在努力加载</span>	
					</div>
				</div>

			</div>
		</div>
		<script type="text/javascript" src="<%=path %>/JS/HomePage.js"></script>	
	</body>
</html>