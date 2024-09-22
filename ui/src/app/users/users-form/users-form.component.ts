import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "@sanmix/ui/users/users.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {isRequired} from "@sanmix/ui/@common/utils/forms.helper";
import {RolesEnum} from "@sanmix/ui/@common/roles.enum";
import {UserCreateModel, UserModel} from "../../../../../@libs/models/user.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css'],
})
export class UsersFormComponent implements OnInit{
  loading = true;

  fg = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required), // перевірку пароля тут не робимо, оскільки дія доступна лише адміну
    role: new FormControl(RolesEnum.MANAGER, Validators.required),
  })

  roles = [RolesEnum.MANAGER, RolesEnum.ADMIN]

  header = ''

  // якщо потрібно перевірити в шаблоні чи поле обов'язкове, наприклад
  // <div *ngIf="isRequired(fg.controls.email)">....
  isRequired = isRequired

  constructor(
    private service: UsersService,
    public dialogRef: MatDialogRef<UsersFormComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, edit: boolean}
  ) {
  }

  ngOnInit() {

    if (this.data?.id) {
      this.header = (this.data?.edit ? 'Редагування' : 'Перегляд') + ' користувача'
      this.fetchData()
      this.fg.controls.email.removeValidators(Validators.required);
      this.fg.controls.username.removeValidators(Validators.required);
      this.fg.controls.password.removeValidators(Validators.required);
      this.fg.controls.role.removeValidators(Validators.required);

      /*
      чисто для прикладу!
      якщо потрібно просто вивести ту саму форму і заблокувати поля для редагування
      this.fg.disable()
      */
    } else {
      this.header = 'Створити користувача'
      this.loading = false;
      this.fg.controls.email.addValidators(Validators.required);
      this.fg.controls.username.addValidators(Validators.required);
      this.fg.controls.password.addValidators(Validators.required);
      this.fg.controls.role.addValidators(Validators.required);
    }
  }

  fetchData() {
    this.loading = true;
    this.service.getUser(this.data.id).subscribe({
      next: data => {
        this.fg.controls.email.patchValue(data.email);
        this.fg.controls.username.patchValue(data.username);
        this.fg.controls.role.patchValue(data.role);

        this.loading = false;
      }, error: () => {
      this.loading = false;
    }
    })
  }

  close() {
    this.dialogRef.close()
  }

  save() {
    if (!this.fg.valid) return;

    if (this.data?.id) {
      const input: UserModel = {
        id: parseInt(this.data.id, 10),
        email: this.fg.controls.email.value,
        username: this.fg.controls.username.value,
        role: this.fg.controls.role.value,
        password: this.fg.controls.password.value,
      }

      this.loading = true;
      this.service.editUser(input).subscribe({
        next: () => {
          this.successMessage()
          setTimeout(() => {
            this.close()
          },3000)
        },
        complete: () => {
          this.loading = false;
        }
      })
    } else {
      const input: UserCreateModel = {
        email: this.fg.controls.email.value,
        username: this.fg.controls.username.value,
        role: this.fg.controls.role.value,
        password: this.fg.controls.password.value,
      }

      this.loading = true;
      this.service.createUser(input).subscribe({
        next: () => {
          this.successMessage()
          setTimeout(() => {
            this.close()
          },3000)
        },
        complete: () => {
          this.loading = false;
        }
      })
    }
  }

  successMessage() {
    this._snackBar.open("Успішно збережено", null, {duration: 2800});
  }
}
