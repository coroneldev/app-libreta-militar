import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox', // Redirige a la página inicial si no hay ruta específica
    pathMatch: 'full',
  },
  {
    path: 'folder/:id', // Página tipo genérica, puede ser usada para correos, etc.
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'register', // Página de registro
    loadComponent: () =>
      import('./Pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'home', // Página principal que muestra las actividades según el rol
    loadComponent: () =>
      import('./Pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'document/:id', // Página que muestra el listado de documentos según el tipo (ej: APUNTES, AGENDAS)
    loadComponent: () =>
      import('./Pages/document/document.page').then((m) => m.DocumentPage),
  },
  {
    path: 'add-document/:id/:data', // Página que permite agregar documentos, pasando id y tipo
    loadComponent: () =>
      import('./Pages/add-document/add-document.page').then(
        (m) => m.AddDocumentPage
      ),
  },
  
];
