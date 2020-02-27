import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { createCustomElement } from "@angular/elements";
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MaterialModule } from "./search/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SearchComponent
  ]
})
export class BandeauModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(SearchComponent, {injector});
    customElements.define("common-bandeau", el);
  }
  ngDoBootstrap(){};
}
