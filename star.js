

(function (){

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
}

function mat399(a,b,c)
{
	return mat299(a,mat299(b,c));
}

setcolor = function ()
{
	//var sun_h=sin(phy/180*pi)*sin(ss[1])+cos(phy/180*pi)*cos(ss[1])*cos(lst/12*pi-ss[0])
	if (flag==0||changecolor1==1)
	{
		rgb0=new Array(0,0,0);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=new Array(
		"#0000C0",//0赤道网格
		"#800000",//1地平网格
		"#808000",//2黄道
		"#C0C0C0",//3地平线
		"#808080",//4小星名
		"#FFFFFF",//5大星名
		"#A0A0A0",//6星座名
		"#606060",//7星座连线
		"#00FFFF",//8方位
		"#808080",//9logo
		"#FFFFFF",//10月亮前景
		"#000000",//11月亮背景		
		""
		);
	}
	else if (sun_h<0)
	{
		rgb0=new Array(0,0,50);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=new Array(
		"#0000C0",//0赤道网格
		"#C00000",//1地平网格
		"#C0C000",//2黄道
		"#C0C0C0",//3地平线
		"#808080",//4小星名
		"#FFFFFF",//5大星名
		"#808080",//6星座名
		"#404040",//7星座连线
		"#00FFFF",//8方位
		"#808080",//9logo
		"#FFFF00",//10月亮前景
		"#000040",//11月亮背景	
		""
		);
	}else{
		rgb0=new Array(50,100,255);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=new Array(
		"#4040C0",//0赤道网格
		"#804040",//1地平网格
		"#808000",//2黄道
		"#202020",//3地平线
		"#404040",//4小星名
		"#000000",//5大星名
		"#202020",//6星座名
		"#60A0FF",//7星座连线
		"#0000C0",//8方位
		"#404040",//9logo
		"#C0D0F0",//10月亮前景
		"#4060FF",//11月亮背景	
		""
		);
	}
	if (changecolor1==2)
	{
		rgb0=new Array(255,255,255);
		rgb1=new Array(-255,-255,-255);
		colordata=new Array(
		"#404040",//0赤道网格
		"#404040",//1地平网格
		"#303030",//2黄道
		"#000000",//3地平线
		"#404040",//4小星名
		"#000000",//5大星名
		"#202020",//6星座名
		"#808080",//7星座连线
		"#101010",//8方位
		"#404040",//9logo
		"#000000",//10月亮前景
		"#FFFFFF",//11月亮背景	
		""
		);
	}
}

var rgb0=new Array(3);
var rgb1=new Array(3);
var colordata=new Array(13);

function clear()
{
	for (var i=0;i<imgData.data.length;i+=4)
	{
		imgData.data[i]=rgb0[0];
		imgData.data[i+1]=rgb0[1];
		imgData.data[i+2]=rgb0[2];
		imgData.data[i+3]=255;
	}
}

function logo()
{
	cxt.font="15px 宋体";
	cxt.fillStyle=colordata[9];
	cxt.fillText("MADE by 北洋星语 Zhu1995zpb",10,sizey-10);
}

drawstar = function (x,y,r,rgb)
{
	if (changecolor1==2){

	var x1=floor(x-r);
	var x2=floor(x+r)+1;
	var y1=floor(y-r);
	var y2=floor(y+r)+1;
	var x0=x2-x1+1;
	var y0=y2-y1+1;
	for (var j=x1;j<x1+x0;j++){
		for (var k=y1;k<y1+y0;k++){
			var ll=((j-x)*(j-x)+(k-y)*(k-y))/(r*r);
			if (ll<1){
				ll=1-ll*ll*ll*ll;
				imgData.data[4*j+k*size0x*4+0]+=rgb1[0]*ll*mag2;
				imgData.data[4*j+k*size0x*4+1]+=rgb1[1]*ll*mag2;
				imgData.data[4*j+k*size0x*4+2]+=rgb1[2]*ll*mag2;
				imgData.data[4*j+k*size0x*4+3]=255;
			}
		}
	}

	}else{

	var x1=floor(x-r);
	var x2=floor(x+r)+1;
	var y1=floor(y-r);
	var y2=floor(y+r)+1;
	var x0=x2-x1+1;
	var y0=y2-y1+1;
	for (var j=x1;j<x1+x0;j++){
		for (var k=y1;k<y1+y0;k++){
			var ll=((j-x)*(j-x)+(k-y)*(k-y))/(r*r);
			if (ll<1){
				ll=1-ll*ll*ll;
				imgData.data[4*j+k*size0x*4+0]+=rgb1[0]*rgb[0]*ll*mag2;
				imgData.data[4*j+k*size0x*4+1]+=rgb1[1]*rgb[1]*ll*mag2;
				imgData.data[4*j+k*size0x*4+2]+=rgb1[2]*rgb[2]*ll*mag2;
				imgData.data[4*j+k*size0x*4+3]=255;
			}
		}
	}

	}
}


function Rmat(flag,a1,a2,a3)
{

if(flag==1)
{
	var A=a1;
	var h=a2;
	var c=a3;
	var a=-A;
	var b=-90+h;
	var c=c;
	a=a/180*pi;
	b=b/180*pi;
	c=c/180*pi;
	var R1=new Array(cos(a),sin(a),0,-sin(a),cos(a),0,0,0,1);
	var R2=new Array(1,0,0,0,cos(b),sin(b),0,-sin(b),cos(b));
	var R3=new Array(cos(c),sin(c),0,-sin(c),cos(c),0,0,0,1);
	var Rx=mat399(R3,R2,R1);
	a=6+lst;
	b=(90-phy);
	c=0;
	a=a*15/180*pi;
	b=b/180*pi;
	c=c/180*pi;
	var R1=new Array(cos(a),sin(a),0,-sin(a),cos(a),0,0,0,1);
	var R2=new Array(1,0,0,0,cos(b),sin(b),0,-sin(b),cos(b));
	var R3=new Array(cos(c),0,-sin(c),0,1,0,sin(c),0,cos(c));
	var Ry=mat399(R3,R2,R1);
	R=mat299(Rx,Ry);
	Rz=Rx;
	return R;
}

if(flag==0)
{
	var RA=a1;
	var Dec=a2;
	var o=a3;
	var a=RA;
	var b=Dec;
	a=a*15-90;
	b=-90+b;
	var c=o;
	a=a/180*pi;
	b=b/180*pi;
	c=c/180*pi;
	var R1=new Array(cos(a),sin(a),0,-sin(a),cos(a),0,0,0,1);
	var R2=new Array(1,0,0,0,cos(b),sin(b),0,-sin(b),cos(b));
	var R3=new Array(cos(c),sin(c),0,-sin(c),cos(c),0,0,0,1);
	var Rx=mat399(R3,R2,R1);
	R=Rx;
	return R;
}

}

function Rmat1()
{
	var a=direction_current[0];
	var b=direction_current[1];
	var c=direction_current[2];
	a=a/180*pi;
	b=b/180*pi;
	c=c/180*pi;
	x2=atan2(-cos(a)*sin(c)-sin(a)*sin(b)*cos(c),-sin(a)*sin(c)+cos(a)*sin(b)*cos(c))/pi*180;
	o=atan2(cos(b)*sin(c),sin(b))/pi*180;
	y2=-asin(cos(b)*cos(c))/pi*180;
	if(x2<0)x2+=360;
}

var rgb=new Array(0,0,0);

var stardata3= new Array(30000);
{
	for (var i=0;i<10000;i++){
		var RA=RD[2*i];
		var Dec=RD[2*i+1];
		var a=RA*15/180*pi;
		var b=Dec/180*pi;
		stardata3[3*i+0]=cos(a)*cos(b);
		stardata3[3*i+1]=sin(a)*cos(b);
		stardata3[3*i+2]=sin(b);
	}

}

var mag2;

starmag = function starmag(c)
{
	if (c<1){
		c=(c-1)/2.5+1;
	}
	var mag1=star_size1;
	mag2=Math.pow(0.4,c-star_size2);
	if (mag2>1){
		mag1=mag1*Math.sqrt(mag2);
		mag2=1;
	}
	r=mag1*z1/2*size/1000*sqrt(fov/30);
	return r;
}

var starlog= new Array(40000);

var c,d,z,l,x,y,r;
var star_n;

function findstar()
{
	if(planet)
		findstars();
	star_n=0;
	for (var i=0;i<10000;i++){
		c=mag[i];
		d=color_star[i];
		z=new Array(stardata3[3*i+0],stardata3[3*i+1],stardata3[3*i+2])
		l=1+R[6]*z[0]+R[7]*z[1]+R[8]*z[2];
		if (l>z2)
		{
			x=R[0]*z[0]+R[1]*z[1]+R[2]*z[2];
			y=R[3]*z[0]+R[4]*z[1]+R[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			if (x<sizex&&x>0&&y<sizey&&y>0)
			{
				rgb[0]=color_data[3*d+0];
				rgb[1]=color_data[3*d+1];
				rgb[2]=color_data[3*d+2];
				drawstar(x+size1,y+size1,starmag(c),rgb);
				starlog[4*star_n+0]=i;
				starlog[4*star_n+1]=x;
				starlog[4*star_n+2]=y;
				starlog[4*star_n+3]=r;
				star_n++;
			}
		}
	}
}

function starname()
{
	if(planet)
		starnames();
	cxt.font="15px 宋体";
	cxt.fillStyle=colordata[4];
	for (var i=0;mag[starlog[4*i+0]]<(90/(fov+5));i++){
		cxt.fillText(name1[starlog[4*i+0]],starlog[4*i+1]+starlog[4*i+3]+2,starlog[4*i+2]+starlog[4*i+3]);
	}
}

choosestar = function (x,y)
{
	if(planet)
		choosestars(x,y);
	for (var i=0;i<star_n;i++){
		var x1=starlog[4*i+1];
		var y1=starlog[4*i+2];
		var r=starlog[4*i+3];
		var r1=5;
		if (r>r1)
			r1=r;
		if (sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))<r1)
		{
			cxt.font="25px 黑体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(name1[starlog[4*i+0]]+"  "+name2[starlog[4*i+0]]+"  "+mag[starlog[4*i+0]],name_x,name_y);
			cxt.font="15px 宋体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(name1[starlog[4*i+0]],x1+r+2,y1+r);
			name_y+=35;
		}
	}
}

