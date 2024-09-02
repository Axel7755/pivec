import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './loging-regis/sub-componentes/verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';

export const routes: Routes = [

    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: 'login-component', component: LoginFormComponent},
    {path: 'registro-component', component: RegistroComponent},
    {path: 'verificar-datos', component:VerificarDatosComponent},
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
];
