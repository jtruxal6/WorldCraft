import { AfterViewInit, Component, ComponentFactoryResolver, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.css']
})
export class SidenavContentComponent implements AfterViewInit {
  @ViewChild('sideNavCanvas') canvas: ElementRef;
  @ViewChild('sidenav') sideNav: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.sideNav.nativeElement.style.width);
    this.canvas.nativeElement.style.width = this.sideNav.nativeElement.style.width + "px";
    this.canvas.nativeElement.style.height = this.sideNav.nativeElement.style.height + "px";
    this.canvas.nativeElement.style.backgroundColor = "black";
  }
}
