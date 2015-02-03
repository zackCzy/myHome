windowLoad(load);


function load(){
	$Base("#dicky").setCenter().css({top:"550px"});
	$Base("#dicky").event("click", function(){
		$Base("#dicky").active({
			step:10,t:30,async:{
				x:150,
				y:250
			}
		});
	});
	
	$Base(window).event("resize", function(){
		$Base("#dicky").setCenter();
	});
	window.ro=0;
	$Base("#dicky").rotate(50);
	$Base(window).event("scroll", function(){
		var scrollTop=getScroll().top;
		var node=$Base("#dicky").show();
		if(this.scrollTop<scrollTop){
			node.rotate(-250);
		}else{
			node.rotate(250);
		}
		this.scrollTop=scrollTop;
		
		if(scrollTop<350){
			node.hide();
			return
		}
		
		var nx=parseInt(node.css("left"));
		var ny=scrollTop+150;
		if(scrollTop>950){
			node.active({
				step:10,t:30,async:{
					x:nx+50,
					y:ny+50,
					fn:function(){
						node.active({
							step:10,t:30,async:{
								x:nx+1,
								y:ny-250
							}});
					}
				}
			});
			return 
		}
		window.ro=window.ro+10;
		if(window.ro>360){
			window.ro=0;
		}

		node.active({
			step:10,t:30,async:{
				x:nx,
				y:ny
			}
		});
	});
	
	
	//alert($Base("#dicky").get(0,true).style.transform);
}