import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';

export const routes: Routes = [

    {path: 'menu-principal', component: MenuPrincipalComponent},
    {path: 'login-component', component: LoginFormComponent},
    {path: 'registro-component', component: RegistroComponent},
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    {path: 'menu-principal', component: MenuPrincipalComponent},
=======
=======
>>>>>>> 4d05ec1 (errores)
    {path: 'verificar-datos', component:VerificarDatosComponent},
>>>>>>> 4d05ec1 (errores)
=======
    {path: 'verificar-datos', component:VerificarDatosComponent},
=======
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> 5135880 (cam)
>>>>>>> fbce96b (cam)
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
];
