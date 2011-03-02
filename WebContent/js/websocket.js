function WebS(_url){
	this.url=_url;
	this.socket=null;
	this.connect=_connect;
	this.sendOP=_sendOP;
	this.close=_close;
	this.sendAdmin=_sendAdmin;
	//this.toString=_toString;
}

function _connect(){
	if ("WebSocket" in window){
		// Google example code
	    this.socket = new WebSocket(this.url);
		this.socket.onopen = function(){
			// Web Socket is connected. You can send data by send() method
			var adm = new Admin('newUser',['Guest']);
			//alert(socket.url);
			socket.sendAdmin(adm);
			editor.setReadOnly(false);
			showWait(); 
		};
		this.socket.onmessage = function (evt) {
			var msg = jQuery.parseJSON(evt.data);
			
			if(msg.hasOwnProperty('admin')){
				var type = msg.admin._type;
				var args = msg.admin._args;
				
				var msg = new Admin(type,args);
				newMsg(msg);
				
			}
			else {
				var ops = msg.msg[0].operation;
				var state = msg.msg[1].state;
			
				jQuery.each(ops, function() {
					var op = new OP(this._type,this._args);
					//logReceived(op,state);
					//state[1]++;
					apply(op,state);
					//alert(op.toString());
				});
			}
		};
		this.socket.onclose = function() {
			// websocket is closed.
		};
	    //alert("WebSockets supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
	else{
		// the browser doesn't support WebSockets
	    alert("WebSockets NOT supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
	}
}

function _close(){
	this.socket.disconnect();
}

function _sendOP(ops, myMsgs, otherMsgs){
	jQuery.each(ops, function() {
		//logSent(this);
	});
	

	var state= new Array()
	state[0]=myMsgs;
	state[1]=otherMsgs;


	//alert(JSON.stringify({msg: [{"operation": ops}, {"state": state}]}));
	this.socket.send(JSON.stringify({msg: [{"operation": ops}, {"state": state}]}));
}

function _sendAdmin(adm){
	//alert(JSON.stringify({"admin": { "_type": adm._type, "_args": adm._args}}));
	this.socket.send(JSON.stringify({"admin": { "_type": adm._type, "_args": adm._args}}));
}

function _toString(){
	return "";
}



// -----

function OP(type,args){
	this._type=type;
	this._args=args;
	this.toString=_toString;
}

function _toString(){
	return this._type+"("+this._args.join(',')+")";
}

// -----

function Msg(_state,_ops){
	this.state=_state;
	this.ops=_ops;
}

// -----

function Admin(type,args){
	this._type=type;
	this._args=args;
	this.toString=_toString;
}
// -----

function logSent(op){
	$("#sent").append("<p>"+op.toString()+" State: "+myMsgs+","+otherMsgs+"</p>");
	$("#sent").attr({ scrollTop: $("#sent").attr("scrollHeight") });
}

function logReceived(op,state){
	$("#received").append("<p>"+op.toString()+" State: "+state[0]+","+state[1]+"</p>");
	$("#received").attr({ scrollTop: $("#received").attr("scrollHeight") });
}
