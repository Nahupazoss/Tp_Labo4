import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        apiKey: "AIzaSyChzvJdNsnxgQOFPMpB1yP-TaILY5UIz2w",
        authDomain: "tplab-8acb1.firebaseapp.com",
        projectId: "tplab-8acb1",
        storageBucket: "tplab-8acb1.appspot.com",
        messagingSenderId: "895931676089",
        appId: "1:895931676089:web:26102a7dc2bf695e077268"
      })
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"tplab-8acb1","appId":"1:895931676089:web:26102a7dc2bf695e077268","storageBucket":"tplab-8acb1.appspot.com","apiKey":"AIzaSyChzvJdNsnxgQOFPMpB1yP-TaILY5UIz2w","authDomain":"tplab-8acb1.firebaseapp.com","messagingSenderId":"895931676089"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage())),
  ],
};