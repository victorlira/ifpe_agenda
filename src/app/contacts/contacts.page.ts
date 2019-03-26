import { Component } from '@angular/core';
import { Contact } from '../model/contact';
import { NewContactPage } from '../new-contact/new-contact.page';
import { ModalController, ToastController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { DBService } from '../services/db.service';
import { Address } from '../model/address';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage {

  addressList: Address[];
  contacts: Contact[];

  loading: boolean;

  constructor(public modalController: ModalController, private dbService: DBService, public toastController: ToastController) {
    this.init();
  }

  private async init() {
    this.loading = true;

    await this.loadAddressList();
    await this.loadContacts();
  }

  private async loadAddressList() {
    this.addressList = await this.dbService.listWithUIDs<Address>('/address');
  }

  private async loadContacts() {
    this.dbService.listWithUIDs<Contact>('/contatos')
      .then(contacts => {
        this.contacts = contacts;
        this.associateContactAndAddress();
        this.loading = false;
      }).catch(error => {
        console.log(error);
      });
  }

  private associateContactAndAddress() {
    this.contacts.forEach(contact => {
      const contactAddress = this.addressList.filter(a => a.uid === contact.addressUID)[0];

      contact['addressText'] = contactAddress.city + '/' + contactAddress.state;
    });
  }

  async add() {
    const modal = await this.modalController.create({
      component: NewContactPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }

  private confirmAdd() {
    this.presentToast('Contato adicionado com sucesso');
    this.loadContacts();
  }

  remove(uid: string) {
    this.dbService.remove('/contatos', uid)
      .then(() => {
        this.presentToast('Contato removido com sucesso');
        this.loadContacts();
      });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async edit(contact: Contact) {
    const modal = await this.modalController.create({
      component: NewContactPage,
      componentProps: {
        editingContact: contact
      }
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd();
        }
      });

    return  await modal.present();
  }
}
