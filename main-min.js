/*Codelike linked list operation*/


var linked_node=Array();

var linkedOperation=[];
var initialConfig={
	'node_x_axis':70,
	'node_y_axis':40,
	'height':40,
	'width':100,
	'node_counter':0,
	'find_status':0,
	'head_pointed':-1,
	'tail_pointed':-1,
	'head_x_position':20,
	'head_y_position':65,
	'head_line_x':20,
	'head_line_y':65,
	'tail_x_position':20,
	'tail_y_position':360,
	'node_distance':70,
	'stroke_width':'1px',
	'line_stock':"black",
	"rect_stock":"black",
	"text_stock":"none",
};

var node_varified={
	'data':'linked_data',
	'divide':'divide_line',
	"divide2":'divide_lineb',
	'rect':'rect',
	'svg':'linked_list_svg',
	'input':'linked_data_input',
	'next_ptr':'next_node_position',
	'head_line':'head_connected',
	'message':'linke_list_message',
	'model':'codelike-visualization-model'
};

function empt_linkList(){
	$("#linked_list_svg > rect").remove();
	$("#linked_list_svg > line").remove();
	$("#linked_list_svg > text").remove();
}
getLinkedNode();
function getLinkedNode() {
	var url      = window.location.href; 
	var result= url.split('/');
	/*Data url data*/
	var data = result[result.length-1];
   
    result=data.split('-');
    data=[];
    var index=0;
    for(index;index<result.length;index++){
    	/*Put user data*/
    	if($.isNumeric(result[index])){
    	   data.push(
    		{
    			index:result[index]
    		}
    	  );
    	}

    }

    if(data.length==0){
    	/*Initial insert data*/
    	while(1){
    		if(data.length<10){

    			result=Math.floor(Math.random() * 50) + 10;
    			data.push({index:result});  
    		}else{
    			break;
    		}
    	}

    }
     mange_linked_data(data,0,data.length);
}

function mange_linked_data(data,start,end){ 
	$(".LinklistBtn").attr("disabled","disabled");
	if(start<end){

		var id=initialConfig.node_counter;

		$("#linked_data_input").val((data[start].index));
		insert_node("start",parseInt(data[start].index),id,function(){
			initialConfig.node_counter++;
			mange_linked_data(data,start+1,end);	
		});
	}else{
		$("#linked_data_input").val("");
		enable_operation();
	}
}


linkedOperation.findAmination=function(start_index,end_index,move_node,done){
	var animation_speed=4;
	var s_x=parseInt($(move_node).attr("x"));
	var s_y=parseInt($(move_node).attr("y"));
	var e_x=parseInt(linked_node[end_index].rect_x);
	var e_y=parseInt(linked_node[end_index].rect_y);
	var	points;
	if(move_node!="#find_linke_node"){
		if((e_x+234)<document.getElementById('codelike-linked-list-svg').offsetWidth){
			e_x+=154;
		}
		else {
			linked_node[start_index].print_level=linked_node[end_index].print_level+1;
			e_x=223;
			e_y+=80;
		}
	}

	if(e_y+100>$('#linked_list_svg').attr("height")){
        $("#linked_list_svg").attr("height",e_y+100);
	}
	var x_in=1,y_in=1;
	if(s_x>e_x){
		x_in=s_x-e_x;
	}
	else if(s_x<e_x){
		x_in=e_x-s_x;
	}
	if(e_y>s_y){
		y_in=e_y-s_y;
	}
	else if(e_y<s_y){
		y_in=s_y-e_y;
	}

	if(x_in>y_in){
		y_in=parseInt(x_in/y_in);
		x_in=1;
	}
	
	else{
		x_in=parseInt (y_in/x_in);
		y_in=1;
	}

	var calulate=1;
	var find_interval=setInterval(function(){
        points="";
		if((s_x==e_x&&s_y==e_y)){
			done();
			clearInterval(find_interval);
		}

		if(calulate%x_in==0){
			if(s_x>e_x)
				s_x--;
			else if(s_x+1<=e_x){
				s_x++;
			}
		}

		if(calulate%y_in==0){
			if(s_y>e_y){
				s_y--;
			}
			else if (s_y+1<=e_y){
				s_y++;
			}   			
		}
		$(move_node).attr("x",s_x);
		$(move_node).attr("y",s_y);
		if(move_node!="#find_linke_node"){
			$("#"+node_varified.divide+start_index).attr("x1",s_x+initialConfig.width-(initialConfig.width/5));
			$("#"+node_varified.divide+start_index).attr("y1",s_y);
			$("#"+node_varified.divide+start_index).attr("x2",s_x+initialConfig.width-(initialConfig.width/5));
			$("#"+node_varified.divide+start_index).attr("y2",s_y+initialConfig.height);
            $("#"+node_varified.divide+"b"+start_index).attr("x1",s_x+initialConfig.width-(initialConfig.width/5));
			$("#"+node_varified.divide+"b"+start_index).attr("y1",s_y);
			$("#"+node_varified.divide+"b"+start_index).attr("x2",s_x+initialConfig.width-(initialConfig.width/5));
			$("#"+node_varified.divide+"b"+start_index).attr("y2",s_y+initialConfig.height);
					

			$("#"+node_varified.data+start_index).attr("x",s_x+30);
			$("#"+node_varified.data+start_index).attr("y",s_y+(initialConfig.height/2));
			points= linked_node[end_index].next_node_link_x1+","+linked_node[end_index].next_node_link_y1+","+linked_node[end_index].next_node_link_x2+","+linked_node[end_index].next_node_link_y2+","+(linked_node[end_index].next_node_link_x2+2)+","+linked_node[end_index].next_node_link_y2;
			
			$("#"+node_varified.next_ptr+end_index).attr("points",points);
			
			linked_node[end_index].next_node_link_x2=s_x;
			linked_node[end_index].next_node_link_y2=s_y+(initialConfig.height/4);

			var x_1=s_x+initialConfig.width-(initialConfig.width/8);
			var y_1=s_y+(initialConfig.height/4);
			linked_node[start_index].next_node_link_x1=x_1;
			linked_node[start_index].next_node_link_y1=y_1;


			linked_node[start_index].next_node_link_x2=x_1;
			linked_node[start_index].next_node_link_y2=y_1;
			if(linked_node[start_index].next_ptr==-1){

				$("#"+node_varified.next_ptr+start_index).attr("points",""+x_1+","+y_1+","+(x_1)+","+y_1);
				
			}	
			else{
				var x_2=linked_node[linked_node[start_index].next_ptr].rect_x;
				var y_2=linked_node[linked_node[start_index].next_ptr].rect_y+(initialConfig.height/2);
				$("#"+node_varified.next_ptr+start_index).attr("points",""+x_1+","+y_1+","+(x_2-4)+","+y_2);
				
			}
				
		}
       
		calulate++;
	},animation_speed);
}

