import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-transport-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class TransportSidebarComponent implements OnInit {
  @Input()
  role: string;

  constructor() {
  }

  ngOnInit() {
  }

}
