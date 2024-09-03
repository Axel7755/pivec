import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';
import { LoginComponent } from './loging-regis/login.component';

export const routes: Routes = [
    
    {path: 'login',component: LoginComponent, 
        children: [
            {
              path: 'login-component', // child route path
              component: LoginFormComponent, // child route component that the router renders
            },
            {
              path: 'registro-component',
              component: RegistroComponent, // another child route component that the router renders
            },
          ],
    },
    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: '', redirectTo: '/login/login-component', pathMatch: 'full'},
];