linkedOperation.tailConnection=function(){
    var index=initialConfig.head_pointed;
    initialConfig.tail_pointed=-1;
	while(index!=-1){
		initialConfig.tail_pointed=index;
		index=linked_node[index].next_ptr;

	}	
	if(initialConfig.tail_pointed!=-1){
		var x1=initialConfig.tail_x_position,
			y1=initialConfig.tail_y_position;
			x2=linked_node[initialConfig.tail_pointed].rect_x,
			y2=linked_node[initialConfig.tail_pointed].rect_y+(initialConfig.height/2);
			$("#tail_connected").attr("points",x1+","+y1+","+x2+","+y2);
	}else{
		  $("#tail_connected").attr("points",initialConfig.tail_x_position+","+initialConfig.tail_y_position+","+(initialConfig.tail_x_position+2)+","+initialConfig.tail_y_position);
                    
	}
}
linkedOperation.findPositionByData=function(find_data,index,status){

	if(index==-1){
		status(0,0);
	}
	else if(linked_node[index].node_data==find_data){
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){ 
			status(1,index);
		});
	}
	else{
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){ 
			setTimeout(function(){
					linkedOperation.findPositionByData(find_data,parseInt(linked_node[index].next_ptr),status);
			},700);
		
		});
	}			
}

linkedOperation.findPositionByIndex=function(previous,current_node,find_position,counter,status){

	if(current_node==-1){
		status(0,-1);
	}
	else if((counter+1)==find_position){
		linkedOperation.findAmination(previous,current_node,"#find_linke_node",function(){ 
			status(1,current_node);
		});
	}
	else{

		linkedOperation.findAmination(previous,current_node,"#find_linke_node",function(){ 
		    setTimeout(function(){
		    	linkedOperation.findPositionByIndex(current_node,parseInt(linked_node[current_node].next_ptr),find_position,counter+1,status);
		    },700);
			
		});
	}		
}



function makeSVG(tag, attrs) {
	var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
	for (var k in attrs){
		el.setAttribute(k, attrs[k]);
	}
	return el;
}  

function create_node(id){

	var x_1=initialConfig.node_x_axis+initialConfig.width-(initialConfig.width/5);
	var y_2=initialConfig.node_y_axis+(initialConfig.height);
	var x=initialConfig.node_x_axis+(initialConfig.width/2);
	var y=initialConfig.node_y_axis+((initialConfig.height)/2);
	var data=$("#"+node_varified.input).val();

	var next_node_linke_x1=initialConfig.node_x_axis+initialConfig.width-(initialConfig.width/6);
	var next_node_linke_y1=initialConfig.node_y_axis+(initialConfig.height/4);

	var new_node= makeSVG('rect', {x: initialConfig.node_x_axis, y:initialConfig.node_y_axis,height:initialConfig.height,width:initialConfig.width, id:node_varified.rect+id,stroke: initialConfig.rect_stock, 'stroke-width': initialConfig.stroke_width, fill:'none'});
	
	var partition_line1= makeSVG('line', {x1:x_1, y1:initialConfig.node_y_axis,x2:x_1, y2: y_2,  id:node_varified.divide+id,stroke: initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width});
	var x_2=20+initialConfig.node_x_axis+initialConfig.width-(initialConfig.width);
	var partition_line2= makeSVG('line', {x1:x_2, y1:initialConfig.node_y_axis,x2:x_2, y2: y_2,  id:node_varified.divide+'b'+id,stroke: initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width});
	 

	var data= makeSVG('text', {x: x, y: y,id:node_varified.data+""+id,"font-family":"Verdana",stroke:initialConfig.text_stock,"font-size":"20px",dy:".3em",'text-anchor':"middle",'stroke-width':"0.8px"});

	$("#"+node_varified.svg).append(new_node);
	$("#"+node_varified.svg).append(partition_line1);
	$("#"+node_varified.svg).append(partition_line2);

	$("#"+node_varified.svg).append(data);
	data=$("#"+node_varified.input).val();
	var next_ptr_index,previous=-1;

	if(linked_node.length==0){

		initialConfig.head_pointed=id;
		initialConfig.tail_pointed=id;
		next_ptr_index=-1;

	}
	else{

		next_ptr_index=initialConfig.head_pointed;
		
	}

	if(id!=-1){
		linked_node.push({
			inserted_position:id,
			divide_line_x1:x_1,
			divide_line_y1:initialConfig.node_y_axis,
			divide_line_x2:x_1,
			divide_line_y2:y_2,
			divide_line_b_x1:x_2,
			divide_line_b_x2:x_2,
			divide_line_b_y1:initialConfig.node_y_axis,
			divide_line_b_y2:y_2,
			rect_x:parseInt (initialConfig.node_x_axis),
			rect_y:parseInt(initialConfig.node_y_axis),
			data_x:x,
			data_y:y,
			node_data:data,
			next_ptr:next_ptr_index, 
			previous:previous,

			next_node_link_x1:next_node_linke_x1,
			next_node_link_y1:next_node_linke_y1,
			next_node_link_x2:next_node_linke_x1,
			next_node_link_y2:next_node_linke_y1,
            
            next_node_b_link_x1:next_node_linke_x1+5,
			next_node_b_link_y1:initialConfig.node_y_axis+(initialConfig.height*75/100),
			next_node_b_link_x2:next_node_linke_x1+3,
			next_node_b_link_y2:initialConfig.node_y_axis+(initialConfig.height*75/100),  

			print_level:0,
		});
	}

}

