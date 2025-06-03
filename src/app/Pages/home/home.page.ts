import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonButton,
  IonButtons, IonCard, IonCardContent, IonCol,
  IonContent, IonFab, IonFabButton, IonFabList, IonGrid,
  IonHeader, IonIcon,
  IonItem, IonLabel, IonList,
  IonMenuButton, IonRow, IonThumbnail,
  IonTitle,
  IonToolbar, ModalController, NavController
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";
import {
  addSharp,
  archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, bookOutline, bookSharp, calendarNumberSharp,
  heartOutline,
  heartSharp, listSharp,
  mailOutline,
  mailSharp, newspaperSharp,
  paperPlaneOutline,
  paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp
} from "ionicons/icons";
import {addIcons} from "ionicons";
import {LocalNotifications} from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonMenuButton, IonButtons, IonGrid, IonRow, IonCol, IonButton, IonCard, IonList, IonCardContent, IonLabel, IonIcon, IonThumbnail, IonFab, IonFabButton, IonFabList]
})
export class HomePage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  @ViewChild(IonFab) fab!: IonFab;

  constructor(private modalCtrl: ModalController, private navCtrl: NavController) {
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
      bookSharp,
      calendarNumberSharp,
      listSharp,
      newspaperSharp,
      addSharp
    });
  }

  ngOnInit() {
  }

  public Seleccionar(Tipo: string) {
    this.navCtrl.navigateForward(`/document/${Tipo}`, {animated: true});
  }

  public addDocument(Tipo: string) {
    this.navCtrl.navigateForward(`/add-document/${Tipo}/0`, {animated: true});
  }

  public perfil() {
  }

}
