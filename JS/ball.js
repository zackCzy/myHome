

function ShowBf(){
	var dataTable=document.createElement("table");
	dataTable.className="ball_data";
	var dataThead=document.createElement("thead");
	dataThead.style.height="40px";
	dataThead.innerHTML="<tr >"+
					"<td colspan='2'>"+matchdate+"</td>"+
					"<td width='8%'>时间</td>"+
					"<td width='6%'>状态</td>"+
					"<td width='22%'>主场球队</td>"+
					"<td width='6%'>比分</td>"+
					"<td width='22%'>客场球队</td>"+
					"<td width='6%'>半场</td>"+
					"<td width='6%'>数据</td>"+
					"<td width='6%'>资讯</td>"+
				"</tr>";
	dataTable.appendChild(dataThead);
	var dataTbody=document.createElement("tbody");
	var date=new Date();
	for ( var i = 1; i <A.length; i++) {
		try {
			var matchTr=document.createElement("tr");
			matchTr.style.background=i%2==0? "#F0F0F0":"#DBEAF9";
			var span=document.createElement("span");	
			var matchNameTd=document.createElement("td");
			matchNameTd.setAttribute("colspan",2);
			matchNameTd.style.color="#FFFFFF";
			matchNameTd.style.background=A[i][1];
			matchNameTd.innerHTML=A[i][2];
			
			var matchTimeTd=document.createElement("td");
			matchTimeTd.width="8%";
			matchTimeTd.innerHTML=A[i][11];
			
			matchStateTd=document.createElement("td");
			matchStateTd.width="6%";
			
			var time=A[i][12].split(",");
			var befordate = new Date(time[0],time[1],time[2],time[3],time[4],time[5]);
			if(date.getTime()>befordate.getTime()+5400000){
				matchStateTd.style.color="#333";
				matchStateTd.innerHTML="完";
			}
			if(date.getTime()-befordate.getTime()<5400000){
				matchStateTd.style.color="#FF4700";
				matchStateTd.innerHTML=Math.floor((date.getTime()-befordate.getTime())/1000/60)+"+";
				
			}
			if(date.getTime()<befordate.getTime()){
				if(date.getTime()>befordate.getTime()-86400000){
					matchStateTd.style.color="#333";
					matchStateTd.innerHTML="未";
				}
			}
				
			matchMainTd=document.createElement("td");
			matchMainTd.width="22%";
			
			if(A[i][22]>0){
				matchMainTd.innerHTML+="<sup>["+A[i][22]+"]</sup>";
			}
			if(A[i][18]>0){	
				matchMainTd.innerHTML+="<sup class='redCard'>"+A[i][18]+"</sup>";
			}
			if(A[i][20]>0){	
				matchMainTd.innerHTML+="<sup class='yellowCard'>"+A[i][20]+"</sup>";
			}
			matchMainTd.innerHTML+=A[i][5];
			
			matchScoreTd=document.createElement("td");
			matchScoreTd.width="6%";
			matchScoreTd.innerHTML=A[i][14]+"-"+A[i][15];
			matchScoreTd.className='score';
			matchScoreTd.setAttribute("alt", i);
			
			matchAwayTd=document.createElement("td");
			matchAwayTd.width="22%";
			matchAwayTd.innerHTML=A[i][8];
			if(A[i][19]>0){
				matchAwayTd.innerHTML+="<sup class='redCard'>"+A[i][19]+"</sup>";
			}
			if(A[i][21]>0){
				matchAwayTd.innerHTML+="<sup class='yellowCard'>"+A[i][21]+"</sup>";
			}
			if(A[i][23]>0){
				matchAwayTd.innerHTML+="<sup>["+A[i][23]+"]</sup>";
			}			

			matchBScoreTd=document.createElement("td");
			matchBScoreTd.width="6%";
			matchBScoreTd.innerHTML=A[i][24]+"-"+A[i][25];
			matchBScoreTd.className='score';
			matchBScoreTd.setAttribute("alt", i);
			
			matchTr.appendChild(matchNameTd);
			matchTr.appendChild(matchTimeTd);
			matchTr.appendChild(matchStateTd);
			matchTr.appendChild(matchMainTd);
			matchTr.appendChild(matchScoreTd);
			matchTr.appendChild(matchAwayTd);
			matchTr.appendChild(matchBScoreTd);
			matchTr.innerHTML+="<td width='6%'></td>"+
			"<td width='6%'><img width='10' height='10' style='margin-right:5px;' src='http://static.8788.cn/new_images/ver1.2/bf/zd.gif'></td>";

			dataTbody.appendChild(matchTr);
		} catch (e) {
		}
	}
	dataTable.appendChild(dataTbody);
	document.getElementsByTagName("body")[0].appendChild(dataTable);
	$(".score").hover(function(evt){
		var clientHeight = document.documentElement.scrollTop==0? document.body.clientHeight : document.documentElement.clientHeight;
		 $(".football_detail").css({"top":evt.clientY+172>clientHeight? evt.clientY-177+"px":evt.clientY+5+"px","left":evt.clientX<364+298? 364:614+"px"}).show();	
		},function(){
			 $(".football_detail").css({"display":"none"});
	});
	$("table").addScroll();
};

setInterval(arg1, arg2)



