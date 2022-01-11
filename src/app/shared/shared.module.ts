import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { MatIcon,MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicChartComponent } from './dymamic-chart/dymamic-chart.component';
import { ChartsModule } from 'ng2-charts';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { IconPickerComponent } from './icon-picker/icon-picker.component';




@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent,
    DynamicChartComponent,
    RegisterDialogComponent,
    IconPickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    ChartsModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  exports:[
    HeaderComponent,
    DialogComponent,
    DynamicChartComponent,
    IconPickerComponent
  ]
})
export class SharedModule { }
