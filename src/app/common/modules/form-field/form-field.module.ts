import { NgModule } from '@angular/core';

// directives
import { FormFieldErrorsDirective } from '@common/modules/form-field/directives/form-error.directive';

@NgModule({
  declarations: [FormFieldErrorsDirective],
  exports: [FormFieldErrorsDirective],
})
export class FormFieldModule {
}
