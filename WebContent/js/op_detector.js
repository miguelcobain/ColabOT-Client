// Function that binds the event

var text1="";
var text2="";

var localType;
var isTyping=false;

var dmp = new diff_match_patch();

function detector(ev)  {
	if(!ev.metaKey && (ev.keyCode < 37 || ev.keyCode > 40)) {
		typeWatch(ev);
	}
	

}

function typeWatch(e) {
	if(!isTyping){
		//update(updateQueue);
		isTyping=true;
		started(e);
	}

	if (localType) {
		clearTimeout(localType);
		
		
	}

	localType = setTimeout(function() {
		finished(e);
		isTyping=false;
		//update(updateQueue);
		snapshot();
	}, 600);
}



// Event fired when the user starts typing
function started(ev) {
	$("#editable").css("border-color", "#ff8080");
	//alert('text1');
	
	
	text1=getContent();

}

// Event fired after a timeout since the user stops typing
function finished(ev) {
	
	//inspect all lines
	var result = inspectLineChanges();
	//the lines that were changed
	var changedLines = result[0];
	//the lines that were inserted
	var newLines = result[1];
	//the id's of the lines that were deleted
	var deletedLines = result[2];
	
	dmp.Diff_Timeout = parseFloat(1);
	dmp.Diff_EditCost = parseFloat(4);
	
	var ms_start = (new Date()).getTime();
	
	
	
	var ops = new Array();
	jQuery.each(changedLines, function(i) {
		var id=this.id;
		var d = dmp.diff_main(this.former, this.text);
		var counter=0, fcounter, j=0;
		jQuery.each(d, function(i, val) {
			if(val[0]==0) counter+=val[1].length;
	  		if(val[0]==1){
				fcounter=counter;
				if(j!=0 && ops[j-1]._type=="del"){
					fcounter=counter-ops[j-1]._args[1];
				}

				var op = new OP("add",[id,fcounter,val[1]]);
				ops.push(op);j++;

	      		counter+=val[1].length;
	      	}
	      	if(val[0]==-1){
				var op = new OP("del",[id,counter,val[1].length]);
				ops.push(op);j++;

	      		counter+=val[1].length;
	      	}
		});

	});
	jQuery.each(newLines, function(i) {
		var op = new OP("newLine",[this.id,this.text]);
		ops.push(op);
	});
	jQuery.each(deletedLines, function(i) {
		var op = new OP("delLine",[this]);
		ops.push(op);
	});
	
	$("#editable").css("border-color", "black");
	
	text2=getContent();
	
	//alert("Before:\n"+text1+"\n\nAfter:\n"+text2);
	
	//$("#text").text(text2);
	$('#code').text($('#editable').html());
	
	/*
	dmp.Diff_Timeout = parseFloat(1);
	dmp.Diff_EditCost = parseFloat(4);

	var ms_start = (new Date()).getTime();
	var d = dmp.diff_main(text1, text2);
  
	var ops = new Array();

	var counter=0, fcounter, j=0;
	jQuery.each(d, function(i, val) {
		if(val[0]==0) counter+=val[1].length;
  		if(val[0]==1){
			fcounter=counter;
			if(j!=0 && ops[j-1]._type=="del"){
				fcounter=counter-ops[j-1]._args[1];
			}
	
			var op = new OP("add",[fcounter,val[1]]);
			ops.push(op);j++;
			
      		counter+=val[1].length;
      	}
      	if(val[0]==-1){
			var op = new OP("del",[counter,val[1].length]);
			ops.push(op);j++;
			
      		counter+=val[1].length;
      	}
    
	});
	*/
	/*var tmp=null, ant=null, j=0, counter=0, fcounter;
	for(i=0;i<d.length;i++){
		tmp=d[i];
		if(tmp[0]==0) counter+=tmp[1].length;
  		if(tmp[0]==1){
			fcounter=counter;
			if(j!=0 && ops[j-1]._type=="del"){
				fcounter=counter-ops[j-1]._args[1];
			}
	
			var op = new OP("add",[fcounter,tmp[1]]);
			ops[j]=op;j++;
			
      		counter+=tmp[1].length;
      	}
      	if(tmp[0]==-1){
			var op = new OP("del",[counter,tmp[1].length]);
			ops[j]=op;j++;
			
      		counter+=tmp[1].length;
      	}
		ant=tmp;
	}*/

  
  var ms_end = (new Date()).getTime();
	//$("#status2").append('<br/>Tempo: '+(ms_end - ms_start) / 1000 + 's');
	
	
	generate(ops);
	
	/*
  if (document.getElementById('semantic').checked) {
    dmp.diff_cleanupSemantic(d);
  
  if (document.getElementById('efficiency').checked) {
    dmp.diff_cleanupEfficiency(d);
  }
  var ds = dmp.diff_prettyHtml(d);
  document.getElementById('outputdiv').innerHTML = ds + '<BR>Time: ' + (ms_end - ms_start) / 1000 + 's';
	*/
	
}