<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="homePageHead.jsp" %>
			<div class="home_content_display_wrap">
				<div class="home_content_display">
					<s:iterator value="#dynamic" var="newLog" >
					<div class="con_user_box">
						<img class="user_photo" width="40" height="40" src="<%=path %>/load/download_getSmallPhoto?id=<s:property value="user.id"/>">
						<span><s:property value="modifyDate"/></span>
						<a class="user_name" href="<%=path %>/user/space/<s:property value="user.name"/>/" target="_blank"><s:property value="user.userBaseDatum.name"/></a>
						<a href="<%=path %>/user/function_r_readDiary?logId=<s:property value="id" />" target="_blank">
							<div class="content_user_li">
								<strong class="logTitle">《<s:property value="logName" />》</strong>
								<br>
								<div><s:property value="noHtmlLog.substring(0,noHtmlLog.length()>350 ? 350 : noHtmlLog.length())"/></div>
							</div>
						</a>
						<div class="comment_box">
							<s:if test="#authority==1">
								<span alt="<s:property value="id" />" class="remove_log">删除</span>
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
							<input class="sendComment" type="button" value="评论" alt="<s:property value="id"/>">
							<div class="displayComment"></div>
							<div class="load_box">正在拼了命的,为您加载!</div>
							<b class="cut_out">↑ 收起</b>
						</div>		
					</div>	
					</s:iterator>				
					<s:if test="#dynamic.size()==0">				
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
				<div class="home_list_display">
					<s:if test="#authority==1">
						<ul class="diray_list_ul" id="diray_list_ul">
							<li style="border-right: 7px solid #10D65B"><s:a action="function_cteateDiary" target="_blank">写日记</s:a></li>
							<li style="border-right: 7px solid #FE2C45"><s:a action="user_draft" target="_blank">草稿箱</s:a></li>
							<li style="border-right: 7px solid #087BBC"><s:a action="user_recycled" target="_blank">回收站</s:a></li>
							<li style="border-right: 7px solid #23C3FF"><s:a action="user_datum" target="_blank">设置</s:a></li>
						</ul>	
					</s:if>
					<s:else>
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
					</s:else>
				</div>
				<div class="point_load_status" >
					<span>稍等片刻，小V正在飞奔为您获取信息</span>	
				</div>
				<div style="width:100%;height:30px;clear: both;"></div>
			</div>
		</div>
		<script type="text/javascript" src="<%=path %>/JS/HomePage.js"></script>
	</body>
</html>