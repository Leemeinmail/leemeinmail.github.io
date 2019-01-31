/*==============header__animation==============*/
var smoothTrail = function(c, cw, ch){		
  
/*Variables*/
  var _this = this;
  this.c = c;
  this.ctx = c.getContext('2d');
  this.cw = cw;
  this.ch = ch;
  this.mx = 0;
  this.my = 0;
  
  //trail
  this.trail = [];
  //this.maxTrail = 200;
  this.maxTrail = 500;
  this.mouseDown = false;
  
  this.ctx.lineWidth = .1;
  this.ctx.lineJoin = 'round';
  
  //this.radius = 350;
  this.radius = 1;
  this.speed = 0.014;
  this.angle = 0;
  this.arcx = 0;
  this.arcy = 0;
  this.growRadius = true;
  this.seconds = 0;
  this.milliseconds = 1000;
  //добавил
  this.size;
  
/*Utility Functions*/				
  this.rand = function(rMi, rMa){return ~~((Math.random()*(rMa-rMi+1))+rMi);};
  this.hitTest = function(x1, y1, w1, h1, x2, y2, w2, h2){return !(x1 + w1 < x2 || x2 + w2 < x1 || y1 + h1 < y2 || y2 + h2 < y1);};
  
/*Create Point*/
  this.createPoint = function(x, y){					
    this.trail.push({
      x: x,
      y: y						
    });
  };
  
/*Update Trail*/
  this.updateTrail = function(){					
    
    if(this.trail.length < this.maxTrail){
      this.createPoint(this.arcx, this.arcy);
    }					
    
    if(this.trail.length >= this.maxTrail){
      this.trail.splice(0, 1);
    }					
  };
  
/*Update Arc*/
  this.updateArc = function(){
    this.arcx = (this.cw/2) + Math.sin(this.angle) * this.radius;
    this.arcy = (this.ch/2) + Math.cos(this.angle) * this.radius;	
    var d = new Date();
    this.seconds = d.getSeconds();
    this.milliseconds = d.getMilliseconds();
    this.angle += this.speed*(this.seconds+1+(this.milliseconds/1000));
	if(this.angle > 0.79 && this.angle < 0.84){
		this.angle = 0.1;
	}
    //this.angle = rand(1,50);
    if(this.radius <= 1){
      this.growRadius = true;
    } 
    if(this.radius >= this.size){
      this.growRadius = false;
    }
    
    if(this.growRadius){
      this.radius += 1;	
    } else {
      this.radius -= 1;	
    }
  };
  
/*Render Trail*/
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
    this.ctx.strokeStyle = 'hsla('+this.rand(300,350)+', 100%, '+this.rand(40,60)+'%, 1)';	
    this.ctx.stroke();
    this.ctx.closePath();
    
  };
  
/*Clear Canvas*/

  this.clearCanvas = function(){
    //this.ctx.globalCompositeOperation = 'source-over';
    //this.ctx.clearRect(0,0,this.cw,this.ch);
    this.ctx.globalCompositeOperation = 'destination-out';
    this.ctx.fillStyle = 'rgba(0,0,0,.1)';
    this.ctx.fillRect(0,0,this.cw,this.ch);					
    this.ctx.globalCompositeOperation = 'lighter';
  };
  
/*Animation Loop*/

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
  
    this.init = function(){
        this.loop();
    };
  
    this.stop = function(){
	  
    }
  
};

/*Check Canvas Support*/

var isCanvasSupported = function(){
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
};
	
