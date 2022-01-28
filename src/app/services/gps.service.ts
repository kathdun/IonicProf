import { Injectable } from '@angular/core';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class GpsService {

  constructor(private nativeStorage: NativeStorage) { }

  setPosition(lat,lon){
    return this.nativeStorage.setItem('coords', { property: lat, anotherProperty: lon });
  }
  getPosition(){
    this.nativeStorage.getItem('coords')
    .then(
      data => console.log(data),
      error => console.error(error)
    );
  }
}
