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

let game = {
    readInput : () => {
        y = rEl.value; x = cEl.value;
        mines = mEl.value;
        x++; y++;
        for(let i = 0; i < y - 1; i++){
            map[i] = [];
            for(let j = 0; j < x - 1; j++){
                map[i][j] = new Box(j, i);
                console.log(map[i][j].neighbours());
            }
        }
        //Resize canvas
        canvas.width = x * boxSize; 
        canvas.height = y * boxSize;
    },
    generateMap : () => {
        //Generate mines
        let mineCount = 0;
        while(mineCount < mines){
            let a = Math.floor(Math.random() * (y - 1));
            let b = Math.floor(Math.random() * (x - 1));
            console.log(a, b);
            if(/*map[a][b] && */map[a][b].mine){
                continue;
            }
            // map[a][b] = new Box();
            map[a][b].mine = true;
            mineCount++;
        }

        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#ff0000";
        console.log(map);

        //Draw the map
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
    }
}

sbm.addEventListener("click", () => {
    game.readInput();
    game.generateMap();
});

class Box{
    constructor(x, y){
        this.boxX = x;
        this.boxY = y;
    }
    mine = false;
    hidden = true;
    color = "#ffffff";

    click = () => {
        hidden = false;

    }
    neighbours = () => {
        //Edge tiles
        if(this.boxX == 0 || this.boxY == 0 || this.boxX == x || this.boxY == y){
            return "edge";
        }
        //Normal tiles
        return "normal"
    }
}