import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
  template: `<input [ngClass]="inputClass" matInput [matDatepicker]="myDatepicker"
                    #name
                    class="form-control short-input"
                    [name]="cell.getId()"
                    [disabled]="!cell.isEditable()"
                    [placeholder]="cell.getTitle()"
                    (click)="onClick.emit($event)"
                    (keyup)="updateValue()"
                    (keydown.enter)="onEdited.emit($event)"
                    (keydown.esc)="onStopEditing.emit()"
                    (dateChange)="updateValue()">
                <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
                <mat-datepicker #myDatepicker></mat-datepicker>
  `,
})
export class CustomEditorComponent extends DefaultEditor implements OnInit, AfterViewInit {
  date : Date;
  @ViewChild('name') name: ElementRef;
  private datepickerOptions: any = {};
  constructor(private adapter: DateAdapter<any>) {
    super();
  }
  ngOnInit() {
    // Initialize the date picker
    };

  ngAfterViewInit() {
    if (this.cell.newValue !== '') {
      this.name.nativeElement.value = this.cell.getValue();
    }
  }
  updateValue() {
    const name = this.name.nativeElement.value;
    this.cell.newValue = name;
  }

}
