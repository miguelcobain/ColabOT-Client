// person class
var WebS = $.Class.create({
    // constructor
    initialize: function(url) {
        
		if ("WebSocket" in window){
			// Google example code
		    this._socket = new WebSocket(url);
				ws.onopen = function(){
				// Web Socket is connected. You can send data by send() method
			};
			ws.onmessage = function (evt) {
				//var received_msg = evt.data;
			};
			ws.onclose = function() { // websocket is closed.
			};
		    alert("WebSockets supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
		}
		else{
			// the browser doesn't support WebSockets
		    alert("WebSockets NOT supported here!rnrnBrowser: " + navigator.appName + " " + navigator.appVersion + "rnrntest by jimbergman.net (based on Google sample code)");
		}
	},
    // methods
	close: function() {
        this._socket.disconnect();
    }
    toString: function() {
        return "string";
    }
}, {
    // properties
    getset: [['WebSocket', '_socket']]
});

var john = new WebS('John', 'Foster', 'Bill');
alert(john);
john.addProperty('Mother', '_mother');
john.property('Mother', 'Tatiana');
alert(john.property('Mother'));
