function p25(){
  var ans = "";
  var f1=Big(1);
  var f2=Big(1);
  var f3=Big(2);
  //var f_tmp;
  ans=3;
  var process = new Array();
  while(true){
    if(f3.toFixed(0).length>=1000) break;
    f1=f2;
    f2=f3;
    f3=f1.plus(f2);
    ans++;
    process.push("<p>"+ans+" Fibonacci number : "+f3.toExponential(5)+"</p>");
  }
  function run(l){
    var t = setTimeout(function(){
      $(".answer").html(l.shift());
      if(l.length==0){
        $(".answer").append("<p>Answer is : "+ans+"</p>");
      }
      else run(l);
    },1);
  }
  if($(".answer").text()==' Now calculate..') run(process);
  return 0;
}

function p34(){
  var ans = 0;
  function fac(n){
  if(n==0) return 1;
  else if(n==1) return 1;
  else return n*fac(n-1);
  }
  var fac_a = new Array();
  for(i=0;i<10;i++){
    fac_a[i]=fac(i);
  }
  function digit_fac(n){
    var df = new Array(0,"");
    for(i=0;i<n.toString().length;i++){
      var f = fac_a[n.toString().charAt(i)];
      df[0]+=f;
      df[1]+=f;
      if(i!=n.toString().length-1) df[1]+=" ";
    }
    df[1]=df[1].split(" ").join(" + ");
    return df;
  }
  var num = 10;
  $(".answer").html("");
  while(true){
    if(num.toString().length*fac_a[9] <= num) break;
    var df = digit_fac(num);
    if(df[0]==num){
      $(".answer").append("<p>"+df[0].toString().split("").join("! + ")+"! = "+df[1]+" = "+df[0]+"</p>");
      ans+=num;
    }
    num++;
    //console.log(num);
  }
  //return ans;
  $(".answer").append("<p>Answer is "+ans+"<p>");
}

function p40(){
  var ans = 0;
  var num = 1;
  var str = "";
  while(true){
    if(str.length >= 1000000) break;
    str+=num;
    num++;
  }
  ansstr = str.charAt(0)+" * "+str.charAt(9)+" * "+str.charAt(99)+" * "+str.charAt(999)+" * "+str.charAt(9999)+" * "+str.charAt(99999)+" * "+str.charAt(999999)
  ans = str.charAt(0)*str.charAt(9)*str.charAt(99)*str.charAt(999)*str.charAt(9999)*str.charAt(99999)*str.charAt(999999)
  //return ans;
  $(".answer").html("");
  $(".answer").append("<p>"+ansstr+" = "+ans+"</p>");
  $(".answer").append("<p>Answer is "+ans+"</p>");
}

function p56(){
  var ans = 0;
  var a = 99;
  var b = 99;
  var process = new Array();
  function digit_sum(n){
    var rtn = 0;
    for(i=0;i<n.length;i++){
      rtn+=n.charAt(i)*1;
    }
    return rtn;
  }
  for(a=1;a<100;a++){
    for(b=1;b<100;b++){
      var str = Big(a).pow(b).toFixed(0);
      var ds;
      //if(str.length*9<ans) ds = "Not need to calculate";
      ds = digit_sum(str);
      if(ds>ans) ans=ds;
      process.push("<p>"+a+" * "+b+" : "+ds+"</p><p>Max : "+ans+"</p>");
    }
  }
  //return ans;
  //$(".answer").html(ans);
  function run(l){
    var t = setTimeout(function(){
      $(".answer").html(l.shift());
      if(l.length==0){
        $(".answer").append("<p>Answer is : "+ans+"</p>");
      }
      else run(l);
    },1);
  }
  if($(".answer").text()==' Now calculate..') run(process);
}




$(document).ready(function(){
  $(".answer").hide();
  $(".toggle").click(function(){
    $(".answer").toggle(1000,function(){;
    if($(".toggle").text()=='Click to show answer'){
      $(".toggle").html('Click to hide answer');
      window[$("#fn").html()]();
    }
    else{
      $(".toggle").html('Click to show answer');
      //$(".answer").html('Now calculate..');
    }
    });
  });
});
  
