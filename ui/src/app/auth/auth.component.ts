import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "@sanmix/ui/auth/login.service";
import {LoginModel} from "../../../../@libs/models/login.model";
import {RegisterModel} from "../../../../@libs/models/register.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit{

  isLogin = true;
  validatorRequired = Validators.required;
  showPwd = false

  form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, []),
    username: new FormControl(null, []),
  })

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService,
  ) {
    const type = this.route.snapshot.params['type']?.toLowerCase();
    this.isLogin = type === 'login';
    if (type !== 'login' && type !== 'register') {
      this.router.navigate(['auth/login']).then()
    }

    if (!this.isLogin) {
      this.form.controls.username.setValidators(Validators.required)
      this.form.controls.passwordConfirm.setValidators(Validators.required)
    }
  }

  ngOnInit() {
  }

  submit() {
    this.form.markAllAsTouched();

    if(!this.form.valid) return;

    if (this.isLogin) {
      const data: LoginModel = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
      }

      this.logInUser(data);
    } else {

      if (this.form.controls.password.value !== this.form.controls.passwordConfirm.value) {
        this.form.controls.passwordConfirm.setErrors({invalid: true});
        return;
      }

      const data: RegisterModel = {
        email: this.form.controls.email.value,
        password: this.form.controls.password.value,
        username: this.form.controls.username.value,
      }

      this.authService.register(data).subscribe(
        next => {
          if(next === true) {
            this.logInUser({email: data.email, password: data.password});
          }
        }
      )
    }
  }

  private logInUser(data: LoginModel) {
    this.authService.login(data).subscribe(
      next => {
        localStorage.setItem('t', next?.['access_token']);
        this.authService.fillUdata()
        this.router.navigate(['dashboard']).then()
      }
    )
  }
}
