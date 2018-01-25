import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';


import { UserService } from '../shared';
declare var $: any;
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  ],

})
export class HomeComponent implements OnInit {
  imgags: string[];

  public carouselBannerItems: Array<any> = [];
  public carouselBanner: NgxCarousel;
  

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  isAuthenticated: boolean;

  tags: Array<string> = [];
  tagsLoaded = false;


  ngOnInit() {
    this.imgags = [
      '../../assets/images/slide_1.jpg',
      '../../assets/images/slide_2.jpg',
      '../../assets/images/slide_3.jpg',
      '../../assets/images/slide_4.jpg'
    ];
   
    this.carouselBanner = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 4,
      speed: 500,
      interval: 5000,
      point: {
        visible: true,
        pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              width: 10px;
          }
        `
      },
      load: 2,
      touch: true,
      loop: false,
      easing: 'cubic-bezier(0, 0, 0.2, 1)',
      animation:"lazy"
    };


    this.carouselBannerLoad();

  }

  onmoveFn(data) {
    // console.log(data);
  }

  public carouselBannerLoad() {
    const len = this.carouselBannerItems.length;
    if (len <= 4) {
      for (let i = len; i < len + 5; i++) {
        this.carouselBannerItems.push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }
  }
}
