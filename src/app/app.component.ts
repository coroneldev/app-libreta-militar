import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {
  IonApp,
  IonSplitPane,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonNote,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonRouterLink,
  NavController, IonCardContent, IonCardTitle, IonCard, IonCardHeader
} from '@ionic/angular/standalone';
import {addIcons} from 'ionicons';
import {
  mailOutline,
  mailSharp,
  paperPlaneOutline,
  paperPlaneSharp,
  heartOutline,
  heartSharp,
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  bookmarkOutline,
  bookmarkSharp
} from 'ionicons/icons';
import { App } from '@capacitor/app';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink,
    IonRouterOutlet, IonCardContent, IonCardTitle, IonCard, IonCardHeader],
  standalone: true
})
export class AppComponent {
  public appPages = [
    {title: 'Apuntes', url: '/apuntes', icon: 'mail'},
    {title: 'Agendas', url: '/agendas', icon: 'paper-plane'},
    {title: 'Notas', url: '/notas', icon: 'heart'},
    {title: 'Manuales', url: '/manuales', icon: 'archive'}
  ];
  public labels = [];

  constructor(private navCtrl: NavController) {
    addIcons({
      mailOutline,
      mailSharp,
      paperPlaneOutline,
      paperPlaneSharp,
      heartOutline,
      heartSharp,
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      bookmarkOutline,
      bookmarkSharp,
    });
  }

  public home() {
    this.navCtrl.navigateRoot(`/home`, {animated: true});
  }

  public salir() {
    App.exitApp();
  }

  public perfil() {
    this.navCtrl.navigateRoot(`/perfil`, {animated: true});
  }
}
