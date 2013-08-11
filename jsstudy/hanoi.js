$(document).ready(function(){$("#sbutton").click(function(){
  $("#sbutton").unbind();
  var qu = new Array();
  var qs = new Array();
  var order = new Array("1st","2nd","3rd","4th","5th","6th");
  var i = 0;
  function hanoi_move(n, a, b){
    qs[i]=i+1+"/63 : "+order[n-1]+" plate is moved from "+order[a-1]+" bar to "+order[b-1]+" bar.";
    qu[i]=function(){
      var a_child = $(".bar:eq("+(a-1)+")").children(".plate").length;
      var b_child = $(".bar:eq("+(b-1)+")").children(".plate").length;
      var m_top = (a_child-b_child-1)*60;
      var m_left = (b-a)*240;
      $(".bar:eq("+(a-1)+") .plate:eq(0)").animate({top:m_top+'px',left:m_left+'px'},800);
      setTimeout(function(){
        $(".bar:eq("+(a-1)+") .plate:eq(0)").prependTo(".bar:eq("+(b-1)+")").animate({top:0,left:0},0);
        var a_child = $(".bar:eq("+(a-1)+")").children(".plate").length;
        var b_child = $(".bar:eq("+(b-1)+")").children(".plate").length;
        var a_n_p = 360-60*a_child;
        var b_n_p = 360-60*b_child;
        $(".bar:eq("+(a-1)+")").css({"padding-top":a_n_p+"px", "height":380-a_n_p+"px"});
        $(".bar:eq("+(b-1)+")").css({"padding-top":b_n_p+"px", "height":380-b_n_p+"px"});
        },810);
    };
  }
  function hanoi(n, a, b){
    var temp=0;
    if(n==1)
    {
      hanoi_move(n, a, b);
      i++;
      //console.log("move "+n+", move from "+a+" to "+b);
    }
    else
    {
      temp = 6-a-b;
      hanoi(n-1, a, temp);
      hanoi_move(n, a, b);
      i++;
      //console.log("move "+n+", move from "+a+" to "+b);
      hanoi(n-1, temp, b);
    }
  }

  hanoi (6, 1, 2)
  var j;
  function run(l, m){
    setTimeout(function(){
      l.shift().call();
      $("#status").html(m.shift());
      if(l.length>0){
        run(l, m);
      }
    }, 1000);
  }
  run(qu, qs);
  setTimeout(function(){$("#status").html("Finish!")},64000);
  });});
