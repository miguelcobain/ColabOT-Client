function newMsg(msg){
	switch(msg._type){
		case "newMsg":
			insertMessage(msg._args[0],msg._args[1]);
			break;
		case "newUser":
			jQuery.each(msg._args, function() {
				$('#users').append('<p>'+this+'</p>');
			});
			break;
	}
}

