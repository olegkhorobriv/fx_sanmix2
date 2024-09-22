import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginService} from "@sanmix/ui/auth/login.service";
import {LoginModel} from "../../../../@libs/models/login.model";
import {RegisterModel} from "../../../../@libs/models/register.model";

@Component({
  template: '',
  styleUrls: ['./auth.component.scss'],
})
export class LogoutComponent implements OnInit{

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.router.navigate(['/auth/login']).then()
  }
}
