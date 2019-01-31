/*==============header__animation==============*/
/*=============================================================================*/	
/* Smooth Trail
/*=============================================================================*/
var smoothTrail = function(c, cw, ch){
  
/*=============================================================================*/	
/* Initialize
/*=============================================================================*/
  this.init = function(){
    this.loop();
  };		
  
  /*=============================================================================*/	
  /* Variables
/*=============================================================================*/
  var _this = this;
  this.c = c;
  this.ctx = c.getContext('2d');
  this.cw = cw;
  this.ch = ch;
  this.mx = 0;
  this.my = 0;
  
  //trail
  this.trail = [];
  this.maxTrail = 200;
  this.mouseDown = false;
  
  this.ctx.lineWidth = .1;
  this.ctx.lineJoin = 'round';
  
  this.radius = 1;
  this.speed = 0.4;
  this.angle = 0;
  this.arcx = 0;
  this.arcy = 0;
  this.growRadius = true;
  this.seconds = 0;
  this.milliseconds = 0;
  
  /*=============================================================================*/	
  /* Utility Functions
/*=============================================================================*/				
  this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
  this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
  
  /*=============================================================================*/	
  /* Create Point
/*=============================================================================*/
  this.createPoint = function(x, y){					
    this.trail.push({
      x: x,
      y: y						
    });
  };
  
  /*=============================================================================*/	
  /* Update Trail
/*=============================================================================*/
  this.updateTrail = function(){					
    
    if(this.trail.length < this.maxTrail){
      this.createPoint(this.arcx, this.arcy);
    }					
    
    if(this.trail.length >= this.maxTrail){
      this.trail.splice(0, 1);
    }					
  };
  
  /*=============================================================================*/	
  /* Update Arc
/*=============================================================================*/
  this.updateArc = function(){
    this.arcx = (this.cw/2) + Math.sin(this.angle) * this.radius;
    this.arcy = (this.ch/2) + Math.cos(this.angle) * this.radius;					
    var d = new Date();
    this.seconds = d.getSeconds();
    this.milliseconds = d.getMilliseconds();
    this.angle += this.speed*(this.seconds+1+(this.milliseconds/1000));
    
    if(this.radius <= 1){
      this.growRadius = true;
    } 
    if(this.radius >= 300){
      this.growRadius = false;
    }
    
    if(this.growRadius){
      this.radius += 1;	
    } else {
      this.radius -= 1;	
    }
  };
  
  /*=============================================================================*/	
  /* Render Trail
/*=============================================================================*/
  this.renderTrail = function(){
    var i = this.trail.length;					
    
    this.ctx.beginPath();
    while(i--){
      var point = this.trail[i];
      var nextPoint = (i == this.trail.length) ? this.trail[i+1] : this.trail[i];
      
      var c = (point.x + nextPoint.x) / 2;
      var d = (point.y + nextPoint.y) / 2;						
      this.ctx.quadraticCurveTo(Math.round(this.arcx), Math.round(this.arcy), c, d);
      
      
      
    };
    this.ctx.strokeStyle = 'hsla('+this.rand(170,300)+', 100%, '+this.rand(50, 75)+'%, 1)';	
    this.ctx.stroke();
    this.ctx.closePath();
    
  };			
 
  
  /*=============================================================================*/	
  /* Clear Canvas
/*=============================================================================*/
  this.clearCanvas = function(){
    //this.ctx.globalCompositeOperation = 'source-over';
    //this.ctx.clearRect(0,0,this.cw,this.ch);
    
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0,0,this.cw,this.ch);					
    this.ctx.globalCompositeOperation = 'lighter';
  };
  
  /*=============================================================================*/	
  /* Animation Loop
/*=============================================================================*/
  this.loop = function(){
    var loopIt = function(){
      requestAnimationFrame(loopIt, _this.c);
      _this.clearCanvas();
      _this.updateArc();
      _this.updateTrail();
      _this.renderTrail();							
    };
    loopIt();					
  };
  
};

/*=============================================================================*/	
/* Check Canvas Support
/*=============================================================================*/
var isCanvasSupported = function(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
};

/*=============================================================================*/	
/* Setup requestAnimationFrame
/*=============================================================================*/
var setupRAF = function(){
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x){
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  };
  
  if(!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback, element){
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  };
  
  if (!window.cancelAnimationFrame){
    window.cancelAnimationFrame = function(id){
      clearTimeout(id);
    };
  };
};			

