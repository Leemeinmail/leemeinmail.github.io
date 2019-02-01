/*
function get_name_browser(){
    var ua = navigator.userAgent; 
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/MSIE/) > 0 || ua.search(/Trident/) > 0) return 'Internet Explorer';
    return 'Не определен';
}

var browser = get_name_browser();*/

function callback(jQuery){
	//private
	var callBackBtn = jQuery('.callbackBtn');
	var callBackClosed = jQuery('#callbackClosed');
	var callBack = jQuery('#callBack');
	var callBackSend = jQuery('#callBackSend');
	var body = jQuery('body');
	
	openCallback = function(){
        callBack.css('display','block');
	    body.css('overflow','hidden');
	        
		callBack.animate({
		        opacity:1
		    },500
	    );		
	}
	
	closedCallback = function(){
	    callBack.animate({opacity:0},500, function(){
		    callBack.css('display','none');
			body.css('overflow','auto');
		});
	}
	
	clickEvent = function(el, func){
        el.on('click',function(event){
			func(event);
		});	
	}
	
	
	closedOnOverlay = function(el,func){
		var overley = el.attr('id');
		var elEv;
		el.on('click',function(){
		    elEv = jQuery(event.target).attr('id');
			if( elEv == overley){
				func();
		    }
		});
		
	}
	
	wrong = function(el,delay){
		var label = el.siblings('label'); 
		el.addClass('form__wrong');
		label.addClass('form__wrong');
	    setTimeout(
		    function(){
				el.removeClass('form__wrong');
				label.removeClass('form__wrong');
			},delay);
	}
	
	send = function(e){
		e.preventDefault();
	
        var name = jQuery('#callBack input[name = callbakName]');
	    var phone = jQuery('#callBack input[name = callbakPhone]');
	    var email = jQuery('#callBack input[name = callbakEmail]');
	
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
	
	    if(!emailVal){
		    wrong(email,1000);
		    return false;
	    }
	}
	
	this.init = function(){
		
		clickEvent(callBackBtn, openCallback);
		
		clickEvent(callBackClosed, closedCallback);
		
		clickEvent(callBackSend, function(event){
			send(event)
		});
		
        closedOnOverlay(callBack, closedCallback);		
	}
	
}

function animateFadeIn(id){
	obj = $(id);
	var array = [];
	elem = function(){
		this.obj = 0;
		this.top = 0;
	} 
			
	animateOn = function(el){
				
	    function fadeIn(){
		    scrollBottom = $(window).scrollTop() + $(window).height() - 100;
		    if(scrollBottom > el.top){
		        el.obj.animate(
		            {opacity:1},600
		        );
		    }
	    }
				
	    function init(){
		    addEventListener('scroll',fadeIn);	
	    }
				
	    init();
    }
			
	this.init = function(){		
		for(var i = 0; i < obj.length; i++){
			array[i] = new elem;
			array[i].obj = $(obj[i]);
			array[i].top = array[i].obj.offset().top;
			array[i].obj.css('opacity','0');
			animateOn(array[i]);
		}
	}		
}

/*
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
	var el = jQuery(event.target).attr('id');

	if( el == jQuery(this).attr('id')){
		$('#callBack').animate({
		        opacity:0
		    },500, function(){
				jQuery('#callBack').css('display','none');
				jQuery('body').css('overflow','auto');
			});
	}
});

$('#callbackClosed').click(function(){
	$('#callBack').animate({
	 	    opacity:0
        },500, function(){
			jQuery('#callBack').css('display','none');
			jQuery('body').css('overflow','auto');
		});
});


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
	
    var name = jQuery('#callBack input[name = callbakName]');
	var phone = jQuery('#callBack input[name = callbakPhone]');
	var email = jQuery('#callBack input[name = callbakEmail]');
	
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
	
	if(!emailVal){
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
   });
   return false;
});*/
/*
function textOn(){
	var text = new TypeIt('#slogan', {
        speed: 100,
        startDelay: 300,
		html: true,
		afterComplete:function(){
			
			setTimeout(function(){
				jQuery('.ti-cursor').addClass('is-hidden');
			},2000);
		
		}
    })
	.type("<span class='slogan__item' >Мы</span><br/>")
	.type("<span class='slogan__item' >делаем</span><br/>")
	.type("<span class='slogan__item slogan__underline slogan__underline--item1 slogan__item--ligh underline' >хорошие</span><br/>")
	.type("<span class='slogan__item slogan__underline slogan__underline--item2 slogan__item--dark underline' >вещи</span>")
	.go();
}
*/

function textOn(callback){
	var typer,txt,tot,ch;
	var delay = 150;
	
	function typeIt1() {   
        if(ch > tot) {
			secondStep();
			return false;
	    }else{
		    typer.text( txt.substring(0, ch++) );
            setTimeout(typeIt1,delay);
		}
    }
	
	
	function typeIt2() {   
        if(ch > tot) {
			typer.removeClass('slogan__underline--hidden');
			thirdStep();
			return false;
	    }else{
		    typer.text( txt.substring(0, ch++) );
            setTimeout(typeIt2,delay);
		}
    }
	
	function typeIt3(){
		if(ch > tot) {
			typer.removeClass('slogan__underline--hidden');
			if(callback){callback();}
			return false;
	    }else{
		    typer.text( txt.substring(0, ch++) );
            setTimeout(typeIt3,delay);
		}
	}
	
	function firstStep(){
		typer = $('.first');
        txt = typer.data("text");
	    tot = txt.length;
        ch  = 0;
		
	    typeIt1();
	}
	
	function secondStep(){
		typer = $('.second-word');
		typer.css('display','block');
        txt = typer.data("text");
	    tot = txt.length;
        ch  = 0;
		
		typeIt2();
	}
	
	function thirdStep(){
		typer = $('.third-word');
		typer.css('display','block');
        txt = typer.data("text");
	    tot = txt.length;
        ch  = 0;
		
		typeIt3();
	}
	
    var ca = function(){
	    console.log('end');
	}	
		
	firstStep();
}

function mobileMenu(){
	var mobileMenuBtn = $('#mobileMenuBtn');
	var mobileMenuClosed = $('#mobileMenuClosed');
	var mobileMenuBody = $('#mobileMenuBody');
	var body = $('body');
	
	var open = function(){
	    mobileMenuBody.css('display','flex');
	    body.css('overflow','hidden');    
		mobileMenuBody.animate({
		        opacity:1
		    },500
	    );	
	}
	
	var closed = function(){
		mobileMenuBody.animate({opacity:0},500, function(){
		    mobileMenuBody.css('display','none');
			body.css('overflow','auto');
		});
	}
	
	var eventClick = function(el, func){
		el.on('click',function(){
			func();
		})
	}
	
	this.init = function(){
		eventClick(mobileMenuClosed,closed);
		eventClick(mobileMenuBtn,open);
	}
	
}





