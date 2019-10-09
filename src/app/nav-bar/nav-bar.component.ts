import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from '../services/auth.service';
import { trigger, style, animate, transition } from '@angular/animations';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';
// import { faBell as farBell } from '@fortawesome/free-regular-svg-icons';
import { faBell} from '@fortawesome/free-solid-svg-icons';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';

// import { MDBBootstrapModulesPro, MDBSpinningPreloader } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class NavBarComponent implements OnInit {
  // faCoffee = faCoffee;
  faBell = faBell;
  public isCollapsed = true;
  public isMainPage = true;
  private activeSiteSection: string;
  private currentUser: any;
  constructor(private auth: AuthService, private router: Router) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd ) {
                this.SiteURLActiveCheck(event);
            }
        });
        this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.isAdmin;
  }

  get isBuyer() {
    return this.currentUser && this.currentUser.isBuyer;
  }

  get isSeller() {
    return this.currentUser && this.currentUser.isSeller;
  }

  get isTransporter() {
    return this.currentUser && this.currentUser.isTransporter;
  }

  get isAgent() {
    return this.currentUser && this.currentUser.isAgent;
  }

  get isBank() {
    return this.currentUser && this.currentUser.isBank;
  }

  get isNbfc() {
    return this.currentUser && this.currentUser.isNbfc;
  }

  private SiteURLActiveCheck(event: NavigationEnd): void {
    if (event.url.indexOf('main') !== -1) {
      this.isMainPage = true;
    } else {
      this.isMainPage = false;
    }
    if (event.url.indexOf('#hero') !== -1) {
        this.activeSiteSection = 'hero';
    } else if (event.url.indexOf('#buyer') !== -1) {
        this.activeSiteSection = 'buyer';
    } else if (event.url.indexOf('#seller') !== -1) {
        this.activeSiteSection = 'seller';
    } else if (event.url.indexOf('#contact') !== -1) {
        this.activeSiteSection = 'contact';
    }else if (event.url.indexOf('#auction') !== -1) {
      this.activeSiteSection = 'auction';
    } else {
        this.activeSiteSection = '';
    }
  }

  ngOnInit() {
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  scrollToElement($element): void {
    $element.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  isSectionActive(section: string): boolean {
    return section === this.activeSiteSection;
  }

  logout() {
    this.auth.logout();
  }

  loggedIn() {
    return this.auth.loggedIn();
  }

  loggedOut() {
    return !this.auth.loggedIn();
  }
}
