function juli(pos1,pos2)
{
	return sqrt(
		(pos1.x-pos2.x)*(pos1.x-pos2.x)+
		(pos1.y-pos2.y)*(pos1.y-pos2.y)+
		(pos1.z-pos2.z)*(pos1.z-pos2.z)
		);
}
function jiaoju(pos1,pos2)
{
	var r=sqrt(
		(pos1.x-pos2.x)*(pos1.x-pos2.x)+
		(pos1.y-pos2.y)*(pos1.y-pos2.y)+
		(pos1.z-pos2.z)*(pos1.z-pos2.z)
		);
	return 2*asin(r/2);
}
function to_1(pos)
{
	var r=sqrt(
		(pos.x)*(pos.x)+
		(pos.y)*(pos.y)+
		(pos.z)*(pos.z)
		);
	pos.x=pos.x/r;
	pos.y=pos.y/r;
	pos.z=pos.z/r;
	return pos;
}
function plus(pos1,pos2)
{
	return new pos3(
			pos1.x+pos2.x,
			pos1.y+pos2.y,
			pos1.z+pos2.z
			);
}
function cross(pos1,pos2)
{
	return new pos3(
			pos1.y*pos2.z-pos1.z*pos2.y,
			pos1.z*pos2.x-pos1.x*pos2.z,
			pos1.x*pos2.y-pos1.y*pos2.x
			);
}
function dot(pos1,pos2)
{
	return (
		pos1.x*pos2.x+
		pos1.y*pos2.y+
		pos1.z*pos2.z
		);
}
function npos(pos1,n)
{
	return new pos3(
		n*pos1.x,
		n*pos1.y,
		n*pos1.z
		);
}
function huaxian(X1,Y1,b)
{
	var X,Y,Z;
	X=to_1(X1);
	Z=to_1(cross(X,Y1));
	Y=cross(Z,X);
	return plus(npos(X,cos(b)),npos(Y,sin(b)));
}

var circle=new Array(100);
for (var i=0;i<100;i++)
{
	y=sin((i-25)/100*2*pi);
	x=cos((i-25)/100*2*pi);
	circle[i]=[x,y];
}

function drawmoon(z1,z2,ea)
{
	cxt.fillStyle=colordata[11];
	cxt.beginPath();
	for (var i=0;i<100;i++)
		cxt.lineTo(z1.x+z2.x*circle[i][0]-z2.y*circle[i][1],z1.y+z2.y*circle[i][0]+z2.x*circle[i][1]);
	cxt.closePath();
	cxt.fill(); 

	cxt.fillStyle=colordata[10];
	cxt.beginPath();
	for (var i=0;i<50;i++)
		cxt.lineTo(z1.x+z2.x*circle[i][0]-z2.y*circle[i][1],z1.y+z2.y*circle[i][0]+z2.x*circle[i][1]);
	for (var i=50;i<100;i++)
		cxt.lineTo(z1.x+(-ea)*z2.x*circle[i][0]-z2.y*circle[i][1],z1.y+(-ea)*z2.y*circle[i][0]+z2.x*circle[i][1]);
	cxt.closePath();
	cxt.fill();
}

function drawsun(z1,z2)
{
	cxt.fillStyle=colordata[12];
	cxt.beginPath();
	for (var i=0;i<100;i++)
		cxt.lineTo(z1.x+z2.x*circle[i][0]-z2.y*circle[i][1],z1.y+z2.y*circle[i][0]+z2.x*circle[i][1]);
	cxt.closePath();
	cxt.fill(); 
}

function get()
{
	var r0=atan(1738/ss[26]);
	var r1=atan(695500/(149597970*ss[2]));
	var sun=obj.planets[0].chidao.pos;
	var moon=obj.planets[8].chidao.pos;

	var n="planets";

	var zb0,zb1,p1 = new chidao();

	obj[n][0].name="太阳";
	zb0=cam.cal( obj.planets[0].chidao , 0.3 , 0);
	if ( zb0.get )
	{
		if (cam.fov>20){r1*=2;obj[n][0].name="太阳×2";}
		if (cam.fov>40){r1*=2;obj[n][0].name="太阳×4";}
		p1.set_pos(huaxian(sun,new pos3(0,0,1),r1));
		zb1=cam.cal( p1 , 0.3 , 0);
		zb1.x=zb1.x-zb0.x;zb1.y=zb1.y-zb0.y;
		drawsun(zb0,zb1);
		star_draw_data.push(new star_draw(n,0,zb0.x,zb0.y,[sqrt(zb1.y*zb1.y+zb1.x*zb1.x),0],[0,0,0]));
	}

	obj[n][8].name="月亮";
	zb0=cam.cal( obj.planets[8].chidao , 0.3 , 0);
	if ( zb0.get )
	{
		if (cam.fov>20){r0*=2;obj[n][8].name="月亮×2";}
		if (cam.fov>40){r0*=2;obj[n][8].name="月亮×4";}
		p1.set_pos(huaxian(moon,sun,r0));
		zb1=cam.cal( p1 , 0.3 , 0);
		zb1.x=zb1.x-zb0.x;zb1.y=zb1.y-zb0.y;
		drawmoon(zb0,zb1,dot(sun,moon));
		star_draw_data.push(new star_draw(n,8,zb0.x,zb0.y,[sqrt(zb1.y*zb1.y+zb1.x*zb1.x),0],[0,0,0]));
	}


}
