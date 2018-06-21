function int2(v) { return Math.floor(v); }
function sqrt(x) { return Math.sqrt(x);  }
function floor(x){ return Math.floor(x); }
function abs(x)  { return Math.abs(x);   }
function sin(x)  { return Math.sin(x);   }
function cos(x)  { return Math.cos(x);   }
function tan(x)  { return Math.tan(x);   }
function cot(x)  { return 1/tan(x);      }
function asin(x) { return Math.asin(x);  }
function acos(x) { return Math.acos(x);  }
function atan(x) { return Math.atan(x);  }
function atan2(y,x){ return Math.atan2(y,x); }
var pi=Math.PI;

function sgn(x)
{
	if(x>0)return 1;
	if(x<0)return -1;
	if(x==0)return 0;
}


function mat299(a,b)
{
	var c=new Array(
	a[0]*b[0]+a[1]*b[3]+a[2]*b[6],
	a[0]*b[1]+a[1]*b[4]+a[2]*b[7],
	a[0]*b[2]+a[1]*b[5]+a[2]*b[8],
	a[3]*b[0]+a[4]*b[3]+a[5]*b[6],
	a[3]*b[1]+a[4]*b[4]+a[5]*b[7],
	a[3]*b[2]+a[4]*b[5]+a[5]*b[8],
	a[6]*b[0]+a[7]*b[3]+a[8]*b[6],
	a[6]*b[1]+a[7]*b[4]+a[8]*b[7],
	a[6]*b[2]+a[7]*b[5]+a[8]*b[8])
	return c;
}//两个矩阵相乘

function mat399(a,b,c)
{
	return mat299(a,mat299(b,c));
}//三个矩阵相乘

function pos3(x,y,z)
{
	this.x=x;
	this.y=y;
	this.z=z;
}//三维坐标

function pos2(x,y)
{
	this.x=x;
	this.y=y;
}//二维坐标

Canvas_init = function (id)
{
	c=document.getElementById(id);
	cxt=c.getContext("2d");
	document.getElementById(id).onmousedown = function(){ touch.click(event||window.event,1); }
	document.getElementById(id).onmousemove = function(){ touch.click(event||window.event,2); }
	document.getElementById(id).onmouseup = function(){ touch.clickend(); }
	document.getElementById(id).onmouseout = function(){ touch.clickend(); }
	document.getElementById(id).onmousewheel = function(){ touch.click(event||window.event,5); }
	document.getElementById(id).ontouchstart = function(){ touch.touch(event||window.event,1); }
	document.getElementById(id).ontouchend = function(){ touch.clickend();}
	document.getElementById(id).ontouchmove = function(){ touch.touch(event||window.event,2); }
}//画布初始化


function R_x(a)
{
	return new Array(1,0,0,0,cos(a),-sin(a),0,sin(a),cos(a));
}//x轴旋转矩阵

function R_y(a)
{
	return new Array(cos(a),0,sin(a),0,1,0,-sin(a),0,cos(a));	
}//y轴旋转矩阵

function R_z(a)
{
	return new Array(cos(a),-sin(a),0,sin(a),cos(a),0,0,0,1);
}//z轴旋转矩阵

function R_pos(R,pos)
{
	var pos1 = new pos3(
			R[0]*pos.x + R[1]*pos.y + R[2]*pos.z ,
			R[3]*pos.x + R[4]*pos.y + R[5]*pos.z ,
			R[6]*pos.x + R[7]*pos.y + R[8]*pos.z ,
			);
	return pos1;
}//旋转矩阵乘向量

function star_color(r,g,b)
{
	this.r=r;
	this.g=g;
	this.b=b;
}//rgb颜色

function rot()
{
	this.a = undefined;
	this.b = undefined;
	this.c = undefined;
	this.set = function(a,b,c)
	{
		this.a = a;
		this.b = b;
		this.c = c;		
	}
}//三维旋转参数

