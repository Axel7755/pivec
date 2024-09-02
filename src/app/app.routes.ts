import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';
import { LoginComponent } from './loging-regis/login.component';
import { MateriasComponent } from './materias/materias.component';
import { TareasComponent } from './tareas/tareas.component';

export const routes: Routes = [
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 498e3e9 (cam)
=======
>>>>>>> 7d44697 (errores)
    
    {path: 'login',component: LoginComponent, 
        children: [
            {path: 'login-component', component: LoginFormComponent,},
            {path: 'registro-component',component: RegistroComponent,},
            {path: 'verificar-datos',component: VerificarDatosComponent,},
          ],
    },
    {path: 'menu-principal', component: MenuPrincipalComponent,
        children: [
            {path: 'materias', component: MateriasComponent},
            {path: 'tareas', component: TareasComponent},
        ]
    },
    {path: '', redirectTo: '/login/login-component', pathMatch: 'full'},
<<<<<<< HEAD
>>>>>>> 608f0da (redireccionamientos arreglados)
=======
=======
=======

    {path: 'menu-principal', component: MenuPrincipalComponent},
>>>>>>> f7bc1d1 (errores)
    {path: 'login-component', component: LoginFormComponent},
    {path: 'registro-component', component: RegistroComponent},
<<<<<<< HEAD
    {path: 'menu-principal', component: MenuPrincipalComponent},
=======
    {path: 'verificar-datos', component:VerificarDatosComponent},
>>>>>>> 4d05ec1 (errores)
    {path: '', redirectTo: '/login-component', pathMatch: 'full'}
>>>>>>> 5135880 (cam)
>>>>>>> 498e3e9 (cam)
];
