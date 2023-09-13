import { HttpErrorResponse } from '@angular/common/http';
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
import { error } from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import {
  DeleteDialogComponent,
  DeleteState,
} from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $: any;

@Directive({
  selector: '[appDelete]',
})
export class DeleteDirective {
  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlertifyService
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
  @Input() controller: string;

  @Output() callback: EventEmitter<any> = new EventEmitter(); //data refresh

  @HostListener('click')
  deleteProduct(event: any) {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.Cog);
      const td: HTMLTableCellElement = this.element.nativeElement;

      this.httpClientService
        .delete(
          {
            controller: this.controller,
          },
          this.id
        )
        .subscribe(
          (data) => {
            $(td.parentElement).fadeOut(450, () => {
              this.callback.emit();
              this.alertifyService.message('Data başarıyla silindi.', {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.BottomCenter,
                delay: 3,
              });
            });
          },
          (errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.Cog);
            this.alertifyService.message('HATA - Data silinemedi.', {
              dismissOthers: true,
              messageType: MessageType.Error,
              position: Position.BottomCenter,
              delay: 8,
            });
          }
        );
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
