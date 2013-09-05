$(document).ready(function(){
  document.onselectstart=function(){return false;}
  var w=window.innerWidth;
  var h=window.innerHeight;

  function boxadd(move,resize){
    var addh = Math.floor((Math.random()*100)+200);
    var addw = Math.floor((Math.random()*100)+200);
    this.move = !move;
    this.resize = !resize;
    $(this).addClass("added");
    $(this).css({"top":Math.floor((Math.random()*(h-200))+1)+"px",
                "left":Math.floor((Math.random()*(w-200))+1)+"px",
                "width":addw+"px",
                "height":addh+"px",
                "background-color":"rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"});
    $(this).dblclick(function(e){
    if(e.target==this) $(e.target).css("background-color","rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")");
    });
    this.movefunc = function(){
    if(!(this.move)){
      $(this).on("mousedown.move",function(e){
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
      this.move = true;
    }}
    this.resizefunc=function(){
    if(!(this.resize)){
      var orix = $(this).css("width");
      var oriy = $(this).css("height");
      var originx=orix.slice(0,orix.length-2)*1;
      var originy=oriy.slice(0,oriy.length-2)*1;
      $(this).append("<div class = resize style=\"top:"+(originy-10)+"px;left:"+(originx-10)+"px\"></div>");
      $(this).on("mouseover",".resize",function(e){
        $(e.target).css("cursor","se-resize");
      });
      $(this).on("mousedown.resize",".resize",function(e){
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
      this.resize=true;
    }}
    this.movefunc();
    this.resizefunc();
    this.unmovefunc = function(){
    if(this.move){
      $(this).off("mousedown.move");
      this.move = false;
    }}
    this.unresizefunc = function(){
    if(this.resize){
      $(this).off("mousedown.resize",".resize");
      $(this).children(".resize").remove();
      this.resize = false;
    }}
  }

  $("#addbox").click(function(){
    var addedbox = document.createElement("div");
    boxadd.call(addedbox, true, true);
    console.log(addedbox);
    $("body").append(addedbox);
  });
  $("#deletebox").click(function(){
    $("body div.added").remove();
  });
  $("#deleteonebox").click(function(){
    $(document).one("mousedown",function(e){
      console.log(e);
      if($(e.target).hasClass("added")) $(e.target).remove();
    });
  });
  $("#unmovebox").click(function(){
    $(document).one("mousedown",function(e){
      console.log(e);
      if($(e.target).hasClass("added")) e.target.unmovefunc(); 
    });
  });
  $("#unresizebox").click(function(){
    $(document).one("mousedown",function(e){
      if($(e.target).hasClass("added")) e.target.unresizefunc(); 
    });
  });
  $("#movebox").click(function(){
    $(document).one("mousedown",function(e){
      if($(e.target).hasClass("added")) e.target.movefunc(); 
    });
  });
  $("#resizebox").click(function(){
    $(document).one("mousedown",function(e){
      if($(e.target).hasClass("added")) e.target.resizefunc(); 
    });
  });
});
