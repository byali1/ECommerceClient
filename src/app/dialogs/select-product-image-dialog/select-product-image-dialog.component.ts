import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialog } from '../base/base-dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ListProductImage } from 'src/app/contracts/list_product_image';
import { ProductService } from 'src/app/services/common/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { MatCard } from '@angular/material/card';
import { DialogService } from 'src/app/services/common/dialog.service';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../delete-dialog/delete-dialog.component';
import { async } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService
  ) {
    super(dialogRef);
  }

  images: ListProductImage[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallSpinClockWise);
    this.images = await this.productService.readImages(
      this.data as string,
      () => this.spinner.hide(SpinnerType.BallSpinClockWise)
    );
  }

  async deleteProductImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.Cog);
        const card = $(event.target).closest('.product-image-card');
        card.fadeOut(900, async () => {
          await this.productService.deleteProductImage(this.data as string, imageId, () => {
            card.remove();
          this.spinner.hide(SpinnerType.Cog);

        });
      })
    }
    });
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .webp, .gif',
    action: 'upload',
    controller: 'products',
    explanation: 'Ürün fotoğraflarını buraya bırakabilirsiniz.',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };
}

export enum SelectProductImageState {
  Close,
}
