<%@taglib uri="/myHome" prefix="mini" %>

<% 
	//解决out流和reponse流冲突
	out.clear(); 
	out = pageContext.pushBody(); 
%>
<mini:Draws path="/application"/>






