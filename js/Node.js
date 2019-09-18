class Node {
    constructor(x, y, walkable, start, end) {
        this.x = x;
        this.y = y;
        this.walkable = walkable;
        this.start = start;
        this.end = end;

        this.gCost = 0;
        this.hCost = 0;

        this.parent = null;

    }
}