var be;

function drawline()
{
	var dx=0.05;
	var dy=0.5;
	var d0=360/(floor(360/(40*2*fov/size)))/15;
	var d1=160/(floor(160/(40*2*fov/size)));
	if (d0>0.5)d0=0.5;
	if (d1>10)d1=10;

	if (gird_eq){

		cxt.beginPath();
		cxt.strokeStyle=colordata[0];
		cxt.lineWidth=starmag(star_size2)/2;

		for (var j=-80;j<90;j+=10)
		{
			be=0;
			for (var i=-12;i-dx<=12;i+=d0)
			{
				drawline1(i*15,j,R);
			}
			be=0;
		}

		for (var i=0;i<24;i+=1)
		{
			be=0;
			for (var j=-80;j-dy<=80;j+=d1)
			{
				drawline1(i*15,j,R);
			}
			be=0;
		}

		cxt.stroke();

	}

	if (flag&&gird_dp){

		cxt.beginPath();
		cxt.strokeStyle=colordata[1];
		cxt.lineWidth=starmag(star_size2)/2;

		for (var j=-80;j<90;j+=10)
		{
			be=0;
				for (var i=-12;i-dx<=12;i+=d0)
			{
				drawline1(i*15,j,Rz);
			}
			be=0;
		}

		for (var i=0;i<24;i+=1)
		{
			be=0;
			for (var j=-80;j-dy<=80;j+=d1)
			{
				drawline1(i*15,j,Rz);
			}
			be=0;
		}

		cxt.stroke();

	}

	if (gird_ec){

		cxt.beginPath();
		cxt.strokeStyle=colordata[2];
		cxt.lineWidth=1;

		be=0;
		for (var i=-12;i-dx<=12;i+=d0)
		{
			var a1=(i*15)/180*pi;
			var a=atan2( sin(a1)*cos(E), cos(a1) );
			var b=asin ( sin(E)*sin(a1) );
			drawline1(a*180/pi,b*180/pi,R);
		}
		be=0;

		cxt.stroke();

	}

	if (flag&&fangwei){

		cxt.beginPath();
		cxt.strokeStyle=colordata[3];
		cxt.lineWidth=10;

		for (var j=0;j<1;j+=1)
		{
			be=0;
			for (var i=-12;i-dx<=12;i+=d0/10)
			{
				drawline1(i*15,j,Rz);
			}
			be=0;
		}

		cxt.stroke();

	}

}

