import {FormControl, Validators} from "@angular/forms";

export function isRequired(f: FormControl) {
  return f.hasValidator(Validators.required)
}
