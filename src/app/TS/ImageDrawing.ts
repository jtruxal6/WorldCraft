import { ElementRef } from "@angular/core";
import { GridDraw } from "./GridDraw";
import { Map } from './Map';

/*Refreshes Image taking in new location and zoom*/
export function ImageRefresh(canvas: ElementRef, map: Map): void {
    /*Set the canvas to the size of the window*/
    map.ctx.canvas.width = map.dynamicWidth;
    //account for header height
    map.ctx.canvas.height = map.dynamicHeight;
    console.log("ImageRefresh");
    /*percentage of the canvas of width & height*/
    var adjustedHeightPercentage: number = map.mapImage.height/map.ctx.canvas.height;
    var adjustedWidthPercentage: number = map.mapImage.width/map.ctx.canvas.width;
    
    /*Ratio of image in order to maintain Size*/
    var imageRatio: number = map.mapImage.height/map.mapImage.width;

    /*Canvas ratio*/
    var canvasRatio: number = map.ctx.canvas.width/map.ctx.canvas.height;
    var newMapWidth : number;
    var newMapHeight: number;

    if (adjustedWidthPercentage > adjustedHeightPercentage) {
        /* Size based on width; width percentage greater*/
        newMapWidth = canvas.nativeElement.width;
        newMapHeight = ((canvasRatio) * canvas.nativeElement.height) * imageRatio;
    } else {
        /*size based on height*/
        newMapWidth = (canvas.nativeElement.width / (canvasRatio)) / imageRatio;
        newMapHeight = canvas.nativeElement.height;
    }

    /*Set actual width and height of Image to new to use in other areas*/
    map.width = newMapWidth * map.mapZoomPercX;
    map.height = newMapHeight * map.mapZoomPercY;

    map.ctx.clearRect(0 ,0 , canvas.nativeElement.width, canvas.nativeElement.height);
    map.ctx.drawImage(map.mapImage, Math.floor(map.mapXCoordinate), Math.floor(map.mapYCoordinate), Math.floor(newMapWidth * map.mapZoomPercX), Math.floor(newMapHeight * map.mapZoomPercY));

    //got to do 2nd b/c need to update gridInterval
    GridDraw(map);

    // updates all mapMarkers
    for (var i = 0; i < map.mapMarkers.length; i++) {
       map.mapMarkers[i].update();
    }

    for(var i = 0; i < map.imageObjects.length; i++) {
        map.imageObjects[i].update();
    }
}

/*Zooms in or out*/
export function Zoom(canvas: ElementRef, map: Map, event: WheelEvent): void {
    if (event.deltaY < 0) {
        if (map.mapZoomPercX > 7.9 || map.mapZoomPercY > 7.9) {
            //cant zoom in past 8
            return;
        }
        /*Wheel forward*/
        map.mapZoomPercX += .1;
        map.mapZoomPercY += .1;
        //zoom in on where cursor is
        map.mapXCoordinate -= event.x/10;
        map.mapYCoordinate -= event.y/10;
    } else if (event.deltaY > 0) {
        if (map.mapZoomPercX < .6 || map.mapZoomPercY < .6) {
            //can't zoom out past .5
            return;
        }
        /*wheel backward*/
        map.mapZoomPercX -= .1;
        map.mapZoomPercY -= .1;
        //zoom out on where cursor is
        map.mapXCoordinate += event.x/10;
        map.mapYCoordinate += event.y/10;
    }
    ImageRefresh(canvas, map);
}