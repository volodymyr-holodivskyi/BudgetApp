import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {} from '@angular/compiler';
import { ErrorHandler, NgModule } from '@angular/core'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GlobalErrorHandler } from './shared/services/global-error-handler/global-error-handler.service';
import { HttpInterceptorService } from './shared/services/http-interceptor/http-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import { ProfileModule } from './profile/profile.module';
import { StatisticComponent } from './statistic/statistic.component';
import { StatisticModule } from './statistic/statistic.module';
import { HistoryComponent } from './history/history.component';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { RegisterModule } from './register/register.module';
import { RegisterComponent } from './register/register.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    NotFoundComponent,
    ProfileComponent,
    StatisticComponent,
    HistoryComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastContainerModule,
    ToastrModule.forRoot({positionClass:'inline'}),
    MatDialogModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule, 
    MatButtonModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
