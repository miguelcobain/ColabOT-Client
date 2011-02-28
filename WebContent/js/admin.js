function newMsg(msg){
	switch(msg._type){
		case "newMsg":
			$('#history').append('<p>'+msg._args[0]+': '+msg._args[1]+'</p>');
			$("#history").animate({ scrollTop: $("#history").attr("scrollHeight") - $('#history').height() }, 1000);
			break;
		case "newUser":
			$('#users').append('<p>'+msg._args[0]+'</p>');
			break;
	}
}

