// Function that binds the event

var text1="";
var text2="";

var localType;
var isTyping=false;

var dmp = new diff_match_patch();

function detector(ev)  {
	if(!ev.metaKey) {
		typeWatch(ev);
	}
	
	//don't delete the beyond p
	if(ev.keyCode == 8 || ev.keyCode == 46){
		var editing_lines = $("#editable").children("div").children("p");
		if(editing_lines.length == 1 && $(editing_lines[0]).html() == ""){
			$(editing_lines[0]).html("&nbsp;");
			alert('asd');
  			return false;
			}
		}
}

function typeWatch(e) {
	if(!isTyping){
		isTyping=true;
		started(e);
	}

	if (localType) {
		$("#status").html("Typing!");
		clearTimeout(localType);
		
		
	}

	localType = setTimeout(function() {
		$("#status").html(" ");
		isTyping=false;
		finished(e);
	}, 600);
}



// Event fired when the user starts typing
function started(ev) {
	$("#status2").html("Started! Saved 'text1'.");
	//alert('text1');
	text1=$("#editable").html().replace(/<div>/g, "\n").replace(/<\/div>|<br>/g, "");

}

// Event fired when the user stops typing
function finished(ev) {
	$("#status").html("Finished!");
	
	text2=$("#editable").html().replace(/<div>/g, "\n").replace(/<\/div>|<br>/g, "");
	$("#text").text(text2);
	$('#code').text($('#editable').html());
	
	
  dmp.Diff_Timeout = parseFloat(1);
  dmp.Diff_EditCost = parseFloat(4);

  var ms_start = (new Date()).getTime();
  var d = dmp.diff_main(text1, text2);
  
  $("#status2").html("");
	var ops = new Array();

  var counter=0;
  jQuery.each(d, function(i, val) {
  		if(val[0]==0) counter+=val[1].length;
  		if(val[0]==1){
      		$("#status2").append("add(" + counter + ',' +val[1] + ")<br/>");

			var op = new OP("add",[counter,val[1]]);
			ops.push(op);
			
      		counter+=val[1].length;
      	}
      	if(val[0]==-1){
      		$("#status2").append("delete(" +counter + ','  + val[1] + ")<br/>");

			var op = new OP("del",[counter,val[1].length]);
			ops.push(op);

      		counter+=val[1].length;
      	}
    
  });

  
  var ms_end = (new Date()).getTime();
	$("#status2").append('<br/>Tempo: '+(ms_end - ms_start) / 1000 + 's');
	
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





