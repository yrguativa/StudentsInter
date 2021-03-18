import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from './material.module';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    // data: {
    //   expectedRole: ['admin']
    // }
  }
];

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/shared/', '.json');
}
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild({      
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'es',
      extend: true
    })
  ]
})
export class HomeModule { }