function drawfangwei()
{
	var fangxiangdata=new Array(0,0,1,0,0,-1,0,1,0,0,-1,0,1,0,0,-1,0,0);
	var fangxiangname=new Array('天顶','天底','北','南','东','西')

	cxt.font="30px 黑体";
	cxt.fillStyle=colordata[8];
	for (var j=0;j<6;j++){
		var z=new Array(fangxiangdata[3*j+0],fangxiangdata[3*j+1],fangxiangdata[3*j+2])
		var l=1+Rz[6]*z[0]+Rz[7]*z[1]+Rz[8]*z[2];
		if (l>z2-0.1)
		{
			var x=Rz[0]*z[0]+Rz[1]*z[1]+Rz[2]*z[2];
			var y=Rz[3]*z[0]+Rz[4]*z[1]+Rz[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			var dy=j>1?10:-15;
			cxt.fillText(fangxiangname[j],x-15*fangxiangname[j].length,y-dy);
		}
	}
}


var line_c_n=1348;
var linec=new Array(line_c_n);

function drawline2()
{
	var r0=starmag(star_size2);
	var r1,r2;
	cxt.beginPath();
	cxt.strokeStyle=colordata[7];
	cxt.lineWidth=r0;
	for (var j=0;j<line_c_n;j++)
	{
		linec[j]=0;
		var i=line_c[j]-1;
		z=new Array(stardata3[3*i+0],stardata3[3*i+1],stardata3[3*i+2])
		l=1+R[6]*z[0]+R[7]*z[1]+R[8]*z[2];
		if (l>z2-0.3)
		{
			x=R[0]*z[0]+R[1]*z[1]+R[2]*z[2];
			y=R[3]*z[0]+R[4]*z[1]+R[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			if (j%2==0)
			{
				var x1=x;var y1=y;
				linec[j]=1;
				r1=starmag(mag[i])+2*r0;
			}
			if (j%2==1)
			{
				if(linec[j-1]==1)
				{
					var x2=x;var y2=y;r2=starmag(mag[i])+2*r0;			
					var k0=sqrt((y2-y1)*(y2-y1)+(x2-x1)*(x2-x1));
					if (k0>(r1+r2))
					{
						var k1=(x2-x1)/k0;
						var k2=(y2-y1)/k0;
						x1+=r1*k1;x2-=r2*k1;
						y1+=r1*k2;y2-=r2*k2;
						cxt.moveTo(x1,y1);
						cxt.lineTo(x2,y2);
					}
				}
			}
		}
	}
	cxt.stroke();
}

function drawline1(aa,bb,R0)
{		a=aa/180*pi;
		b=bb/180*pi;
		z=new Array(cos(a)*cos(b),sin(a)*cos(b),sin(b));
		l=1+R0[6]*z[0]+R0[7]*z[1]+R0[8]*z[2];
		if (l>z2-0.3)
		{
			x=R0[0]*z[0]+R0[1]*z[1]+R0[2]*z[2];
			y=R0[3]*z[0]+R0[4]*z[1]+R0[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			if (be==0)
			{
				be=1;
				cxt.moveTo(x,y);
			}else{
				cxt.lineTo(x,y);
			}
		}else{
		be=0;
		}
}

var condata1= new Array(88*3);
{
	for (var i=0;i<88;i++){
		var a=condata[2*i+1]*15/180*pi;
		var b=condata[2*i+0]/180*pi;
		condata1[3*i+0]=cos(a)*cos(b);
		condata1[3*i+1]=sin(a)*cos(b);
		condata1[3*i+2]=sin(b);
	}
}

function drawconname()
{
	cxt.font="20px 黑体";
	cxt.fillStyle=colordata[6];
	for (var j=0;j<88;j++){
		z=new Array(condata1[3*j+0],condata1[3*j+1],condata1[3*j+2])
		l=1+R[6]*z[0]+R[7]*z[1]+R[8]*z[2];
		if (l>z2-0.1)
		{
			x=R[0]*z[0]+R[1]*z[1]+R[2]*z[2];
			y=R[3]*z[0]+R[4]*z[1]+R[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			cxt.fillText(conname[4*j+2],x-10*conname[4*j+2].length,y+10);
		}
	}

}

var color_datas= new Array(1.0, 0.98, 0.97,1.0, 0.964, 0.914,1., 0.96, 0.876,1., 0.768, 0.504 ,1., 0.983, 0.934,1.0, 0.955, 0.858,0.837, 0.959, 1.,0.44, 0.582, 1.,1., 0.986, 0.968);
var mags= new Array(-8,-1,-2,-1,-2,-1,5,5,-4);
var rs= new Array(0.25,10/60,20/60,15/60,25/60,15/60,5/60,5/60,0.25);
var name1s=new Array('太阳','水星','金星','火星','木星','土星','天王星','海王星','月亮');
var starlogs= new Array(36);
var star_ns;
ss=new Array(27);

function findstars()
{
	starlogs= new Array(36);
	star_ns=0;
	for (var i=0;i<9;i++){
		c=mags[i];
		a=ss[3*i+0];
		b=ss[3*i+1];
		z=new Array(cos(a)*cos(b),sin(a)*cos(b),sin(b));
		l=1+R[6]*z[0]+R[7]*z[1]+R[8]*z[2];
		if (l>z2)
		{
			x=R[0]*z[0]+R[1]*z[1]+R[2]*z[2];
			y=R[3]*z[0]+R[4]*z[1]+R[5]*z[2];
			x=(x/l*size*z1+sizex)/2;
			y=(y/l*size*z1+sizey)/2;
			if (x<sizex&&x>0&&y<sizey&&y>0)
			{
				r=starmag(c);
				if (r>10)r=10+(r-10)/3;
				if (i*(i-8)==0&&fov<30)r=size*sqrt(2)*rs[i]/(2*fov);
				if (fov<30)r=size*sqrt(2)*rs[i]/(2*fov);
				rgb[0]=color_datas[3*i+0];
				rgb[1]=color_datas[3*i+1];
				rgb[2]=color_datas[3*i+2];
				if(i!=8)drawstar(x+size1,y+size1,r,rgb);
				starlogs[4*star_ns+0]=i;
				starlogs[4*star_ns+1]=x;
				starlogs[4*star_ns+2]=y;
				starlogs[4*star_ns+3]=r;
				star_ns++;
			}
		}
	}
}

function drawmoon()
{	var as,bs,am,bm,zs,zm,ls,lm,xm,xs,ym,ys,ra1,ea,r,xa1,ya1,xa2,ya2,xs2,ys2,k2,k1,k3,xa3,ya3,t1,t2,t3,xm1,ym1,tha,xa,ya;
	am=ss[24];bm=ss[25];
	zm=new Array(cos(am)*cos(bm),sin(am)*cos(bm),sin(bm));
	lm=1+R[6]*zm[0]+R[7]*zm[1]+R[8]*zm[2];
	xm=R[0]*zm[0]+R[1]*zm[1]+R[2]*zm[2];
	ym=R[3]*zm[0]+R[4]*zm[1]+R[5]*zm[2];
	as=ss[0];bs=ss[1];
	zs=new Array(cos(as)*cos(bs),sin(as)*cos(bs),sin(bs));
	ls=1+R[6]*zs[0]+R[7]*zs[1]+R[8]*zs[2];
	xs=R[0]*zs[0]+R[1]*zs[1]+R[2]*zs[2];
	ys=R[3]*zs[0]+R[4]*zs[1]+R[5]*zs[2];
	ra1=sqrt((zs[0]-zm[0])*(zs[0]-zm[0])+(zs[1]-zm[1])*(zs[1]-zm[1])+(zs[2]-zm[2])*(zs[2]-zm[2]));
	ea=-cos(acos(ra1/2)*2);
	xm/=lm;ym/=lm;xs/=ls;ys/=ls;
	r=starmag(mags[8]);
	if (r>10)r=10+(r-10)/3;
	if (fov<30)r=size*sqrt(2)*rs[8]/(2*fov);

	xa1=(xm+xs)/2;
	ya1=(ym+ys)/2;
	ra1=-1/(xs*xs+ys*ys);
	xs2=xs*ra1;
	ys2=ys*ra1;
	xa2=(xs+xs2)/2;
	ya2=(ys+ys2)/2;
	k2=(ys2-ys)/(xs2-xs);
	k1=(ys-ym)/(xs-xm);
	k1=-1/k1;
	k2=-1/k2;
	xa3=(ya1-ya2+k2*xa2-k1*xa1)/(k2-k1);
	ya3=ya2+k2*(xa3-xa2);
	k3=-1/((ya3-ym)/(xa3-xm));
	t1=atan2(ys-ym,xs-xm);
	t2=atan2(ym-ys2,xm-xs2);
	t3=atan(k3);
	if(t3>pi)t3=t3-2*pi;
	if(t2<t1){var t0=t2;t2=t1;t1=t0}
	if(t2-t1<pi)if(t3>t2||t3<t1)t3+=pi;
	if(t2-t1>pi)if(t3<t2&&t3>t1)t3+=pi;
	if(t3>pi)t3=t3-2*pi;

	xm1=(xm*size*z1+sizex)/2;
	ym1=(ym*size*z1+sizey)/2;

	cxt.strokeStyle=colordata[11];
	cxt.fillStyle=colordata[11];
	cxt.beginPath();
	cxt.lineWidth=0.1;

	for (var i=0;i<100;i++){
		ya=ym1+r*sin(i/100*2*pi);
		xa=xm1+r*cos(i/100*2*pi);
		if(i==0)cxt.moveTo(xa,ya);
		cxt.lineTo(xa,ya);
	}

	cxt.closePath();
	cxt.fill();
	cxt.stroke();
	cxt.strokeStyle=colordata[10];
	cxt.fillStyle=colordata[10];
	cxt.beginPath();
	cxt.lineWidth=0.1;

	tha=t3+pi/2;
	for (var i=0;i<50;i++){
		ya=ym1+r*sin(i/100*2*pi+tha+pi);
		xa=xm1+r*cos(i/100*2*pi+tha+pi);
		if(i==0)cxt.moveTo(xa,ya);
		cxt.lineTo(xa,ya);
	}
	for (var i=0;i<50;i++){
		ya=ym1+r*(cos(i/100*2*pi)*sin(tha)-ea*sin(i/100*2*pi)*cos(tha));
		xa=xm1+r*(cos(i/100*2*pi)*cos(tha)+ea*sin(i/100*2*pi)*sin(tha));
		cxt.lineTo(xa,ya);
	}

	cxt.closePath();
	cxt.fill();
	cxt.stroke();

}

function starnames()
{
	cxt.font="15px 宋体";
	cxt.fillStyle=colordata[4];
	for (var i=0;i<star_ns;i++){
		cxt.fillText(name1s[starlogs[4*i+0]],starlogs[4*i+1]+starlogs[4*i+3]+2,starlogs[4*i+2]+starlogs[4*i+3]);
	}
}

function choosestars(x,y)
{
	for (var i=0;i<star_ns;i++){
		var x1=starlogs[4*i+1];
		var y1=starlogs[4*i+2];
		var r=starlogs[4*i+3];
		var r1=5;
		if (r>r1)
			r1=r;
		if (sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))<r1)
		{
			cxt.font="25px 黑体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(name1s[starlogs[4*i+0]],name_x,name_y);
			cxt.font="15px 宋体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(name1s[starlogs[4*i+0]],x1+r+2,y1+r);
			name_y+=35;
		}		
	}
}


star = function ()
{
	clear();
	if(isdirection)
		Rmat1();
	if (flag==1)
		findstar(Rmat(flag,x2,y2,o));
	if (flag==0)
		findstar(Rmat(flag,x1,y1,o));
	cxt.putImageData(imgData,-size1,-size1);

	if (gird_eq||gird_dp||gird_ec||fangwei)
		drawline();

	if(con_line)
		drawline2();
	if(con_name)
		drawconname();
	if(planet)
		drawmoon();
	if(star_name)
		starname();

	if (fangwei&&flag)
		drawfangwei();

	logo();
}


})();