function timenew()
{
	this.year = undefined;//年
	this.month = undefined;//月
	this.day = undefined;//日
	this.hour = undefined;//时
	this.minute = undefined;//分
	this.second = undefined;//秒
	this.zone = undefined;//时区24时制

	this.lon = 115.17;//经度
	this.lat = 36.85;//纬度

	this.time = undefined;//时间24时制
	this.JD = undefined;//儒略日
	this.JD1 = undefined;//简化儒略日
	this.LST = undefined;//地方恒星时
	this.T = undefined;//儒略千年数
	this.E = undefined;//黄赤交角
	
	this.sun_h = 0;//太阳高度

	this.update_data = function ()
	{
		document.getElementById('year').value=this.year;
		document.getElementById('month').value=this.month;
		document.getElementById('day').value=this.day;
		document.getElementById('ho').value=this.hour;
		document.getElementById('mi').value=this.minute;
		document.getElementById('s').value=floor(this.second+0.5);
		document.getElementById('lamda').value=this.lon;
		document.getElementById('phy').value=this.lat;
	}//更新页面
	this.hcjj = function( t )
	{
 		var t2=t*t, t3=t2*t,t4=t3*t,t5=t4*t;
  		this.E = (84381.4060 -46.836769*t -0.0001831*t2 +0.00200340*t3 -5.76e-7*t4 -4.34e-8*t5)/(180*3600/Math.PI);
	}//黄赤交角
	this.get_sun_h = function()
	{
		if(opt.changecolor.value==0)
		{
			if(opt.planet.value)
			{
				this.sun_h = sgn(obj.planets[0].chidao.to_diping().h);
			}
			else
			{
				var s1=new chidao();
				var s2=get_sun(time);
				s1.set(s2[0],s2[1]);		
				this.sun_h = sgn(s1.to_diping().h);
			}
		}
	}//计算太阳高度
	this.cal_JD_data = function()
	{
		this.JD1=this.JD-2451545;
		this.LST=(this.JD1*24.06570982441908+18.697374558+this.lon/15)%24;
		this.T=this.JD1/36525;
		this.hcjj(this.T);
		if(opt.planet.value)
		{
			xingxing(this);
			for (i=0;i<9;i++)
				obj.planets[i].chidao.set(ss[i*3+0]/15,ss[i*3+1]);
		}
		if(this.sun_h != 0)
			time.get_sun_h();
		this.update_data();
	}//从JD计算时间数据
	this.cal_JD = function()
	{
		var n=0;
		var g=0;
		var m=this.month;
		var y=this.year;
		var d=this.day;
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
		this.time=this.hour+this.minute/60+this.second/3600;
		this.JD=Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+d+n-1524.5+(this.time-this.zone)/24;
		this.cal_JD_data();
	}//从时间计算JD
	this.load_from_page = function()
	{
		this.year = document.getElementById('year').value*1;
		this.month = document.getElementById('month').value*1;
		this.day = document.getElementById('day').value*1;
		this.hour = document.getElementById('ho').value*1;
		this.minute = document.getElementById('mi').value*1;
		this.second = document.getElementById('s').value*1;
		this.zone = 8;
		this.lon = document.getElementById('lamda').value*1;
		this.lat = document.getElementById('phy').value*1;
		this.cal_JD();
	}//从页面加载时间
	this.load_from_data = function(y,m,d,ho,mi,se,zone,lon,lat)
	{
		this.year = y;
		this.month = m;
		this.day = d;
		this.hour = ho;
		this.minute = mi;
		this.second = se;
		this.zone = zone;
		this.lon = lon;
		this.lat = lat;
		this.cal_JD();
	}//从数据加载时间
	this.load_from_JD = function(jd,z)
	{
		this.JD = jd;
		jd=jd+z/24;
		var r=new Object();
		var D=int2(jd+0.5), F=jd+0.5-D, c;
		if(D>=2299161) c=int2((D-1867216.25)/36524.25),D+=1+c-int2(c/4);
		D += 1524;              r.Y = int2((D-122.1)/365.25);
		D -= int2(365.25*r.Y);  r.M = int2(D/30.601);
		D -= int2(30.601*r.M);  r.D = D; 
		if(r.M>13) r.M -= 13, r.Y -= 4715;
		else       r.M -= 1,  r.Y -= 4716;
 

		this.year=r.Y;
		this.month=r.M;
		this.day=r.D;
		F*=24; this.hour=int2(F); F-=this.hour;
		F*=60; this.minute=int2(F); F-=this.minute;
		F*=60; this.second=F;
		this.zone = z;
		this.cal_JD_data();
	}//从JD加载时间
	this.change_time = function change_time(dt)
	{
		time.load_from_JD(this.JD+dt,this.zone);
	}//更改时间
	this.change_to_now = function ()
	{
		var myDate = new Date();
		y=myDate.getFullYear(); 
		m=myDate.getMonth()+1; 
		d=myDate.getDate(); 
		ho=myDate.getHours();
		mi=myDate.getMinutes();
		se=myDate.getSeconds(); 
		this.load_from_data(y,m,d,ho,mi,se,this.zone,this.lon,this.lat);
	}//时间调至当前
	this.init = function()
	{
		this.zone = 8;
		this.lon = document.getElementById('lamda').value*1;
		this.lat = document.getElementById('phy').value*1;
		this.change_to_now();
	}//初始化
}

