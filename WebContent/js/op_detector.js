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
		isTyping=true;
		started(e);
	}

	if (localType) {
		clearTimeout(localType);
		
		
	}

	localType = setTimeout(function() {
		isTyping=false;
		finished(e);
	}, 600);
}



// Event fired when the user starts typing
function started(ev) {
	$("#editable").css("border-color", "#ff8080");
	//alert('text1');
	
	text1=getContent();

}

// Event fired when the user stops typing
function finished(ev) {
	inspectLineChanges();
	
	$("#editable").css("border-color", "black");
	
	text2=getContent();
	
	//alert("Before:\n"+text1+"\n\nAfter:\n"+text2);
	
	$("#text").text(text2);
	$('#code').text($('#editable').html());
	
	
  dmp.Diff_Timeout = parseFloat(1);
  dmp.Diff_EditCost = parseFloat(4);

  var ms_start = (new Date()).getTime();
  var d = dmp.diff_main(text1, text2);
  
	var ops = new Array();

  var counter=0;
  jQuery.each(d, function(i, val) {
  		if(val[0]==0) counter+=val[1].length;
  		if(val[0]==1){
			var op = new OP("add",[counter,val[1]]);
			ops.push(op);
			
      		counter+=val[1].length;
      	}
      	if(val[0]==-1){
			var op = new OP("del",[counter,val[1].length]);
			ops.push(op);
			
      		counter+=val[1].length;
      	}
    
  });

  
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




