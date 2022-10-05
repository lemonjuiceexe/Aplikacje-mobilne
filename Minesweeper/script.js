const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const rEl = document.querySelector("#rows");
const cEl = document.querySelector("#cols");
const mEl = document.querySelector("#mines");
const sbm = document.querySelector("button");

const margin = 10;
const boxSize = 20;

let x, y;
let mines;
let map = [];
// let minesArray = [];
let mineNeighbours = [];
let allTiles = [];

let game = {
    //Variables and consts
    colors : { 
        "hidden" : "#fff",
        "border" : "#1a1a1a",
        "revealed" : "#2891fa",
        "mine" : "#fa285c",
        "mine-neighbour" : "#ffa142",
    },

    //Functions
    clearVars : () => { 
        map.length = 0;
        mineNeighbours.length = 0;
        allTiles.length = 0;
        console.log("usuwam piwo");
    },

    //TODO: Validate input (mines < rows * cols)
    readInput : () => {
        y = rEl.value; x = cEl.value;
        mines = mEl.value;
        x++; y++;
        for(let i = 0; i < y - 1; i++){
            map[i] = [];
            for(let j = 0; j < x - 1; j++){
                map[i][j] = new Box(j, i);
            }
        }
        //Resize canvas
        canvas.width = x * boxSize; 
        canvas.height = y * boxSize;
    },
    generateMap : () => {
        allTiles = [].concat(...map);
        //Generate mines
        let mineCount = 0;
        while(mineCount < mines){
            let a = Math.floor(Math.random() * (y - 1));
            let b = Math.floor(Math.random() * (x - 1));
            if(/*map[a][b] && */map[a][b].mine){
                continue;
            }
            // map[a][b] = new Box();
            map[a][b].mine = true;
            mineCount++;
            // console.log(map[a][b].neighbours());
            // minesArray.push(map[a][b]);
            map[a][b].neighbours().forEach(el => { console.log("dodaje piwo"); mineNeighbours.push(el); });
        }
        //Draw the map
        //Background
        ctx.fillStyle = game.colors.hidden;
        ctx.fillRect(0 + margin, 0 + margin, canvas.width - 2 * margin, canvas.height - 2 * margin);
        //Borders and mines
        ctx.strokeStyle = game.colors.border;
        ctx.fillStyle = game.colors.mine;
        let i = 0, j = 0;
        for(let drawI = margin; drawI < canvas.getAttribute("height") - (2 * margin) + 1; drawI += boxSize){
            for(let drawJ = margin; drawJ < canvas.getAttribute("width") - (2 * margin) + 1; drawJ += boxSize){
                ctx.strokeRect(drawJ, drawI, boxSize, boxSize);
                if(/*map[i][j] != undefined && */map[i][j].mine){
                    ctx.fillRect(drawJ, drawI, boxSize, boxSize);
                }
                j++;
            }
            j = 0;
            i++;
        }
        //
        for(let i = 0; i < mineNeighbours.length; i++){
            console.log("kocham piwo");
            mineNeighbours[i].color(game.colors["mine-neighbour"]);
        }
        
    }
}

//Submit button
sbm.addEventListener("click", () => {
    game.clearVars();
    game.readInput();
    game.generateMap();
});
//Clicking on canvas
canvas.addEventListener("click", (e) => {
    let x = Math.floor((e.offsetX - margin) / boxSize);
    let y = Math.floor((e.offsetY - margin) / boxSize);
    console.log(x, y);
    
    map[y][x].click();
    // When mine clicked
    if(map[y][x].mine){
        alert("Game Over");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    else{
        map[y][x].revealNeighbours();
    }
});

class Box{
    constructor(x, y){
        this.boxX = x;
        this.boxY = y;
        this.hidden = true;
    }
    mine = false;
    colorHex = "#ffffff";

    color = (c) => {
        this.colorHex = c;
        ctx.fillStyle = c;
        ctx.fillRect(this.boxX * boxSize + margin, this.boxY * boxSize + margin, boxSize, boxSize);
    }

    click = () => {
        this.hidden = false;
        this.color(game.colors.revealed);
    }

    revealNeighbours = () => {
        let neighbouring = this.neighbours()/*.filter(box => !box.mine)*/;
        
        // neighbouring = neighbouring.filter(box => !mineNeighbours.includes(box));
        // console.log(mineNeighbours);
        if(neighbouring.count == 0 || neighbouring.includes(box => box.mine)){
            return;
        }
        // console.log(neighbouring);
        neighbouring.forEach((box) => {
            let tempColor = (box.neighbours().includes(neighbour => neighbour.mine ? game.colors["mine-neighbour"] : game.colors.revealed));
            box.hidden = false;
            box.color(tempColor);
            if(!box.neighbours().includes(neighbour => neighbour.mine)){
                box.revealNeighbours();
            }
        });
        
        return "normal";
    }

    //Return the eight neighbouring boxes
    neighbours() {
        return allTiles.filter((box) => {
                    //Not yet revealed and not the same box
            return box.hidden && !(box.boxX == this.boxX && box.boxY == this.boxY)
                //Tiles neighbouring by x
                && ((box.boxX == this.boxX - 1 || box.boxX == this.boxX || box.boxX == this.boxX + 1)
                    //Tiles neighbouring by y
                    && (box.boxY == this.boxY - 1 || box.boxY == this.boxY || box.boxY == this.boxY + 1));
        });
    }
}