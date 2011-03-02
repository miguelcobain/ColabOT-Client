var visible=false;

function toggle(){
	//$("#chat").slideToggle('slow');
	
	var value;
	if(visible) {value=60;}
	else {value=360;}
	visible=!visible;
	
	$("#slidebottom").animate({
		height:value,
	}, 1500 );
}

function insertMessage(user,message){
	if(message.length>0){
		$('#history').append('<p>'+user+': '+message.replace(/\n/, '<br>')+'</p>');
		$("#history").animate({ scrollTop: $("#history").attr("scrollHeight") - $('#history').height() }, 1000);
	}
}

function showWait(){
	$("#wait").toggle();
}