function link_connected(position,start_index,end_index,done){
	
	setTimeout(function(){
		var x_1,
		x_2,
		y_1,
		x2,
		y2,
		line_connected,
		y_2;
		if(linked_node.length==1){
			x_1=initialConfig.node_x_axis;
			y_2=initialConfig.node_y_axis+(initialConfig.height/4);
			x2=20;
			y2=75;
			line_connected= makeSVG('line', {x1:initialConfig.head_line_x, y1:initialConfig.head_line_y,x2:x_1, y2: y_2,  id:'head_connected',stroke: initialConfig.line_stock, 'stroke-width': 1});
			$("#"+node_varified.svg).append(line_connected);
			x_1=initialConfig.node_x_axis+initialConfig.width-(initialConfig.width/6);
			y_1=initialConfig.node_y_axis+(initialConfig.height/4);
			
			line_connected= makeSVG('polyline', {points:x_1+','+y_1+','+x_1+','+y_1,  id:node_varified.next_ptr+start_index,stroke:initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width,'marker-end':"url(#arrow_link)",fill:'none'});
			$("#"+node_varified.svg).append(line_connected);


		}else if(position=="start"){
			x_1=initialConfig.node_x_axis+initialConfig.width-(initialConfig.width/8);
			y_1=initialConfig.node_y_axis+(initialConfig.height/4);
			x_2=parseInt($("#head_connected").attr("x2"));
			y_2=parseInt($("#head_connected").attr("y2"));
			line_connected= makeSVG('polyline', {points:x_1+','+y_1+','+x_2+','+y_2,  id:node_varified.next_ptr+start_index,stroke: initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width,'marker-end':"url(#arrow_link)",fill:'none'});
			
			$("#"+node_varified.svg).append(line_connected);
			

			linked_node[initialConfig.node_counter].next_node_link_y1=y_1;
			linked_node[initialConfig.node_counter].next_node_link_y2=y_2;
		}
		else if(position=="end"){
			x_1=initialConfig.node_x_axis+initialConfig.width-(initialConfig.width/6);
			y_1=initialConfig.node_y_axis+(initialConfig.height/4);
			line_connected= makeSVG('polyline', {points:x_1+','+y_1+','+x_1+','+y_1,  id:node_varified.next_ptr+end_index,stroke: initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width,'marker-end':"url(#arrow_link)",fill:'none'});
			$("#"+node_varified.svg).append(line_connected);
            
		}

			  x_1=initialConfig.node_x_axis+(initialConfig.width/6);
		      y_1=initialConfig.node_y_axis+(initialConfig.height*75/100);   
			line_connected= makeSVG('polyline', {points:x_1+','+y_1+','+(x_1-3)+','+y_1,  id:node_varified.next_ptr+"b"+end_index,stroke: initialConfig.line_stock, 'stroke-width': initialConfig.stroke_width,'marker-end':"url(#arrow_link)",fill:'none'});
			$("#"+node_varified.svg).append(line_connected);
			
		done();
	},1000);


}

function remove_linked_list_node_html(index){
            
	var array_node={
		'rect':node_varified.rect,
		'divide1':node_varified.divide,
		"divide2":node_varified.divide2,
		'data':node_varified.data,
		'next_ptr':node_varified.next_ptr,
		"previous_ptr":node_varified.next_ptr+"b",
	};

	$.each(array_node, function(key, value) {
		$("#"+value+index).remove();
	
	});
}


function find_delete_mid(find_mid,find_last,result,done){
    
	if(find_last!=-1){

		if(linked_node[find_last].next_ptr!=-1&&linked_node[linked_node[find_last].next_ptr].next_ptr!=-1){

			linkedOperation.findAmination(find_mid,find_mid,"#find_linke_node",function(){
			    result=find_mid; 
				find_mid=linked_node[find_mid].next_ptr;
				find_last=linked_node[linked_node[find_last].next_ptr].next_ptr;
				find_delete_mid(find_mid,find_last,result,done);
			});
		}
		else{
			linkedOperation.findAmination(find_mid,find_mid,"#find_linke_node",function(){ 
				done(find_mid,result);
			});
		}
	}  
	else{
		done(find_mid,result);
	}    

}




linkedOperation.deleteNode=function(previousNode,callback){
    
	if( linked_node[previousNode].next_ptr!=-1&&linked_node[linked_node[previousNode].next_ptr].next_ptr!=-1){

		linked_node[previousNode].next_node_link_y1=parseInt(linked_node[linked_node[linked_node[previousNode].next_ptr].next_ptr].rect_y)+parseInt(initialConfig.height/4);
		linked_node[previousNode].next_node_link_x1=linked_node[linked_node[linked_node[previousNode].next_ptr].next_ptr].rect_x;

		setTimeout(function(){
			arrange_linked_list_link(previousNode, linked_node[linked_node[previousNode].next_ptr].next_ptr);
		},500);
		setTimeout(function(){

			var temp_index=linked_node[previousNode].next_ptr;

			linked_node[previousNode].next_ptr=linked_node[temp_index].next_ptr;
			
				linked_node[linked_node[temp_index].next_ptr].previous=previousNode;
              arrange_linked_b(linked_node[temp_index].next_ptr,previousNode);
		
		    

			remove_linked_list_node_html(temp_index);
			arrange_linked_list_link(previousNode, linked_node[previousNode].next_ptr);
           
			modified_link();
            linkedOperation.tailConnection();
         
			callback(true);

		},1000);
		

	}

	else if(linked_node[linked_node[previousNode].next_ptr].next_ptr==-1){
	
        initialConfig.tail_pointed=linked_node[initialConfig.tail_pointed].previous;
		remove_linked_list_node_html(linked_node[previousNode].next_ptr);
		linked_node[previousNode].next_ptr=-1;
		callback(true);
	}
}
function modified_link(index){
	var index=initialConfig.head_pointed;
	while(index!=-1){
		if(linked_node[index].next_ptr!=-1){
	  		arrange_linked_list_link(index,linked_node[index].next_ptr);
	  		arrange_linked_b(linked_node[index].next_ptr,index);
	  		index=linked_node[index].next_ptr;
		}	
		else{
	  		break;
		}	
	}
	
}
function checkData(){
	 console.log(linked_node);
	 var i=0,index=initialConfig.tail_pointed; 
	 while(index!=-1&&linked_node[index].previous!=0){
	 	 console.log(linked_node[index].node_data);
	 	 index=linked_node[index].previous;
	 	 
	 }
	 /*
	 for (var i =linked_node.length-1; i >= 0; i--) {
	 console.log(linked_node[i].node_data);
	 }*/
}

$("#checkData").click(function(){
	checkData();
});
$("#delete_mid_node").click(function(){	
	
	remove_temp();
	create_find_node();
	find_delete_mid(initialConfig.head_pointed,initialConfig.head_pointed,-1,function(mid_element,result){
		
		if(mid_element==initialConfig.head_pointed){
			$("#"+node_varified.message).text(" Less then 3 Element on this linked list insert more element and  try Again");
			enable_operation();

		}
		else{
			linkedOperation.deleteNode(result,function(){
				remove_temp();
				enable_operation();	
			});	
		}
		

	});
});
linkedOperation.deleteFirstNode=function(done){
		var hold=initialConfig.head_pointed;
				initialConfig.head_pointed=linked_node[initialConfig.head_pointed].next_ptr;
                

				setTimeout(function(){
					if(initialConfig.head_pointed!=-1){
				     		
					$("#head_connected").attr("x2",parseInt(linked_node[initialConfig.head_pointed].rect_x));
					$("#head_connected").attr("y2",parseInt(linked_node[initialConfig.head_pointed].rect_y+initialConfig.height/2));

                    linked_node[initialConfig.head_pointed].previous=-1;  
					}
					else{
						$("#head_connected").attr("x2",$("#head_connected").attr("x1"))
						$("#head_connected").attr("y2",$("#head_connected").attr("y1"));

					}
					linkedOperation.tailConnection();
				},500);
				setTimeout(function(){

					remove_linked_list_node_html(hold);
					modified_link();
					
					done();

				},1000);
				

}
$("#delete_1st_node").click(function(){
	$("#"+node_varified.message).text("");
	if(linked_node.length>0||initialConfig.head_pointed!=0){
		remove_temp();

		linkedOperation.deleteFirstNode(function(){
					enable_operation();
					linkedOperation.tailConnection();
				});

	}else{
		$("#"+node_varified.message).text(" Empty Linked List ");
	
	}

});


