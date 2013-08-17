	//全局变量
	var selectedTd;

	/*------------------------单元格操作----------------------------*/
	//垂直分割单元格
	function vDivide( target, num ){
		var tabstring = tab( parentscount(target)+1 );
		if( target.parent().children().length==1 ){
			var content = "<tr>\n"+tabstring+"\t<td></td>\n";
			for(var i=0; i<num-1; i++){
				content = content + tabstring+"</tr>\n"+tabstring+"<tr>\n"+tabstring+"\t<td></td>\n";
			};
			content = content + tabstring+"</tr>"
			target.parent().replaceWith(content);
		}
		else{
			tabstring += "\t"
			var content = "\n"+tabstring+"\t<table>\n"+tabstring+"\t\t<tbody>\n"+tabstring+"\t\t\t<tr>\n"+tabstring+"\t\t\t\t<td>\n"+tabstring+"\t\t\t\t</td>";
			for(var i=0; i<num-1; i++){
				content = content + "\n"+tabstring+"\t\t\t</tr>\n"+tabstring+"\t\t\t<tr>\n"+tabstring+"\t\t\t\t<td>\n"+tabstring+"\t\t\t\t</td>";
			};
			content = content + "\n"+tabstring+"\t\t\t</tr>\n"+tabstring+"\t\t</tbody>\n"+tabstring+"\t</table>\n"+tabstring;
			target.html(content);
		}
		tdbind();
	};
	//水平分割单元格
	function hDivide( target, num ){
		var tabstring = tab( parentscount(target)+1 );
		var content = "<td></td>\n";
		for(var i=0; i<num-1; i++){
			content = content + tabstring + "\t<td></td>\n";
		};
		target.replaceWith(content);
		tdbind();
	};
	//独立单元格
	function independent( target ){
		var tabstring = tab( parentscount(target)+2 );
		var content = "\n"+tabstring+"\t<table>\n"+tabstring+"\t\t<tbody>\n"+tabstring+"\t\t\t<tr>\n"+tabstring+"\t\t\t<td></td>\n"+tabstring+"\t\t\t</tr>\n"+tabstring+"\t\t</tbody>\n"+tabstring+"\t</table>\n"+tabstring;
		target.html(content);
		selected( target.find("td") );
	};

	//完成，输出代码
	function done(){
		$("table").css({
			"border":"0",
		       	"cellspacing":0,
			"cellpadding":0
		});
		$("td").css({
			"border":"0"
		})
		$("body").html("<pre>" + $(".s-v").html().replace(/</g,"&lt;").replace(/>/g,"&gt") + "</pre>");
	};

	function tab( numb ){
		var result = "";
		while( numb ){
			result += "\t";
			numb--;
		};
		return result;
	};

	function parentscount( target ){
		var item = function( obj, count ){
			if( obj.parent(".s-v").length ){
				return count;
			}
			else{
				return item( obj.parent(), count+1 );
			}
		};
		return item( target, 0 );
	}
	

	/*--------------------------显示---------------------------*/
	function selected( target ){
		//选中元素突出显示
		$("td").css("border","1px solid #ddd");
		target.css("border","1px solid #555");
		//记下被选中的元素
		selectedTd = target;
	};
	function showDetail( target ){
		$("#width").val( target.width() );
		$("#height").val( target.height() );
		$("#padding").val( target.css("padding") );
		$("#background").val( target.css("background-image") );
	};


	/*-------------------------修改数据-------------------------------*/
	function changeTd( target ){
		target.css({
			"width": $("#width").val()+"px",
			"height": $("#height").val()+"px",
			"padding": $("#padding").val()+"px",
			"background-image": "url(" + $("#background").val() + ")",
			"line-height": 1,
		});
	};

	function changeBox(){
		$("div table").css({
			"width": $("#boxwidth").val()+"px",
			"height": $("#boxheight").val()+"px",
			"background-image": "url("+$("#boxbg").val()+")"
		});
	};

	/*-------------------------td绑定----------------------------------*/
	function tdbind(){
		$("td").bind("click",function(eve){
			selected($(eve.target));
			showDetail($(eve.target));
		});

	}

	//初始化，绑定事件
	$(document).ready(function(){
		tdbind();
		$("#divide").bind("click",function(){
			if( $("#number").val() ){
				if( $("#direction").val() == "vertical" ){
					vDivide( selectedTd, $("#number").val() );
				}
				else if( $("#direction").val() == "horizontal" ){
					hDivide( selectedTd, $("#number").val() );
				};
			}
		});
		$("#independ").bind("click",function(){
			independent( selectedTd );
		});
		$("#boxsize").bind("click",function(){
			changeBox();
		});
		$("#tdchange").bind("click",function(){
			changeTd( selectedTd );
		});
		$("#done").bind("click",function(){
			done();
		});
	});

