const SPRITE_WIDTH = 92;
const SPRITE_HEIGHT = 185;
const WIDTH = 28;
const SPACING_WIDTH = 10;
function spritePositionToImagePositionForFirstRow(row, col) {
    return {
        x: (WIDTH + col * SPRITE_WIDTH),
        y: (SPACING_WIDTH + row * SPRITE_HEIGHT)
    };
}
function spritePositionToImagePositionForSecondRow(row, col) {
    return {
        x: (WIDTH + col * SPRITE_WIDTH),
        y: (row * SPRITE_HEIGHT)
    };
}
let showMustGoOn = true;
let timeoutResult;
let canvas = document.getElementById("torchCanvas");
canvas.width = SPRITE_WIDTH;
canvas.height = SPRITE_HEIGHT;
let context = canvas.getContext('2d');
let spriteSheetURL = '/torch.png';
let image = new Image();
image.src = spriteSheetURL;
let cycle = [];
// extract all of our frames
for (let i = 0; i < 7; i++) {
    cycle.push(spritePositionToImagePositionForFirstRow(0, i));
}
for (let i = 0; i < 7; i++) {
    cycle.push(spritePositionToImagePositionForSecondRow(1, i));
}
let frameIndex = 0;
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, frame.x, frame.y, SPRITE_WIDTH, SPRITE_HEIGHT, 0, 0, SPRITE_WIDTH, SPRITE_HEIGHT);
    frameIndex += 1;
    setTimeout(() => { requestAnimationFrame(animate); }, 200);
}
image.onload = function () {
    animate();
};
function hideLoadingScreen(contentDivId) {
    clearTimeout(timeoutResult);
    setTimeout(() => {
        let loading = document.getElementById("LoadingScreen");
        document.getElementById(contentDivId).hidden = false;
        if (loading) {
            loading.hidden = true;
        }
        showMustGoOn = false;
    }, 0);
}
function showLoadingScreen(contentDivId) {
    showMustGoOn = true;
    let loading = document.getElementById("LoadingScreen");
    document.getElementById(contentDivId).hidden = true;
    if (loading) {
        loading.hidden = false;
    }
    timeoutResult = setTimeout(() => {
        hideLoadingScreen(contentDivId);
    }, 10000);
}
function removeLoadingScreen() {
    let loading = document.getElementById("LoadingScreen");
    if (loading) {
        loading.remove();
    }
}
//# sourceMappingURL=Sprite.js.map