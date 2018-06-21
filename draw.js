

(function (){

setcolor = function ()
{
	if (cam.flag==0||opt.changecolor.value==1)
	{
		rgb0=new Array(0,0,0);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=colordataarray[0];
	}
	else if (time.sun_h<0)
	{
		rgb0=new Array(0,0,50);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=colordataarray[1];
	}else{
		rgb0=new Array(50,100,255);
		rgb1=new Array(255-rgb0[0],255-rgb0[1],255-rgb0[2]);
		colordata=colordataarray[2];
	}
	if (opt.changecolor.value==2)
	{
		rgb0=new Array(255,255,255);
		rgb1=new Array(-255,-255,-255);
		colordata=colordataarray[3];
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
	cxt.fillText("MADE by 北洋星语 Zhu1995zpb",10,page.sizey-10);
}

drawstar = function (x,y,r,rgb)
{
	var maga=r[1];
	var rr=r[0];

	if (opt.changecolor.value==2)
	{
		rgb[0]=1;rgb[1]=1;rgb[2]=1;
	}

	var x1=floor(x-rr);
	var x2=floor(x+rr)+1;
	var y1=floor(y-rr);
	var y2=floor(y+rr)+1;
	var x0=x2-x1+1;
	var y0=y2-y1+1;
	for (var j=x1;j<x1+x0;j++){
		for (var k=y1;k<y1+y0;k++){
			var ll=((j-x)*(j-x)+(k-y)*(k-y))/(rr*rr);
			if (ll<1){
				ll=1-ll*ll*ll;
				imgData.data[4*j+k*size0x*4+0]+=rgb1[0]*rgb[0]*ll*maga;
				imgData.data[4*j+k*size0x*4+1]+=rgb1[1]*rgb[1]*ll*maga;
				imgData.data[4*j+k*size0x*4+2]+=rgb1[2]*rgb[2]*ll*maga;
				imgData.data[4*j+k*size0x*4+3]=255;
			}
		}
	}

}

starmag2 = function (c)
{
	var rr=new Array(2);
	var r0;
	var maga,magb;
	if (c<1){
		c=(c-1)/2.5+1;
	}
	var maga=page.star_size1;
	magb=Math.pow(0.4,c-page.star_size2);
	if (magb>1){
		maga=maga*Math.sqrt(magb);
		magb=1;
	}
	r0=maga*z1/2*page.size/1000*sqrt(page.fov/30);
	rr[0]=r0;
	rr[1]=magb;
	return rr;
}

function findstar(find_data)
{
	star_draw_data.length = 0;

	for(x in find_data)
	{
		var j;
		n=find_data[x];
		if (n=="stars")j=10000;
		if (n=="planets")j=9;

		for (var i=0;i<j;i++){
			zb=cam.cal( obj[n][i].chidao , z2-1 , 1);
			if ( zb.get )
				star_draw_data.push(new star_draw(n,i,zb.x,zb.y,starmag2(obj[n][i].mag),obj[n][i].color));
		}
	}
	for (i=0;i<star_draw_data.length;i++)
	{
		drawstar(star_draw_data[i].x+size1,star_draw_data[i].y+size1,star_draw_data[i].r,star_draw_data[i].color);
	}
}

function starname()
{
	cxt.font="15px 宋体";
	cxt.fillStyle=colordata[4];
	var n,j,x,y,r,mag,name;
	for (var i=0;i<star_draw_data.length;i++){
		n = star_draw_data[i].n;
		j = star_draw_data[i].i;
		x = star_draw_data[i].x;
		y = star_draw_data[i].y;
		r = star_draw_data[i].r[0];	
		mag=obj[n][j].mag;		
		name=obj[n][j].name;
		if(mag<(90/(page.fov+5)))
			cxt.fillText(name,x+r+2,y+r);
	}
}

choosestar = function (x,y)
{
	var n,j,x,y,r,mag,name;
	for (var i=0;i<star_draw_data.length;i++){
		n = star_draw_data[i].n;
		j = star_draw_data[i].i;
		x1 = star_draw_data[i].x;
		y1 = star_draw_data[i].y;
		r = star_draw_data[i].r[0];	

		var r1=5;
		if (r>r1)
			r1=r;
		if (sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))<r1)
		{
			cxt.font="25px 黑体";
			cxt.fillStyle=colordata[5];
			if(n=="stars")cxt.fillText(obj[n][j].name+"  "+obj[n][j].name_en+"  "+obj[n][j].mag,name_x,name_y);
			if(n=="planets")cxt.fillText(obj[n][j].name,name_x,name_y);
			cxt.font="15px 宋体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(obj[n][j].name,x1+r+2,y1+r);
			name_y+=35;
		}
	}
}

function drawfangwei()
{
	cxt.font="30px 黑体";
	cxt.fillStyle=colordata[8];
	for (var j=0;j<6;j++){
		var dy=j>1?10:-15;
		zb=cam.cal( signs[j].diping , z2-1.1 , 0);
		if ( zb.get )
			cxt.fillText(signs[j].name,zb.x-15*signs[j].name.length,zb.y-dy);
	}
}

function drawconname()
{
	cxt.font="20px 黑体";
	cxt.fillStyle=colordata[6];
	for (var j=0;j<88;j++){
		zb=cam.cal( cons[j].chidao , z2-1.1 , 0);
		if ( zb.get )
			cxt.fillText(cons[j].name[2],zb.x-10*cons[j].name[2].length,zb.y+10);
	}
}


var be;

function drawline()
{
	var dx=0.05;
	var dy=0.5;
	var d0=360/(floor(360/(40*2*page.fov/page.size)))/15;
	var d1=160/(floor(160/(40*2*page.fov/page.size)));
	if (d0>0.5)d0=0.5;
	if (d1>10)d1=10;

	var cd =new chidao();
	var dp =new diping();

	if (opt.gird_eq.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[0];
		cxt.lineWidth=starmag2(page.star_size2)[0]/2;

		for (var j=-80;j<90;j+=10)
		{
			be=0;
			for (var i=-12;i-dx<=12;i+=d0)
			{
				cd.set(i,j);
				drawline1(cd);
			}
			be=0;
		}//赤纬线

		for (var i=0;i<24;i+=1)
		{
			be=0;
			for (var j=-80;j-dy<=80;j+=d1)
			{
				cd.set(i,j);
				drawline1(cd);
			}
			be=0;
		}//赤经线

		cxt.stroke();

	}

	if (opt.gird_dp.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[1];
		cxt.lineWidth=starmag2(page.star_size2)[0]/2;

		for (var j=-80;j<90;j+=10)
		{
			be=0;
			for (var i=-12;i-dx<=12;i+=d0)
			{
				dp.set(i*15,j);
				drawline1(dp);
			}
			be=0;
		}//高度圈

		for (var i=0;i<24;i+=1)
		{
			be=0;
			for (var j=-80;j-dy<=80;j+=d1)
			{
				dp.set(i*15,j);
				drawline1(dp);
			}
			be=0;
		}//方位圈

		cxt.stroke();

	}

	if (opt.gird_ec.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[2];
		cxt.lineWidth=1;

		be=0;
		for (var i=-12;i-dx<=12;i+=d0)
		{
			var a1=(i*15)/180*pi;
			var a=atan2( sin(a1)*cos(time.E), cos(a1) );
			var b=asin ( sin(time.E)*sin(a1) );
			cd.set(a*12/pi,b*180/pi);
			drawline1(cd);
		}//黄道
		be=0;

		cxt.stroke();

	}

	if (opt.fangwei.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[3];
		cxt.lineWidth=5;

		for (var j=0;j<1;j+=1)
		{
			be=0;
			for (var i=-12;i-dx<=12;i+=d0/10)
			{
				dp.set(i*15,j);
				drawline1(dp);
			}
			be=0;
		}//地平线

		cxt.stroke();

	}

}



function drawline2()
{
	var r0=starmag2(page.star_size2)[0];
	var r1,r2;
	cxt.beginPath();
	cxt.strokeStyle=colordata[7];
	cxt.lineWidth=r0;
	for (var j=0;j<line_c.length;j+=2)
	{
		zb1=cam.cal( obj.stars[line_c[j]-1].chidao , z2-1.3 , 0);
		zb2=cam.cal( obj.stars[line_c[j+1]-1].chidao , z2-1.3 , 0);
		if ( zb1.get && zb2.get )
		{
			var x1=zb1.x;
			var y1=zb1.y;
			r1=starmag2(obj.stars[line_c[j]-1].mag)[0]+2*r0;
			var x2=zb2.x;
			var y2=zb2.y;
			r2=starmag2(obj.stars[line_c[j+1]-1].mag)[0]+2*r0;			
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
	cxt.stroke();
}

function drawline1(p)
{
		zb=cam.cal( p , z2-1.3 , 0);
		if ( zb.get )
		{
			if (be==0)
			{
				be=1;
				cxt.moveTo(zb.x,zb.y);
			}else{
				cxt.lineTo(zb.x,zb.y);
			}
		}else{be=0;}
}

star = function ()
{

	find_data=new Array();
	if(opt.planet.value)
		find_data=new Array("stars","planets");
	else
		find_data=new Array("stars");
	setcolor();

	clear();
	findstar(find_data);
	cxt.putImageData(imgData,-size1,-size1);
	
	if (opt.gird_eq.value||opt.gird_dp.value||opt.gird_ec.value||opt.fangwei.value)
		drawline();

	if(opt.con_line.value)
		drawline2();
	if(opt.con_name.value)
		drawconname();
	if(opt.star_name.value)
		starname();
	if (opt.fangwei.value)
		drawfangwei();

	logo();
}


})();
