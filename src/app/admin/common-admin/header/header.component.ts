import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
declare var $ : any ;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isShow = false;
  subscription: Subscription;
  user : any ;
  isHeader : Boolean = false;

  constructor(private data: DataService) {
    this.subscription = this.data.isLoginChanged.subscribe((value: boolean) => {
      this.isShow = value;
      if (sessionStorage.getItem('user')) {
        this.user = JSON.parse(sessionStorage.getItem('user') ?? '');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
      sessionStorage.removeItem('user') ;
      window.location.reload();
  }
}
