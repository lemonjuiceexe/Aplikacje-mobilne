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
        x = rEl.value; y = cEl.value;
        mines = mEl.value;
        for(let i = 0; i < x; i++){
            map[i] = [];
        }
        //Resize canvas
        canvas.width = x * boxSize; 
        canvas.height = y * boxSize;
    },
    generateMap : () => {
        let mineCount = 0;
        while(mineCount < mines){
            let a = Math.floor(Math.random() * x);
            let b = Math.floor(Math.random() * y);
            if(map[a][b] && map[a][b].mine){
                continue;
            }
            map[a][b] = new Box();
            map[a][b].mine = true;
            mineCount++;
        }
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#ff0000";
        console.log(map);
        let i = 0, j = 0;
        for(let drawI = margin; drawI < canvas.getAttribute("height") - (2 * margin) + 1; drawI += boxSize){
            for(let drawJ = margin; drawJ < canvas.getAttribute("width") - (2 * margin) + 1; drawJ += boxSize){
                ctx.strokeRect(drawJ, drawI, boxSize, boxSize);
                if(map[i][j] != undefined && map[i][j].mine){
                    ctx.fillRect(drawJ, drawI, boxSize, boxSize);
                }
            }
            j++;
        }
        i++;
    }
}

sbm.addEventListener("click", () => {
    game.readInput();
    game.generateMap();
});

class Box{
    mine = false;
    hidden = true;
    color = "#ffffff";
}