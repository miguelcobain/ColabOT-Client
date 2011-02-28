var visible=false;

function toggle(){

    if ($(this).hasClass('noclick')) {
        $(this).removeClass('noclick');
    }
    else {
        // actual click event code
		var value,value2,value3;
		if(visible) {value=440;value2=0;value3=0.7}
		else {value=175;value2=264;value3=1}
		visible=!visible;
		//$( "#slidebottom" ).draggable( "option", "disabled", !visible );
	
		$("#slidebottom").animate({
			top:value,
			opacity:value3,
		}, 1500 );
		/*$("#chat").animate({
			height:value2,
		}, 1500 );*/
	}
}