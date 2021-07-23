import { Map } from "./Map";

//represents a marker on a map
export class MapMarker {
    private _xCoord: number = 0;
    private _yCoord: number = 0;
    private _percOfMapX: number = 0;
    private _percOfMapY: number = 0;
    private _image: HTMLImageElement;
    private _map: Map;
    private _initX: number;
    private _inity: number;
    private _initxPercOfMap: number;
    private _inityPercOfMap: number;

    constructor(xCoord: number, yCoord: number, map: Map, width: number, height: number) {
        this._image = new Image();
        this._image.className = "mapMarker";
        this._map = map;
        /*centers coordinatres based on where map is taking care of top and side panel; pushes it right and down*/
        this._xCoord = xCoord + this._map.dynamicWidthAdjust;
        this._yCoord = yCoord + this._map.dynamicHeightAdjust;
        this._percOfMapX = this._xCoord/this._map.width;
        this._percOfMapY = this._yCoord/this._map.height;
        this._initX = map.mapXCoordinate;
        this._inity = map.mapYCoordinate;
        this._initxPercOfMap = this._initX/this._map.width;
        this._inityPercOfMap = this._inity/this._map.height;

        //setup image
        this._image.style.zIndex = "1";
        this._image.style.position = "absolute";
        this._image.style.width = width + "px";
        this._image.style.height = height + "px";
        this._image.draggable = false;
        this.update();
    }

    //updates the location of mapMarker
    update() {
        this._image.style.left = (((this._percOfMapX - this._initxPercOfMap) * this._map.width) + this._map.mapXCoordinate - 25)  + "px";
        this._image.style.top = (((this._percOfMapY - this._inityPercOfMap) * this._map.height) + this._map.mapYCoordinate - 50) + "px";
    }

    set percOfMapX(newPercOfMapX: number) {
        this._percOfMapX = newPercOfMapX;
    }

    get percOfMapX() {
        return this._percOfMapX;
    }

    set percOfMapY(newPercOfMapY: number) {
        this._percOfMapY = newPercOfMapY;
    }

    get percOfMapY() {
        return this._percOfMapY;
    }

    set xCoord(newXCoord: number) {
        this._xCoord = newXCoord;
    }

    get xCoord() {
        return this._xCoord;
    }

    set yCoord(newYCoord: number) {
        this._yCoord = newYCoord;
    }

    get yCoord() {
        return this._yCoord;
    }

    set src(newSRC: string) {
        this._image.src = newSRC;
    }

    get image() {
        return this._image;
    }
}