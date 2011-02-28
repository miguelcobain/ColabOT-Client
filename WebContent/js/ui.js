var visible=false;

function toggle(){

    if ($(this).hasClass('noclick')) {
        $(this).removeClass('noclick');
    }
    else {
        // actual click event code
		var value,value2;
		if(visible) {value=440;value2=0}
		else {value=175;value2=264}
		visible=!visible;
		//$( "#slidebottom" ).draggable( "option", "disabled", !visible );
	
		$("#slidebottom").animate({
			top:value,
		}, 1500 );
		/*$("#chat").animate({
			height:value2,
		}, 1500 );*/
	}
}