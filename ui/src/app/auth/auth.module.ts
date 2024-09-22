import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from '@sanmix/ui/auth/auth.component';
import {AuthRoutingModule} from "@sanmix/ui/auth/auth-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {ionEyeOffOutline, ionEyeOutline} from '@ng-icons/ionicons';
import {NgIconsModule} from "@ng-icons/core";
import {LogoutComponent} from "@sanmix/ui/auth/logout.component";

@NgModule({
  declarations: [AuthComponent, LogoutComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgIconsModule.withIcons({ionEyeOffOutline, ionEyeOutline })
  ]
})
export class AuthModule {}