linkedOperation.findLastNode=function(previous,last,done){	
	if(last!=-1&&linked_node[last].next_ptr!=-1){
		previous=last;
		
		linkedOperation.findAmination(last,last,"#find_linke_node",function(){
			last=parseInt(linked_node[last].next_ptr);
			linkedOperation.findLastNode(previous,last,done);
		});
	}
	else{

		done(previous);
	}
}
function removeFindNode(){
	$("#find_linke_node").remove();
}
$("#delete_last_node").click(function(){

	if(initialConfig.ptr!=-1||linked_node.length>0){
		remove_temp();
		//create_find_node();
		var head_value=parseInt(initialConfig.head_pointed);

		if(initialConfig.tail_pointed==initialConfig.head_pointed){

				linkedOperation.deleteFirstNode(function(){
                    
					enable_operation();
					removeFindNode();
				});
		}
		else if(initialConfig.tail_pointed!=-1){
			previous=linked_node[initialConfig.tail_pointed].previous;

			linked_node[initialConfig.tail_pointed].previous=previous;
	
				linkedOperation.deleteNode(previous,function(){
					linkedOperation.tailConnection();	
					enable_operation();
					removeFindNode();
				});
		}
		
	}
	else{
		$("#"+node_varified.message).text(" Empty Linked List ");
	}
});


linkedOperation.findDeleteNode=function(deleteValue,temp,index,done){

	if(index!=-1){

		if(linked_node[index].node_data==deleteValue){
			done(1,temp);
		}
		else{
			temp=index;
			linkedOperation.findAmination(index,index,"#find_linke_node",function(){
			index=parseInt(linked_node[index].next_ptr); 
				setTimeout(function(){
					linkedOperation.findDeleteNode(deleteValue,temp,index,done);
				},500);
			});
		}
	}
	else{

		done(-1,temp);
	}

}

$("#delete_by_data").click(function(){

	if(initialConfig.ptr!=-1){
		
		var deleteData=$("#"+node_varified.input).val(); 

		if(deleteData.length==0|| $.trim(deleteData).length==0){
           $("#"+node_varified.message).text(" Please Providing Delete Node Data On input Field");
           return;
		}
		remove_temp();
		create_find_node();
		var head_value=parseInt(initialConfig.head_pointed);
		if(deleteData==linked_node[head_value].node_data){
			linkedOperation.deleteFirstNode(function(){
				enable_operation();
				removeFindNode();
			});
		}else{
			linkedOperation.findDeleteNode(deleteData,head_value,head_value,function(status,previous){
			
				if(status==1){

					
					
						linkedOperation.deleteNode(previous,function(){
							enable_operation();
							removeFindNode();
						});
					
				
				}else{
					$("#"+node_varified.message).text(" Delete Node Not Exist Try Again");
					enable_operation();
					removeFindNode();		
				}
					
					
		});	
	}

		
	}
	else{
		$("#"+node_varified.message).text(" Empty Linked List ");
	}
});



$("#delete_by_position").click(function(){

	$("#"+node_varified.message).text("");
	remove_temp();

	if(linked_node.length>0 ){

		var find_position=$("#"+node_varified.input).val(); 

		if(find_position.length==0|| $.trim(find_position).length==0){

			$("#"+node_varified.message).text(" Please insert Delete Element Position ");
			enable_operation();
		}
		else if(find_position<1){

			$("#"+node_varified.message).text(" Given valid Position (1 to n ) number");
			enable_operation();
		}
		else{


			if(find_position==1){

				linkedOperation.deleteFirstNode(function(){
					enable_operation();
				});

       }else{

       	create_find_node();

       	linkedOperation.findPositionByIndex(initialConfig.head_pointed,initialConfig.head_pointed,find_position,1,function(status,position){

       		if(status==1){

       			linkedOperation.deleteNode(position,function(){

       				enable_operation();
       			    removeFindNode();

       			});
       		}else{
       			$("#"+node_varified.message).text(" Delete Element position ["+find_position+"] not exist ");


       			enable_operation();
       			removeFindNode();
       		}

       	});

       } 

   }


}
else{
	$("#"+initialConfig.message).text("No Element in this linked list");
}
});










function remove_temp(){
	var remove_item=['#find_linke_node',".outPutNode"];
	for (var i = 0; i < remove_item.length; i++) {
		$(remove_item[i]).remove();
	}
	$(".LinklistBtn").attr("disabled","disabled");
}

function enable_operation(){
	$('.LinklistBtn').removeAttr("disabled");
}
function outputNodeData(e){
	var find_node= makeSVG('rect', {x:linked_node[e].rect_x,y:linked_node[e].rect_y, width:initialConfig.width,height:initialConfig.height, class:"outPutNode",stroke: 'green', 'stroke-width': 2, fill:'#044B94','fill-opacity':'0.1'});
	$("#"+node_varified.svg).append(find_node);
}

function create_find_node(){
	var find_node= makeSVG('rect', {x:0,y:40, width:initialConfig.width,height:initialConfig.height, id:'find_linke_node',stroke: 'red', 'stroke-width': 3, fill:'#044B94','fill-opacity':'0.4'});
	$("#"+node_varified.svg).append(find_node);
}

$("#find_linked_list_data_node").click(function(){
	
	$("#"+node_varified.message).text("");
	remove_temp();
	var find_data=$("#"+node_varified.input).val();
	if(find_data.length>0&&initialConfig.head_pointed!=-1){
		create_find_node();
		linkedOperation.findPositionByData(find_data,initialConfig.head_pointed,function(status,position){

			if(status){
				$("#"+node_varified.message).text("Find data ["+find_data+"] exist ");
			}
			else{
				$("#"+node_varified.message).text("Opps data node not exist Please try Again...!");	
			}
			enable_operation();  	
		});
	}
	else{
		enable_operation();
		
		$("#"+node_varified.message).text("Please fill find data. ");

	}

});

