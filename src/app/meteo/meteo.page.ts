import { HttpClient, HttpContext } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { MeteoService } from '../services/meteo.service';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.page.html',
  styleUrls: ['./meteo.page.scss'],
})
export class MeteoPage implements OnInit {

  private ville:string;
  private meteos;
  private list;
  private num=5;
  private showText="Show More..."
  constructor(private httpClient:HttpClient,private alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: '',
      message: 'Please enter a valid location!!',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
  loadMeteo(){
    //this.meteos = this.meteoService.getMeteo(this.ville);
    //console.log(this.meteos);
  
    this.httpClient.get("http://api.openweathermap.org/data/2.5/forecast?q="+this.ville+"&appid=bc67ef94a6906be6cf8cc11d356589a3")
    .subscribe(result=>{
      //  console.log(result);
      this.meteos = result;
      this.list=this.meteos.list.slice(0,5);
      
    },err=>{
      this.presentAlert();
      console.log(err);
    })
  }
  
  showMore(){
    // this.loadMeteo();
    // console.log(this.meteos);
    this.num+=5;
    this.list=this.meteos.list.slice(0,this.num);
    
    if(this.num>35){
      this.showText="Show less...";
    }
    if(this.num>40){
      
      this.num=5;
      this.list=this.meteos.list.slice(0,5);
      this.showText="Show more...";
    }
  
    
  }
  showLess(){
    
    this.list=this.meteos.list.slice(0,5);
    
  }
}
