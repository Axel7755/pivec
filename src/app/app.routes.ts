import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';
import { LoginComponent } from './loging-regis/login.component';

export const routes: Routes = [
<<<<<<< HEAD
    {path: 'login-component', component: LoginFormComponent},
    {path: 'login',component: LoginComponent},
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
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> fb6d11c (rutas aun co errores)
=======
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> 49c763e (rutas aun co errores)
    {path: '', redirectTo: '/login-component', pathMatch: 'full'},
<<<<<<< HEAD
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> 93f3553 (cambios)
=======
>>>>>>> 4bb85a1 (rutas sin cambios)
=======
    {path: '', redirectTo: '/login-component', pathMatch: 'full'},
<<<<<<< HEAD
    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> f3f771e (cambios)
=======
>>>>>>> 01996b9 (rutas sin cambios)
=======
    
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
>>>>>>> 608f0da (redireccionamientos arreglados)
];
