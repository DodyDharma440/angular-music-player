import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { SidebarComponent } from './components/page-layout/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ArtistsComponent } from './pages/artists/artists.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginCallbackComponent } from './pages/login-callback/login-callback.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { HomeHeaderComponent } from './pages/home/components/home-header/home-header.component';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './stores/user.reducer';

@NgModule({
  declarations: [
    AppComponent,
    PageLayoutComponent,
    SidebarComponent,
    HomeComponent,
    ArtistsComponent,
    CategoriesComponent,
    LoginComponent,
    LoginCallbackComponent,
    HomeHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      user: userReducer,
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
