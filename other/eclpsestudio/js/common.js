$('#callbackBtn').click(function(){
	$('#callBack').css('display','block');
	$('body').css('overflow','hidden');
	$('#callBack').animate({
		opacity:1
		},500
	);	
});

$('#callBack').click(function(event){
	//console.log(event.target);
	var el = $(event.target).attr('id');
	
	if( el == $(this).attr('id')){
		$('#callBack').animate({
		        opacity:0
		    },500, function(){
				$('#callBack').css('display','none');
				$('body').css('overflow','auto');
			});
	}
});

$('#callbackClosed').click(function(){
	$('#callBack').animate({
	 	    opacity:0
        },500, function(){
			$('#callBack').css('display','none');
			$('body').css('overflow','auto');
		});
});
