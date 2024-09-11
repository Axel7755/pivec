import { Routes } from '@angular/router';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { VerificarDatosComponent } from './verificar-datos/verificar-datos.component';
import { LoginFormComponent } from './loging-regis/sub-componentes/login-form.component';
import { RegistroComponent } from './loging-regis/sub-componentes/registro.component';
import { LoginComponent } from './loging-regis/login.component';
import { MateriasComponent } from './materias/materias.component';
import { TareasComponent } from './tareas/tareas.component';
import { VideosCompartidosComponent } from './videos-compartidos/videos-compartidos.component';
import { GoogleAcademicoComponent } from './google-academico/google-academico.component';
import { MenuMateriaComponent } from './menu-materia/menu-materia.component';

export const routes: Routes = [

    {
        path: 'login', component: LoginComponent,
        children: [
            { path: 'login-component', component: LoginFormComponent, },
            { path: 'registro-component', component: RegistroComponent, },
            { path: 'verificar-datos', component: VerificarDatosComponent, },
        ],
    },
    {
        path: 'menu-principal', component: MenuPrincipalComponent,
        children: [
            { path: 'materias', component: MateriasComponent },
            { path: 'tareas', component: TareasComponent },
            { path: 'videos-compartidos', component: VideosCompartidosComponent },
            { path: 'google-academico', component: GoogleAcademicoComponent },
        ]
    },
    {
        path: 'menu-materia', component: MenuMateriaComponent,        
    },
    { path: 'menu-principal', redirectTo: '/menu-principal/materias', pathMatch: 'full' },
    { path: '', redirectTo: '/login/login-component', pathMatch: 'full' },
];
