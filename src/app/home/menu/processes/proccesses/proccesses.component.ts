import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-proccesses',
  templateUrl: './proccesses.component.html',
  styleUrls: ['./proccesses.component.scss'],
})
export class ProccessesComponent implements OnInit {

  coords = 0;

  constructor(private geolocation: Geolocation) {
  }

  ngOnInit() {

  }

  unread() {

  }
}
