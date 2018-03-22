import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, Renderer } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackingService } from '../shared';
import { TrackingRequest, Tracking } from '../shared/models';
import { error } from 'util';
import { MouseEvent } from '@agm/core';
// import * as $ from ‘query’;
declare var jquery: any;   // not required
declare var $: any;



import { UserService } from '../shared';
import { ElementDef } from '@angular/core/src/view';
import { empty } from 'rxjs/observable/empty';
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  ],

})
export class HomeComponent implements OnInit, AfterViewInit {
  private offSet: number;
  isSubmitting = false;
  numberSlide = 1;
  link : string;
  constructor(
    private trackingService: TrackingService,
    private router: Router
  ) {
  }
  ngOnInit() {

  }

  ngAfterViewInit() {
    var _this = this;
    $('.carousel').carousel({
      interval: 2000
    })
    $('.carousel').on('slide.bs.carousel', function () {
      var ele = $('.carousel .carousel-indicators li.active');
      _this.numberSlide = ele.data('slideTo');
      //console.log(_this.numberSlide)
    })
  }

  checkExistTracking(){
    if (this.trackingModel.tracking =="" || this.trackingModel.tracking == undefined){
        return false;
    }
    return true;
  }

  checkExistDeleveryDate(){
    if (this.trackingModel.delivery_date == null || this.trackingModel.delivery_date == undefined) {
      return false;
    }
    return true;
  }

  redirectToDHL(){
    this.link = "http://www.dhl.com.vn/vi/express/tracking.html?AWB=" + this.trackingModel.tracking + "&brand=DHL";
    window.open(this.link,'_blank');
  }

  model = new TrackingRequest();
  trackingModel = new Tracking();
  mapTracking(values: Object) {
    (<any>Object).assign(this.trackingModel, values);
  }

  onSubmit() {
    var error;
    
    if (this.model.bill == '' || this.model.bill == undefined) {
      window.alert("Must to enter the tracking number!!!")
    } else {
      this.trackingService.getTrackingByNumber(this.model).subscribe(
        response => {
          this.mapTracking(response);
          this.isSubmitting = true;
          this.smoothScroll('examples');
        },
        err => {
          if (err != undefined) {
              window.alert(err.statusText);
              this.isSubmitting = false;
          }
        }
      )
    }
  }

  scrollTo(yPoint: number, duration: number) {
    setTimeout(() => {
      window.scrollTo(0, yPoint)
    }, duration);
    return;
  }
  smoothScroll(eID) {
    var startY = this.currentYPosition();
    var stopY = this.elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      window.scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 300);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 100);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        this.scrollTo(leapY, timer * speed);
        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
      } return;
    }
    for (var i = startY; i > stopY; i -= step) {
      this.scrollTo(leapY, timer * speed);
      leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
  }
  currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }
  elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = <HTMLScriptElement>node.offsetParent;
      y += node.offsetTop;
    } return y;
  }

  // google maps zoom level
  zoom: number = 8;

  // initial center position for the map
  lat: number = 10.9139167;
  lng: number = 106.6924842;

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  markers: marker[] = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: 'A',
      draggable: true
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: 'B',
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: 'C',
      draggable: true
    }
  ]

}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
