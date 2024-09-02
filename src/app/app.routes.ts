import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';

export const routes: Routes = [
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
<<<<<<< HEAD
>>>>>>> 4d05ec1 (errores)
=======
    {path: 'verificar-datos', component:VerificarDatosComponent},
=======
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> 5135880 (cam)
>>>>>>> fbce96b (cam)
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
=======
    {path: '', redirectTo: '/login-component', pathMatch: 'full'},
<<<<<<< HEAD
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> 93f3553 (cambios)
=======
>>>>>>> 4bb85a1 (rutas sin cambios)
];
