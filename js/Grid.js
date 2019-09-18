var scale = 20;
var grid = [];
var startNodeIndex_X = 3;
var startNodeIndex_Y = 6;
var endNodeIndex_X = 50;
var endNodeIndex_Y = 40;
var gridSizeX = 1920;
var gridSizeY = 930;

var colorBlock = "#3b3b3b";
var colorStart = "#1f992c";
var colorEnd = "#8a1515";
var colorGrid = "#486503";
var colorPath = "#93dbff";
var colorSerch = "rgb(212, 212, 212)";
var colorText = "rgb(255, 0, 214)";

// on load page
document.addEventListener('DOMContentLoaded', function() {
    RefreshGrid();
}, false);

// add node
function addNode(x, y, walkable, start, end){
    var p = new Node(x, y, walkable, start, end, 0, 0);
    grid.push(p);
}

// change NodeWalkable
function ToggleWalkable(x,y, walkable){
    if(startNodeIndex_X == x && startNodeIndex_Y == y || endNodeIndex_X == x && endNodeIndex_Y == y){
        return;
    }
    var index = findIndexOfNode(x,y);
    grid[index].walkable = walkable;
    DrawGrid();
    SetmsgText("Ready");
}

// find node by cord, then return index
function findIndexOfNode(x,y){
    var i;
    var found = false;
    for (var i = 0; i < grid.length; i++) {
        if(grid[i].x == x && grid[i].y == y){
            found = true;
            break;
        }
    }
    if(found){
        return i;
    } else {
        return -1;
    }
}

//CreateGrid
function CreateGrid(Gridx, Gridy, scale){
    var i = 0;
    for (var x = 0; x < Gridx; x++) {
        for (var y = 0; y < Gridy; y++) {
            if(x == startNodeIndex_X && y == startNodeIndex_Y){
                addNode(x,y,true,true,false);
            } else if (x == endNodeIndex_X && y == endNodeIndex_Y) {
                addNode(x,y,true,false,true);
            } else {
                addNode(x,y,true,false,false);
            }
            i++;
        }
        i++;
    }
    DrawGrid();
}

// DrawGrid
function DrawGrid(){
    var myCanvas = document.getElementById("canvas");
    var ctx = myCanvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for (var i = 0; i < grid.length; i++) {
        if(!grid[i].start && !grid[i].end && grid[i].walkable){
            ctx.fillStyle = colorGrid;
            ctx.lineWidth = 0.2;
            ctx.strokeRect(grid[i].x*scale, grid[i].y*scale, scale, scale);

        } else if (grid[i].start) {
            ctx.fillStyle = colorStart;
            ctx.lineWidth = 0;
            ctx.fillRect(grid[i].x*scale, grid[i].y*scale, scale, scale);

        } else if (grid[i].end) {
            ctx.fillStyle = colorEnd;
            ctx.lineWidth = 0;
            ctx.fillRect(grid[i].x*scale, grid[i].y*scale, scale, scale);

        } else if (!grid[i].walkable) {
            ctx.fillStyle = colorBlock;
            ctx.lineWidth = 0;
            ctx.fillRect(grid[i].x*scale, grid[i].y*scale, scale, scale);
        }
    }
    ctx.fill();
    ctx.closePath();

}

function DrawPath(node, color){
    //just to make sure they not being overwriten
    if(node.start || node.end){
        return;
    }
    // else draw
    var myCanvas = document.getElementById("canvas");
    var ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.lineWidth = 0;
    ctx.fillRect(node.x*scale, node.y*scale, scale, scale);
    //ctx.fillStyle = colorText;
    //AddTextToNode(ctx, node.gCost + node.hCost, node.x*scale, node.y*scale)
    ctx.fill();
    ctx.closePath();
}

function RefreshGrid(){
    loading = true;
    grid = []
    CreateGrid(gridSizeX/scale, gridSizeY/scale, scale)
    loading = false;
}
