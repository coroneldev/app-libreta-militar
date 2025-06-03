import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  ActionSheetController,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonSearchbar,
  IonTitle,
  IonToolbar, NavController
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {
  addSharp,
  archiveOutline, archiveSharp, bookmarkOutline, bookmarkSharp, bookSharp, calendarNumberSharp, createOutline,
  heartOutline,
  heartSharp, listSharp,
  mailOutline,
  mailSharp, newspaperSharp, openSharp,
  paperPlaneOutline,
  paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp
} from "ionicons/icons";
import {DocumentService} from "../../services/document.service";
import {ActivatedRoute} from "@angular/router";
import {FileOpener} from "@capacitor-community/file-opener";

@Component({
  selector: 'app-document',
  templateUrl: './document.page.html',
  styleUrls: ['./document.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonButton, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonItemSliding, IonItemOptions, IonItemOption, IonSearchbar]
})
export class DocumentPage implements OnInit {
  public listData: any[] = [];
  public filteredListData: any[] = [];
  public tipo: string = "";
  public searchQuery: string = '';

  constructor(private navCtrl: NavController, private documentService: DocumentService, private activatedRoute: ActivatedRoute,
              private actionSheetCtrl: ActionSheetController) {
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
      addSharp,
      openSharp,
      createOutline
    });
  }

  ngOnInit() {
    this.tipo = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.listar();
  }

  ionViewWillEnter() {
    this.listar();
  }

  public editDocument(item: any) {
    this.navCtrl.navigateForward(`/add-document/${this.tipo}/${item.id}`, {animated: true});
  }

  public async deleteDocument(id: number): Promise<void> {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Esta seguro de eliminar el siguiente documento',
      mode: 'ios',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            await this.documentService.deleteDocument(id);
            this.listar();
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete action was canceled');
          },
        },
      ],
    });
    await actionSheet.present();
  }


  public async listar() {
    this.listData = await this.documentService.filterDocumentsByType(this.tipo);
    this.listData.sort((a, b) => {
      return b.id - a.id;
    });
    this.filteredListData = [...this.listData];
  }

  public addDocument() {
    this.navCtrl.navigateForward(`/add-document/${this.tipo}/0`, {animated: true});
  }


  filterDocuments(event: any) {
    const query = event.target.value.toLowerCase();
    if (!query) {
      this.filteredListData = [...this.listData];
      return;
    }
    this.filteredListData = this.listData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  }

  async openFile(filePath: string) {
    try {
      const mimeType = this.getMimeType(filePath);
      await FileOpener.open({
        filePath: filePath,
        contentType: mimeType
      });
      console.log('Archivo abierto correctamente');
    } catch (error) {
      console.error('Error al abrir el archivo:', error);
      window.open(filePath, '_blank');
    }
  }

  private getMimeType(filePath: string): string {
    const extension = filePath.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';  // Para archivos genéricos
    }
  }
}
