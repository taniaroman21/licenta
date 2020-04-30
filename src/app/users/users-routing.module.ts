import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { ClinicUserLoginComponent } from './clinic-user-login/clinic-user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    {
        path: '',
        component: UserLoginComponent,
        children: [{
            path: 'clinic', component: ClinicUserLoginComponent
        }]
    },
    {
        path: 'profile',
        component: UserProfileComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }