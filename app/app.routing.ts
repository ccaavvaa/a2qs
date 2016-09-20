import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { VerySimpleComponent } from "./very-simple.component";

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'a/:id',
        component: VerySimpleComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);