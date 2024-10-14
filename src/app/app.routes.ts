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
import { GeneralAComponent } from './general-a/general-a.component';
import { TareasAComponent } from './tareas-a/tareas-a.component';
import { SubirTareaComponent } from './subir-tarea/subir-tarea.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { CrearTareasDComponent } from './crear-tareas-d/crear-tareas-d.component';
import { SubirArchivosComponent } from './subir-archivos/subir-archivos.component';

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
        children:[
            { path: 'general-a', component: GeneralAComponent },
            { path: 'tareas-a', component: TareasAComponent },
            { path: 'subir-tarea', component: SubirTareaComponent },
            { path: 'video-player', component: VideoPlayerComponent },
            { path: 'crear-tareas-d', component: CrearTareasDComponent },
            { path: 'subir-archivos', component: SubirArchivosComponent },


        ]       
    },
    { path: 'menu-principal', redirectTo: '/menu-principal/materias', pathMatch: 'full' },
    { path: '', redirectTo: '/login/login-component', pathMatch: 'full' },
];
