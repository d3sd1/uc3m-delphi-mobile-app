import {Component, OnInit} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'delphi-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss'],
})
export class ProcessesComponent implements OnInit {

  coords = 0;

  constructor(private geolocation: Geolocation) {
  }

  ngOnInit() {

  }

  unread() {

  }
}
