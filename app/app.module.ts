import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {VerySimpleComponent} from './very-simple.component';

import { routing } from "./app.routing";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    routing
  ],
  declarations: [
    AppComponent,
    VerySimpleComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}