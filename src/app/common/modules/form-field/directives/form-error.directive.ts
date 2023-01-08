import { Directive, TemplateRef, ViewContainerRef, Input, DoCheck } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// utils
import { getSharedErrorMessages } from '@common/utils/shared-error-messages.util';

const sharedErrorMessages = getSharedErrorMessages();

@Directive({
  selector: '[appFormFieldErrors]',
})
export class FormFieldErrorsDirective implements DoCheck {
  @Input() public additionalErrorMessages: { [key: string]: any } | null = null;
  @Input() public isMultiline = false;
  @Input('appFormFieldErrorsOf') public formCtrl?: AbstractControl | null;

  constructor(
    protected readonly templateRef: TemplateRef<any>,
    protected readonly viewContainerRef: ViewContainerRef
  ) {
  }

  ngDoCheck() {
    const showErrors = !!this.formCtrl && this.formCtrl.touched && this.formCtrl.invalid || false;
    if (!showErrors) {
      return;
    }

    // Just in case
    if (!this.formCtrl?.errors) {
      return;
    }

    this.checkAndDisplayErrors();
  }

  private checkAndDisplayErrors(): void {
    const errorsList: string[] = this.getErrorMessages();
    if (errorsList.length) {
      if (this.isMultiline) {
        // Multi line
        this.viewContainerRef.clear();
        errorsList.forEach((msg) => {
          this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: msg });
        });
      } else {
        // Single line
        const inlineErrors = errorsList.join(', ');
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef, { $implicit: inlineErrors })
      }
    } else {
      this.viewContainerRef.clear();
    }
  }

  private getErrorMessages(): string[] {
    const messagesList: string[] = [];

    for (let key in this.formCtrl?.errors) {
      if (this.formCtrl?.errors.hasOwnProperty(key)) {
        messagesList.push(this.getMessageFromSharedOrCustomList(key, this.formCtrl?.errors[key]));
      }
    }

    return messagesList;
  }

  private getMessageFromSharedOrCustomList(errorKey: string, error: ValidationErrors | boolean): string {
    const thereAreCustomMessages = typeof this.additionalErrorMessages === 'object' && this.additionalErrorMessages !== null && this.additionalErrorMessages.hasOwnProperty(errorKey);

    if (thereAreCustomMessages) {
      return this.getMessage(errorKey, error, this.additionalErrorMessages!);
    } else if (sharedErrorMessages[errorKey]) {
      return this.getMessage(errorKey, error, sharedErrorMessages);
    }

    return errorKey;
  }

  private getMessage(errorKey: string, error: ValidationErrors | boolean, errorsMessages: { [key: string]: any }): string {
    if (typeof errorsMessages[errorKey] === 'string') {
      // Static error message
      return errorsMessages[errorKey];
    } else if (typeof errorsMessages[errorKey] === 'function') {
      // Dynamic error message
      return errorsMessages[errorKey](error);
    }

    return errorKey;
  }
}
