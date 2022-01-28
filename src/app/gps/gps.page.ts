import { Component, OnInit } from '@angular/core';
//import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {GpsService} from 'src/app/services/gps.service'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {
  latitude: any = 0; //latitude
  longitude: any = 0; //longitude
  data:any='';
  
  constructor(private geolocation: Geolocation,private storage: Storage) {}
  async init() {
    await this.storage.create();
  }

   getCurrentCoordinates() {
     this.geolocation.getCurrentPosition().then((resp) => {
       this.latitude = resp.coords.latitude;
       this.longitude = resp.coords.longitude;
       this.data=[this.latitude,this.longitude]
     
       this.saveCurrentCoordinates();
      
      }).catch((error) => {
        console.log('Error getting location', error);
      });
   }
   segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

   saveCurrentCoordinates(){
     console.log(this.data);
     
    this.storage.set('coords', this.data);
   }
  
  async ngOnInit() {
    this.init();
    this.getCurrentCoordinates();
    
    // await this.storage.create();
    //
  }

  

}
