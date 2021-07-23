import { Map } from './Map';

export function GridDraw(map: Map) {
    var gridScaleInput: HTMLInputElement = document.getElementById("gridScaleInput") as HTMLInputElement;
    //interval pxs on original image size between columns and rows
    var interval: number = parseInt(gridScaleInput.value);
    //if pixels is above max or min it goes to default
    if (interval > parseInt(gridScaleInput.max) /*max amount of pixels defined in html*/|| interval < parseInt(gridScaleInput.min)/*min amount of pixels defined in html*/) {
        //default
        interval = parseInt(gridScaleInput.defaultValue);
    }
    //makes interval look same size with zoom
    interval = (interval/map.originalImageWidth) * map.width;
    map.gridInterval = interval;
    //draws rows
    map.ctx.lineWidth = 3;
    for (var i = 0; i < window.innerWidth + interval; i = i + interval) {
        map.ctx.beginPath();
        map.ctx.moveTo(i + (map.mapXCoordinate % interval),(map.mapYCoordinate % interval));
        map.ctx.lineTo(i + (map.mapXCoordinate % interval), window.innerHeight);
        map.ctx.stroke();
    }
    //draws columns
    for (var i = 0; i < window.innerHeight + interval; i = i + interval) {
        map.ctx.beginPath();
        map.ctx.moveTo(map.mapXCoordinate % interval, i + (map.mapYCoordinate % interval));
        map.ctx.lineTo(window.innerWidth,i + (map.mapYCoordinate % interval));
        map.ctx.stroke();
    }
}