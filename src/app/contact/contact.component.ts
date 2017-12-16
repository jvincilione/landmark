import { Component, AfterViewInit } from '@angular/core';
import { MapMarker } from '../map-marker.class';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  config = {
    centerPoint: {
      lat: 38.426802,
      lng: -122.706730
    }, 
    zoom: 18, 
    markers: [
      {
        title : "Landmark Baptist Church",
        latLng : {
          lat: 38.426802,
          lng: -122.706730
        }
      }
    ],
    elementId: 'map-canvas'
  }

  myMap;

  name: string;
  email: string;
  phone: string;
  comments: string;
  spam: string;

  constructor(private toastr: ToastrService) { }

  ngAfterViewInit() {
    this.myMap = new MapMarker(this.config)
    this.myMap.createMap();
  }

  submitForm(): void {
    if (this.validate()) {
      console.log('valid');
    } else {
      this.toastr.error('Your name, a comment, and a way to contact you (email or phone) is required to submit the form', '');
    }
  }

  validate(): boolean {
    return this.name && (this.email || this.phone) && !this.spam;
  }

}
