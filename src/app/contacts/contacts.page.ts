import { Component } from '@angular/core';
import { Contact } from '../model/contact';
import { NewContactPage } from '../new-contact/new-contact.page';
import { ModalController } from '@ionic/angular';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: 'contacts.page.html',
  styleUrls: ['contacts.page.scss']
})
export class ContactsPage {
  contactsDB: AngularFireList<Contact>;
  contacts: Observable<Contact[]>;

  constructor(db: AngularFireDatabase, public modalController: ModalController) {
    this.contactsDB = db.list<Contact>('contatos');
    this.contacts = this.contactsDB.valueChanges();
  }

  async add() {
    const modal = await this.modalController.create({
      component: NewContactPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd(result.data);
        }
      });

    return  await modal.present();
  }

  private confirmAdd(contact: Contact) {
    this.contactsDB.push(contact);
  }

  remove(contact: Contact) {
    
  }
}
