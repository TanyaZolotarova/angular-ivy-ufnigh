import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { reducers } from './store';
import {AssetsPageComponent} from "./components/assets-page/assets-page.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {EffectsModule} from "@ngrx/effects";
import {UsersEffect} from "./store/effects/user.effect";

@NgModule({
  imports: [
      HttpClientModule,
      BrowserModule,
      FormsModule,
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([UsersEffect]),
      BrowserAnimationsModule,
      MatTableModule,
      MatButtonModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatSortModule,
      MatInputModule,
      MatCheckboxModule,
      RouterModule.forRoot([
          {path: '', component: AssetsPageComponent},
      ]),],
  declarations: [
    AssetsPageComponent,
    AppComponent,],
  bootstrap: [AppComponent]
})
export class AppModule {}
