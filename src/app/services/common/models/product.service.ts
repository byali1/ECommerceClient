import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  createProduct(
    product: Create_Product,
    successCallBack?: () => void,
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

  async getProductsPerPage(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalCount:number;products:List_Product[]}> {
    const promiseData: Promise<{totalCount:number;products:List_Product[]}> = firstValueFrom(
      this.httpClientService.get<{totalCount:number;products:List_Product[]}>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
    );

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );
    return await promiseData;
  }
}
