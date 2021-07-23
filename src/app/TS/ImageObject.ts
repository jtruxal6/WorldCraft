import { Map } from './Map';

export class ImageObject {
    private _image: HTMLImageElement;
    private _width: number;
    private _height: number;
    private _map: Map;
    private _xCoord: number;
    private _yCoord: number;
    private _percOfMapX: number;
    private _percOfMapY: number;
    private _initX: number;
    private _inity: number;
    private _gridInterval: number;
    private _initGridInterval: number;

    constructor(width: number, height: number, map: Map, xCoord: number, yCoord: number) {
        this._image = new Image();
        this._width = width;
        this._height = height;
        this._map = map;

        this._initGridInterval = parseInt((document.getElementById("gridScaleInput") as HTMLInputElement).value);
        this._gridInterval = this.map.gridInterval;
        this._initX = map.mapXCoordinate;
        this._inity = map.mapYCoordinate;
        this._xCoord = this._gridInterval * (Math.floor((xCoord + this.map.dynamicWidthAdjust - this._initX) / this._gridInterval));
        this._yCoord = this._gridInterval * (Math.floor((yCoord + this.map.dynamicHeightAdjust - this._inity) / this._gridInterval));

        this._percOfMapX = this._xCoord/this._map.width;
        this._percOfMapY = this._yCoord/this._map.height;

        //setup image
        this._image.style.zIndex = "1";
        this._image.style.position = "absolute";
        this._image.style.width = width + "px";
        this._image.style.height = height + "px";
        this._image.draggable = false;
    }

    update() {
        //calculates girdInterval here so that the size does not change when grid is changed dynamicallyw
        this.map.ctx.drawImage(this._image, ((this._percOfMapX) * this._map.width) + this._map.mapXCoordinate,
        ((this._percOfMapY) * this._map.height) + this._map.mapYCoordinate, (this._initGridInterval/this.map.originalImageWidth) * this.map.width, (this._initGridInterval/this.map.originalImageWidth) * this.map.width);
    }

    set src(newSRC: string) {
        this._image.src = newSRC;
    }

    set width(newWidth: number) {
        this._width = newWidth;
    }

    get width() {
        return this._width;
    }

    set height(newHeight: number) {
        this._height = newHeight;
    }

    get height() {
        return this._height;
    }

    get map() {
        return this._map;
    }
}