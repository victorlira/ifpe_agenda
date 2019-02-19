import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactsPage } from './contacts.page';

import {MatInputModule} from '@angular/material/input';
import { NewContactPage } from '../new-contact/new-contact.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: ContactsPage }]),
    MatInputModule
  ],
  declarations: [ContactsPage, NewContactPage],
  entryComponents: [NewContactPage]
})
export class ContactsPageModule {}
