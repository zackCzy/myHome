<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@taglib uri="/struts-tags" prefix="s" %>
<%
	String basePath = request.getContextPath();
	String path=request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+basePath; 
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<%@include file="../meta/indexMeta.jsp"%>
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/public/main.css">
		<link rel="stylesheet"  type="text/css" href="<%=path %>/CSS/myHomeMusic.css">
		<script type="text/javascript">
			BASE_PATH="<%=path %>";
		</script>
		<script type="text/javascript" src="<%=path %>/JS/tool/span.js"></script>
		<script type="text/javascript" src="<%=path %>/scripts/jquery-1.10.1.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/plugObject/notice.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/tool/JQ_plugs.js"></script>
		<script type="text/javascript" src="<%=path %>/JS/myHomeMusic.js"></script>
		<title>Viki_背景音乐</title>
	</head>
	<body>
		<div id="lock_music"></div>
		<%@ include file="/WEB-INF/jsp/head.jsp"%>
		<div class="pick_music_box">
			<h4 id="box_move">挑选Mini音乐<i class="box_close"></i></h4>
			<span id="search_point">搜索歌曲</span>
			<hr >
			<div class="search_music"><input type="text" id="bt_search_text"><i id="bt_search"></i></div>
			<ul id="display_box">
				<%--搜索结果 --%>
			</ul>
			<div class="page_number">
				<b id="pageNum" style="float: left;font-size:13px;line-height:22px;color:#CFCFCF;"></b>
				<div id="displayPage"><i style="width:50px;" id="endpage"></i><i id="footpage"></i><i></i><i></i><i></i><i></i></div>
			</div>	
		</div>
		<div class="add_pick_music_box">
			<h4 id="add_box_move">添加网络Mp3<i class="box_close"></i></h4>
			<table cellspacing=20px;>
				<tr height=10%>
					<td width=25% align="right">
						歌曲名
					</td>
					<td width=75%>
						<input type="text" id="song_name">
					</td>
				</tr>
				<tr height=10%>
					<td width=25% align="right">
						歌手名
					</td>
					<td width=75%>
						<input type="text" id="singer_name">
					</td>
				</tr>
				<tr height=10%>
					<td width=25% align="right">
						歌曲地址
					</td>
					<td width=75%>
						<input type="text"   id="song_url">
					</td>
				</tr>
				<tr height=10% >
					<td rowspan="2" width=100% colspan="2" align="center" >
						<input type="button" value="保存" id="seav_internation_music" />
					</td>
				</tr>
			</table>
		</div>
		<div class="home_music_box" style="position:relative;">
			<h4 >Mini 音乐 — 背景音乐设置<!--  <span><input type="text" placeholder="Mini搜索" stash-placeholder="Mini搜索"></span>  --></h4>
			<hr style="width:750px;margin:0 auto;border:1px solid #2781B9;">
			<div class="home_add_music">
				<strong style="color:#585858;margin: 20px 0 0 30px;display: block;font-size:15px">添加背景音乐</strong>
				<div class="vip_box">
					<ul>
						<li style="border-right:1px dashed #FBFBFB;">
							<div>
								<strong id="mini_music_data">挑选库内歌曲</strong><br>
								<span>海量正版高品质音乐<br>
								随心设置</span>
							</div>
						</li>
						<li style="background: url(<%=path %>/image/music_ico.png) 85px 40px no-repeat;">
							<div>
								<strong>上传本地音乐</strong><br>
								<span>本地歌曲<br>
								快速上传</span>
							</div>
						</li>
					</ul>
					
				</div>
				<div class="free_box">
					<ul>
						<li style="border-right:1px dashed #FBFBFB;background: url(<%=path %>/image/friends.png) 90px 40px no-repeat;">
							<strong>向好友索要</strong><br>
							<span>Mini好友<br>免费赠送</span>
						</li>
						<li>
							<div>
								<strong id="internation_music">网络背景音乐</strong><br>
								<span>连通率低<br>
								推荐使用库内音乐</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div style="clear: both;"></div>
			<s:if test="#musics.size==0">
				<div class="make_music">
				</div>
				<div style="margin-top:-140px;height:356px;width:100%;background: url('<%=path %>/images/miniMusic/1924435q8rrpcjqq2j6q2b.png') 400px no-repeat ;clear:both"></div>	
				<h2 style="padding:10px;text-align:center; border-bottom:2px solid #4CC1E9; color:#A9C50B;position: absolute;;top:490px;left:190px;margin:0;padding:0;width:350px;height:30px;">目前还没有音乐，快去添加吧！</h2>
			</s:if>	
			<s:else>
				<div class="make_music">
					<strong style="color:#585858;display: block;margin:20px 30px;font-size:15px">
						正在使用的背景音乐
					</strong>
					<ul>
						<li><span style="color: #ECECEC">序号</span><span style="color: #ECECEC;text-indent:3em">歌曲名/歌手</span></li>
					</ul>
					<ol>
						<s:iterator value="#musics" var="music" status="status">
							<li><span><s:property value="#music.song"/>- <s:property value="#music.singer"/></span><a alt="<s:property value="#music.id"/>">删除</a></li>
						</s:iterator>
					</ol>
				</div>
			</s:else>		
			
		</div>
	</body>
</html>