import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Product } from 'src/app/contracts/product';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockWise);

    

    // this.httpClientService
    //   .post(
    //     { controller: 'products' },
    //     {
    //       name: 'kalem',
    //       stock: 100,
    //       price: 15,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService.put(
    //   { controller: 'products' },
    //   {
    //     id: 'b1d8cb91-0b40-48c4-89d4-6a2356d6fee0',
    //     name: 'Kalem',
    //     price: 25,
    //     stock: 120
    //   }
    // ).subscribe();


      // this.httpClientService.delete({controller:"products"},"028e191f-1674-4f07-8a2c-c9ed55209fb7").subscribe();

      this.httpClientService
      .get<Product[]>({
        controller:"products",
      })
      .subscribe((data) => {
        console.log(data);
      });


  }
}
