import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../classes/product';
import { FirebaseService } from '../services/firebase.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  updateForm: FormGroup;''
  ref: any;
  id: any;

  constructor(private router:Router, private firebaseService: FirebaseService,private activatedRoute: ActivatedRoute, private formBuilder:FormBuilder,private toastController: ToastController) {
      // this.id = this.activatedRoute.snapshot.paramMap.get('id');

     
     }

  ngOnInit() {
   

    this.updateForm = this.formBuilder.group({
      name: [''],
      reference: [''],
      pu: [''],
      qte: [''],
      description: ['']
    })    
    Promise.resolve(this.activatedRoute.params.subscribe(
      data => {
          //Check existance de a la reference
         // this.product=this.firebaseService.getProductByRef(data.reference);
         
          this.ref=data.reference;  
          console.log(this.ref);  
        }
  )).then(()=>{
    Promise.resolve(this.firebaseService.getProductByRef(this.ref)).then((data) => {
      this.id=data.id; 
      this.updateForm = this.formBuilder.group({
        name: [data['name']],
        reference: [data['reference']],
        pu: [data['pu']],
        qte: [data['qte']],
        description: [data['description']]
      })
    });
  })}

 
updateProduct(product:Product){
  this.firebaseService.update(this.id, this.updateForm.value);
  this.presentToast();
  console.log( this.firebaseService.getArray());
  
}

async presentToast() {
  const toast = await this.toastController.create({
    message: 'Product updated',
    duration: 2000
  });
  toast.present();
}

goBack() {
    this.router.navigate(['/home']);
}


}
