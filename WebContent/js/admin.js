function newMsg(msg){
	switch(msg._type){
		case "newMsg":
			insertMessage(msg._args[0],msg._args[1]);
			break;
		case "newUser":
			$('#users').append('<p>'+msg._args[0]+'</p>');
			break;
	}
}

