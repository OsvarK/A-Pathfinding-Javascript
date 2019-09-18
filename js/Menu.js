var mouseDown = false;
var shiftKeyDown = null;
var paintId = 1;

document.body.onmousedown = function() {
    mouseDown = true;
}
document.body.onmouseup = function() {
    mouseDown = false;
}

function disableAllMenu(bool){
    document.getElementById("findpathbtn").disabled = bool;
    document.getElementById("CheckSlow").disabled = bool;
    document.getElementById("RefreshGridBtn").disabled = bool;
}

// track mouse
function mouse_position(e)
{
    var x = Math.floor(e.screenX/scale)
    var y = Math.floor(e.screenY/scale -5) // -5 need to be done.
    MouseCordToText(x,y);
    if(paintId == 2){
        moveStart(x,y);
    } else if (paintId == 3) {
        moveEnd(x,y);
    } else {
        paint(x,y,false);
    }
}

function SetmsgText(msg){
    var text = document.getElementById("msg");
    text.text = msg;
}

function moveStart(x,y){
    SetmsgText("Not Ready");
    var index = findIndexOfNode(startNodeIndex_X,startNodeIndex_Y);
    if(x == endNodeIndex_X & y == endNodeIndex_Y){
        return;
    }
    grid[index].start = false;
    var index = findIndexOfNode(x,y);
    grid[index].start = true;
    startNodeIndex_X = x;
    startNodeIndex_Y = y;
    DrawGrid();
}

function moveEnd(x,y){
    SetmsgText("Not Ready");
    var index = findIndexOfNode(endNodeIndex_X,endNodeIndex_Y);
    if(x == startNodeIndex_X & y == startNodeIndex_Y){
        return;
    }
    grid[index].end = false;
    var index = findIndexOfNode(x,y);
    grid[index].end = true;
    endNodeIndex_X = x;
    endNodeIndex_Y = y;
    DrawGrid();
}

function swapDelay() {
  var checkBox = document.getElementById("CheckSlow");
  if (checkBox.checked == true){
    delay = true;
  } else {
    delay = false;
  }
}

function mouseclick(e) {
    var x = Math.floor(e.screenX/scale)
    var y = Math.floor(e.screenY/scale -5)
    var index = findIndexOfNode(x,y);

    if(x == startNodeIndex_X && y == startNodeIndex_Y && paintId == 1) {
        paintId = 2;

    } else if (x == endNodeIndex_X && y == endNodeIndex_Y && paintId == 1) {
        paintId = 3;


    } else if(paintId == 2 || paintId == 3) {
        paintId = 1;
        if(grid[index].start || grid[index].end){
            grid[index].walkable = true;
        }

    } else if(paintId == 1) {
        paint(x,y,false);
    }
    SetmsgText("Ready");
}

// update ui
function MouseCordToText(x,y){
    var m = document.getElementById("mouseCord");
    m.text = "X:"+ x + " / Y:" + y;
}

function paint(x,y,forcePaint){
    if(forcePaint || mouseDown){
        if(paintId == 1 && shiftKeyDown){
            ToggleWalkable(x, y, true);
        } else if (paintId == 1 && !shiftKeyDown) {
            ToggleWalkable(x, y, false);
        }
    }
}

function Shift(event) {
  if (event.shiftKey) {
    shiftKeyDown = true;
  } else {
    shiftKeyDown = false;
  }
}
