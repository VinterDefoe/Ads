import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from "./components/users/users.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SinginComponent} from "./auth/singin/singin.component";
import {AuthGuardService} from "./guards/auth-guard.service";

const routes: Routes = [
    {
        path: '', component: DashboardComponent, children: [
            {path: 'users', component: UsersComponent},
        ], canActivate: [AuthGuardService]
    },
    {path: 'singin', component: SinginComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
