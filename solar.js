(function (){

//=================================行星星历=========================================
//==================================================================================

var XL0_xzb = new Array( //行星星历修正表
 //经(角秒),纬(角秒), 距(10-6AU)
 -0.08631, +0.00039, -0.00008,  //水星
 -0.07447, +0.00006, +0.00017,  //金星
 -0.07135, -0.00026, -0.00176,  //火星
 -0.20239, +0.00273, -0.00347,  //木星
 -0.25486, +0.00276, +0.42926,  //土星
 +0.24588, +0.00345, -14.46266, //天王星
 -0.95116, +0.02481, +58.30651  //海王星
);


function XL0_calc(xt,zn,t,n){ //xt星体,zn坐标号,t儒略世纪数,n计算项数
  t/=10; //转为儒略千年数
  var i,j,v=0,tn=1,c;
  var F=XL0[xt],n1,n2,N;
  var n0, pn=zn*6+1, N0 = F[pn+1]-F[pn]; //N0序列总数
  for(i=0;i<6;i++,tn*=t){
    n1=F[pn+i], n2=F[pn+1+i], n0=n2-n1;
    if(!n0) continue;
    if(n<0) N=n2;  //确定项数
    else { N = int2(3*n*n0/N0+0.5)+n1;  if(i) N+=3;  if(N > n2) N=n2; }
    for(j=n1,c=0;j<N;j+=3) c += F[j]*Math.cos(F[j+1] +t*F[j+2]);
    v += c*tn;
  }
  v/=F[0];
  if(xt==0){ //地球
    var t2=t*t, t3=t2*t; //千年数的各次方
    if(zn==0) v += (-0.0728 -2.7702*t -1.1019*t2 -0.0996*t3) / rad;
    if(zn==1) v += (+0.0000 +0.0004*t +0.0004*t2 -0.0026*t3) / rad;
    if(zn==2) v += (-0.0020 +0.0044*t +0.0213*t2 -0.0250*t3) / 1000000;
  }else{ //其它行星
    var dv = XL0_xzb[ (xt-1)*3+zn ];
    if(zn==0) v += -3*t/rad;
    if(zn==2) v += dv/1000000;
    else      v += dv/rad;
  }
  return v;
}

function p_coord(xt,t,n1,n2,n3){ //xt星体,T儒略世纪数,TD
 var z=new Array();
 if(xt<8){
  z[0]=XL0_calc(xt,0, t,n1);
  z[1]=XL0_calc(xt,1, t,n2);
  z[2]=XL0_calc(xt,2, t,n3);
 }
 if(xt==9){ //太阳
   z[0]=0,z[1]=0,z[2]=0;
 }
 return z;
}


//=================================月亮星历--=======================================
//==================================================================================

function XL1_calc(zn,t,n){ //计算月亮
  var ob=XL1[zn];
  var i,j,F,N,v=0,tn=1,c;
  var t2=t*t,t3=t2*t,t4=t3*t,t5=t4*t,tx=t-10;
  if(zn==0){
    v += (3.81034409 + 8399.684730072*t -3.319e-05*t2 + 3.11e-08*t3 - 2.033e-10*t4)*rad; //月球平黄经(弧度)
    v += 5028.792262*t + 1.1124406*t2 + 0.00007699*t3 - 0.000023479*t4 -0.0000000178*t5;  //岁差(角秒)
    if(tx>0) v += -0.866 +1.43*tx +0.054*tx*tx; //对公元3000年至公元5000年的拟合,最大误差小于10角秒
  }
  t2/=1e4,t3/=1e8,t4/=1e8;
  n*=6; if(n<0) n = ob[0].length;
  for(i=0;i<ob.length;i++,tn*=t){
   F=ob[i];
   N = int2( n*F.length/ob[0].length+0.5 );  if(i) N+=6;  if(N >= F.length) N=F.length;
   for(j=0,c=0;j<N;j+=6) c+=F[j]*Math.cos(F[j+1] +t*F[j+2] +t2*F[j+3] +t3*F[j+4] +t4*F[j+5]);
   v += c*tn;
  }
  if(zn!=2) v/=rad;
  return v;
};


function m_coord(t,n1,n2,n3){ //返回月球坐标,n1,n2,n3为各坐标所取的项数
  var re = new Array();
  re[0] = XL1_calc( 0, t, n1 );
  re[1] = XL1_calc( 1, t, n2 );
  re[2] = XL1_calc( 2, t, n3 );
  return re;
}

//==================================================================================

var cs_rEar = 6378.1366; //地球赤道半径(千米)
var cs_ba = 0.99664719; //地球极赤半径比
var cs_AU   = 1.49597870691e8; //天文单位长度(千米)
var rad  = 180*3600/Math.PI; //每弧度的角秒数
var radd = 180/Math.PI; //每弧度的度数

function rad2rrad(v){//对超过-PI到PI的角度转为-PI到PI
  v=v % (2*Math.PI);
  if(v<=-Math.PI) return v+2*Math.PI;
  if(v>Math.PI) return v-2*Math.PI;
  return v;
}

function rad2mrad(v){ //对超过0-2PI的角度转为0-2PI
  v=v % (2*Math.PI);
  if(v<0) return v+2*Math.PI;
  return v;
}

function h2g(z,a){ //日心球面转地心球面,Z星体球面坐标,A地球球面坐标
  //本含数是通用的球面坐标中心平移函数,行星计算中将反复使用
  a = llr2xyz(a); //地球
  z = llr2xyz(z); //星体
  z[0]-=a[0]; z[1]-=a[1]; z[2]-=a[2];
  return xyz2llr(z);
}

function llrConv(JW,E){ //球面坐标旋转
  //黄道赤道坐标变换,赤到黄E取负
  var r=new Array(),J=JW[0],W=JW[1];
  r[0]=atan2( sin(J)*cos(E) - tan(W)*sin(E), cos(J) );
  r[1]=asin ( cos(E)*sin(W) + sin(E)*cos(W)*sin(J)  );
  r[2]=JW[2];
  r[0]=rad2mrad(r[0]);
  return r;
}

function parallax(z,H,fa,high){ //视差修正
  //z赤道坐标,fa地理纬度,H时角,high海拔(千米)
  var dw=1; if(z[2]<500) dw=cs_AU;
  z[2]*=dw;
  var r0,x0,y0,z0, f=cs_ba, u=Math.atan(f*Math.tan(fa)), g=z[0]+H;
  r0 = cs_rEar*Math.cos(u)  + high*Math.cos(fa); //站点与地地心向径的赤道投影长度
  z0 = cs_rEar*Math.sin(u)*f+ high*Math.sin(fa); //站点与地地心向径的轴向投影长度
  x0 = r0*Math.cos(g);
  y0 = r0*Math.sin(g);
  var s = llr2xyz(z);
  s[0]-=x0, s[1]-=y0, s[2]-=z0;
  s = xyz2llr(s);
  z[0]=s[0], z[1]=s[1], z[2]=s[2]/dw;
}

function llr2xyz(JW){ //球面转直角坐标
  var r=new Array(),J=JW[0],W=JW[1],R=JW[2];
  r[0]=R*cos(W)*cos(J);
  r[1]=R*cos(W)*sin(J);
  r[2]=R*sin(W);
  return r;
}

function xyz2llr(xyz){ //直角坐标转球
  var r=new Array(), x=xyz[0],y=xyz[1],z=xyz[2];
  r[2] = sqrt(x*x+y*y+z*z);
  r[1] = asin(z/r[2]);
  r[0] = rad2mrad( atan2(y,x) );
  return r;
}

function xingX (xt,time){ //行星计算,jd力学时
	var z,a;
	if(xt==10)
	{
		z  = m_coord(time.T,-1,-1,-1);
		//z[0] = rad2mrad(z[0]); 
		z = llrConv(z,time.E);
	}
	if(xt<10)
	{
		a = p_coord(0, time.T,-1,-1,-1);
		z = p_coord(xt,time.T,-1,-1,-1);
		z[0] = rad2mrad(z[0]);
		z = h2g(z,a);
		z[0] = rad2mrad(z[0]);
		z = llrConv(z,time.E);
	}
	var sj = rad2rrad(time.LST*15*Math.PI/180 - z[0]);
	parallax(z, sj,time.lat/180*Math.PI,0);
	return z;
}



xingxing = function (time)
{
	var z=xingX(9,time);
	ss[0]=z[0]/pi*180;
	ss[1]=z[1]/pi*180;
	ss[2]=z[2];
	for (var i=1;i<8;i++)
	{
		z=xingX(i,time);
		ss[3*i+0]=z[0]/pi*180;
		ss[3*i+1]=z[1]/pi*180;
		ss[3*i+2]=z[2];
	}
	z=xingX(10,time);
	ss[24]=z[0]/pi*180;
	ss[25]=z[1]/pi*180;
	ss[26]=z[2];
}

get_sun = function(time)
{
	var z=xingX(9,time);
	z[0]=z[0]/pi*180/15;
	z[1]=z[1]/pi*180;
	return z;
}



})();
