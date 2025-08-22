import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from '../../../shared/menu-items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class AppSidebarComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  token:any = localStorage.getItem('token');
  tokenPayload:any;
  filteredMenuItems: any[] = [];

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.initializeToken();
    this.filterMenuItems();
  }

  initializeToken() {
    try {
      this.token = localStorage.getItem('token');
      if (this.token) {
        this.tokenPayload = jwtDecode(this.token);
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      this.tokenPayload = null;
    }
  }

  filterMenuItems() {
    if (this.tokenPayload) {
      this.filteredMenuItems = this.menuItems.getMenuitem().filter(item => 
        item.role === '' || item.role === this.tokenPayload.role
      );
    } else {
      // Show only public menu items if no token
      this.filteredMenuItems = this.menuItems.getMenuitem().filter(item => 
        item.role === ''
      );
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
