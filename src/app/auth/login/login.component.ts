import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [ Validators.required,]),
  });

  constructor( private _auth:AuthService) {}

  ngOnInit(): void {
  }

  onSubmit(form?: NgForm){
    this._auth.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
    console.log(this.loginForm);
    
  }

}