function arrange_linked_b(start,end){
	if(linked_node.length>0){


		var next_node_linke_x2,next_node_linke_y2,next_node_linke_x1,next_node_linke_y1,points="";
		next_node_linke_x1=linked_node[start].rect_x+(initialConfig.width/8);
		next_node_linke_x2=linked_node[end].rect_x+initialConfig.width-(initialConfig.width/8);
		next_node_linke_y1=linked_node[start].rect_y+(initialConfig.height*75/100);
		next_node_linke_y2=  linked_node[end].rect_y+(initialConfig.height*75/100);

		if(next_node_linke_y2<next_node_linke_y1){
          
          points=next_node_linke_x1+","+next_node_linke_y1+","+(next_node_linke_x1-35)+","+(next_node_linke_y1)+","+(next_node_linke_x1-35)+","+(next_node_linke_y1-(initialConfig.height+15))+","+(next_node_linke_x2+25)+","+(next_node_linke_y1-(initialConfig.height+15))+","+(next_node_linke_x2+25)+","+(next_node_linke_y2)+","+(next_node_linke_x2+8)+","+(next_node_linke_y2);


		}else{


		points=next_node_linke_x1+","+next_node_linke_y1+","+(next_node_linke_x2+6)+","+next_node_linke_y2+","+(next_node_linke_x2+3)+","+next_node_linke_y2;
		}
		$("#"+node_varified.next_ptr+"b"+start).attr("points",points);
	}
}



function arrange_linked_list_link(start,end){

	if(end==-1||linked_node[end].previous===undefined){
		return;
	}
	linked_node[end].previous=start;
	
	if(linked_node.length>0){

		var next_node_linke_x2,next_node_linke_y2,next_node_linke_x1,next_node_linke_y1,points;
		next_node_linke_x1=linked_node[start].rect_x+initialConfig.width-(initialConfig.width/8);
		next_node_linke_x2=  linked_node[end].rect_x;
		next_node_linke_y1=linked_node[start].rect_y+(initialConfig.height/4);
		next_node_linke_y2=  linked_node[end].rect_y+(initialConfig.height/4);

		if(next_node_linke_y2>next_node_linke_y1){

			points=next_node_linke_x1+","+next_node_linke_y1+","+(next_node_linke_x1+50)+","+(next_node_linke_y1)+","+(next_node_linke_x1+50)+","+(next_node_linke_y1+initialConfig.height+15)+","+(next_node_linke_x2-12)+","+(next_node_linke_y2+15-(initialConfig.height))+","+(next_node_linke_x2-12)+","+(next_node_linke_y2)+","+(next_node_linke_x2-8)+","+(next_node_linke_y2);

		}else{


			points=next_node_linke_x1+","+next_node_linke_y1+","+(next_node_linke_x2-6)+","+next_node_linke_y2+","+(next_node_linke_x2-5)+","+next_node_linke_y2;
		}
		$("#"+node_varified.next_ptr+start).attr("points",points);
		
	}
}

linkedOperation.mangeLinke=function(){
	if(initialConfig.head_pointed!=-1){
		var temp_index=initialConfig.head_pointed;
		while(temp_index!=-1){

			if(linked_node[temp_index].next_ptr!=-1){
				 arrange_linked_list_link(temp_index,linked_node[temp_index].next_ptr);
			}
			temp_index=linked_node[temp_index].next_ptr;
		}
	}
}

linkedOperation.showData=function(index,done){
	if(index!=-1){
		
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){
			if(index!=-1){
				setTimeout(function(){
				    $("#"+node_varified.message).append(" <span>"+linked_node[index].node_data+" </span>");
	 	            index=parseInt(linked_node[index].next_ptr);
					linkedOperation.showData(index,done);
				},500);
			}	
		});
	}
	else{
		done();
	}

}


linkedOperation.sumOfData=function(index,result,msg,done){
	if(index!=-1){
		
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){
			if(index!=-1){
				
				if(msg==""){
					msg+="  "+linked_node[index].node_data;
				}
				else{
                 msg+=" +"+linked_node[index].node_data;
				}
				result=result+parseInt(linked_node[index].node_data);
				
				setTimeout(function(){
				    $("#"+node_varified.message).text(" <span>["+msg+"] : "+result+"</span>");
	 	            index=parseInt(linked_node[index].next_ptr);
					linkedOperation.sumOfData(index,result,msg,done);
				},500);
			}
				
		});
	}
	else{

		done();
	}

}




$("#sum_of_nodes").click(function(){

	remove_temp();
	$("#"+node_varified.message).text("");
	var id=initialConfig.node_counter;
	
	if(id>0){	
		create_find_node();		
		linkedOperation.sumOfData(parseInt(initialConfig.head_pointed),0,"",function(){
			enable_operation();
			removeFindNode();
		});
	}
	else{
		enable_operation();

		$("#"+node_varified.message).text("Please fill insert data ");
	}


});


$("#print_linked_list_data").click(function(){

	remove_temp();
	$("#"+node_varified.message).text("");
	var id=initialConfig.node_counter;
	
	if(id>0){	
		create_find_node();
		
		linkedOperation.showData(parseInt(initialConfig.head_pointed),function(){
			enable_operation();
			removeFindNode();
		});

	}
	else{
		enable_operation();

		$("#"+node_varified.message).text("Please fill insert data ");
	}


});


