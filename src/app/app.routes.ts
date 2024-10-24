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
import { RevisarTareasDComponent } from './revisar-tareas-d/revisar-tareas-d.component';
import { ListadoTareasGeneralComponent } from './listado-tareas-general/listado-tareas-general.component';
import { ListadoEntregasTareasComponent } from './listado-entregas-tareas/listado-entregas-tareas.component';
import { AuthGuard, DocenteGuard } from './servicios/guards/auth.guard';

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
            { path: 'materias', component: MateriasComponent , canActivate: [AuthGuard] },
            { path: 'tareas', component: TareasComponent , canActivate: [AuthGuard] },
            { path: 'videos-compartidos', component: VideosCompartidosComponent , canActivate: [AuthGuard]},
            { path: 'google-academico', component: GoogleAcademicoComponent },
            { path: '', redirectTo: 'materias', pathMatch: 'full' },
        ]
    },
    {
        path: 'menu-materia', component: MenuMateriaComponent, 
        children:[
            { path: 'general-a', component: GeneralAComponent },
            { path: 'tareas-a', component: TareasAComponent },
            { path: 'subir-tarea', component: SubirTareaComponent },
            { path: 'video-player', component: VideoPlayerComponent },
            { path: 'crear-tareas-d', component: CrearTareasDComponent , canActivate: [AuthGuard, DocenteGuard]},
            { path: 'revisar-tareas-d', component: RevisarTareasDComponent },
            { path: 'listado-tareas-g', component: ListadoTareasGeneralComponent },
            { path: 'listado-entregas-tareas', component: ListadoEntregasTareasComponent },
            { path: '', redirectTo: 'general-a', pathMatch: 'full' },

        ]       
    },
    { path: '', redirectTo: '/login/login-component', pathMatch: 'full' },
];
