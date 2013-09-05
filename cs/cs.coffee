$(document).ready ->
  document.onselectstart = ->
    false
  w = window.innerWidth
  h = window.innerHeight
  class Boxadd
    constructor : (@elem) ->
      addh = Math.floor((Math.random() * 100) + 200)
      addw = Math.floor((Math.random() * 100) + 200)
      #@elem = document.createElement "div"
      @elem.move = true
      @elem.resize = true
      $(@elem).addClass "added"
      $(@elem).css
        top: Math.floor((Math.random() * (h - 200)) + 1) + "px"
        left: Math.floor((Math.random() * (w - 200)) + 1) + "px"
        width: addw + "px"
        height: addh + "px"
        "background-color": "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"
      #@resize = not @resize

      $(@elem).on "dblclick", (e) -> 
        $(e.target).css "background-color", "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")"  if `e.target == this`

      @elem.movefunc = ->
        if this.move
          $(this).on "mousedown.move", (e) ->
            if e.target is this
              x = event.pageX
              y = event.pageY
              orix = $(e.target).css("left")
              originx = orix.slice(0, orix.length - 2) * 1
              oriy = $(e.target).css("top")
              originy = oriy.slice(0, oriy.length - 2) * 1
              $(document).mousemove ->
                $("body").css "cursor", "move"
                $(e.target).css
                  top: originy + event.pageY - y + "px"
                  left: originx + event.pageX - x + "px"

                $(e.target).mouseup ->
                  $("body").css cursor: "default"
                  $(document).off()
            this.move = false

      @elem.resizefunc = ->
        if this.resize
          #console.log this
          orix = $(this).css("width")
          oriy = $(this).css("height")
          #console.log orix+oriy
          originx = orix.slice(0, orix.length-2)*1
          originy = oriy.slice(0, oriy.length-2)*1
          $(this).append "<div class = resize style=\"top:" + (originy - 10) + "px;left:" + (originx - 10) + "px\"></div>"
          $(this).on "mouseover", ".resize", (e) ->
            $(e.target).css "cursor", "se-resize"

          $(this).on "mousedown.resize", ".resize", (e) ->
            x = event.pageX
            y = event.pageY
            orix = $(e.target).parent().css("width")
            originx = orix.slice(0, orix.length - 2) * 1
            oriy = $(e.target).parent().css("height")
            originy = oriy.slice(0, oriy.length - 2) * 1
            $(document).mousemove ->
              $("body").css "cursor", "se-resize"
              newx = originx + event.pageX - x
              newy = originy + event.pageY - y
              newx = 10  if newx < 10
              newy = 10  if newy < 10
              $(e.target).parent().css
                width: newx + "px"
                height: newy + "px"

              $(e.target).css
                top: (newy - 10) + "px"
                left: (newx - 10) + "px"

              $(e.target).mouseup ->
                $("body").css "cursor", "default"
                $(document).off()



          this.resize = false

      @elem.unmovefunc = ->
        unless this.move
          $(this).off "mousedown.move"
          this.move = true

      @elem.unresizefunc = ->
        unless this.resize
          $(this).off "mousedown.resize", ".resize"
          $(this).children(".resize").remove()
          this.resize = true


  $("#addbox").click ->
    box = document.createElement "div"
    addedbox = new Boxadd(box)
    addedbox.elem.movefunc()
    addedbox.elem.resizefunc()
    #console.log addedbox.elem
    $("body").append addedbox.elem
    return

  $("#deletebox").click ->
    $("body div.added").remove()
    return

  $("#deleteonebox").click ->
    #console.log "click"
    $(document).one "mousedown", (e) ->
      console.log e
      $(e.target).remove() if $(e.target).hasClass("added")
      return
    return


  $("#unmovebox").click ->
    $("body div").one "mousedown", (e) ->
      #console.log e
      e.target.unmovefunc()  if $(e.target).hasClass("added")
      return
    return

  $("#unresizebox").click ->
    $("body div").one "mousedown", (e) ->
      e.target.unresizefunc()  if $(e.target).hasClass("added")
      return
    return

  $("#movebox").click ->
    $("body div").one "mousedown", (e) ->
      e.target.movefunc()  if $(e.target).hasClass("added")
      return
    return

  $("#resizebox").click ->
    $("body div").one "mousedown", (e) ->
      e.target.resizefunc()  if $(e.target).hasClass("added")
      return
    return

  return