function linked_list_node_animation(index){
	var temp,next_node_linke_x1,
	next_node_linke_y1,
	next_node_linke_x2,
	next_node_linke_y2,
	next_node_link_x1,
	next_node_link_y1,
	x,
	y,
	x_1,
	y_2;
	var i=index;
	while(i!=-1){


		temp=linked_node[i].inserted_position;


		next_node_linke_x1=linked_node[temp].rect_x+initialConfig.width-(initialConfig.width/6);
		next_node_linke_y1=linked_node[temp].rect_y+(initialConfig.height/4);

		linked_node[temp].next_node_link_x1=next_node_linke_x1;
		linked_node[temp].next_node_link_y1=next_node_linke_y1;
		if(linked_node[temp].next_ptr!=-1){
			next_node_linke_x2=  linked_node[linked_node[temp].next_ptr].rect_x-8;
			next_node_linke_y2=  linked_node[linked_node[temp].next_ptr].rect_y+(initialConfig.height/4);
			linked_node[temp].next_node_link_x2=next_node_linke_x2;
			linked_node[temp].next_node_link_y2=next_node_linke_y2;
		}


		if(linked_node[temp].next_ptr!=-1&& (linked_node[linked_node[temp].next_ptr].rect_x<=linked_node[temp].rect_x+20)&& linked_node[linked_node[temp].next_ptr].rect_y==linked_node[temp].rect_y ){
			linked_node[linked_node[temp].next_ptr].rect_x+=150;
			
		}

		if((linked_node[temp].rect_x<=70&&linked_node[temp].print_level%2==0)){
			linked_node[temp].rect_y+=1;
			linked_node[temp].divide_line_y1+=1;
			linked_node[temp].divide_line_y2+=1;

			linked_node[temp].divide_line_b_y1+=1;
			linked_node[temp].divide_line_b_y2+=1;

			linked_node[temp].data_y+=1;

			linked_node[temp].next_node_link_y1+=1;
			linked_node[temp].next_node_b_link_y1+=1;

			if(linked_node[temp].next_ptr==-1){
				linked_node[temp].next_node_link_y2+=1;
				linked_node[temp].next_node_b_link_y2+=1;


			}
			else{
				linked_node[temp].next_node_link_x2+=1;
				linked_node[temp].next_node_b_link_x2+=1;
			}
		}

		else if(((linked_node[temp].rect_x+160)>document.getElementById('codelike-linked-list-svg').offsetWidth)){



			linked_node[temp].rect_x=71;
			linked_node[temp].rect_y=linked_node[temp].rect_y+(initialConfig.height*2);
			var linked_list_actual=$("#linked_list_svg").attr("height");
			
			if(linked_node[temp].rect_y>(linked_list_actual-150)){
				$("#linked_list_svg").attr("height",linked_node[temp].rect_y+150);
			}
			if(linked_node[temp].rect_y+150>=initialConfig.tail_y_position){
				initialConfig.tail_y_position=linked_node[temp].rect_y+100;
				$("#tialNode").attr("y",initialConfig.tail_y_position-10);
				$("#tailData").attr("y",initialConfig.tail_y_position-30);
			}
			x_1=71+initialConfig.width-(initialConfig.width/5);
			y_2=linked_node[temp].rect_y+(initialConfig.height);
			linked_node[temp].divide_line_x1=x_1;
			linked_node[temp].divide_line_x2=x_1;
			linked_node[temp].divide_line_y1=linked_node[temp].rect_y;
			linked_node[temp].divide_line_y2=y_2;
            
            linked_node[temp].divide_line_b_x1=x_1-61;
			linked_node[temp].divide_line_b_x2=x_1-61; 
			linked_node[temp].divide_line_b_y1=linked_node[temp].rect_y;
			linked_node[temp].divide_line_b_y2=y_2;


			x=linked_node[temp].rect_x+(initialConfig.width/2);
			y=linked_node[temp].rect_y+((initialConfig.height)/4);

			linked_node[temp].data_x=x;
			linked_node[temp].data_y=linked_node[temp].rect_y+((initialConfig.height)/2);


			next_node_link_x1=linked_node[temp].rect_x+initialConfig.width-(initialConfig.width/6);
			next_node_link_y1=linked_node[temp].rect_y+(initialConfig.height/4);



			linked_node[temp].next_node_link_x1=next_node_link_x1;


			linked_node[temp].next_node_link_y1=next_node_link_y1;
			linked_node[temp].next_node_link_y2=next_node_link_y1;
			linked_node[temp].print_level++;


			linked_node[temp].next_node_b_link_x1=linked_node[temp].rect_x+(initialConfig.width/6);
			linked_node[temp].next_node_b_link_y1=linked_node[temp].next_node_b_link_y2=linked_node[temp].rect_y+(initialConfig.height*75/100);


			if(linked_node[temp].next_ptr!=-1){	
				linked_node[temp].next_node_link_x2=next_node_link_x1+101;
				linked_node[temp].next_node_b_link_x2=linked_node[temp].next_node_b_link_x1+101;
			}



		}
		else {

			if(linked_node[temp].next_ptr==-1){	
				linked_node[temp].next_node_link_x2=linked_node[temp].next_node_link_x1;
				}
			else{

				linked_node[temp].next_node_link_x2+=2;
				linked_node[temp].next_node_b_link_x2+=2;

			}
			linked_node[temp].divide_line_x1+=2;
			linked_node[temp].divide_line_x2+=2;
			linked_node[temp].divide_line_b_x1+=2;
			linked_node[temp].divide_line_b_x2+=2;
			

			linked_node[temp].data_x+=2;
			linked_node[temp].rect_x+=2;
			linked_node[temp].next_node_link_x1+=2;
         
         	linked_node[temp].next_node_b_link_x1+=2;
		}
		
		if(linked_node[temp].next_ptr!=-1){
			arrange_linked_list_link(temp,linked_node[temp].next_ptr);
			arrange_linked_b(linked_node[temp].next_ptr,temp);

		}
		else{
			var points= linked_node[temp].next_node_link_x1+","+linked_node[temp].next_node_link_y1+","+linked_node[temp].next_node_link_x2+","+linked_node[temp].next_node_link_y2+","+(linked_node[temp].next_node_link_x2+2)+","+linked_node[temp].next_node_link_y2;
			$("#"+node_varified.next_ptr+temp).attr("points",points);


	       	}
		if(linked_node[temp].previous==-1){
			var x_1=linked_node[temp].next_node_b_link_x1
			var y_2=linked_node[temp].next_node_b_link_y1;

			var points=(x_1-71)+","+y_2+","+(x_1-73)+","+y_2;
			$("#"+node_varified.next_ptr+"b"+temp).attr("points",points);
	
		}



		$("#"+node_varified.rect+temp).attr("y",linked_node[temp].rect_y);
		$("#"+node_varified.divide+temp).attr("y1",linked_node[temp].divide_line_y1);
		$("#"+node_varified.divide+temp).attr("y2",linked_node[temp].divide_line_y2);
		$("#"+node_varified.data+temp).attr("y",linked_node[temp].data_y);


		$("#"+node_varified.divide+temp).attr("x1",linked_node[temp].divide_line_x1);
		$("#"+node_varified.divide+temp).attr("x2",linked_node[temp].divide_line_x2);
		$("#"+node_varified.data+temp).attr("x",linked_node[temp].data_x);
		$("#"+node_varified.rect+temp).attr("x",linked_node[temp].rect_x);

		$("#"+node_varified.divide+"b"+temp).attr("y1",linked_node[temp].divide_line_b_y1);
		$("#"+node_varified.divide+"b"+temp).attr("y2",linked_node[temp].divide_line_b_y2);
		
		$("#"+node_varified.divide+"b"+temp).attr("x1",linked_node[temp].divide_line_b_x1);
		$("#"+node_varified.divide+"b"+temp).attr("x2",linked_node[temp].divide_line_b_x2);
		
        linkedOperation.tailConnection();
		i=linked_node[i].next_ptr;
	}	

}

function linked_list_head_connection(done){
	setTimeout(function(){
	
		$("#head_connected").attr("x2",parseInt(linked_node[initialConfig.head_pointed].rect_x));
		$("#head_connected").attr("y2",parseInt(linked_node[initialConfig.head_pointed].rect_y+initialConfig.height/2));

		done();
	},1000);


}


function add_starting_linked_list(position,done){
	

	linked_list_head_connection(function(){

		var head_connected_y2=parseInt($("#head_connected").attr("y2"));
		var loop_time=17,interval=0;
		var linked_node_animation=setInterval(function(){
			if(interval>initialConfig.node_distance){
				linked_node[initialConfig.node_counter].print_level=1;
				done();
				clearInterval(linked_node_animation);
			}
			$("#head_connected").attr("y2",head_connected_y2+interval);		
			linked_list_node_animation(initialConfig.head_pointed);

			interval++;
		},loop_time);
	});


}


