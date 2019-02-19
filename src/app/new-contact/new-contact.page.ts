import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from '../model/contact';

@Component({
    selector: 'app-new-contact',
    templateUrl: 'new-contact.page.html',
    styleUrls: ['new-contact.page.scss']
})
export class NewContactPage {

    newContact: Contact;

    constructor(public modalController: ModalController) {
        this.newContact = new Contact();
    }

    back() {
        this.modalController.dismiss();
    }

    save() {
        this.modalController.dismiss(this.newContact);
    }
}
