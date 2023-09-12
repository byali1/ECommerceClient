import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
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
    private spinner:NgxSpinnerService
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
  async deleteProduct(event: any) {
    this.spinner.show(SpinnerType.Cog);
    const td: HTMLTableCellElement = this.element.nativeElement;
    await this.productService.deleteProduct(this.id);
    $(td.parentElement).fadeOut(450, () => {
      this.callback.emit();
    });
  }
}