function  inserted_position_operation(){
	$("#"+node_varified.model).modal('toggle');
	remove_temp();
	$("#"+node_varified.message).text("");
	var id=initialConfig.node_counter;
	var find_position=$("#position_linked_list").val();
	var insert_value=$("#inserted_position_data").val();
	if(linked_node.length==0){
		$("#"+node_varified.message).text("Empty linked list");
		enable_operation();

	}
	else if(insert_value.length==0||find_position.length==0||find_position<1){
		enable_operation();
		$("#"+node_varified.message).text("Please check input position and inserted data empty or invalid position");
	}
	else{


		if(find_position==1){
			insert_node("start",find_position,id,function(){	
				initialConfig.node_counter++;
				enable_operation();
			});
		}
		else if(find_position==(id+1)){
			create_find_node();
			insert_node("end",find_position,id,function(){	
				linkedOperation.mangeLinke();
				linkedOperation.tailConnection();	
				initialConfig.node_counter++;
				enable_operation();
			});

		}
		else{
			var value=1;
			if(find_position>id){
				value=0;

			}
			create_find_node();
			if(find_position.length>0&&find_position>0){	
                

				linkedOperation.findPositionByIndex(initialConfig.head_pointed,initialConfig.head_pointed,find_position,value,function(status,position){

					if(status){

						var index=initialConfig.node_counter;
						create_node(index);
						link_connected("end",index,index,function(){
							$("#"+node_varified.data+index).text(find_position);
							mid_element_verification(position,function(status){
							     
								if(status>0){
									
								attach_ment_linked_list(position,function(){
									initialConfig.node_counter++;
                                    modified_link(); 
									enable_operation();
                    				linkedOperation.tailConnection();
								}); 
							}



							});
						});



					}
					else{
						enable_operation();
						$("#"+node_varified.message).text("Given position not exist Please try Again..! ");
					}

				});
			}
			else{
				enable_operation();
				$("#"+node_varified.message).text("Please given insert  position ");
			}	

		}
	}	

}


$("#insert_node_at_position").click(function(){

	

	$("#codelike-visualization-body").html('<div class="form-group"><label for="position_linked_list">position <input type="text" id="position_linked_list" name="position_linked_list" ></label><div><label for="inserted_position_data">insert data:</label><input type="text" id="inserted_position_data" name="inserted_position_data" ></div></div><button type="button" id="inserted_position_submit" onclick="inserted_position_operation()"  class="btn btn-default">Submit</button>');

	$("#"+node_varified.model).modal('toggle');



});

function find_mid_linked_list_element(find_mid,find_last,done){

	if(find_last!=-1){

		if(linked_node[find_last].next_ptr!=-1&&linked_node[linked_node[find_last].next_ptr].next_ptr!=-1){

			linkedOperation.findAmination(find_last,find_last,"#find_linke_node",function(){ 

				find_mid=linked_node[find_mid].next_ptr;
				find_last=linked_node[linked_node[find_last].next_ptr].next_ptr;
				setTimeout(function(){
					$(".outPutNode").remove();
				    outputNodeData(find_mid);
				
					find_mid_linked_list_element(find_mid,find_last,done);
			    },700);
				
			});


		}
		else{
			linkedOperation.findAmination(find_last,find_last,"#find_linke_node",function(){ 
				done(find_mid);
			});
		}
	}  
	else{
		done(find_mid);
	}    

}

$("#insert_mid_element_on_linked_list").click(
	function(){


		remove_temp();

		$("#"+node_varified.message).text("");
		var id=initialConfig.node_counter;
		var data=$("#"+node_varified.input).val();
		if(data.length>0){	
			insert_node("between",data,id,function(){
				$("#linke_data"+id).text(data);
				initialConfig.node_counter++;

				enable_operation();

			});
		}
		else{
			enable_operation();
			$("#"+node_varified.message).text("Please fill insert data ");
		}	

	});


function mid_element_verification(mid_element,done){
	setTimeout(function(){
		arrange_linked_list_link(initialConfig.node_counter,linked_node[mid_element].next_ptr);
	},600);
	setTimeout(function(){
		arrange_linked_list_link(mid_element,initialConfig.node_counter);
	},1000);
	setTimeout(function(){
		var loop_time=5,interval=0;
		var linked_node_animation=setInterval(function(){
			if(interval>initialConfig.node_distance){
				done(mid_element);
				clearInterval(linked_node_animation);

			}
			else{
				interval++;
				arrange_linked_list_link(initialConfig.node_counter,linked_node[mid_element].next_ptr);

				linked_list_node_animation(linked_node[mid_element].next_ptr);
			}

			

		},loop_time);   },1200);
}

function linked_list_mid_element_add(done){
    
	create_find_node();

	find_mid_linked_list_element(initialConfig.head_pointed,initialConfig.head_pointed,function(mid_element){


		mid_element_verification(mid_element,function(status){
			done(status);
		});

	});
}

function add_linked_list_at_last(done){

	if(linked_node.length==0||initialConfig.head_pointed==-1){
		add_starting_linked_list("start",function(){
			done();
		});
	}else{
		
		
		if(initialConfig.head_pointed!=-1){
			if(initialConfig.tail_pointed!=-1){
				initialConfig.tail_pointed;

					attach_ment_linked_list(initialConfig.tail_pointed,done);


			}
		  
		}

		else{
			console.log("head ptr not pointed any node");
			done();
		}
	}



}

