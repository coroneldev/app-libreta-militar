import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./Pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./Pages/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'document/:id',
    loadComponent: () => import('./Pages/document/document.page').then(m => m.DocumentPage)
  },
  {
    path: 'add-document/:id/:data',
    loadComponent: () => import('./Pages/add-document/add-document.page').then(m => m.AddDocumentPage)
  },

];
