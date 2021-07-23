import { ElementRef } from "@angular/core";
import { ImageObject } from "./ImageObject";
import { MapMarker } from "./MapMarker";

//Represents a moveable map with mapMarkers on it
export class Map {
    private _mapXCoordinate: number = 0;
    private _mapYCoordinate: number = 0;
    private _mapImage: HTMLImageElement;
    private _mapMarkers: MapMarker[] = [];
    private _imageObjects: ImageObject[] = [];
    //width extra zoom %
    private _mapZoomPercX: number = 1;
    //height extra zoom %
    private _mapZoomPercY: number = 1;
    private _originalImageRatio: number = 0;
    private _originalImageHeight: number = 0;
    private _originalImageWidth: number = 0;
    private _canvas: ElementRef;
    private _ctx: CanvasRenderingContext2D;
    private _width: number = 0;
    private _height: number = 0;
    private _dynamicWidth: number = 0;
    private _dynamicHeight: number = 0;
    private _dynamicWidthAdjust: number = 0;
    private _dynamicHeightAdjust: number = 0;
    private _gridInterval: number = 0;

    constructor(canvas: ElementRef) {
        this._mapImage = new Image();
        this._canvas = canvas;
        this._ctx = canvas.nativeElement.getContext("2d");
    }

    get imageObjects() {
        return this._imageObjects;
    }

    get gridInterval() {
        return this._gridInterval;
    }

    set gridInterval(newInterval: number) {
        this._gridInterval = newInterval;
    }

    get originalImageHeight() {
        return this._originalImageHeight;
    }

    get originalImageWidth() {
        return this._originalImageWidth
    }

    get dynamicHeightAdjust() {
        return this._dynamicHeightAdjust;
    }

    get dynamicWidthAdjust() {
        return this._dynamicWidthAdjust;
    }

    set dynamicWidthAdjust(newWidthAdjust: number) {
        this._dynamicWidthAdjust = newWidthAdjust;
    }

    set dynamicHeightAdjust(newHeightAdjust: number) {
        this._dynamicHeightAdjust = newHeightAdjust;
    }

    get dynamicWidth() {
        this._dynamicWidth = window.innerWidth + this._dynamicWidthAdjust;
        return this._dynamicWidth;
    }

    get dynamicHeight() {
        this._dynamicHeight = window.innerHeight + this._dynamicHeightAdjust;
        return this._dynamicHeight;
    }

    get height() {
        return this._height;
    }

    set height(newHeight: number) {
        this._height = newHeight;
    }

    get width() {
        return this._width;
    }

    set width(newWidth: number) {
        this._width = newWidth;
    }

    get ctx() {
        return this._ctx;
    }

    get canvas() {
        return this._canvas;
    }

    set mapXCoordinate(newMapX: number) {
        this._mapXCoordinate = newMapX;
    }

    get mapXCoordinate() {
        return this._mapXCoordinate;
    }

    set mapYCoordinate(newMapY: number) {
        this._mapYCoordinate = newMapY;
    }

    get mapYCoordinate() {
        return this._mapYCoordinate;
    }

    get mapImage() {
        return this._mapImage;
    }

    set mapSRC(src: string) {
        this._mapImage.src = src;
    }

    //adds mapMarker to the map therefore identifying mapmarker with this map instance
    addMapMarker(newMapMarker: MapMarker): void {
        this._mapMarkers.push(newMapMarker);
    }

    get mapMarkers() {
        return this._mapMarkers;
    }

    get mapZoomPercX() {
        return this._mapZoomPercX;
    }

    set mapZoomPercX(newZoomPercX: number) {
        this._mapZoomPercX = newZoomPercX;
    }

    get mapZoomPercY() {
        return this._mapZoomPercY;
    }

    set mapZoomPercY(newZoomPercY: number) {
        this._mapZoomPercY = newZoomPercY;
    }

    get originalImageRatio() {
        return this._originalImageRatio;
    }

    //have to wait until image src is set therefore cannot do in constructor and must call seperatly
    initOriginalImageRatio() {
        this._originalImageRatio = this._mapImage.height * this._mapImage.width;
        this._originalImageHeight = this._mapImage.height;
        this._originalImageWidth = this._mapImage.width;
    }
}