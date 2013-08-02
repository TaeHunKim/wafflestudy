$(document).ready(function(){$("#sbutton").click(function(){
  $("#sbutton").unbind();
  var qu = new Array();
  var i = 0;
  function hanoi(n, a, b){
    var temp=0;
    if(n==1)
    {
      qu[i]=function(){$(".bar:eq("+(a-1)+") .plate:eq(0)").prependTo(".bar:eq("+(b-1)+")")};
      i++;
      console.log("move "+n+", move from "+a+" to "+b);
    }
    else
    {
      temp = 6-a-b;
      hanoi(n-1, a, temp);
     // setTimeout(function(){$(".bar:eq("+(a-1)+") .plate:eq(0)").prependTo(".bar:eq("+(b-1)+")")},1000);
      qu[i]=function(){$(".bar:eq("+(a-1)+") .plate:eq(0)").prependTo(".bar:eq("+(b-1)+")")};
      i++;
      console.log("move "+n+", move from "+a+" to "+b);
      hanoi(n-1, temp, b);
    }
  }

  hanoi (6, 1, 2)
  var j;
  function run(l){
    setTimeout(function(){
      l.shift().call();
      if(l.length>0){
        run(l);
      }
    }, 500);
  }
  run(qu);
  });});
