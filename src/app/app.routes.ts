import { Routes } from '@angular/router';
import { LoginComponent } from './loging-regis/login.component';
import { RegistroPageComponent } from "./loging-regis/registro-page.component";
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';

export const routes: Routes = [
    {path: 'login-component', component: LoginComponent},
    {path: 'registro-component', component: RegistroPageComponent},
    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
];
