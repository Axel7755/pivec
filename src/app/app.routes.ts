import { Routes } from '@angular/router';
import { LoginComponent } from './loging-regis/login.component';
import { RegistroPageComponent } from "./loging-regis/registro-page.component";
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './loging-regis/sub-componentes/verificar-datos/verificar-datos.component';

export const routes: Routes = [
    {path: 'login-component', component: LoginComponent},
    {path: 'registro-component', component: RegistroPageComponent},
    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: 'verificar-datos', component:VerificarDatosComponent},
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
];
