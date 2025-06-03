import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonText, IonTitle,
  IonToolbar, NavController, ToastController
} from '@ionic/angular/standalone';
import { Register } from '../../models/register';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonCardContent, IonItem, IonInput,
    IonLabel, IonButton, IonBackButton, IonButtons, IonText, ReactiveFormsModule
  ]
})
export class RegisterPage implements OnInit {

  public registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private sesion: SesionService,
    private toastController: ToastController
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  public async register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      console.log('Datos del formulario recibidos:', formData);

      const encryptedPassword = btoa(formData.password);

      const newUser: Register = new Register(
        formData.firstName,
        '', // lastName
        '', // birthDate
        formData.email,
        encryptedPassword
      );

      await this.sesion.addDocument(newUser);

      const toast = await this.toastController.create({
        message: `Bienvenid@ ${newUser.firstName}`,
        duration: 3000,
        position: 'top',
      });
      await toast.present();

      this.navCtrl.navigateForward(`/home`);
    }
  }
}
