
(function (){

int2=Math.floor;
sqrt=Math.sqrt;
floor=Math.floor;
abs=Math.abs;
sin=Math.sin;
cos=Math.cos;
tan=Math.tan;
cot = function cot(x)  { return 1/tan(x);      }
asin=Math.asin;
acos=Math.acos;
atan=Math.atan;
atan2=Math.atan2;
pi=Math.PI;



 now = function()
{
	var myDate = new Date();
	year=myDate.getFullYear(); 
	month=myDate.getMonth()+1; 
	day=myDate.getDate(); 
	ho=myDate.getHours();
	mi=myDate.getMinutes();
	s=myDate.getSeconds(); 
	update_data2();
	load_data();
	if(flag==0)
		projection();
	begin();
}

function hcjj(t){
  var t2=t*t, t3=t2*t,t4=t3*t,t5=t4*t;
  return (84381.4060 -46.836769*t -0.0001831*t2 +0.00200340*t3 -5.76e-7*t4 -4.34e-8*t5)/(180*3600/Math.PI);
}

function time(y,m,d,t,z,lamda)
{
	var n=0;var g=0;
	if (y*372+m*31+Math.floor(d)>=588829)
		g=1;
	if (m<=2)
	{
		m=m+12;y=y-1;
	}
	if (g==1)
	{
		n=Math.floor(y/100);
		n=2-n+Math.floor(n/4);
	}
	jd=Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+n-1524.5+(t-z)/24;
	jd1=jd-2451545;
	lst=(jd1*24.06570982441908+18.697374558+lamda/15)%24;
	T=jd1/36525
	E = hcjj(T);
	if(planet)
		xingxing(jd);
	setcolor();
}

function jd2time(jd)
{  
	var r=new Object();
	var D=int2(jd+0.5), F=jd+0.5-D, c;  //取得日数的整数部份A及小数部分F

	if(D>=2299161) c=int2((D-1867216.25)/36524.25),D+=1+c-int2(c/4);
	D += 1524;              r.Y = int2((D-122.1)/365.25);//年数
	D -= int2(365.25*r.Y);  r.M = int2(D/30.601); //月数
	D -= int2(30.601*r.M);  r.D = D; //日数

	if(r.M>13) r.M -= 13, r.Y -= 4715;
	else       r.M -= 1,  r.Y -= 4716;
   //日的小数转为时分秒

	F*=24; r.h=int2(F); F-=r.h;
	F*=60; r.m=int2(F); F-=r.m;
	F*=60; r.s=F;
       return r;
  
}

changetime = function (dt)
{
	var newtime=jd2time(jd+z/24+dt);
	year=newtime.Y;
	month=newtime.M;
	day=newtime.D;
	ho=newtime.h;
	mi=newtime.m;
	s=newtime.s;
	update_data2();
	time(year,month,day,ho+mi/60+s/3600,z,lamda);
	begin();
}

var timespeed=new Array(0,1/86400,1/8640,1/1440,1/144,1/24,1/2.4,1,7,30,0,-30,-7,-1,-1/2.4,-1/24,-1/144,-1/1440,-1/8640,-1/86400);
var timego1=0;
var speed=0;

timego = function ()
{
	if (timego1==0)
		return;
	if (lianxu==1)
	{
		if(dtime>0.02)
		{
			dtime2=dtime*1500;
			dtime3=dtime;
		}
		else
		{
			dtime2=20;
			dtime3=0.02;
		}
	}
	else
	{
		dtime2=1000;
		dtime3=1;
	}
	//console.log(timespeed[speed]*dtime3);
	timego0=setTimeout("timego();",dtime2);
	changetime(timespeed[speed]*dtime3)
}

changespeed = function (a)
{
	if(speed+a!=10) speed=(speed+20+a)%20;
	if (timego1==0) 
	{
		timego1=1;
		timego();
	}
}

timestop = function ()
{
	timego1=0;
	speed=0;
}

changelianxu = function ()
{
	lianxu=1-lianxu;
	if(lianxu==1)
	{		
		document.getElementById('changelianxu').value='时间连续';
	}
	if(lianxu==0)
	{
		document.getElementById('changelianxu').value="时间间断";
	}
}
lianxu=1;

var now1 = function ()
{
	var myDate = new Date();
	var time10=myDate.getMilliseconds();
	var time11=myDate.getMinutes();
	var time12=myDate.getSeconds(); 
	return time11*60+time12+time10/1000;
}

c=document.getElementById("myCanvas");
cxt=c.getContext("2d");

load_data = function ()
{
	star_size1=document.getElementById('ss1').value*1;
	star_size2=document.getElementById('ss2').value*1;

	if (sizex!=document.getElementById('sizex').value*1||sizey!=document.getElementById('sizey').value*1)
	{
		sizex=document.getElementById('sizex').value*1;
		sizey=document.getElementById('sizey').value*1;

		if (sizex>2000)
			sizex=2000;
		if (sizey>2000)
			sizey=2000;
		if (sizex/sizey>2)
			sizex=sizey*2;
		if (sizey/sizex>2)
			sizey=sizex*2;
		update_data3();
		sizex<sizey?size=sizey:size=sizex;
		size1=100;
		size0x=sizex+2*size1;
		size0y=sizey+2*size1;
		document.getElementById('myCanvas').width=sizex;
		document.getElementById('myCanvas').height=sizey;
		imgData=cxt.createImageData(size0x,size0y);
	}

	year=document.getElementById('year').value*1;
	month=document.getElementById('month').value*1;
	day=document.getElementById('day').value*1;
	ho=document.getElementById('ho').value*1;
	mi=document.getElementById('mi').value*1;
	s=document.getElementById('s').value*1;
	lamda=document.getElementById('lamda').value*1;
	phy=document.getElementById('phy').value*1;

	x1=document.getElementById('RA').value*1;
	y1=document.getElementById('Dec').value*1;
	x2=document.getElementById('A').value*1;
	y2=document.getElementById('h').value*1;
	fov=document.getElementById('fov').value*1;

	o=0;
	z=8;
	time(year,month,day,ho+mi/60+s/3600,z,lamda);
}

function update_data1()
{
	document.getElementById('RA').value=Math.floor(x1*100)/100;
	document.getElementById('Dec').value=Math.floor(Math.abs(y1)*10)/10*Math.sign(y1);
	document.getElementById('A').value=Math.floor(x2*10)/10;
	document.getElementById('h').value=Math.floor(Math.abs(y2)*10)/10*Math.sign(y2);
	document.getElementById('fov').value=Math.floor(fov*10)/10;
}
function update_data2()
{
	document.getElementById('year').value=year;
	document.getElementById('month').value=month;
	document.getElementById('day').value=day;
	document.getElementById('ho').value=ho;
	document.getElementById('mi').value=mi;
	document.getElementById('s').value=floor(s+0.5);
	document.getElementById('lamda').value=lamda;
	document.getElementById('phy').value=phy;
}
function update_data3()
{
	document.getElementById('sizex').value=sizex;
	document.getElementById('sizey').value=sizey;
	document.getElementById('ss1').value=star_size1;
	document.getElementById('ss2').value=star_size2;
}


direction_current=new Array(3);

function orientationHandler(event) {
	direction_current=[event.alpha,event.beta,event.gamma];
}

function setdirection() {
	if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", orientationHandler, false);
	} 
}

isdirection=0;

timedCount = function ()
{
	if (isdirection==0)
		return;
	directioning=setTimeout("timedCount();",dtime*1500);
	setdirection();
	begin();
}

live = function ()
{
	if(flag==0)
		projection();
	isdirection=1-isdirection;
	timedCount();
	if (isdirection==0)
	{
		window.removeEventListener("deviceorientation", orientationHandler, false);
		update_data1();
		begin();
		o=0;
	}
}

time2=0;
time1=0;

begin = function ()
{
	z1=cot(fov/360*pi)*sqrt(2);
	z2=cos(fov/180*pi)+1;
	name_x=10,name_y=10+25;

	time1=now1();

	star();

	time2=now1();
	dtime=time2-time1;
	document.getElementById('fps').value=floor(1/(time2-time1));
	//document.getElementById('fps').innerHTML=floor(1/(time2-time1));
	update_data1();
}


projection = function ()
{
	if (isdirection==1)
		live();
	if(flag==1)
	{		
		document.getElementById('change').value='赤道仪';
		//document.getElementById("change").innerHTML = '赤道仪';
	}
	if(flag==0)
	{
		document.getElementById('change').value="地平仪";
		//document.getElementById("change").innerHTML = "地平仪";
	}
	flag=1-flag;
	begin();
}
flag=0;

change1 = function ()
{
	gird_dp=1-gird_dp;
	begin();
}
gird_dp=0;

change2 = function ()
{
	gird_eq=1-gird_eq;
	begin();
}
gird_eq=0;

change3 = function ()
{
	gird_ec=1-gird_ec;
	begin();
}
gird_ec=1;

change4 = function ()
{
	fangwei=1-fangwei;
	begin();
}
fangwei=1;

change5 = function ()
{
	con_line=1-con_line;
	begin();
}
con_line=1;

change6 = function ()
{
	con_name=1-con_name;
	begin();
}
con_name=1;

change7 = function ()
{
	planet=1-planet;
	begin();
}
planet=1;

change8 = function ()
{
	star_name=1-star_name;
	begin();
}
star_name=1;

changecolor = function ()
{
	changecolor1=(changecolor1+1)%3;
	if(changecolor1==0)
	{		
		document.getElementById('changecolor').value='大气';
	}
	if(changecolor1==1)
	{
		document.getElementById('changecolor').value="普通";
	}
	if(changecolor1==2)
	{
		document.getElementById('changecolor').value="黑白";
	}
	begin();
	setcolor();
}
changecolor1=0;


randomchart = function randomchart()
{
	if(flag==1)projection();
	if(gird_dp)change1();
	if(gird_eq)change2();
	if(gird_ec)change3();
	if(fangwei)change4();
	if(con_line)change5();
	if(con_name)change6();
	if(planet)change7();
	if(star_name)change8();
	x1=Math.random()*24;
	y1=(acos(Math.random()*2-1)/pi-0.5)*180;
	begin();
	document.getElementById('RA').value="";
	document.getElementById('Dec').value="";
}

document.onselectstart = new Function('event.returnValue=false;');
var btnNum;
var beginmove=0;
var dX,dY;
var thisX1,thisY1,thisX2,thisY2,thisX3,thisY3;
//var event,event1,event2;

move1 = function move1()
{
beginmove=1;
event = event||window.event;
thisX1 = event.clientX;
thisY1 = event.clientY;
btnNum=true;
beginmove=1;
}

move3 = function move3()
{
btnNum=false;
beginmove==0;
}

move4 = function move4()
{
event2 = event||window.event;
thisX3 = event2.clientX;
thisY3 = event2.clientY;
	if(thisX3==thisX1&&thisY3==thisY1)
	{
	var x1 = document.getElementById('myCanvas').offsetLeft; 
	var y1 = document.getElementById('myCanvas').offsetTop; 
	var thisScrollTop = document.documentElement.scrollTop + document.body.scrollTop;
	var thisScrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft;
	event = event||window.event; 
	var x2 = thisX3 - x1 + thisScrollLeft -10;
	var y2 = thisY3 - y1 + thisScrollTop-10;
	choosestar(x2,y2);
	}
}

move2 = function move2()
{
if (beginmove==0)return false;
event1 = event||window.event;
if (btnNum==false) return false;
thisX2 = event1.clientX;
thisY2 = event1.clientY;
dX=thisX2-thisX1;
dY=thisY2-thisY1;
dX=dX/size*sqrt(2)*fov/10;
dY=dY/size*sqrt(2)*fov/10;
if (flag==1)
{
	h=y2+dY;
	A=x2-dX/cos(h/180*pi);
	while(A>360)A-=360;
	while(A<0)A+=360;
	if(h>89.9)h=89.9;
	if(h<-89.9)h=-89.9;
	x2=A;//Math.floor(A);
	y2=h;//Math.floor(h*10)/10;
}
if (flag==0)
{
	h=y1+dY;
	A=x1*15+dX/cos(h/180*pi);
	while(A>360)A-=360;
	while(A<0)A+=360;
	if(h>89.9)h=89.9;
	if(h<-89.9)h=-89.9;
	x1=A/15;
	y1=h;
}
begin();
}

move5 = function move5()
{
	dfov=event.wheelDelta;
	dfov=floor(dfov/Math.abs(dfov)*5+0.1);
	fov=fov-dfov;
	if (fov<10)
		fov=10;
	if (fov>135)
		fov=135;
	begin();
}

move6 = function move6(i)
{
	var dx=0;var dy=0;var dfov=0;
	var A,h;
	if(i==0);
	if(i==1)dx+=5;
	if(i==2)dy+=5;
	if(i==3)dx-=5;
	if(i==4)dy-=5;
	if(i==5)dfov+=5;
	if(i==6)dfov-=5;
	if(flag==0){A=x1*15;h=y1}
	if(flag==1){A=x2;h=y2}
	if(Math.abs(h)==90)dx=0;
	if(flag==0){A+=dx;h+=dy}
	if(flag==1){A-=dx;h+=dy}
	fov-=dfov;
	if (fov<10)
		fov=10;
	if (fov>135)
		fov=135;
	if(h>90)h=90;
	if(h<-90)h=-90;
	while(A>360)A-=360;
	while(A<0)A+=360;
	if(flag==1){x2=A;y2=h;}
	if(flag==0){x1=A/15;y1=h;}
	update_data1()
	begin();

}


flag=1;

load_data();
now();
optiondisplay=1;




})();

