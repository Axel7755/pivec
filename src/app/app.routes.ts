import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';
import { LoginComponent } from './loging-regis/login.component';

export const routes: Routes = [
    {path: 'login-component', component: LoginFormComponent},
    {path: 'login',component: LoginComponent},
    {path: 'registro-component', component: RegistroComponent},
    {path: 'verificar-datos', component:VerificarDatosComponent},
    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: '', redirectTo: '/login-component', pathMatch: 'full'},
];