/*=============================================================================*/	
/* Define Canvas and Initialize
/*=============================================================================*/
function cosmos(){ 
  if(isCanvasSupported){
	var container = $('.header__animation');   
    var c = document.getElementById('headerAnimation');
    c.width = container.width();
    c.height = container.height();			
    var cw = c.width;
    var ch = c.height;	
    //document.body.appendChild(c);	
    var cl = new smoothTrail(c, cw, ch);
	
    setupRAF();
    cl.init();
  }
}
//=================================Анимация проекты(звезда)======================================	
{

var starCanvas = document.getElementById( 'starAnim' );	
	
if(starCanvas != undefined){
    var starCtx = starCanvas.getContext( '2d' );
	if(starCtx != undefined){
        var starW,starH,starCx,starCy,
		    StarBranches,startHue, starTick,starWinWidth,starCoef,
	        starIsActiv,starScrollBottom,starCanvasBox, pause;
	}
}	
	
function rand( min, max ) {
	return Math.random() * ( max - min ) + min;
}

function randInt( min, max ) {
	return Math.floor( min + Math.random() * ( max - min + 1 ) );
};

function Branch( hue, x, y, angle, vel ) {
	var move = 15;
	this.x = x + rand( -move, move );
	this.y = y + rand( -move, move );
	this.points = [];
	this.angle = angle != undefined ? angle : rand( 0, Math.PI * 1 );
	this.vel = vel != undefined ? vel : rand( -4, 4 );
	this.spread = 0;
	this.starTick = 0;
	this.hue = hue != undefined ? hue : 200;
	this.life = 1;
	this.decay = 0.0015;
	this.dead = false;
	
	this.points.push({
		x: this.x,
		y: this.y
	});
}

//что то с ветками
Branch.prototype.step = function(i) {
	this.life -= this.decay;
	if( this.life <= 0 ) {
		this.dead = true;	
	}
	
	if( !this.dead ) {
		var lastPoint = this.points[ this.points.length - 1 ];
		this.points.push({
			x: lastPoint.x + Math.cos( this.angle ) * this.vel,
			y: lastPoint.y + Math.sin( this.angle ) * this.vel
		});
		this.angle += rand( -this.spread, this.spread );
		//this.vel *= 0.99;
		this.vel *= starCoef;
		this.spread = this.vel * 0.04;
		this.starTick++;
		this.hue += 0.3;
	} else {
		StarBranches.splice( i, 1 );
	}
};

//рисует ветки
Branch.prototype.draw = function() {
	if( !this.points.length || this.dead ) {
		return false;
	}
	
	var length = this.points.length,
		i = length - 1,
		point = this.points[ i ],
		lastPoint = this.points[ i - randInt( 5, 120 ) ];
		//jitter = 8;
	if( lastPoint ) {
		var jitter = 2 + this.life * 6;
		starCtx.beginPath();
		starCtx.moveTo( lastPoint.x, lastPoint.y );
		starCtx.lineTo( point.x + rand( -jitter, jitter ), point.y + rand( -jitter, jitter ) );
		starCtx.lineWidth = 1;
		var alpha = this.life * 0.075;
		starCtx.strokeStyle = 'hsla(' + ( this.hue + rand( -10, 10 ) ) + ', 70%, 40%, ' + alpha + ')';
		starCtx.stroke();
	}
}

function star() {
	starCanvasBox = $('#differentPrjAnim');
    starBottomAnim = $('#differentPrjAnim').offset().top;
	starIsActiv = false;
	pause = false;
	
	function step() {
	    var i = StarBranches.length;
	    while( i-- ) {StarBranches[ i ].step( i ) }
	    starTick++;
    }

    //рисует фон и ветки
    function draw() {
	    var i = StarBranches.length;
	    if( starTick < 450 ) {
		    starCtx.save();
		    starCtx.globalCompositeOperation = 'lighter';
		    starCtx.globalAlpha = 0.002;
		    starCtx.translate( starCx, starCy );
		    
			var scale = 1 + starTick * 0.00025 ;
		    
			starCtx.scale( scale, scale );
		    starCtx.translate( -starCx, -starCy );
		    starCtx.drawImage( starCanvas, rand( -150, 150 ), rand( -150, 150 ) );
		    starCtx.restore();
	    }	
	    
		starCtx.globalCompositeOperation = 'lighter';
		if(i > 0){
		    while( i-- ) {StarBranches[ i ].draw() }
	    }else{
			//console.log('end');
			pause = true;
		}
    } 
	
	function initVariables(width,height,coef){
		starW = width;
	    starH = height;
	 	starCoef = coef;
	}
	
	function determineWindow(){
		starWinWidth = $(window).width();
	    if(starWinWidth < 767){
			pause = true;
	    }
	    if(starWinWidth > 767 && starWinWidth < 991){
		    initVariables(1000,1000,0.991);
			starIsActiv = false;
	    }
	    if(starWinWidth > 991 && starWinWidth < 1199){
			initVariables(1100,1100,0.993);
			starIsActiv = false;
	    }
	    if(starWinWidth > 1199){
		    initVariables(1200,1200,0.9935);
			starIsActiv = false;
	    }
	}
	
	function reset() {
		pause = false;
		determineWindow();
		StarBranches = [];
	    starCx = starW / 2;
	    starCy = starH / 2;
	    StarBranches.length = 0;
	    starCanvas.width = starW;
	    starCanvas.height = starH;
	    starTick = 0;
	
	    for( var i = 0; i < 500; i++ ) {		
		    StarBranches.push( new Branch( startHue, starCx, starCy) );
	    }
		
		loop();
    }
	
	function loop() {
		
		if(starCtx === undefined){
			return false;
		}
		if(!pause){
	        requestAnimationFrame( loop );
	        step();
	        draw();
	        step();
	        draw();
		}else{
			//console.log('end loop');
			return false;
		}
    }
	
	function starOn(){
	    startHue = 220;
	    StarBranches = [];
		reset();
	    loop();
	}
	
	function startEvent(){
		scrollBottom = $(window).scrollTop() + $(window).height();
		if(starBottomAnim < scrollBottom){
	        if(starIsActiv === false){
				starOn();
                starIsActiv = true; 				
			}
		}
	}
	
	window.addEventListener( 'resize', reset );
	window.addEventListener( 'scroll', startEvent );
    //window.addEventListener( 'click', function() {startHue += 60;reset();});
}
	
}
//=================================Анимация футер======================================//
/*
    1.При загрузке определяю разрешение
	2.При изменении монитора определяю разрешение
	3.Выключаю на мобилках
*/
function square(){
    var canvasBox = $('#footerAnim');
    var c = document.getElementById('square'); 
    var ctx = c.getContext('2d');
    var squareBottomAnim = canvasBox.offset().top
    var scrollBottom;

    var w = canvasBox.innerWidth();
    var h = canvasBox.innerHeight();
    c.width = w;
    c.height = h;
    var cx = w / 2;
    var cy = h / 2;
    var count = 15;
	var color;

    var off = true;
    var pause = false;
    var isActiv = false;

    var now,mod,modj,countk,i,r,x,y,j,a,segments;

function loop() {
    if( pause != true && off != true){
        requestAnimationFrame(loop);
		ctx.clearRect(0, 0, w, h);
        now = Date.now();
        mod = Math.sin(now * 0.002);
        modj = Math.sin(now * 0.004);
        countk = 1 + 7 + mod * 8;
        i = Math.ceil(countk);
    
	    while(i--) {
            segments = 3 + i;
            ctx.beginPath();
        
		    for(j = 0; j < segments; j++) {
                a = (j / segments) * Math.PI * 2 - Math.PI * -0.5 + modj * 0.1;
                a += (1 / segments) * Math.PI;
                r = 0 + i * 11.5 + mod * 25;
                x = cx + Math.cos(a) * r;
                y = cy + Math.sin(a) * r + (countk - segments) * 3.3 * mod;
                ctx[j === 0 ? 'moveTo' : 'lineTo'](x, y);
            }
		    color = 0.02 + ((countk - i) / countk) * 0.98;
            ctx.closePath();
            ctx.lineWidth = 2 - (i / count) * 1.5;
            ctx.fillStyle = '#000';
            ctx.fill();
            ctx.strokeStyle = 'hsla(0, 100%, 100%,'+color+')';
            //ctx.strokeStyle = `hsla(0, 100%, 100%, ${0.02 + ((countk - i) / countk) * 0.98})`;
            ctx.stroke();
        }
	}
}

function initVariables(thisCount){
	w = canvasBox.innerWidth();
    h = canvasBox.innerHeight();
    c.width = w;
    c.height = h;
    cx = w / 2;
    cy = h / 2;
    count = thisCount;
}

function resize(){
	var winWidth = $(window).width();

	if(winWidth < 767){
		off = true;
		//выключаю для телефонов
	}
		
	if(winWidth > 767 && winWidth < 991){
        //средние разрешения
		initVariables(5);
		if(off === true){
			requestAnimationFrame(loop);
		    off = false;
		}
	}
	    
    if(winWidth > 991 && winWidth < 1199){
        //средние разрешения
		initVariables(9);
		if(off === true){
			requestAnimationFrame(loop);
		    off = false;
		}
	}  
	    
	if(winWidth > 1199){
        //широкие экраны;
		initVariables(15);
		if(off === true){
			requestAnimationFrame(loop);
		    off = false;
		}
	}
}

function scroll(){
	scrollBottom = $(window).scrollTop() + $(window).height();
	
	if(scrollBottom > squareBottomAnim){
		if(!isActiv){
			init();
			isActiv = true;
		}
		if(pause = true){
		    pause = false;
		    requestAnimationFrame(loop);	
		}
	}
	if(scrollBottom < squareBottomAnim){
		pause = true;
	}
	
}

function init(){
    window.addEventListener( 'resize', resize );
    resize();
    loop();	
}

function start(){
	//добавит паузу при скролле
    //window.addEventListener( 'scroll', scroll );	
	//без паузы только init(), с паузой только addEvenListener
	init();
}

start();

}

var animationStart = function(){
	cosmos();
	star();
	square();
}





