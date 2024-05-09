import { Injectable } from '@angular/core';
import { Auth,GoogleAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword , signInWithPopup, signOut} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth: Auth,private firestore : AngularFirestore,private authAngular:AngularFireAuth) 
  {

  }

  register({email,password}:any)
  {
    return createUserWithEmailAndPassword(this.auth,email,password);
  }

  login({email,password}:any)
  {
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  loginWithGoogle()
  {
    return signInWithPopup(this.auth , new GoogleAuthProvider());
  }

  logout()
  {
    return signOut(this.auth);
  }
  
  async saveLoginInfo(email: string)
  {
    const loginInfo = {
      email: email,
      timestamp: new Date()
    };

    this.firestore.collection('logueados').add(loginInfo);
  }

  getUserEstado(): Observable<any> 
  {
    return this.authAngular.authState;
  }
  getUserInfo()
  {
    return this.authAngular.currentUser;
  }

  async saveMessage(usuario: Usuario) {
    usuario.hora = Timestamp.now();
    usuario.fehca = new Date(); // Agregar la fecha del día
    await this.firestore.collection('chats').add(usuario);
}
  getMessages(): Observable<any[]>
  {
    return this.firestore.collection('chats', ref => ref.orderBy('hora')).valueChanges();
  }

}
