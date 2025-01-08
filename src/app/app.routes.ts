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
import { CrearTareasDComponent } from './crear-tareas-d/crear-tareas-d.component';
import { RevisarTareasDComponent } from './revisar-tareas-d/revisar-tareas-d.component';
import { ListadoTareasGeneralComponent } from './listado-tareas-general/listado-tareas-general.component';
import { ListadoEntregasTareasComponent } from './listado-entregas-tareas/listado-entregas-tareas.component';
import { AuthGuard, DocenteGuard } from './servicios/guards/auth.guard';
import { EditarTareasDComponent } from './editar-tareas-d/editar-tareas-d.component';
import { ChatBotDComponent } from './chat-bot-d/chat-bot-d.component';
import { RoomComponent } from './video-call/room/room.component';
import { InReuComponent } from './video-call/in-reu/in-reu.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { TranslatorComponent } from './translator/translator.component';
import { EditarEntregaComponent } from './editar-entrega/editar-entrega.component';
import { ClasesGrabadasComponent } from './clases-grabadas/clases-grabadas.component';
import { VerificarDatosGralComponent } from './verificar-datos-gral/verificar-datos-gral.component';
import { RestablecerPasswordComponent } from './restablecer-password/restablecer-password.component';

export const routes: Routes = [

    {
        path: 'login', component: LoginComponent,
        children: [
            { path: 'login-component', component: LoginFormComponent, },
            { path: 'registro-component', component: RegistroComponent, },
            { path: 'verificar-datos', component: VerificarDatosComponent, },
            { path: 'restablecer-password/:ident/:token', component: RestablecerPasswordComponent, },
        ],
    },
    {
        path: 'in-reu', component: InReuComponent
    },
    {
        path: 'menu-principal', component: MenuPrincipalComponent,
        children: [
            { path: 'materias', component: MateriasComponent, canActivate: [AuthGuard] },
            { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
            { path: 'videos-compartidos', component: VideosCompartidosComponent, canActivate: [AuthGuard] },
            { path: 'traductor', component: TranslatorComponent, canActivate: [AuthGuard] },
            { path: 'google-academico', component: GoogleAcademicoComponent },
            { path: 'modificar-horario', component: VerificarDatosGralComponent },
            { path: '', redirectTo: 'materias', pathMatch: 'full' },
        ]
    },
    {
        path: 'menu-materia/:idgrupos/:g_idmaterias', component: MenuMateriaComponent,
        children: [
            { path: 'general-a', component: GeneralAComponent },
            { path: 'tareas-a', component: TareasAComponent },
            { path: 'subir-tarea/:idtarea', component: SubirTareaComponent },
            // Este de video-player: reunión
            { path: 'video-player', component: VideoPlayerComponent },
            // clases-grabadas
            { path: 'clases-grabadas', component: ClasesGrabadasComponent },
            { path: 'crear-tareas-d', component: CrearTareasDComponent, canActivate: [AuthGuard, DocenteGuard] },
            { path: 'editar-tareas-d/:idtarea', component: EditarTareasDComponent, canActivate: [AuthGuard, DocenteGuard] },
            { path: 'editar-entrega-a/:idtarea', component: EditarEntregaComponent },
            { path: 'revisar-tareas-d/:e_idtareas/:e_boleta', component: RevisarTareasDComponent },
            { path: 'listado-tareas-g', component: ListadoTareasGeneralComponent },
            { path: 'listado-entregas-tareas/:idtarea', component: ListadoEntregasTareasComponent },
            { path: '', redirectTo: 'general-a', pathMatch: 'full' },

        ]
    },
    { path: 'chat-bot-d', component: ChatBotDComponent },
    {
        path: 'room/:id', component: RoomComponent,
    },
    {
        path: 'video-play', component: VideoPlayerComponent,
    },

    { path: '', redirectTo: '/login/login-component', pathMatch: 'full' },
];