/* Setup requestAnimationFrame*/

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
var cosmosIsActiv = true;
/*Define Canvas and Initialize*/
function cosmos(){
	
	var cosmosWinWidth;
    var scrollTopAnim;
	var cosmosBox = $('#cosmosAnimationBox')
    var cosmosBottom = cosmosBox.offset().top + cosmosBox.height();
	var c;
	var container;
	
	function initCanvas(){
		c = document.getElementById('headerAnimation');
	    container = $('.header__animation');
		c.width = container.width();
	    c.height = container.height();
	}
	
	if(isCanvasSupported){
		initCanvas(); 
		var cl = new smoothTrail(c, c.width, c.height);
	}
	
	function determineWindow(cl){
		cosmosWinWidth = $(window).width();
		var size;
	    if(cosmosWinWidth < 767){
		    return false;
	    }
	    if(cosmosWinWidth > 767 && cosmosWinWidth < 991){
		   cl.size = 350;
	    }
	    if(cosmosWinWidth > 991 && cosmosWinWidth < 1199){
			cl.size = 420;
	    }
	    if(cosmosWinWidth > 1199){
		    cl.size = 500;
	    }
	}
	
	function cosmosEvent(){
        scrollTop = $(window).scrollTop();
		    if(scrollTop > cosmosBottom ){
	            cosmosIsActiv = false;
		    }else{
				cosmosIsActiv = true;
			}
	}
	
	function cosmosResize(){
		initCanvas();
		cl = new smoothTrail(c, c.width, c.height);
		determineWindow(cl);
		//console.log(cl.size);
	}
	
	function startCosmos(cl){
	    determineWindow(cl);
	    cl.init();	
	}
	
	
	setupRAF();
	startCosmos(cl);
	$(window).resize(function(cl){
		
	});
	//window.addEventListener( 'resize', cosmosResize );
	window.addEventListener( 'scroll', cosmosEvent );
    
}
//=================================Анимация проекты(звезда)======================================	
{

var starCanvas = document.getElementById( 'starAnim' );	
	
if(starCanvas != undefined){
    var starCtx = starCanvas.getContext( '2d' );
	if(starCtx != undefined){
        var starW,starH,starCx,starCy,
		    StarBranches,startHue, starTick,starWinWidth,starCoef,
	        starIsActiv,starScrollBottom,starCanvasBox;
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
	
	this.start = true;
	
	starCanvasBox = $('#differentPrjAnim');
    starBottomAnim = $('#differentPrjAnim').offset().top;
	starIsActiv = false;
	
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
			this.start = false;
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
		    return false;
	    }
	    if(starWinWidth > 767 && starWinWidth < 991){
		    initVariables(1000,1000,0.991);
	    }
	    if(starWinWidth > 991 && starWinWidth < 1199){
			initVariables(1000,1100,0.993);
	    }
	    if(starWinWidth > 1199){
		    initVariables(1200,1200,0.9935);
	    }
	}
	
	function reset() {
		this.start = true;
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
			console.log('контекст холста не найден');
			return false;
		}
		if(this.start){
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
    window.addEventListener( 'click', function() {
	    startHue += 60;
	    reset();
    });
}
	
}
//=================================Анимация футер======================================//
/*
    1.При загрузке определяю разрешение
	2.При изменении монитора определяю разрешение
	3.Выключаю на мобилках
*/
{
var bottomCanvas = document.getElementById('square');
var bottomCanvasBox = $('#footerAnim');
var squareBottomAnim;
//проверяю найден ли холст
if(bottomCanvas != undefined){
	//задаю контекст, создаю переменные если он поддерживается
    var BottomCtx = bottomCanvas.getContext('2d');
	if(BottomCtx != undefined){
        var /*dpr, devicePixelRatio,*/ bottomW, bottomH, bottomCX, bottomCY, count, coefRadius, squareIsActiv, squarePause, squareMobile;
		/* 
		dpr = devicePixelRatio не использую кооличество пикселей в единице чего? задается в мета initial-scale=1.0;
        bottomW = ширина холста;
        var bottomH = высота холста;
        var bottomCX = координата x начала отрисовки?;
        var bottomCY = координата y начала отрисовки?;
        var count = колличесво колец;
		coefRadius = кеф радиуса анимации
		squareIsActiv = активация анимации по достижении контейнера родителя
		squarePause = пауза анимации
        //BottomCtx.scale(dpr, dpr); увелечение в зависимости от */
	}
}

//функция анимации
function squareAnimLoop() {
    //ошибки холста
	if(typeof bottomCanvas != 'object' || typeof BottomCtx != 'object'){
        console.log('холст или контекст не верного типа');
		return false;
    }
	//ошибки входящих данных
	if(typeof bottomCX != 'number'){
		console.log( ' неверный тип переменной bottomCX = ' + typeof bottomCount);
		return false;
	}
	if(typeof bottomCY != 'number'){
		console.log( ' неверный тип переменной bottomCY = ' + typeof bottomCount);
		return false;
	}
	if(typeof coefRadius != 'number'){
		console.log( ' неверный тип переменной coefRadius = ' + typeof bottomCount);
		return false;
	}
	if(typeof bottomCount != 'number'){
		console.log( ' неверный тип переменной bottomCount = ' + typeof bottomCount);
		return false;
	}
	if(typeof squarePause != 'boolean'){
		console.log( ' неверный тип переменной squarePause = ' + typeof bottomCount);
		return false;
	}
	//console.log(squarePause);
	//console.log(squareMobile);
	if(squarePause === false || squareMobile === false){
        requestAnimationFrame(squareAnimLoop);
	    
        BottomCtx.clearRect(0, 0, bottomW, bottomH);
        var now = Date.now();
        var mod = Math.sin(now * 0.002);
        var modj = Math.sin(now * 0.004);
        var countk = 1 + 7 + mod * 8;
        var i = Math.ceil(countk);
    
	    while(i--) {
            let segments = 3 + i;
            BottomCtx.beginPath();
        
		    for(let j = 0; j < segments; j++) {
                let a = (j / segments) * Math.PI * 2 - Math.PI * -0.5 + modj * 0.1;
                a += (1 / segments) * Math.PI;
			    //радиус
                //let r = 45 + i * 11.5 + mod * 25;
			    let r = coefRadius + i * 11.5 + mod * 25;
                let x = bottomCX + Math.cos(a) * r;
                let y = bottomCY + Math.sin(a) * r + (countk - segments) * 3.3 * mod;
                BottomCtx[j === 0 ? 'moveTo' : 'lineTo'](x, y);
            }
            
			var color = 0.02 + ((bottomCount - i) / bottomCount) * 0.98;
			
		    BottomCtx.closePath();
            BottomCtx.lineWidth = 2 - (i / bottomCount) * 1.5;
            BottomCtx.fillStyle = '#000';
            BottomCtx.fill();
			BottomCtx.strokeStyle = 'hsla(0, 100%, 100%,'+color+')';
            //BottomCtx.strokeStyle = `hsla(0, 100%, 100%, ${0.02 + ((bottomCount - i) / bottomCount) * 0.98})`;
            BottomCtx.stroke();
        }
	}	
}

//функция управления анимации
function square(){
	/*
	    1. Определяю размер экрана
		2. В зависимости от него инициализирую переменные 
		3. запускаю цикл
		4. При изменении размера начать с пункта 1
	*/
	//расчитываю удаленность от верхна страницы при первой инициализации
    //что бы включить по достижении	
	squareBottomAnim = bottomCanvasBox.offset().top + 100;
	var scrollBottom;
	squareIsActiv = false;
	squarePause = false;
	squareMobile = false;
	
	function initVariables(count, radius){
		bottomW = bottomCanvasBox.innerWidth();
        bottomH = bottomCanvasBox.innerHeight();
        bottomCX = bottomW / 2;
        bottomCY = bottomH / 2;
        bottomCount = count;
		coefRadius = radius;
		bottomCanvas.width = bottomW; 
        bottomCanvas.height = bottomH;
	}
	
	function determineWindow(){
	    var winWidth = $(window).width();

	    if(winWidth < 767){
		    //выключаю для телефонов
		    squareMobile = true;
	    }
		
	    if(winWidth > 767 && winWidth < 991){
            //средние разрешения
		    initVariables(5, 0);
			squareMobile = false;
	    }
	    
		if(winWidth > 991 && winWidth < 1199){
            //средние разрешения
			initVariables(10, 0);
			squareMobile = false;
	    }  
	    
		if(winWidth > 1199){
            //широкие экраны;
			initVariables(14, 1);
			squareMobile = false;
	    }
    }
	
	function initAnimation(){
		//расчитываю размер окна, запускаю анимацию
		//расчитываю удаленность от верха страницы при каждой инициализации
        squareBottomAnim = bottomCanvasBox.offset().top;
		determineWindow();
		squareAnimLoop();
	}
	
	function squareScroll(){
		/*
		    если нижняя часть экрана достигла до верха контейнера анимации
			то проверяю запущенна ли она, если нет, то запускаю
			если да то, отжимаю паузу.
			если анимация запущена но экран не достиг контейнера, 
			то, если не пауза ставлю на паузу
 		*/ 
		scrollBottom = $(window).scrollTop() + $(window).height();
		if(squareBottomAnim < scrollBottom){
	        if(squareIsActiv === false){
                squareIsActiv = true;	
                squarePause = false;	
                initAnimation();				
			}else{
				squarePause = false;
				squareAnimLoop();
			}
		}
		if(squareBottomAnim > scrollBottom){
			if(squarePause === false){
				squarePause = true;
			    squareAnimLoop();
		    }
		}
	}
	//изменяю при ресаизе
    window.addEventListener( 'resize', initAnimation );
    //включаю по скроллу
	window.addEventListener( 'scroll', squareScroll );
    //включение всегда
	//initAnimation();	
}

}//ограничение области видимости

