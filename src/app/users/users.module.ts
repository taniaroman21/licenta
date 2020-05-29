import { NgModule } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from './users.service';


@NgModule({
    declarations: [
        UserLoginComponent
    ],
    imports: [
        UsersRoutingModule,
        SharedModule

    ],
    providers: [UsersService]
})
export class UsersModule { }
