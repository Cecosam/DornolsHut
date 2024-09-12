const SPRITE_WIDTH: number = 92;
const SPRITE_HEIGHT: number = 185;
const WIDTH: number = 28;
const SPACING_WIDTH: number = 10;

function spritePositionToImagePositionForFirstRow(row: number, col: number) {
    return {
        x: (
            WIDTH + col * SPRITE_WIDTH
        ),
        y: (
            SPACING_WIDTH + row * SPRITE_HEIGHT
        )
    }
}

function spritePositionToImagePositionForSecondRow(row: number, col: number) {
    return {
        x: (
            WIDTH + col * SPRITE_WIDTH
        ),
        y: (
            row * SPRITE_HEIGHT
        )
    }
}

let showMustGoOn = true;
let timeoutResult: number;
let canvas: HTMLCanvasElement = document.getElementById("torchCanvas") as HTMLCanvasElement;
canvas.width = SPRITE_WIDTH;
canvas.height = SPRITE_HEIGHT;
let context: CanvasRenderingContext2D = canvas.getContext('2d');

let spriteSheetURL: string = '/torch.png';
let image: HTMLImageElement = new Image();
image.src = spriteSheetURL;
let cycle = [];
// extract all of our frames
for (let i = 0; i < 7; i++) {
    cycle.push(spritePositionToImagePositionForFirstRow(0, i));
}
for (let i = 0; i < 7; i++) {
    cycle.push(spritePositionToImagePositionForSecondRow(1, i));
}
let frameIndex: number = 0;
let frame;
function animate() {
    if (false == showMustGoOn) {
        setTimeout(animate, 200);
        return;
    }       
    
    if (frameIndex === cycle.length) {
        frameIndex = 0;
    }
    frame = cycle[frameIndex];
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    context.drawImage(
        image,
        frame.x,
        frame.y,
        SPRITE_WIDTH,
        SPRITE_HEIGHT,
        0,
        0,
        SPRITE_WIDTH,
        SPRITE_HEIGHT
    );
    frameIndex += 1;
    setTimeout(() => { requestAnimationFrame(animate) },200);
}

image.onload = function () {
    animate();
};

function hideLoadingScreen(contentDivId: string) {   
    clearTimeout(timeoutResult);
    setTimeout(() => {
        let loading: HTMLElement = document.getElementById("LoadingScreen");
        document.getElementById(contentDivId).hidden = false;
        if (loading) {
            loading.hidden = true;
        }
        showMustGoOn = false;
    }, 0);
}

function showLoadingScreen(contentDivId: string) {
    showMustGoOn = true;
    let loading: HTMLElement = document.getElementById("LoadingScreen");
    document.getElementById(contentDivId).hidden = true;
    if (loading) {
        loading.hidden = false;
    }

    timeoutResult = setTimeout(() => {
        hideLoadingScreen(contentDivId);
    }, 10000);
}

function removeLoadingScreen() {
    let loading: HTMLElement = document.getElementById("LoadingScreen");
    if (loading) {
        loading.remove();
    }
}

