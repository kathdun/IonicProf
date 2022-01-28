import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../classes/product';
import { ProductServiceService } from '../services/product-service.service';

import { FirebaseService } from '../services/firebase.service';
import { isEmpty } from '@firebase/util';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.page.html',
  styleUrls: ['./new-product.page.scss'],
})
export class NewProductPage implements OnInit {
  new_product_form: FormGroup;

  constructor( private crudService: FirebaseService,public formBuilder: FormBuilder,   private router:Router,private toastController: ToastController) { }

  ngOnInit() {
      //Validation du formulaire      
  }

 async createProduct(p:Product){
     if (isEmpty(p)) {
       return false;
     } else {
      this.crudService.create(p)
      .then(() => {
        // this.new_product_form.reset();
        this.presentToast();
        
      }).catch((err) => {
        console.log(err)
      });
     }
    //let ss = this.productService.addProduct(p);
    //console.log(ss);
   
    await this.router.navigateByUrl('/home');
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Product created',
      duration: 2000
    });
    toast.present();
  }
  


}
