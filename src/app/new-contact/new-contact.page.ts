import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Contact } from '../model/contact';
import { DBService } from '../services/db.service';
import { Address } from '../model/address';

@Component({
    selector: 'app-new-contact',
    templateUrl: 'new-contact.page.html',
    styleUrls: ['new-contact.page.scss']
})
export class NewContactPage implements OnInit {

    editingContact: Contact;

    newContact: Contact;

    addressList: Address[];

    constructor(public modalController: ModalController, private dbService: DBService) {
        this.newContact = new Contact();
        this.loadAddressList();
    }

    ngOnInit() {
        if (this.editingContact) {
            this.newContact = this.editingContact;
        }
    }

    private async loadAddressList() {
        this.addressList = await this.dbService.listWithUIDs<Address>('/address');
    }

    back() {
        this.modalController.dismiss();
    }

    save() {
        if (this.editingContact) {
            this.edit();
        } else {
            this.insert();
        }
    }

    private edit() {
        const updatingObject = { name: this.newContact.name, phone: this.newContact.phone, addressUID: this.newContact.addressUID };
        this.dbService.update('/contatos', updatingObject)
            .then(() => {
                this.modalController.dismiss(this.newContact);
            }).catch(error => {
                console.log(error);
            });
    }

    private insert() {
        this.dbService.insertInList<Contact>('/contatos', this.newContact)
            .then(() => {
                this.modalController.dismiss(this.newContact);
            }).catch(error => {
                console.log(error);
            });
    }
}
