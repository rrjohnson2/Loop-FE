import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { MobileProfileActivitiesComponent } from './mobile-profile-activities/mobile-profile-activities.component';
import { MobileProfileSettingsComponent } from './mobile-profile-settings/mobile-profile-settings.component';


const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path:'landing',
                component: LandingComponent
            },
            {
                path:'profile',
                component: ProfileComponent

            },
            {
                path:'activities',
                component: MobileProfileActivitiesComponent

            },
            {
                path:'setting',
                component: MobileProfileSettingsComponent

            },
            { path: '', redirectTo:'landing', pathMatch:"prefix"},
            { path: '**', redirectTo:'landing', pathMatch:"prefix"}
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class LayoutRoutingModule { }
