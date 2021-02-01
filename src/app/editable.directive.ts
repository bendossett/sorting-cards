import { Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdateEvent, DeleteEvent } from './sorting/events';


@Directive({
    selector: '[appEditable]'
})
export class EditableDirective {
    @Input('appEditable') value: string | number = "Change me!";
    @Input() cardType: string = "";
    @Input() cardIndex: number = 0;

    @Output() onChange: EventEmitter<UpdateEvent> = new EventEmitter();
    @Output() onDelete: EventEmitter<DeleteEvent> = new EventEmitter();

    constructor(
        private el: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
      this.el.nativeElement.innerText = this.value;
    }

    @HostListener('dblclick', [('$event')])
    onDblClick(event: any) {
        this.makeEditable();
    }

    @HostListener('click', [('$event')])
    onTplClick(event: any) {
      if (event.detail === 3) {
        this.el.nativeElement.remove();
        const deleteEvent: DeleteEvent = {
          index: this.cardIndex,
          type: this.cardType
        };
        this.onDelete.emit(deleteEvent);
      }
    } 

    @HostListener('blur') blurred() {
      this.checkValues();
    }
    
    @HostListener('keydown.enter', [('$event')]) 
    onKeydown(event: KeyboardEvent) {
        event.preventDefault();
        this.checkValues();
    }

    checkValues(): Observable<UpdateEvent> {
      const newValue = this.el.nativeElement.innerText.substring(0, 3);
      if (this.value !== newValue && !newValue.match(/^\s*$/)) {
        const edit: UpdateEvent = {
          index: this.cardIndex,
          type: this.cardType,
          value: newValue
        };
        this.onChange.emit(edit);
      } else {
        this.el.nativeElement.innerText = this.value;
      }

      this.reset();
      return this.onChange;
    }

    makeEditable() {
        this.renderer.addClass(this.el.nativeElement, 'editing');
        this.renderer.setAttribute(this.el.nativeElement, 'contentEditable', 'true');
        this.el.nativeElement.focus();
        this.setValue(this.el.nativeElement.innerText);
        console.log('done')
    }

    setValue(value: number|string) {
        this.el.nativeElement.innerText = value;
        this.value = value;
        return this.value;
    }

    reset() {
        this.renderer.removeClass(this.el.nativeElement, "editing");
        this.renderer.setAttribute(this.el.nativeElement, "contentEditable", "false");
    }
}

