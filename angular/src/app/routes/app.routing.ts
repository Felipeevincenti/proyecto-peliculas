import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { HomeComponent } from '../components/home/home.component';
import { DetallesComponent } from '../components/detalles/detalles.component';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'detalles/:id', component: DetallesComponent },
    { path: '**', component: HomeComponent }
]



export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes)