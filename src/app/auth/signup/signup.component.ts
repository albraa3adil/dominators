import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AbstractControl, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  path!:any

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')!.value;
    let confirmPass = group.get('passwordCon')!.value
    return pass === confirmPass ? null : { notSame: true }
  }
  
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    passwordCon: new FormControl('', [Validators.required]),
    terms: new FormControl(false, [Validators.required]),
  },
  { validators: this.checkPasswords }
  );

  constructor(private _auth: AuthService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    console.log(this.signupForm.controls['name']);
     
  }

  onSubmit(form?: NgForm){
    console.log(this.signupForm);
    this._auth.registerUser({
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    })
    // console.log(form);
    
  }

}
