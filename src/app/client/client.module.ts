import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { CommonClientComponent } from './common-client/common-client.component';
import { HeaderComponent } from './common-client/header/header.component';
import { FooterComponent } from './common-client/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SliderComponent } from './slider/slider.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component';
import { WorkComponent } from './work/work.component';
import { LoadingComponent } from './loading/loading.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { LienheComponent } from './lienhe/lienhe.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PartnerComponent } from './partner/partner.component';
import { FormComponent } from './form/form.component';
import { ProgramComponent } from './program/program.component';
@NgModule({
  declarations: [
    CommonClientComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SliderComponent,
    ContactComponent,
    NewsComponent,
    WorkComponent,
    LoadingComponent,
    TimkiemComponent,
    LienheComponent,
    PartnerComponent,
    FormComponent,
    ProgramComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    CKEditorModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ClientModule { }
