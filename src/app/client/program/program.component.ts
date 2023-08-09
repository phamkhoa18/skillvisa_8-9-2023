import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
declare var $ : any ;

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent {


  constructor(public api : ApiService) {

  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    $(document).ready(function(){
      $('.box_partner1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

      });
    })
  }

  panels = [
    { id: 'collapseOne', title: 'KHÓA HỌC ĐÀO TẠO LIÊN KẾT QUỐC TẾ', content: 'khoa_hoc.webp', isCollapsed: false },
    { id: 'collapseTwo', title: 'TRÁCH NHIỆM CỦA TRƯỜNG ĐÀO TẠO TẠI VIỆT NAM', content: 'tuyen_sinh.webp', isCollapsed: true },
    { id: 'collapseThree', title: 'TRÁCH NHIỆM CỦA TRƯỜNG ÚC', content: 'chuong_trinh.webp', isCollapsed: true }
  ];

  toggleCollapse(panel: any) {
    // console.log(panel);
    console.log(panel);
    this.panels.forEach((v) => {
        if(v.id == panel.id) {
          panel.isCollapsed = !panel.isCollapsed;
        } else {
          v.isCollapsed = true ;
        }
    })
  }
}
