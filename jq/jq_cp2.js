$(document).ready(function(){
  document.onselectstart=function(){return false;}
  var w=window.innerWidth;
  var h=window.innerHeight;

  function addbox(move,resize){
    var addh = Math.floor((Math.random()*100)+200);
    var addw = Math.floor((Math.random()*100)+200);
    $(this).addClass("added");
    $(this).css({"top":Math.floor((Math.random()*(h-200))+1)+"px","left":Math.floor((Math.random()*(w-200))+1)+"px","width":addw+"px","height":addh+"px"});
    //this.move = move;
    //this.resize = resize;
    $(this).dblclick(function(e){
    if(e.target==this) $(e.target).css("background-color","rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
    });
    if(move){
      $(this).mousedown(function(e){
        if(e.target==this){
          var x = event.pageX;
          var y = event.pageY;
          var orix = $(e.target).css("left");
          var originx=orix.slice(0,orix.length-2)*1;
          var oriy = $(e.target).css("top");
          var originy=oriy.slice(0,oriy.length-2)*1;
          $(document).mousemove(function(){
            $("body").css("cursor","move");
            $(e.target).css({"top":originy+event.pageY-y+"px","left":originx+event.pageX-x+"px"});
            $(e.target).mouseup(function(){
              $("body").css({"cursor":"default"});
              $(document).off();    
            });
          });
        }
      });
    }
    if(resize){
      $(this).append("<div class = resize style=\"top:"+(addh-10)+"px;left:"+(addw-10)+"px\"></div>");
      $(this).on("mouseover",".resize",function(e){
        $(e.target).css("cursor","se-resize");
      });
      $(this).on("mousedown",".resize",function(e){
        var x = event.pageX;
        var y = event.pageY;
        var orix = $(e.target).parent().css("width");
        var originx=orix.slice(0,orix.length-2)*1;
        var oriy = $(e.target).parent().css("height");
        var originy=oriy.slice(0,oriy.length-2)*1;
        $(document).mousemove(function(){
          $("body").css("cursor","se-resize");
          var newx = originx+event.pageX-x;
          var newy = originy+event.pageY-y;
          if(newx<10) newx=10;
          if(newy<10) newy=10;
          $(e.target).parent().css({"width":newx+"px" ,"height":newy+"px"});
          $(e.target).css({"top":(newy-10)+"px","left":(newx-10)+"px"});
          $(e.target).mouseup(function(){
            $("body").css("cursor","default");
            $(document).off();    
          });
        });
      });
    }
  }
  $("#addbox").click(function(){
    var addedbox = document.createElement("div");
    addbox.call(addedbox, true, true);
    $("body").append(addedbox);
  });
  $("#deletebox").click(function(){
    $("body div.added").remove();
  });
/*  $("body").on("dblclick",".added", function(e){
    if(e.target==this) $(e.target).css("background-color","rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
  });

  $("body").on("mousedown",".added .resize",function(e){ 
    var x = event.pageX;
    var y = event.pageY;
    var orix = $(e.target).parent().css("width");
    var originx=orix.slice(0,orix.length-2)*1;
    var oriy = $(e.target).parent().css("height");
    var originy=oriy.slice(0,oriy.length-2)*1;
    $(document).mousemove(function(){
      $("body").css("cursor","se-resize");
      var newx = originx+event.pageX-x;
      var newy = originy+event.pageY-y;
      if(newx<10) newx=10;
      if(newy<10) newy=10;
      $(e.target).parent().css({"width":newx+"px" ,"height":newy+"px"});
      $(e.target).css({"top":(newy-10)+"px","left":(newx-10)+"px"});
      $(e.target).mouseup(function(){
        $("body").css("cursor","default");
        $(document).off();    
      });
    });
  });

  $("body").on("mousedown",".added",function(e){
    if(e.target==this){
    var x = event.pageX;
    var y = event.pageY;
    var orix = $(e.target).css("left");
    var originx=orix.slice(0,orix.length-2)*1;
    var oriy = $(e.target).css("top");
    var originy=oriy.slice(0,oriy.length-2)*1;
    //console.log(e);
    $(document).mousemove(function(){
      $("body").css("cursor","move");
      $(e.target).css({"top":originy+event.pageY-y+"px","left":originx+event.pageX-x+"px"});
      $(e.target).mouseup(function(){
        $("body").css({"cursor":"default"});
        $(document).off();    
      });
    });
    }
  });

  $("body").on("mouseover",".added .resize",function(e){
     $(e.target).css("cursor","se-resize");
  });
  

  $("#addbox").click(function(){
    var addh = Math.floor((Math.random()*100)+200);
    var addw = Math.floor((Math.random()*100)+200);
    $("body").append("<div class = added style=\"top:"+Math.floor((Math.random()*(h-200))+1)+"px;left:"+Math.floor((Math.random()*(w-200))+1)+"px;width:"+addw+"px;height:"+addh+"px\"><div class = resize style=\"top:"+(addh-10)+"px;left:"+(addw-10)+"px\"></div></div>");
  });
  $("#deletebox").click(function(){
    $("body div.added").remove();
  });
*/
});
