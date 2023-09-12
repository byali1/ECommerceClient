import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { async } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
//import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
//Refactor edilecek. (ProductService)
import { ProductService } from 'src/app/services/common/models/product.service';
declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    const img = _renderer.createElement('img');
    img.setAttribute('src', '../../../../../assets/icons/delete_data.png');
    img.setAttribute('style', 'cursor:pointer');
    img.classList.add('w-50');
    // img.width=25;
    // img.height=25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string; //data id
  @Output() callback: EventEmitter<any> = new EventEmitter(); //data refresh

  @HostListener('click')
   deleteProduct(event: any) {
    this.openDialog(async() => {
      this.spinner.show(SpinnerType.Cog);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.productService.deleteProduct(this.id);
      $(td.parentElement).fadeOut(450, () => {
        this.callback.emit();
      });
    });
  }

  openDialog(deleteProduct: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == DeleteState.Yes) {
        deleteProduct();
      }
    });
  }
}
