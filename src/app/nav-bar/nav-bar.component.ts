import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
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
