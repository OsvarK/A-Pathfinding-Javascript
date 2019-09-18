var openNodes = [];
var closedNodes = [];
var loading = false;
var foundPath = false;
var delay = false;

function FindPath(){
    if(paintId != 1 || loading) {
        return;
    }
    // set msgtext
    SetmsgText("Calculating...");
    // diable btn
    disableAllMenu(true);
    // reset
    DrawGrid();
    foundPath = false;
    openNodes = [];
    closedNodes = [];
    // enable loading
    loading = true;
    // start the pathfinding
    var startNode = grid[findIndexOfNode(startNodeIndex_X, startNodeIndex_Y)];
    var endNode = grid[findIndexOfNode(endNodeIndex_X, endNodeIndex_Y)];
    openNodes.push(startNode);
    // foreach node
    if(delay){

        function nextFrame() {
            if(0 < openNodes.length && foundPath == false) {

                pathintervall(startNode,endNode);
                // Continue the loop in 3s
                setTimeout(nextFrame, 4);
            } else if (0 == openNodes.length) {
                setTimeout(ErrorFindingPath, 4);
            }

        }
        // Start the loop
        setTimeout(nextFrame, 0);
    } else {
        while (0 < openNodes.length && foundPath == false) {
            pathintervall(startNode,endNode);
        }
        if(0 == openNodes.length) {
            setTimeout(ErrorFindingPath, 4);
        }
    }

}

function ErrorFindingPath(){
    disableAllMenu(false);
    SetmsgText("Not able to find a path between targets");
}

function pathintervall(startNode,endNode){
    var currentNode = openNodes[0];
     for (var i = 1; i < openNodes.length; i++) {
         var OpenfCost = openNodes[i].hCost + openNodes[i].gCost;
         var currentfCost = currentNode.hCost + currentNode.gCost;

         if(OpenfCost < currentfCost || OpenfCost == currentfCost && openNodes[i].hCost < currentNode.hCost){
             currentNode = openNodes[i];
         }

     }
     openNodes.splice( openNodes.indexOf(currentNode), 1 );
     closedNodes.push(currentNode);

    // on Succes
    if(currentNode == endNode) {
        SetmsgText("Succes");
        foundPath = true;
        Retrace(startNode,endNode);
        return;
    }
    // check neighbours
    let neighbours = GetNeighbours(currentNode);
    //console.log(neighbours);
    for (var i = 0; i < neighbours.length; i++) {
        if(neighbours[i] == undefined || !neighbours[i].walkable || closedNodes.includes(neighbours[i])) {
            continue;
        }
        DrawPath(neighbours[i], colorSerch); // draw gui
        let newMoveCost = currentNode.gCost  + GetDistance(currentNode, neighbours[i]);
        if(newMoveCost < neighbours[i].gCost || !openNodes.includes(neighbours[i])){
            neighbours[i].gCost = newMoveCost;
            neighbours[i].hCost = GetDistance(neighbours[i], endNode);
            neighbours[i].parent = currentNode;
            if(!openNodes.includes(neighbours[i])){
                openNodes.push(neighbours[i]);
            }

        }

    }
}

function Retrace(start,end){
    let path = [];
    let currentNode = end;

    while (currentNode != start) {
        path.push(currentNode);
        currentNode = currentNode.parent;
        DrawPath(currentNode, colorPath);
    }
    path.reverse();

    // reset, to be able to rerun
    loading = false;
    disableAllMenu(false);
    SetmsgText("Ready");
}

// GetNeighbours around a node
function GetNeighbours(node){
    let Neighbours = [];
    for (var x = -1; x <= 1; x++) {
        for (var y = -1; y <= 1; y++) {
            if(x == 0 && y == 0){
                continue;
            }
            let checkX = node.x + x;
            let checkY = node.y + y;

            if(checkX >= 0 && checkX < gridSizeX && checkY >= 0 && checkY < gridSizeY){
                let index = findIndexOfNode(checkX,checkY);
                Neighbours.push(grid[index]);
            }
        }
    }

    return Neighbours;
}

//Get distance
function GetDistance(nodeA,nodeB){
    let dstX = Math.abs(nodeA.x - nodeB.x);
    let dstY = Math.abs(nodeA.y - nodeB.y);

    if(dstX > dstY){
        return 14*dstY + 10 * (dstX-dstY);
    } else {
        return 14*dstX + 10 * (dstY-dstX);
    }
}