function attach_ment_linked_list(last_node,done){
	var current_node=initialConfig.node_counter;
	
    
	linked_node[current_node].next_ptr=linked_node[last_node].next_ptr;

	linked_node[last_node].next_ptr=current_node;

	linked_node[current_node].print_level=linked_node[last_node].print_level;
   

	var temp_e_x=linked_node[initialConfig.node_counter].rect_x;
	var temp_e_y=linked_node[initialConfig.node_counter].rect_y+initialConfig.height/2;
	linked_node[last_node].next_node_link_x2=temp_e_x;
	linked_node[last_node].next_node_link_y2=temp_e_y;
	var access=last_node;

	var	points= linked_node[access].next_node_link_x1+","+linked_node[access].next_node_link_y1+","+(linked_node[access].next_node_link_x2-2)+","+linked_node[access].next_node_link_y2+","+(linked_node[access].next_node_link_x2)+","+linked_node[access].next_node_link_y2;

	$("#"+node_varified.next_ptr+initialConfig.node_counter).attr("points",points);
	linkedOperation.findAmination(current_node,last_node,"#rect"+current_node,function(){
		linked_node[current_node].rect_x=parseInt($("#rect"+current_node).attr("x"));
		linked_node[current_node].rect_y=parseInt($("#rect"+current_node).attr("y"));
		linked_node[current_node].divide_line_x1=parseInt($("#"+node_varified.divide+current_node).attr("x1"));

		linked_node[current_node].divide_line_x2=parseInt($("#"+node_varified.divide+current_node).attr("x2"));
		linked_node[current_node].divide_line_y1=parseInt($("#"+node_varified.divide+current_node).attr("y1"));
		linked_node[current_node].divide_line_y2=parseInt($("#"+node_varified.divide+current_node).attr("y2"));
		linked_node[current_node].divide_line_b_x1=parseInt($("#"+node_varified.divide+"b"+current_node).attr("x1"));
		linked_node[current_node].divide_line_b_x2=parseInt($("#"+node_varified.divide+"b"+current_node).attr("x2"));
		linked_node[current_node].divide_line_b_y1=parseInt($("#"+node_varified.divide+"b"+current_node).attr("y1"));
		linked_node[current_node].divide_line_b_y2=parseInt($("#"+node_varified.divide+"b"+current_node).attr("y2"));
		linked_node[current_node].data_x=parseInt($("#"+node_varified.data+current_node).attr("x"));
		linked_node[current_node].data_y=parseInt($("#"+node_varified.data+current_node).attr("y"));
	

		setTimeout(function(){
			arrange_linked_list_link(last_node,current_node);

			done();
		},50);

	});


}



function move_to_end(index,position,status){
	if(index==-1){
		status(1,position);
	}
	else{
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){ 
			position=index;
			move_to_end(parseInt(linked_node[index].next_ptr),position,status);
		});
	}
}

function insert_node(position,insert_data,index,done){
	if(linked_node.length==0){
		create_node(index);
		link_connected(position,index,index,function(){
			$("#"+node_varified.data+index).text(insert_data);
		
			add_starting_linked_list(position,function(){
				modified_link();
					linkedOperation.tailConnection();
				done();
			});			
		});
	}
	else if(position=="start"){
		create_node(index);
		link_connected(position,index,index,function(){
			initialConfig.head_pointed=index;
			$("#"+node_varified.data+index).text(insert_data);
			add_starting_linked_list(position,function(){
				
				modified_link();
				linkedOperation.mangeLinke();
				linkedOperation.tailConnection();
				done();
			});			
		});
	}
	else if(position=="end"){
		create_node(index);
		link_connected(position,index,index,function(){
			$("#"+node_varified.data+index).text(insert_data);
			add_linked_list_at_last(function(){
				
				modified_link();
				linkedOperation.mangeLinke();
				linkedOperation.tailConnection();
				done();
			});			
		});
	}
	else if(position=="between"){
		create_node(index);
		link_connected("end",index,index,function(){
			$("#"+node_varified.data+index).text(insert_data);

			linked_list_mid_element_add(function(mid_element){
				if(linked_node[mid_element].next_ptr!=-1){

					arrange_linked_list_link(index,linked_node[mid_element].next_ptr); 
				}
				attach_ment_linked_list(mid_element,function(){
					enable_operation();
					removeFindNode();
					modified_link();
					linkedOperation.mangeLinke();
					linkedOperation.tailConnection();
					done();
				});


			});


		});   

	}

}

$("#insert_using_stack").click(function(){
	remove_temp();
	$("#"+node_varified.message).text("");
	var id=initialConfig.node_counter;
	var data=$("#"+node_varified.input).val();
	if(data.length>0){	
		insert_node("start",data,id,function(){	
			initialConfig.node_counter++;
			enable_operation();
			removeFindNode();
		});
	}
	else{
		enable_operation();
		$("#"+node_varified.message).text("Please fill insert data ");
	}

});

$("#insert_using_queue").click(function(){
	remove_temp();

	$("#"+node_varified.message).text("");
	var id=initialConfig.node_counter;
	var data=$("#"+node_varified.input).val();
	if(data.length>0){	
		if(initialConfig.head_pointed==-1){
			insert_node("start",data,id,function(){
				$("#linke_data"+id).text(data);
				initialConfig.node_counter++;
				enable_operation();
				removeFindNode();
			});

		}else{
			insert_node("end",data,id,function(){
				modified_link();
				linkedOperation.tailConnection();

				$("#linke_data"+id).text(data);
				initialConfig.node_counter++;
				enable_operation();
                removeFindNode();
			});
		}
	}
	else{
		enable_operation();
		$("#"+node_varified.message).text("Please fill insert data ");
	}

});

function count_linked_list_node(index,counter,status){
	if(index==-1){
		status(1,counter);
	}
	else{
		linkedOperation.findAmination(index,index,"#find_linke_node",function(){ 
			setTimeout(function(){
				$("#"+node_varified.message).text("Count Node is: "+(counter+1));
               count_linked_list_node(parseInt(linked_node[index].next_ptr),counter+1,status);

			},500);

		});
	}
}

$("#count_linked_list_node").click(function(){
	if(linked_node.length>0){
		var head_node=initialConfig.head_pointed;
		remove_temp();
		create_find_node();
		count_linked_list_node(head_node,0,function(status,counter){
			if(status==1){
				$("#"+node_varified.message).text("Count Node is: "+counter);	
			}
			enable_operation();
			removeFindNode();
		});

	}
	else{
		$("#"+node_varified.message).text("No Element in this linked list");
	}
});


$("#find_mid_on_linked_list").click(function(){
	if(linked_node.length>2&&linked_node[initialConfig.head_pointed].next_ptr!=-1){
		remove_temp();
		create_find_node();
       
        console.log("linked data",linked_node);
		find_mid_linked_list_element(initialConfig.head_pointed,initialConfig.head_pointed,function(mid_element){
			$("#"+node_varified.message).text("Mid-element : "+linked_node[mid_element].node_data);
			enable_operation();
			setTimeout(function(){
				$("#find_linke_node").remove();

			},500);
			
		});      

	}
	else{
		if(linked_node.length==0)
			$("#"+node_varified.message).text("No Element in this linked list");
		else
			$("#"+node_varified.message).text("Linked list less then 3 node");
	}

});

$("#save_linked_list").click(function(){
	var svg =document.getElementById(node_varified.svg);
	var serializer = new XMLSerializer();
	var source = serializer.serializeToString(svg);
	if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
		source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
	}
	if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
		source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
	}
	source = "<?xml version='1.0' standalone='no'?>\r\n" + source;
	var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
	var link = document.createElement('a');
	link.href = url;
	link.download = "linked_list"+".svg";
	$("#linke_list_message").html(link);
	link.click();
});

$('#linked_data_input,#position_linked_list').keyup(function () { 
	this.value = this.value.replace(/[^0-9\.]/g,'');
});