function chidao()
{
	this.RA = undefined;//赤经24h
	this.Dec = undefined;//赤纬+-90
	this.pos = new pos3();//三维坐标

	this.set = function (a,b)
	{
		this.RA = a;
		this.Dec = b;
		this.pos = R_pos ( mat299(R_z(this.RA*15/180*pi),R_y(-this.Dec/180*pi)),new pos3(1,0,0) );
	}//从赤经赤纬设置

	this.set_pos = function (pos)
	{
		this.pos = pos;
		this.RA = atan2(pos.y,pos.x)*180/pi/15;
		if (this.RA<0) this.RA+=24;
		this.Dec = asin(pos.z)*180/pi;
	}//从三维坐标设置

	this.to_chidao = function ()
	{
		return this;
	}//转为赤道坐标

	this.to_diping = function ()
	{
		var a = new diping();
		a.set_pos( R_pos ( cam.chidao_to_diping ,this.pos ) );
		return a;
	}//转为地平坐标

	this.to_cdcam = function ()
	{
		return R_pos ( cam.cd_to_cdcam ,this.pos );
	}//转为赤道仪相机坐标

	this.to_dpcam = function ()
	{
		return R_pos ( cam.cd_to_dpcam ,this.pos );
	}//转为地平仪相机坐标
}

function diping()
{
	this.A = undefined;//方位角360
	this.h = undefined;//高度角+-90
	this.pos = new pos3();//三维坐标

	this.set = function (a,b)
	{
		this.A = a;
		this.h = b;
		this.pos = R_pos ( mat299(R_z(-this.A/180*pi),R_y(-this.h/180*pi)),new pos3(1,0,0) );
	}//从方位角高度角设置

	this.set_pos = function (pos)
	{
		this.pos = pos;
		this.A = -atan2(pos.y,pos.x)*180/pi;
		if (this.A<0) this.A+=360;
		this.h = asin(pos.z)*180/pi;
		if(this.h==-90)this.h+=0.00001;
	}//从三维坐标设置

	this.to_chidao = function ()
	{
		var a = new chidao();
		a.set_pos( R_pos ( cam.diping_to_chidao ,this.pos ) );
		return a;
	}//转为赤道坐标

	this.to_diping = function ()
	{
		return this;
	}//转为地平坐标

	this.to_cdcam = function ()
	{
		return R_pos ( cam.dp_to_cdcam ,this.pos );
	}//转为赤道仪相机坐标

	this.to_dpcam = function ()
	{
		return R_pos ( cam.dp_to_dpcam ,this.pos );
	}//转为地平仪相机坐标

}

function star()
{
	this.chidao = new chidao();
	this.mag=undefined;
	this.name_en=undefined;
	this.name=undefined;
	this.color=new Array();
}//恒星

function planet()
{
	this.chidao = new chidao();
	this.mag=undefined;
	this.name=undefined;
	this.color = new Array();
}//行星

function star_draw(n,i,x,y,r,color)
{
	this.n = n;
	this.i = i;
	this.x = x;
	this.y = y;
	this.r = r;
	this.color = color;
}//星体画图数据

var star_draw_data = new Array();

