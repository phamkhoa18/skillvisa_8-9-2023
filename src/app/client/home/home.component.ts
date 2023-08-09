import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import AOS from 'aos'; //AOS - 1
import { ApiService } from '../services/api.service';
declare const $: any ;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  listnew : any = [] ;
  number_university = 0 ;
  number_ex = 0 ;
  number_student = 0 ;
  number_sati = 0 ;

  constructor(private viewportScroller : ViewportScroller , public api : ApiService) {
      this.getdata();

      setInterval(() => {
          this.number_university ++ ;
          this.number_ex ++ ;
          this.number_sati ++ ;
          if(this.number_university >= 20) {
              this.number_university = 20 ;
          }
          if(this.number_ex >= 21) {
            this.number_ex = 21 ;
          }
          if(this.number_sati >= 98) {
            this.number_sati = 98 ;
          }
      } ,100 )

      setInterval(() => {
        this.number_student ++ ;
        if(this.number_student >=300) {
          this.number_student = 300 ;
        }
      } , 30)
  }


  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    AOS.init({disable: 'mobile'});//AOS - 2
    AOS.refresh();//refresh method is called on window resize and so on, as it doesn't require to build new store with AOS elements and should be as light as possible.
    $(document).ready(function(){
      $('.item_carousel').slick({
        autoplay: true,
        autoplaySpeed:1500,
        arrows:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          }
          ,
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 601,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ]
      });

      $('.item_procedure').slick({
        infinite: false,
        autoplay: true,
         autoplaySpeed: 2000,
         prevArrow:"<img class='a-left control-c prev slick-prev' style='width: 30px ; height : 30px' src='https://icon-library.com/images/previous-next-icon/previous-next-icon-18.jpg'>",
        nextArrow:"<img class='a-right control-c next slick-next' style='transform: scaleX(-1); width: 30px ; height : 30px' src='https://icon-library.com/images/previous-next-icon/previous-next-icon-18.jpg'>"
      });

      $('.center').slick({
        slidesToShow: 2.5,
        autoplaySpeed: 2000,
        autoplay : true,
        dots: true,
        responsive: [
          {
            breakpoint: 1025,
            settings: {
              arrows: false,
              slidesToShow: 1.5
            }
          },
          {
            breakpoint: 768,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              slidesToShow: 1
            }
          }
        ]
      });
    });
  }



  async getdata() {
    (await this.api.get('/outstanding' )).subscribe((v : any ) => {
        this.listnew = v ;
        this.listnew.forEach((e : any) => {
          const date = new Date(e.updated_at);
          e.date = date ;
        });
    })
  }


}
