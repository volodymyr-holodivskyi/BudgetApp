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




@NgModule({
  declarations: [
    HeaderComponent,
    DialogComponent,
    DynamicChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  exports:[
    HeaderComponent,
    DialogComponent,
    DynamicChartComponent
  ]
})
export class SharedModule { }
