import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../classes/product';
import { FirebaseService } from '../services/firebase.service';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
  styleUrls: ['./detail-product.page.scss'],
})
export class DetailProductPage implements OnInit {
  public product:Product;

  constructor(private firebaseService:FirebaseService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      data => {
          //Check existance de a la reference
          this.product=this.firebaseService.getProductByRef(data.reference); 
         // console.log(this.product);
          
        }
  );  
 
  }

}
