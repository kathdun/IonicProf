import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../classes/product';
import { IonicAuthService } from '../services/auth.service';
import { ProductServiceService } from '../services/product-service.service';
import { FirebaseService } from '../services/firebase.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public products:Array<Product>=[];

    constructor(
      private router: Router,
      private ionicAuthService: IonicAuthService,
      public alertController: AlertController,
      private firebaseService:FirebaseService,
      private route: ActivatedRoute,
      private toastController: ToastController
    ) {}

  ngOnInit() {
    // this.ionViewWillEnter(); 
    this.doRefresh(event);
   
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      const refresh = paramMap.get('refresh');
      if (refresh) {
        this.ionViewWillEnter();
      }
    });
  }

  async presentAlertConfirm(id:any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Do you really want to <strong>delete</strong> this article?!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            this.firebaseService.delete(id);
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  
  
     ionViewWillEnter(){
     this.products=[];
    this.products = this.firebaseService.getArray();
     this.firebaseService.getProducts().subscribe((res) => {
       Promise.resolve(this.products = res.map((t) => {
        
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Product
        };
        
      }).sort((a,b) => a.name.localeCompare(b.name))
     ).then(()=>{
      //  console.log('done');
      //  console.log(this.products);
       this.firebaseService.setArray(this.products);
     }) 
    });  
    }

    doRefresh(event) {
      console.log('Begin async operation');
      setTimeout(() => {
        console.log('Async operation has ended');
        this.ionViewWillEnter()
        event.target.complete();
      }, 2000);
    }
  
    remove(id) {
      this.presentAlertConfirm(id).then(()=>{
        setTimeout(() => {
          this.presentToast()
        }, 4000);
      } );
     
      // if (window.confirm('Are you sure?')) {
      //   console.log(id);
        
      // }  
    }  

    async presentToast() {
      const toast = await this.toastController.create({
        message: 'Product deleted',
        duration: 2000
      });
      toast.present();
    }

  signOut() {
    this.ionicAuthService.signoutUser()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }
  
}
