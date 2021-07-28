import { Component } from '@angular/core';
import { ImageRefresh, Zoom } from '../TS/ImageDrawing';
import { Map } from '../TS/Map';
import { MapMarker } from '../TS/MapMarker';
import { AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import { ImageObject } from '../TS/ImageObject';

@Component({
  selector: 'app-map-builder',
  templateUrl: './map-builder.component.html',
  styleUrls: ['./map-builder.component.css']
})
export class MapBuilderComponent implements AfterViewInit {
  @ViewChild('myCanvas') myNewCanvas: ElementRef;
  mousedown: boolean = false;
  mouseMoved: boolean = false;
  cursorX: number = 0;
  cursorY: number = 0;
  map: Map;
  sideCanvas: Map;
  navOut: boolean = false;
  canvasClicked: boolean = false;
  //for keeping track of frame updates for dragging
  lastUpdate: number = 0;
  gridScaleMax: number = 300;
  gridScaleMin: number = 10;
  gridScaleDefault: number = 200;

  //toggles the sideNav innerHTML
  buttonAppToggle() {
    if (this.navOut) {
      //adds to adjust for navbar coming out
      this.map.dynamicWidthAdjust += document.getElementById("sidenav")!.clientWidth;
      document.getElementById("navButton")!.innerText = ">";
      ImageRefresh(this.myNewCanvas, this.map);
      this.navOut = false;
    } else {
      //subtracts for nav bar going in
      this.map.dynamicWidthAdjust -= document.getElementById("sidenav")!.clientWidth;
      document.getElementById("navButton")!.innerText = "<";
      ImageRefresh(this.myNewCanvas, this.map);
      this.navOut = true;
    }
  }

  //map to diplay on canvas created in ngAfterViewInit() b/c @viewChild only work in there and canvas element is needed
  ngAfterViewInit() {
    this.map = new Map(this.myNewCanvas);
    this.map.mapSRC = "../assets/2dmaptest1.jpg";

    this.map.mapImage.onload = () => {
      this.map.initOriginalImageRatio();
      ImageRefresh(this.myNewCanvas, this.map);
    }
    //gridscaledinput dynamicaly changes grid scale when edited
    document.getElementById("gridScaleInput")!.oninput = () => {
      ImageRefresh(this.myNewCanvas, this.map);
    }
    //first set zoom percentage does not dynamically change it
    document.getElementById("zoomPercentage")!.innerHTML = "zoomPercentage: " + this.map.mapZoomPercX;
    //height of things above canvas
    this.map.dynamicHeightAdjust = -50;
    //width of things to the left of canvas
    this.map.dynamicWidthAdjust = 0;
    //sets variables to allow for drag and click later
    document.addEventListener('mousedown', (event) => {
      this.mousedown = true;
      this.mouseMoved = false;
      this.cursorX = event.pageX;
      this.cursorY = event.pageY;
    });

    //uses mousemove to detect dragging motion by checking if mouse is also clicked
    document.addEventListener('mousemove', (event) => {
      this.mouseMoved = true;
      if (this.mousedown && (event.target == this.map.canvas.nativeElement)) {
        //drag
        this.myNewCanvas.nativeElement.style.cursor = "crosshair";
        
        if ((Math.abs(this.cursorX - event.pageX) > 1 /*minimum x movement required*/|| Math.abs(this.cursorY - event.pageY) > 1/*minimum y movement required*/)
        && (Date.now() - this.lastUpdate) > 5 /*minimum miliseconds? to pass between frame update*/|| (Date.now() - this.lastUpdate) < 0/*because last update on init = 0*/) {
          this.map.mapXCoordinate += (event.pageX - this.cursorX); /*bigger number means moves slower*/
          this.map.mapYCoordinate += (event.pageY - this.cursorY); /*bigger number means moves slower*/
          ImageRefresh(this.myNewCanvas, this.map);
          this.lastUpdate = Date.now();
        }
        this.cursorX = event.pageX;
        this.cursorY = event.pageY;
      }
    });

    //detects unclick or mouseup resets variables for drag and differentiates between drag and click here
    document.addEventListener('mouseup', (event) => {
      if (!this.mouseMoved && (event.target == this.map.canvas.nativeElement)) {
        //click
        // var newMarker: MapMarker = new MapMarker(event.pageX, event.pageY, this.map, 50, 50);
        // newMarker.src = "../assets/test.png";
        // this.map.addMapMarker(newMarker);
        // document.getElementById("sideNavContent")!.appendChild(newMarker.image);
        console.log("click");
        var newMarker: ImageObject = new ImageObject(this.map.gridInterval, this.map.gridInterval, this.map, event.pageX, event.pageY);
        newMarker.src = "../../assets/2dmaptest.png";
        this.map.imageObjects.push(newMarker);
      } 
      this.myNewCanvas.nativeElement.style.cursor = "auto";
      this.mousedown = false;
      this.mouseMoved = false;
      this.canvasClicked = false;
      ImageRefresh(this.myNewCanvas, this.map);
    });
    
    //detects the middle mouse button moving
    document.onwheel = (event) => {
      Zoom(this.myNewCanvas, this.map, event);
      //dynamically changes zoom percentage <p>
      document.getElementById("zoomPercentage")!.innerHTML = "zoomPercentage: " + ((Math.round(this.map.mapZoomPercX * 10))/10);
    }

    //detecs window resize
    window.onresize = () => {
      ImageRefresh(this.myNewCanvas, this.map);
    }
  }

}
