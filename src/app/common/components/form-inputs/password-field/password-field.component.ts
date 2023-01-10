import { Component } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormFieldModule } from '@common/modules/form-field/form-field.module';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styles: ['mat-form-field { width: 100% }'],
  imports: [
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    FormFieldModule
  ],
  standalone: true,
})
export class PasswordFieldComponent {
  public showPasswordAsText = false;

  public value = '';

  constructor(public readonly ngControl: NgControl) {
    ngControl.valueAccessor = this;
  }

  public change(value: string): void {
    this.writeValue(value);
  }

  public onBlur(): void {
    this.writeValue(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.emitChanges();
  }

  private emitChanges(): void {
    this.onChange(this.value);
    this.onTouch(this.value);
  }

  public toggleViewMode(): void {
    this.showPasswordAsText = !this.showPasswordAsText;
  }

  private onChange: Function = function () {
  };
  private onTouch: Function = function () {
  };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
