<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="homePageHead.jsp" %>
			<div class="home_content_display_wrap">
				<s:if test="#authority==1">
					<div class="home_list_display">
						<div class="logList_right">
								<div class="small_speak_info">
									<span ><a href="<%=path %>/user/space/<s:property value="#user.name"/>/smallSpeak"><s:property value="#speakCount"/></a>条微说</span>		
									<hr/>
									<img src="<%=path %>/load/download_getBigPhoto?id=<s:property value="#user.id"/>"/>
									<strong><s:property value="#user.userBaseDatum.name"/></strong>
									<strong>今日微说：</strong>
									<strong><s:property value="#speakDateCount"/>条</strong>
								</div>
							
						</div>
					</div>
				</s:if>
				<div class="home_content_display">
					<s:if test="#authority==1">
						<div id="addContent" style="float: left;">
								<div style="width: 640px;height:20px; margin:15px 0 20px 15px;background: url('<%=path %>/image/iconbtn.png') no-repeat;"></div>
								<div contenteditable="true" id="shuoshuo">&nbsp;&nbsp;</div>
								<div style="width: 640px;height:50px; margin:0 0 20px 15px;">
									<input alt="${token}" type="button" style="border-radius:15px;cursor:pointer;float:right;width:100px; height:30px;background: #5CAAE6" value="发表" onclick="sendSmallSpeak(this)">
								</div>	
							</div>
					</s:if>
					<s:iterator value="#dynamic" var="newLog" >
						<div class="con_user_box">
							<img class="user_photo" width="40" height="40" src="<%=path %>/load/download_getSmallPhoto?id=<s:property value="user.id"/>" />
							<span><s:property value="modifyDate"/></span>
							<a class="user_name" href="<%=path %>/user/space/<s:property value="user.name"/>/" target="_blank"><s:property value="user.userBaseDatum.name"/></a>
							<a target="_blank">
								<div class="content_user_li">
									<div> <s:property value="noHtmlLog" /></div>
								</div>
							</a>
							<div class="comment_box">
								<s:if test="#authority==1">
									<span alt=" <s:property value="id" />" class="remove_log">删除</span>
								</s:if>
								<span class="view_com"  alt="<s:property value="id" />">
								评论(<b><s:property value="commentNum" default="0"/></b>)
								</span>
								<span>浏览(<s:property value="visibleNum" default="0"/>)</span>
							</div>
							<div class="comment">
								<h5>评论：</h5>
								<div class="commentArea" contenteditable="true"></div>
								<input class="sendComment" type="button" value="评论" alt="<s:property value="id"/>">
								<div class="displayComment"></div>
								<div class="load_box">正在拼了命的,为您加载!</div>
								<b class="cut_out">↑ 收起</b>
							</div>		
						</div>
					</s:iterator>
					<s:if test="#speakCount==0">
						<div class="userNotice">
							<s:if  test="#authority==1">
								<h2>你还没有发布过内容哦！<s:a action="function_cteateDiary">发点什么吧!</s:a></h2>
							</s:if>
							<s:else>
								<h2>用户很懒,什么都没有写!<a href="<%=path %>/user/function_cteateDiary">快去通知他吧</a></h2>
							</s:else>
						</div>
					</s:if>
				</div>
				<div class="point_load_status" >
					<span>稍等片刻，小V正在飞奔为您获取信息</span>	
				</div>
				<div style="width:100%;height:30px;"></div>
			</div>		
		</div>
		<script type="text/javascript" src="<%=path %>/JS/HomePage.js"></script>
	</body>
</html>