var obj = new Object();

obj.stars = new Array();

obj.planets = new Array();

for (i=0;i<9;i++)
{
	planet1=new planet();
	planet1.mag=mags[i];
	planet1.name=name1s[i];
	planet1.color=new Array(color_datas[i*3+0],color_datas[3*i+1],color_datas[3*i+2]);
	obj.planets.push(planet1);
}

for (i=0;i<10000;i++)
{
	star1=new star();
	star1.chidao.set(RD[i*2],RD[i*2+1]);
	star1.mag=mag[i];
	star1.name_en=name2[i];
	star1.name=name1[i];
	star1.color=new Array (
			color_data[3*color_star[i]+0],
			color_data[3*color_star[i]+1],
			color_data[3*color_star[i]+2]
				);
	obj.stars.push(star1);
}

function con()
{
	this.chidao = new chidao();
	this.name = new Array();
}//星座

function sign()
{
	this.diping = new diping();
	this.name = new Array();
}//方位标志

var cons = new Array();

var signs = new Array();

for (var j=0;j<88;j++){
	var con1=new con();
	con1.chidao.set(condata[2*j+1],condata[2*j+0]);
	con1.name[0]=conname[4*j+0];
	con1.name[1]=conname[4*j+1];
	con1.name[2]=conname[4*j+2];
	con1.name[3]=conname[4*j+3];
	cons.push( con1 );
}

for (var j=0;j<6;j++){
	var sign1=new sign();
	sign1.diping.set(fangxiangdata[2*j+0],fangxiangdata[2*j+1]);
	sign1.name=fangxiangname[j];
	signs.push( sign1 );
}


