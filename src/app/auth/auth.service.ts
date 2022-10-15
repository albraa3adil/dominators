import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserInfo } from 'os';
import { concatMap, of, pipe, Subject } from 'rxjs';
import { LoadingService } from '../components/shared/uiservices/loading/loading.service';
// import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user!:any
  authData!:any
  authChange= new Subject()
  nameChange= new Subject()
  isAuthed:boolean= false
  inProfile!: boolean// new Subject <boolean>()

  constructor(private router:Router, 
    public firebaseAuth: AngularFireAuth, 
    private snackbar: MatSnackBar, 
    private db: AngularFirestore,
    private _loading: LoadingService
    ) { }

  async registerUser(authData: any){
    this._loading.loadingChanged.next(true);
    await this.firebaseAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then((res)=>{
      this.authData=res
      res.user?.updateProfile({displayName: authData.name}).then(()=>{
        this.user= res.user
        // this.db.collection('users').doc(res.user?.uid).set({
        //   age:18
        // })
        console.log('sign',res);
        this.isAuthed= true
        localStorage.setItem('user',JSON.stringify(res.user))
        this.authSuccessfully()
        this._loading.loadingChanged.next(false);
      })
    }).catch((error)=>{
      console.log(error.code);
      this.snackbar.open(this.errorMSG(error.code), 'close',
      {panelClass: ['snackbar'],
      duration:5000
    })
    })
  }

  async login(authData:any){
    this._loading.loadingChanged.next(true);
    try {
    await this.firebaseAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then((res)=>{
      this.authData=res
      console.log('login',res);
      this.isAuthed= true
      localStorage.setItem('user',JSON.stringify(res.user))
      this.user= res.user
      this._loading.loadingChanged.next(false);
    },error =>{
      console.log(error.code);
      this._loading.loadingChanged.next(false);
      this.snackbar.open(this.errorMSG(error.code), 'close',{
        panelClass: ['snackbar'],
        duration:5000
      })
    }) } 
    catch (error:any) {
      console.log(error.code);
      this._loading.loadingChanged.next(false);
      this.snackbar.open(this.errorMSG(error.code), 'close',{panelClass: ['snackbar']})
    }
    this.authSuccessfully()
  }

  errorMSG(errorCode:string){
    return errorCode.slice(5,)
  }

  authSuccessfully(){
    this.authChange.next(true)
    this.router.navigate(['/system/welcome'])
  }

  logout(){
    this.firebaseAuth.signOut().then((res)=>{console.log(res);
    })
    localStorage.removeItem('user')
    this.user= null
    this.authChange.next(false)
    this.router.navigate(['/login'])
  }

  updateProfileData(profileData:any){
    // const user =this.user
    // return of(user),pipe(
    //   concatMap(user =>{
    //     if (!user) throw new Error('not authenticated')
    //     return this.updateProfile(user, profileData)
    //   })
    // )
  }

  updateProfile(user:any, data:any){

  }

  getUser(){
    return {...this.user}
  }

  getUserId(){
    return this.user.uid
  }

  isAuth(){
    
    return localStorage.getItem('user') != null;
  }
}
