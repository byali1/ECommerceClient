import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  //File Upload
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: 'upload',
    controller: 'products',
    explanation: 'Drag images or select an image',
    isAdminPage: true,
    accept:".png, .jpg, .jpeg, .webp"
  };

  createProduct(
    productName: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.Cog);

    const createProduct: Create_Product = new Create_Product();

    createProduct.name = productName.value;
    createProduct.stock = parseInt(stock.value);
    createProduct.price = parseFloat(price.value);

    this.productService.createProduct(
      createProduct,
      () => {
        this.hideSpinner(SpinnerType.Cog);

        //Alertify Notification
        this.alertify.message('Ürün başarıyla eklendi', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomCenter,
          delay: 3,
        });

        //Emitter
        this.createdProduct.emit(createProduct);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.BottomCenter,
          delay: 5,
        });
      }
    );
  }
}
