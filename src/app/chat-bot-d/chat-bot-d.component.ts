import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';

interface Option {
  label: string;
  key: string;
}

interface ChatData {
  title: string[];
  options: Option[];
  url?: {
    link: string[];
  };
  descriptions?: {
    text: string[];
  };
}


@Component({
  selector: 'app-chat-bot-d',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-bot-d.component.html',
  styleUrls: ['./chat-bot-d.component.css'],
  host: {
    'ngSkipHydration': ''
  }
})
export class ChatBotDComponent {
  @ViewChild('chatBox') chatBox!: ElementRef;
  @ViewChild('refBtn', { static: true }) refBtn!: ElementRef; // Referencia al botón de reinicio

  chatMessages: string[] = [];


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // Agrega un listener al botón de reinicio
    this.renderer.listen(this.refBtn.nativeElement, 'click', () => {
      this.resetChat();
    });
  }

  // Método para reiniciar el chat
  resetChat() {
    this.isVisible = true; // Muestra el chat si estaba oculto
    this.initChat(); // Llama a tu método para inicializar el chat
  }

  data: { [key: string]: ChatData } = {
    chatinit: {
      title: [
        "¡Bienvenido a Dunkey Sage!, tu compañero de consultas <span class='emoji'> &#128075;</span>"
      ],
      options: [
        { label: "1. No encuentro una función 📚", key: "encontrar" },
        { label: "2. Tengo una duda de una función ❓", key: "duda" }
      ]
    },
    encontrar: {
      title: ["Encontrar función - Por favor selecciona una categoría"],
      options: [
        { label: 'Materias', key: 'materias' },
        { label: 'Tareas', key: 'tareas' },
        { label: 'Videos compartidos', key: 'videos-compartidos' },
        // Google
        { label: 'Google Académico', key: 'google-academico' },
        { label: 'Google Traductor', key: 'google-traductor' },
        { label: 'Google Docs', key: 'google-docs' },
        // Otras secciones
        { label: 'Crear tarea', key: 'crear-tarea' },
        { label: 'Revisar tarea', key: 'revisar-tarea' },
        { label: 'Listado tareas general', key: 'listado-tareas-general' },
        { label: 'Listado entregas tareas', key: 'listado-entregas-tareas' }
      ],
      url: {
        link: [
          "/menu-principal/tareas",
          "/menu-principal/materias",
          "/menu-principal/videos-compartidos",
          // Google
          "/menu-principal/google-academico",
          "/menu-principal/google-traductor",
          "/menu-principal/google-docs",
          // Otras secciones
          "/menu-principal/crear-tareas-d",
          "/menu-principal/listado-tareas-g",
          "/menu-principal/listado-entregas-g"
        ]
      }
    },
    duda: {
      title: ["Duda - Por favor selecciona una categoría"],
      options: [
        { label: 'Materias', key: 'materias' },
        { label: 'Tareas', key: 'tareas' },
        { label: 'Videos compartidos', key: 'videos-compartidos' },
        // Google
        { label: 'Google Académico', key: 'google-academico' },
        { label: 'Google Traductor', key: 'google-traductor' },
        { label: 'Google Docs', key: 'google-docs' },
        // Otras secciones
        { label: 'Crear tarea', key: 'crear-tarea' },
        { label: 'Revisar tarea', key: 'revisar-tarea' },
        { label: 'Listado tareas general', key: 'listado-tareas-general' },
        { label: 'Listado tareas materia', key: 'listado-tareas-materia' },
        { label: 'Listado entregas tareas', key: 'listado-entregas-tareas' }
      ],
      descriptions: {
        text: [
          "Materias: Aquí podrás gestionar y visualizar todas las materias disponibles cargadas",
          "Tareas: Permite al docente crear, editar tareas, además de dar seguimiento a las entregas.",
          "Videos compartidos: Los docentes y alumnos pueden subir, gestionar y compartir recursos de video para los demas estudiantes que tengan inscrita la materia a la cual pertenece el video.",
          // Google
          "Google Académico: Acceso a recursos académicos externos para enriquecer el material didáctico.",
          "Google Traductor: Utiliza esta herramienta para ayudar con traducciones de textos en otros idiomas.",
          "Google Docs: Facilita la visualización y edición de documentos colaborativos en línea creando una copia editable en el drive del usuario.",
          // Otras secciones
          "Crear tarea: Accede a la funcionalidad para generar nuevas tareas, especificando los detalles y criterios.",
          "Revisar tarea: Aquí puedes revisar, calificar y brindar retroalimentación sobre las tareas entregadas por los estudiantes.",
          "Listado tareas general: Consulta un listado general de todas las tareas disponibles en el sistema.",
          "Listado tareas materia: Consulta un listado de todas las tareas disponibles en la materia.",
          "Listado entregas tareas: Revisa y gestiona las entregas de tareas realizadas por los estudiantes."
        ]
      }
    }
  };

  isVisible = false;

  toggleChat() {
    this.isVisible = !this.isVisible;
    if (this.isVisible) {
      this.initChat();
    }
  }

  initChat() {
    const cbot = this.chatBox.nativeElement;
    let len1 = this.data['chatinit'].title.length;
    cbot.innerHTML = '';

    for (let i = 0; i < len1; i++) {
      setTimeout(() => this.handleChat(i), i * 250);
    }

    setTimeout(() => {
      this.showOptions(this.data['chatinit'].options);
    }, (len1 + 1) * 500);
  }

  handleChat(index: number) {
    const cbot = this.chatBox.nativeElement;
    const elm = this.renderer.createElement('p');
    this.renderer.setProperty(elm, 'innerHTML', this.data['chatinit'].title[index]);
    this.renderer.addClass(elm, 'msg');
    this.renderer.appendChild(cbot, elm);
    this.handleScroll();
  }

  showOptions(options: Option[]) {
    const cbot = this.chatBox.nativeElement;

    options.forEach(option => {
      const optElem = this.renderer.createElement('div');
      this.renderer.addClass(optElem, 'opt');
      this.renderer.setProperty(optElem, 'innerHTML', option.label);
      this.renderer.listen(optElem, 'click', () => this.handleOpt(option));
      this.renderer.appendChild(cbot, optElem);
    });

    this.handleScroll(); // Asegura que la vista se desplace hacia abajo si es necesario.
  }

  handleOpt(selectedOption: Option) {
    const cbot = this.chatBox.nativeElement;
    document.querySelectorAll('.opt').forEach(el => el.remove());

    // Agregar una sección de título que muestre en qué parte del flujo te encuentras.
    const sectionTitle = this.renderer.createElement('p');
    this.renderer.addClass(sectionTitle, 'test-2');
    this.renderer.setProperty(sectionTitle, 'innerHTML', `${selectedOption.label}`);
    this.renderer.appendChild(cbot, sectionTitle);

    // Verificar si la opción seleccionada corresponde a la sección 'encontrar'
    if (selectedOption.key === 'encontrar') {
      // Mostrar las opciones correspondientes a "encontrar"
      this.handleResults(
        this.data['encontrar'].title,
        this.data['encontrar'].options,
        this.data['encontrar'].url
      );
    }
    else if (this.data['duda']) {
      const tempObj = this.data['duda'];

      if (tempObj.options && selectedOption.key === 'duda') {
        // Crear y agregar el título de la sección de dudas
        const titleElem = this.renderer.createElement('div');
        this.renderer.addClass(titleElem, 'msg');
        this.renderer.setProperty(titleElem, 'innerHTML', this.data['duda'].title[0]);
        this.renderer.appendChild(cbot, titleElem);

        this.showOptions(tempObj.options);
      } else if (tempObj.descriptions && tempObj.descriptions.text) {
        const index = tempObj.options.findIndex(option => option.key === selectedOption.key);
        if (index !== -1 && index < tempObj.descriptions.text.length) {
          this.showDescription([tempObj.descriptions.text[index]], selectedOption.key);
        } else {
          this.handleResults(tempObj.title, tempObj.options, tempObj.url);
        }
      }
    }
  }

  showDescription(description: string[], key: string) {
    const cbot = this.chatBox.nativeElement;

    // Limpiar cualquier contenido previo
    document.querySelectorAll('.rep').forEach(el => el.remove());

    // Crear un nuevo elemento para mostrar la descripción
    const elm = this.renderer.createElement('p');
    this.renderer.addClass(elm, 'rep');

    // Asegurarse de que 'description' sea una cadena de texto antes de insertarlo
    const descriptionText = description.length > 0 ? description[0] : "Descripción no disponible.";

    this.renderer.setProperty(elm, 'innerHTML', descriptionText);

    // Agregar el nuevo elemento al contenedor del chat
    this.renderer.appendChild(cbot, elm);
  }

  handleResults(title: string[], options: Option[], url?: { link: string[] }) {
    const cbot = this.chatBox.nativeElement;

    title.forEach(item => {
      const elm = this.renderer.createElement('p');
      this.renderer.setProperty(elm, 'innerHTML', item);
      this.renderer.addClass(elm, 'msg');
      this.renderer.appendChild(cbot, elm);
    });

    if (url) {
      this.handleOptions(options, url);
    } else {
      console.log('Obteniendo más opciones...');
    }
  }

  handleOptions(options: Option[], url: { link: string[] }) {
    const cbot = this.chatBox.nativeElement;

    options.forEach((option, index) => {
      const opt = this.renderer.createElement('span');
      this.renderer.setProperty(opt, 'innerHTML', `<a class="m-link" href="${url.link[index]}">${option.label}</a>`);
      this.renderer.addClass(opt, 'opt');
      this.renderer.appendChild(cbot, opt);
    });

    const moreOpt = this.renderer.createElement('span');
    this.renderer.setProperty(moreOpt, 'innerHTML', '<a class="m-link" href="#">Ver más</a>');
    this.renderer.addClass(moreOpt, 'opt link');
    this.renderer.appendChild(cbot, moreOpt);

    this.handleScroll();
  }

  handleScroll() {
    const elem = this.chatBox.nativeElement;
    elem.scrollTop = elem.scrollHeight;
  }
}
