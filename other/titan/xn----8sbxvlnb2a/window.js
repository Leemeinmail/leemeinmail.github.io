var win = new Array()
function jOpenWindow(page,name){
	window.open(page,name);
}
/*function jOpenWindow(page,name,w,h,title){
	LeftPosition = ($(window).width()-w)/2;
	TopPosition = ($(window).height()-h)/2;
	settings = 'height='+h+',width='+w+',top='+TopPosition+',left='+LeftPosition+',scrollbars=yes,resizable=yes,status=yes';
	if(win[name]){
		win[name].close();
		win[name]=window.open(page,name,settings);
		win[name].focus();
	}else{
		win[name]=window.open(page,name,settings);
	}
	$("<div><iframe frameborder=\"0\" name=\""+name+"\" src=\""+page+"\" width=\"100%\" height=\"100%\"></div>").appendTo("body").dialog({
							title: title,
							width: w,
							height: h,
							resizable: false,
							position: '50% 50%',
							modal: true,
							draggable: true,
							closeText: 'hide',
							closeOnEscape: true,
							autoOpen: true,
							disabled: false
						});
}*/
function jDialogIframe(title,name,url,w,h,rewind){
	var option={
		type: 'iframe',
		href: url,
		title: title,
		autoSize : true,
		wrapCSS: 'jDialogIframe',
		helpers: {
			title : {
				type: 'inside',
				position : 'top'
			},
			overlay : {
				closeClick: false
			}
		},
		keys: {
			close : null
		}
	};
	if(w>0) option.width=w;
	if(h>0) option.height=h;
	if(w>0 || h>0){
		option.fitToView = false;
		option.autoSize = false;
	}
	if(rewind){
		option.afterClose=function(){
			location.href=location.href;
		};
	}
	$.fancybox.open(option);
}
function alert(text){
	$("<div>"+text+"</div>").appendTo("body").dialog({
							title: 'Сообщение',
							resizable: false,
							position: '50% 50%',
							modal: true,
							draggable: false,
							closeText: 'hide',
							closeOnEscape: true,
							autoOpen: true,
							disabled: false
						});
	return true;
}
