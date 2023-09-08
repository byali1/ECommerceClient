import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(
    product: Create_Product,
    successCallBack?: any,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService.post({ controller: 'products' }, product).subscribe(
      (result) => {
        successCallBack();
      },
      (errorResponse: HttpErrorResponse) => {
        //HttpErrorResponse'un dönüş tipine göre kendi tipimizi yarattık

        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';
        _error.forEach((key, index) => {
          key.value.forEach((_value, _index) => {
            message += `${_value}<br>`;
          });
        });

        errorCallBack(message);
      }
    );
  }
}