function camera()
{
	this.mat = undefined;//三维转相机坐标矩阵
	this.chidao_to_diping = undefined;//赤道转地平矩阵
	this.diping_to_chidao = undefined;//地平转赤道矩阵
	this.cd_to_cdcam = undefined;//赤道转赤道仪相机坐标矩阵
	this.cd_to_dpcam = undefined;//赤道转地平仪相机坐标矩阵
	this.dp_to_cdcam = undefined;//地平转赤道仪相机坐标矩阵
	this.dp_to_dpcam = undefined;//地平转地平仪相机坐标矩阵

	this.cd = new chidao();//相机中心赤道坐标
	this.dp = new diping();//相机中心地平坐标
	this.rot = new rot();//相机旋转角

	this.flag = 0;//赤道仪0，地平仪1
	this.projection = 0;//投影方式

	//相机部分：
	this.cal_mat = function ()
	{
		this.chidao_to_diping = mat299(R_y((90-time.lat)/180*pi),R_z((12-time.LST)*15/180*pi));
		this.diping_to_chidao = mat299(R_z((time.LST-12)*15/180*pi),R_y((time.lat-90)/180*pi));
		this.cd_to_cdcam = this.mat;
		this.cd_to_dpcam = mat299(this.mat,this.chidao_to_diping);
		this.dp_to_cdcam = mat299(this.mat,this.diping_to_chidao);
		this.dp_to_dpcam = this.mat;
	}//计算所有旋转矩阵
	this.set_rot = function (a,b,c,flag1) //flag=1，地平，flag=0，赤道
	{
		this.flag = flag1;
		if(this.flag==0)
		{
			this.rot.a=-a*15/180*pi;
			this.rot.b=(b-90)/180*pi;
			this.rot.c=(c+90)/180*pi;
		}
		if(this.flag==1)
		{
			this.rot.a=a/180*pi;
			this.rot.b=(b-90)/180*pi;
			this.rot.c=(c+90)/180*pi;
		}
		this.mat = mat399(R_z(this.rot.c),R_y(this.rot.b),R_z(this.rot.a));
	}//计算相机旋转矩阵
	this.set_live = function (a,b,c) //flag=1，地平，flag=0，赤道
	{
		this.flag=1;
		var a1=a/180*pi;
		var b1=b/180*pi;
		var c1=c/180*pi;
		var mat1=new Array(0,-1,0,-1,0,0,0,0,-1);
		var mat2=mat399(R_x(-c1),R_y(b1),R_z(-a1));
		this.mat= mat299(mat1,mat2);
	}//计算实时方位旋转矩阵
	this.getabc = function (r)
	{
		var a,b,c;
		var a1,b1,c1;
		b=asin(r[8]);
		if(abs(r[8])>0.999999999999)
		{
			a=atan2(-r[0],r[3]);
			c=0;
		}else{
			c=atan2(r[2],-r[5]);
			a=atan2(-r[7],r[6]);
		}
		var out = new rot();
		out.set(a,b,c);
		return out;
	}//从矩阵得到旋转角
	this.get_rot = function(flag)
	{
		var out = new rot();
		if(flag==0)if(this.flag==0)
			out = this.getabc(this.mat);
		if(flag==0)if(this.flag==1)
			out = this.getabc(this.cd_to_dpcam);
		if(flag==1)if(this.flag==0)
			out = this.getabc(this.dp_to_cdcam);
		if(flag==1)if(this.flag==1)
			out = this.getabc(this.mat);
		out.a=out.a/pi*180;
		out.b=out.b/pi*180;
		out.c=out.c/pi*180;
		if(out.a<0)out.a+=360;
		if(out.c<-180)out.c+=360;
		if(out.c>180)out.c-=360;
		if(flag==0)out.a=-out.a/15+24;
		return out;
	}//从矩阵得到相机坐标
	this.set_from_page = function (flag)
	{
		if (flag==0)
		{
			this.cd.set(page.RA,page.Dec);
			this.set_rot(this.cd.RA,this.cd.Dec,0,0);
			this.cal_mat();
			this.dp = this.cd.to_diping();
		}
		if (flag==1)
		{
			this.dp.set(page.A,page.h);
			this.set_rot(this.dp.A,this.dp.h,0,1);
			this.cal_mat();
			this.cd = this.dp.to_chidao();
		}
		if (flag==2)
		{
			cam.set_live(live.rot[0],live.rot[1],live.rot[2]);
			this.cal_mat();
			this.dp.set_pos(new pos3(this.mat[6],this.mat[7],this.mat[8]))
			this.cd = this.dp.to_chidao();
		}
	}//从页面加载相机
	//投影部分
	this.point = function (a)
	{
		switch(this.flag)
		{
			case 0:
				return a.to_cdcam();
			break;	
			case 1:
				return a.to_dpcam();
			break;	
		}
	}//点坐标到相机坐标
	this.project = function (p)
	{
		switch(this.projection)
		{
			case 0://球极投影
				return new pos2(p.x/(1+p.z),p.y/(1+p.z));
			break;	
			case 1://透视投影
				return new pos2(p.x/p.z,p.y/p.z);
			break;	
		}
	}//相机坐标到像面坐标
	this.project1 = function (p)
	{
		return new pos2(p.x*page.size*z1/2+page.sizex/2,p.y*page.size*z1/2+page.sizey/2);
	}//像面坐标到画布坐标
	this.cal = function (a,a1,a2)
	{
		var out = new Object();
		var za = this.point(a);
		var l = za.z;
		if (l<a1)
		{
			out.get = 0;
			return out;
		}
		var zb=cam.project1(cam.project(za));
		if (a2)
			if (zb.x<page.sizex&&zb.x>0&&zb.y<page.sizey&&zb.y>0)
			{}else{out.get = 0;return out;}
		out.x=zb.x;out.y=zb.y;out.get=1;
		return out;
	}//点到画布坐标
}

