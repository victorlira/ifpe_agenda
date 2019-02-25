import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, public toastController: ToastController, private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }


  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(result => {
        this.router.navigate(['/tabs']);
      }).catch(error => {
        this.presentToast('E-mail e/ou senha inválido(s).');
        delete this.password;
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  register() {
    this.router.navigate(['/register']);
  }
}
