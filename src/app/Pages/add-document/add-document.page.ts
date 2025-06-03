import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons,
  IonCard, IonCardContent,
  IonContent, IonDatetime, IonDatetimeButton,
  IonHeader, IonInput, IonItem, IonLabel, IonModal, IonTextarea,
  IonTitle,
  IonToolbar, NavController, ToastController
} from '@ionic/angular/standalone';
import {DocumentService} from "../../services/document.service";
import {ActivatedRoute} from "@angular/router";
import {LocalNotifications} from "@capacitor/local-notifications";

import { FileOpener } from '@capacitor-community/file-opener';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.page.html',
  styleUrls: ['./add-document.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonCard,
    IonCardContent, IonItem, IonLabel, IonInput, IonTextarea, IonButton, ReactiveFormsModule, IonDatetimeButton, IonModal, IonDatetime
  ]
})
export class AddDocumentPage implements OnInit {
  public documentForm!: FormGroup;
  public tipo: string = "";
  eventDatetime: string = '';
  public data: any;
  public content: any;

  file: any = null;
  filePath: string = '';

  constructor(private fb: FormBuilder, private navCtrl: NavController, private documentService: DocumentService,
              private activatedRoute: ActivatedRoute, private toastController: ToastController) {
  }


  async ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.tipo = params['id'];
      this.data = params['data'];
      this.initForm();
      if (this.data !== '0') {
        await this.loadDocumentData();
      }
    });
  }

  private initForm(data: any = null) {
    this.documentForm = this.fb.group({
      title: [data?.title || '', Validators.required],
      type: [this.tipo, Validators.required],
      content: [data?.content || '', Validators.required],
      event_datetime: [data?.event_datetime || ''],
      file: [data?.file || '']
    });
  }

  private async loadDocumentData() {
    try {
      const data = await this.documentService.getDocumentById(Number(this.data));
      if (data) {
        this.initForm(data);
      } else {
        console.warn("No se encontraron datos para el ID:", this.data);
      }
    } catch (error) {
      console.error("Error al cargar los datos del documento:", error);
    }
  }


  public async saveDocument() {
    let r = ``;
    if (this.documentForm.valid) {
      if (this.data == '0') {
        this.documentService.addDocument(this.documentForm.value);
        r = `registrado`;
      } else {
        this.documentForm.value.id = Number(this.data);
        this.documentService.updateDocument(this.documentForm.value);
        r = `guardado`;
      }
      const toast = await this.toastController.create({
        message: `Documento ${r} correctamente`,
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
      if (this.tipo == 'AGENDAS') {
        this.scheduleNotification();
      }
      this.navCtrl.back();
    }

  }


  private async checkPermissions() {
    const toast = await this.toastController.create({
      message: `Es necesario habilitar los permisos de notificación para poder continuar. Si no lo haces, no recibirás notificaciones.`,
      duration: 3000,
      position: 'top',
    });
    await toast.present();
    await LocalNotifications.requestPermissions();
  }

  private async scheduleNotification() {
    const title = this.documentForm.get('title')?.value;
    const content = this.documentForm.get('content')?.value;
    const eventDatetime = this.documentForm.get('event_datetime')?.value;
    const dateString = eventDatetime;
    const dateObject = new Date(dateString);
    this.checkPermissions();
    const notiId = Date.now();
    let noti: any = {
      notifications: [
        {
          title: title,
          body: content,
          id: 1,
          schedule: {at: dateObject},
          sound: null,
          attachments: null,
          actionTypeId: '',
          extra: null
        }
      ]
    };
    await LocalNotifications.schedule(noti);
  }


  async onFileSelected(event: any): Promise<void> {
    const fileInput: any = event.target as HTMLInputElement;
    const file = fileInput.files ? fileInput.files[0] : null;
    if (file) {
      try {
        const base64File = await this.readFileAsBase64(file);
        const savedFile = await this.saveFile(file.name, base64File);
        this.filePath = savedFile.uri;
        this.documentForm.get('file')?.setValue(this.filePath);
        //this.openFile(this.filePath);
      } catch (error) {
        console.error('Error al procesar el archivo:', error);
      }
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private async saveFile(fileName: string, base64: string) {
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    return savedFile;
  }



}
