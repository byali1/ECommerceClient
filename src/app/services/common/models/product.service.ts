import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/contracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from 'src/app/contracts/list_product';
import { Observable, firstValueFrom } from 'rxjs';
import { ListProductImage } from 'src/app/contracts/list_product_image';

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
  ): Promise<{ totalCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalCount: number;
      products: List_Product[];
    }> = firstValueFrom(
      this.httpClientService.get<{
        totalCount: number;
        products: List_Product[];
      }>({
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

  async deleteProduct(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );

    await firstValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> =
      this.httpClientService.get<ListProductImage[]>(
        {
          action: 'GetProductImagesById',
          controller: 'products',
        },
        id
      );

    const images: ListProductImage[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteProductImage(id: string, imageId: string,successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        action: 'DeleteProductImage',
        controller: 'products',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    await firstValueFrom(deleteObservable);
    successCallBack();
  }
}
