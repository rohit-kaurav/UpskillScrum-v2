import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userservice: UserService,
              private router: Router){}

  invalidLoginFlag : boolean = false;

  loginform = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get username() {
    return this.loginform.get('username');
  }
  get password() {
    return this.loginform.get('password');
  }

  onSubmit() {
    if(this.username.value == '' || this.username.value == null || this.password.value == '' || this.password.value == null) return;
    this.userservice.authorizeUser(this.loginform.value)
      .subscribe(
        response => {
          localStorage.setItem('username',response.username)
          localStorage.setItem('name',response.name);
          localStorage.setItem('role',response.role);
          localStorage.setItem('employee_id',response.employee_id);
          localStorage.setItem('dob',response.dob);
          localStorage.setItem('email',response.email);
          localStorage.setItem('phone',response.phone);
          location.reload();
        },
        error => {
          console.log("login error ",error);
          this.invalidLoginFlag = true
        }        
      )
  }

}
