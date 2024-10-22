import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "@sanmix/ui/home/home.component";
import {HomeRoutingModule} from "@sanmix/ui/home/home-routing.module";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ],
})
export class HomeModule {}
