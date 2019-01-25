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

function callBackSend(){
	console.log(document.location.href);
}

function wrong(el,delay){
	var label = el.siblings('label'); 
		el.addClass('form__wrong');
		label.addClass('form__wrong');
	    setTimeout(
		    function(){
				el.removeClass('form__wrong');
				label.removeClass('form__wrong');
			},delay);
}

$('#callBackSend').click(function(e){
	e.preventDefault();
	
    var name = $('#callBack input[name = callbakName]');
	var phone = $('#callBack input[name = callbakPhone]');
	var email = $('#callBack input[name = callbakEmail]');
	
	var nameVal = name.val();
	var phoneVal = phone.val();
	var emailVal = email.val();
	
	if(!nameVal){
		wrong(name,1000);
		return false;
	}
	if(!phoneVal){
		wrong(phone,1000);
		return false;
	}
	
	if(!emailVal ||){
		wrong(email,1000);
		return false;
	}
	/*
	$.ajax({
       type: "POST",
       url:'callback.php',
	   data:'',
       
	   success: function(response) {
            alert(response);
       },
	   
       error: function(response) {
            alert(response);
       }
   });*/
   return false;
});

jQuery(function($){
    $(".phone").mask("+7(999) 999-99 99");
});




















