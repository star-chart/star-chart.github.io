


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
	cxt.font="20px 宋体";
	cxt.fillStyle=colordata[9];
	cxt.fillText("MADE by 北洋星语 Zhu1995zpb",20,25);
}

var rgb2=new Array(3);
var rgb000=[1,1,1];

drawstar = function (x,y,r0,rgb)
{
	var maga=r0[1];
	var r=r0[0];
	var ll;
	
	(opt.changecolor.value==2)?rgb2=rgb000:rgb2=rgb;

	for (var j=floor(x-r);j<=floor(x+r);j++){
		for (var k=floor(y-r);k<=floor(y+r);k++){
			ll=((j-x)*(j-x)+(k-y)*(k-y))/(r*r);
			if (ll<1){
				ll=1-ll*ll*ll;
				imgData.data[4*j+k*size0x*4+0]+=rgb1[0]*rgb2[0]*ll*maga;
				imgData.data[4*j+k*size0x*4+1]+=rgb1[1]*rgb2[1]*ll*maga;
				imgData.data[4*j+k*size0x*4+2]+=rgb1[2]*rgb2[2]*ll*maga;
				imgData.data[4*j+k*size0x*4+3]=255;
			}
		}
	}

}

function findstar(find_data)
{
	for(x in find_data)
	{
		var j1,j0;
		n=find_data[x];
		if (n=="stars"){j1=10000;j0=0;}
		if (n=="planets"){j1=8;j0=1}

		for (var i=j0;i<j1;i++){
			zb=cam.cal( obj[n][i].chidao , 0 , 1);
			if ( zb.get )
				star_draw_data.push(new star_draw(n,i,zb.x,zb.y,cam.starmag(obj[n][i].mag),obj[n][i].color));
		}
	}
	for (i=0;i<star_draw_data.length;i++)
	{
		drawstar(star_draw_data[i].x+size1,star_draw_data[i].y+size1,star_draw_data[i].r,star_draw_data[i].color);
	}
}

function starname()
{
	cxt.font="20px 宋体";
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
		if(mag<(90/(cam.fov+5)))
			cxt.fillText(name,x+r+5,y+r+2);
	}
}

choosestar = function (x,y)
{
	var n,j,x1,y1,r,mag,name;
	for (var i=0;i<star_draw_data.length;i++){
		n = star_draw_data[i].n;
		j = star_draw_data[i].i;
		x1 = star_draw_data[i].x;
		y1 = star_draw_data[i].y;
		r = star_draw_data[i].r[0];	

		if(r>1.5)
		if (sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))<r+5)
		{
			cxt.font="35px 黑体";
			cxt.fillStyle=colordata[5];
			if(n=="stars")cxt.fillText(obj[n][j].name+"  "+obj[n][j].name_en+"  "+obj[n][j].mag,name_x,name_y);
			if(n=="planets")cxt.fillText(obj[n][j].name,name_x,name_y);
			cxt.font="20px 宋体";
			cxt.fillStyle=colordata[5];
			cxt.fillText(obj[n][j].name,x1+r+5,y1+r+2);
			name_y+=45;
			cxt.lineWidth=2;//cam.linewidth;
			cxt.beginPath();
			cxt.arc(x1,y1,r+5,0,pi*2,1);
			cxt.closePath();
			cxt.stroke();
		}
	}
}

function drawfangwei()
{
	cxt.font="35px 黑体";
	cxt.fillStyle=colordata[8];
	for (var j=0;j<6;j++){
		var dy=j>1?10:-15;
		zb=cam.cal( signs[j].diping , 0.1 , 0);
		if ( zb.get )
			cxt.fillText(signs[j].name,zb.x-15*signs[j].name.length,zb.y-dy);
	}
}

function drawconname()
{
	cxt.font="25px 黑体";
	cxt.fillStyle=colordata[6];
	for (var j=0;j<88;j++){
		zb=cam.cal( cons[j].chidao , 0.1 , 0);
		if ( zb.get )
			cxt.fillText(cons[j].name[2],zb.x-10*cons[j].name[2].length,zb.y+10);
	}
}


var be;

function drawline()
{
	var dx=0.05;
	var dy=0.5;
	var d0=360/(floor(360/(40*2*cam.fov/cam.s0)))/15;
	var d1=160/(floor(160/(40*2*cam.fov/cam.s0)));
	if (d0>0.5)d0=0.5;
	if (d1>10)d1=10;

	var cd =new chidao();
	var dp =new diping();

	if (opt.gird_eq.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[0];
		cxt.lineWidth=cam.linewidth;

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
		cxt.lineWidth=cam.linewidth;;

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
		cxt.lineWidth=cam.linewidth;

		be=0;
		for (var i=-12;i-dx<=12;i+=d0)
		{
			drawline1(new huangdao(i*15).to_chidao());
		}//黄道
		be=0;

		cxt.stroke();

	}

	if (opt.fangwei.value){

		cxt.beginPath();
		cxt.strokeStyle=colordata[3];
		cxt.lineWidth=cam.linewidth*6;

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
	var r1,r2;
	cxt.beginPath();
	cxt.strokeStyle=colordata[7];
	cxt.lineWidth=cam.linewidth*2;
	for (var j=0;j<line_c.length;j+=2)
	{
		zb1=cam.cal( obj.stars[line_c[j]-1].chidao , 0.3 , 0);
		zb2=cam.cal( obj.stars[line_c[j+1]-1].chidao , 0.3 , 0);
		if ( zb1.get && zb2.get )
		{
			var x1=zb1.x;
			var y1=zb1.y;
			r1=cam.starmag(obj.stars[line_c[j]-1].mag)[0]+2*cam.linewidth;;
			var x2=zb2.x;
			var y2=zb2.y;
			r2=cam.starmag(obj.stars[line_c[j+1]-1].mag)[0]+2*cam.linewidth;;			
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
		zb=cam.cal( p , 0.3 , 0);
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

function autochoose()
{
	cxt.strokeStyle=colordata[4];
	cxt.lineWidth=2;
	cxt.beginPath();
	cxt.moveTo(cam.sx/2-15,cam.sy/2);
	cxt.lineTo(cam.sx/2+15,cam.sy/2);
	cxt.moveTo(cam.sx/2,cam.sy/2-15);
	cxt.lineTo(cam.sx/2,cam.sy/2+15);
	cxt.closePath();
	cxt.stroke();
	choosestar(cam.sx/2,cam.sy/2);
}

star = function ()
{
	name_x=20,name_y=65;
	find_data=new Array();
	if(opt.planet.value)
		find_data=new Array("stars","planets");
	else
		find_data=new Array("stars");

	setcolor();
	clear();
	star_draw_data.length = 0;

	findstar(find_data);
	cxt.putImageData(imgData,-size1,-size1);

	if(opt.planet.value)
		get();

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
	
	if(opt.auto.value)
		autochoose();

	logo();
}


})();