function timer1()
{
	this.fps = undefined;//帧率
	this.dtime = undefined;//每帧时间

	this.speed_array = new Array(0,1/86400,1/8640,1/1440,1/144,1/24,1/2.4,1,7,30,0,-30,-7,-1,-1/2.4,-1/24,-1/144,-1/1440,-1/8640,-1/86400);
	this.going = 0;
	this.speed = 0;

	this.now = function()
	{
		time.change_to_now();
	}//设置到当前时间

	this.go = function ()
	{
		var dtime2,dtime3;
		if (this.going==0)
			return;
		if (opt.lianxu.value==1)
		{
			if(this.dtime>0.02)
			{
				dtime2=this.dtime*1500;
				dtime3=this.dtime;
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
		timego0=setTimeout("timer.go();",dtime2);
		time.change_time(this.speed_array[this.speed]*dtime3);
		begin();
	}//时间运行
	this.changespeed = function (a)
	{
		if(this.speed+a!=10) this.speed=(this.speed+20+a)%20;
		if (this.going==0) 
		{
			this.going=1;
			this.go();
		}
	}//改变速度
	this.stop = function ()
	{
		this.going=0;
		this.speed=0;
	}//停止

	this.t1 = undefined;
	this.t2 = undefined;
	
	this.now1 = function ()
	{
		var myDate = new Date();
		var time10=myDate.getMilliseconds();
		var time11=myDate.getMinutes();
		var time12=myDate.getSeconds(); 
		return time11*60+time12+time10/1000;
	}
	this.timerstart = function()
	{
		this.t1=this.now1();
	}//计时开始
	this.timerend = function()
	{
		this.t2=this.now1();
		this.dtime = this.t2-this.t1;
		this.fps = floor(1/(this.t2-this.t1));
	}//计时结束
}

function orientationHandler(event) 
{
	live.rot=[event.alpha,event.beta,event.gamma];
}


function live1()
{
	this.rot=new Array(3);//实时旋转角度，RPY

	this.setdirection = function() 
	{
		if (window.DeviceOrientationEvent) 
		{
			window.addEventListener("deviceorientationabsolute", orientationHandler, false);
		} 
	}
	this.timedCount = function ()
	{
		directioning=setTimeout("live.timedCount();",timer.dtime*1500);
		this.setdirection();
		begin();
	}
	this.live = function ()
	{
		opt.isdirection.change();
		opt.flag.set(1);
		if( opt.isdirection.value )
		{
			this.timedCount();

		}
		else{
			clearTimeout(directioning);
			window.removeEventListener("deviceorientation", orientationHandler, false);
			begin();
		}
	}
}

function page_data()
{
	this.size=800;
	this.sizex=800;
	this.sizey=800;
	this.star_size1=0;
	this.star_size2=0;
	this.fov=60;

	this.RA = undefined;
	this.Dec = undefined;
	this.cdrot = 0;
	this.A = undefined;
	this.h = undefined;
	this.dprot = 0;
	this.update_from_cam = function ()
	{
		this.RA=cam.cd.RA;
		this.Dec=cam.cd.Dec;
		this.A=cam.dp.A;
		this.h=cam.dp.h;
		document.getElementById('RA').value=Math.floor(this.RA*100)/100;
		document.getElementById('Dec').value=Math.floor(Math.abs(this.Dec)*10)/10*sgn(this.Dec);
		document.getElementById('A').value=Math.floor(this.A*10)/10;
		document.getElementById('h').value=Math.floor(Math.abs(this.h)*10)/10*sgn(this.h);
	}//从相机更新坐标
	this.update_data = function ()
	{
		document.getElementById('RA').value=Math.floor(this.RA*100)/100;
		document.getElementById('Dec').value=Math.floor(Math.abs(this.Dec)*10)/10*sgn(this.Dec);
		document.getElementById('A').value=Math.floor(this.A*10)/10;
		document.getElementById('h').value=Math.floor(Math.abs(this.h)*10)/10*sgn(this.h);
		document.getElementById('fov').value=Math.floor(this.fov*10)/10;
		document.getElementById('sizex').value=this.sizex;
		document.getElementById('sizey').value=this.sizey;
		document.getElementById('ss1').value=this.star_size1;
		document.getElementById('ss2').value=this.star_size2;
	}//更新到页面
	this.load_from_page = function()
	{
		this.star_size1=document.getElementById('ss1').value*1;
		this.star_size2=document.getElementById('ss2').value*1;

		if (sizex!=document.getElementById('sizex').value*1||sizey!=document.getElementById('sizey').value*1)
		{
			this.sizex=document.getElementById('sizex').value*1;
			this.sizey=document.getElementById('sizey').value*1;

			if (this.sizex>2000)
				this.sizex=2000;
			if (this.sizey>2000)
				this.sizey=2000;
			if (this.sizex/this.sizey>2)
				this.sizex=this.sizey*2;
			if (this.sizey/this.sizex>2)
				this.sizey=this.sizex*2;
			this.sizex<this.sizey?this.size=this.sizey:this.size=this.sizex;
			size1=100;
			size0x=this.sizex+2*size1;
			size0y=this.sizey+2*size1;
			document.getElementById('myCanvas').width=this.sizex;
			document.getElementById('myCanvas').height=this.sizey;
			imgData=cxt.createImageData(size0x,size0y);	
		}
		this.RA=document.getElementById('RA').value*1;
		this.Dec=document.getElementById('Dec').value*1;
		this.A=document.getElementById('A').value*1;
		this.h=document.getElementById('h').value*1;
		this.fov=document.getElementById('fov').value*1;
		this.update_data();
	}//从页面加载数据
	this.data_change = function (dRA,dDec,dA,dh,dfov)
	{
		var temp;
		temp=page.h+dh;
		if(temp>89.9999)temp=89.9999;
		if(temp<-89.9999)temp=-89.9999;
		page.h=temp;
		
		temp=page.Dec+dDec;
		if(temp>89.9999)temp=89.9999;
		if(temp<-89.9999)temp=-89.9999;
		page.Dec=temp;

		temp=page.RA*15+dRA;
		while(temp>360)temp-=360;
		while(temp<0)temp+=360;
		page.RA=temp/15;

		temp=page.A+dA;
		while(temp>360)temp-=360;
		while(temp<0)temp+=360;
		page.A=temp;

		temp=page.fov+dfov;
		if (temp<10)temp=10;
		if (temp>135)temp=135;
		while(temp>360)temp-=360;
		page.fov=temp;
		
		this.update_data();
	}//更改坐标
	this.random = function ()
	{
		opt.flag.set(0);
		opt.gird_dp.set(0);
		opt.gird_eq.set(0);
		opt.gird_ec.set(0);
		opt.fangwei.set(0);
		opt.con_line.set(0);
		opt.con_name.set(0);
		opt.planet.set(0);
		opt.star_name.set(0);
		opt.changecolor.set(1);
		setcolor();
		this.RA=Math.random()*24;
		this.Dec=(acos(Math.random()*2-1)/pi-0.5)*180;
		
		document.getElementById('RA').value="";
		document.getElementById('Dec').value="";
		document.getElementById('h').value="";
		document.getElementById('A').value="";
	}//随机
}

function option()
{
	this.size = undefined;
	this.value = undefined;
	this.text = undefined; 
	this.text_change = undefined;
	this.text_array = new Array( ); 
	this.id = undefined;	

	this.set = function (a)
	{	
		this.value=a;	
		while(this.value>=this.size)
			this.value=this.value-this.size;

		if(this.text_change==1)
		{
			this.text=this.text_array[this.value];
			document.getElementById(this.id).value=this.text;
		}else{
			this.text=this.text_array[0];
		}
		begin();
	}//设置
	this.change = function()
	{
		this.set(this.value+=1);
	}//更改
	this.init = function (a,b,c,d,e)
	{	
		this.size=b;
		this.text_change=c;
		this.text_array=d;
		this.id=e
		this.value=a;
		if(this.text_change==1)
		{
			this.text=this.text_array[this.value];
			document.getElementById(this.id).value=this.text;
		}else{
			this.text=this.text_array[0];
		}
	}//初始化
}

var opt=new Object();

opt.gird_dp=new option();
opt.gird_eq=new option();
opt.gird_ec=new option();
opt.fangwei=new option();
opt.con_line=new option();
opt.con_name=new option();
opt.planet=new option();
opt.star_name=new option();
opt.flag=new option();
opt.lianxu=new option();
opt.changecolor=new option();
opt.isdirection=new option();

opt.gird_dp.init(0,2,0,new Array("地平坐标"),"");
opt.gird_eq.init(0,2,0,new Array("赤道坐标"),"");
opt.gird_ec.init(1,2,0,new Array("黄道"),"");
opt.fangwei.init(1,2,0,new Array("方位"),"");
opt.con_line.init(1,2,0,new Array("星座连线"),"");
opt.con_name.init(1,2,0,new Array("星座名称"),"");
opt.planet.init(1,2,0,new Array("行星"),"");
opt.star_name.init(1,2,0,new Array("星名"),"");
opt.flag.init(1,2,1,new Array("赤道仪","地平仪"),"change");
opt.lianxu.init(1,2,1,new Array("时间连续","时间间断"),"changelianxu");
opt.changecolor.init(0,3,1,new Array("大气","普通","黑白"),"changecolor");
opt.isdirection.init(0,2,0,new Array("实时方位"),"");


function disabledMouseWheel() {  
  if (document.addEventListener) {  
    document.addEventListener('DOMMouseScroll', scrollFunc, false);  
  }//W3C  
  window.onmousewheel = document.onmousewheel = scrollFunc;//IE/Opera/Chrome  
}  
function scrollFunc(evt) {  
  return false;  
}  
window.onload=disabledMouseWheel; 

function touch(){
	document.onselectstart = new Function('event.returnValue=false;');
	this.beginmove=0;
	this.X0=0;
	this.Y0=0;
	this.X1=0;
	this.Y1=0;
	this.X2=0;
	this.Y2=0;
	this.dX=0;
	this.dY=0;
	this.click1 = function (x,y)
	{
		this.X0 = x;this.Y0 = y;
		this.X2 = x;this.Y2 = y;
		this.beginmove=1;
	}
	this.clickend = function ()
	{

		if(this.X2==this.X0&&this.Y2==this.Y0)
		{
			choosestar(this.X2,this.Y2);
		}
		this.beginmove=0;
	}
	this.click2 = function (x,y)
	{
		if (this.beginmove==0)return false;
		this.dX = x-this.X2; this.dY = y-this.Y2;
		this.X2 = x; this.Y2 = y;
		this.dX=this.dX/page.size*sqrt(2)*page.fov;
		this.dY=this.dY/page.size*sqrt(2)*page.fov;
		if (opt.flag.value==1)
			page.data_change(0,0,-this.dX/cos(page.h/180*pi),this.dY,0);
		if (opt.flag.value==0)
			page.data_change(this.dX/cos(page.Dec/180*pi),this.dY,0,0,0);
		begin();
	}
	this.click5 = function (dfov)
	{
		dfov=floor(dfov/Math.abs(dfov)*5+0.1);
		page.data_change(0,0,0,0,-dfov);
		begin();
	}
	this.click = function(event,n)
	{
		if(n==1)this.click1(event.offsetX,event.offsetY);
		if(n==2)this.click2(event.offsetX,event.offsetY);
		if(n==5)this.click5(event.wheelDelta);
	}
	this.touch = function(event,n)
	{
		if(n==1)this.click1(event.touches[0].clientX,event.touches[0].clientY);
		if(n==2)this.click2(event.touches[0].clientX,event.touches[0].clientY);
		if(n==4)this.click4(event.touches[0].clientX,event.touches[0].clientY);
	}
	this.move = function (i)
	{
		var dx=0,dy=0,dfov=0;
		if(i==0);
		if(i==1)dx=-5;
		if(i==2)dy=5;
		if(i==3)dx=+5;
		if(i==4)dy=-5;
		if(i==5)dfov=-5;
		if(i==6)dfov=+5;
		if(opt.flag.value==0){page.data_change(-dx,dy,0,0,dfov);}
		if(opt.flag.value==1){page.data_change(0,0,dx,dy,dfov);}
		begin();
	}
}

begin = function ()
{
	z1=cot(page.fov/360*pi)*sqrt(2);
	z2=cos(page.fov/180*pi)+1;
	name_x=10,name_y=10+25;

	cam.set_from_page(opt.isdirection.value?2:opt.flag.value);
	page.update_from_cam();

	timer.timerstart();
	star();
	timer.timerend();
	document.getElementById('fps').value = timer.fps;
}

optiondisplay=1;
var time=new timenew();
var timer = new timer1();
var touch=new touch();
var cam = new camera();
var page = new page_data();
var live = new live1();

Canvas_init('myCanvas');
time.init();
page.load_from_page();
cam.set_from_page(1);
time.get_sun_h();
