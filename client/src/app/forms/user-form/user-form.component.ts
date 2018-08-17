import { fade, popInOut } from './../../animations/animation-effects.component.animation';
import { PasswordValidation } from './validators/password.validator';
import { UserValidation } from './validators/user.validator';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { transition, trigger, animate, style, state } from '@angular/animations';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  animations: [fade, popInOut]
})
export class UserFormComponent {

  constructor(fb: FormBuilder, private userservice: UserService, private router: Router) {
    this.userForm = fb.group({
      name: ['', Validators.required],
      username: ['',
        [Validators.required, Validators.minLength(5)],
        UserValidation.alreadyExists(this.userservice)
      ],
      passwordgroup: fb.group({
        password: ['',
          [Validators.required, Validators.minLength(5)]
        ],
        confirmpassword: ['',
          Validators.required
        ]
      }, { validator: PasswordValidation.passwordsDontMatch }),
      employeeid: ['',
        Validators.required,
        UserValidation.employeeIdAreadyExists(this.userservice)
      ],
      email: ['',
        Validators.required
      ],
      role: ['employee'],
      dob: ['',
        Validators.required
      ],
      phone: ['',
        Validators.required
      ]
    })
  }

  @Input("userData") updateUserData: any;
  @Output("updateFlag") userEmitter = new EventEmitter();

  userForm: FormGroup;
  mandatory: boolean = false;
  notifyText: string = "";
  notifyType: string = "";
  notify: boolean = false;

  ngOnInit(){
    if(this.updateUserData){
      this.role.setValue(this.updateUserData.role);
    }
  }

  get name() {
    return this.userForm.get('name');
  }

  get username() {
    return this.userForm.get('username');
  }

  get dob() {
    return this.userForm.get('dob');
  }

  get email() {
    return this.userForm.get('email');
  }

  get phone() {
    return this.userForm.get('phone');
  }

  get employeeid() {
    return this.userForm.get('employeeid');
  }

  get role() {
    return this.userForm.get('role')
  }

  get password() {
    return this.userForm.get('passwordgroup').get('password');
  }

  get confirmpassword() {
    return this.userForm.get('passwordgroup').get('confirmpassword');
  }

  get passwordgroup() {
    return this.userForm.get('passwordgroup');
  }

  onSubmit() {
    console.log("user form details ", this.userForm.value)
    if (this.userForm.valid) {
      let newUser = {
        employee_id: this.userForm.value.employeeid,
        name: this.userForm.value.name,
        username: this.userForm.value.username,
        password: this.userForm.value.passwordgroup.password,
        dob: this.getLocalDate(this.dob.value),
        email: this.userForm.value.email,
        role: this.userForm.value.role,
        phone: this.userForm.value.phone
      }
      this.userservice.createUser(newUser)
        .subscribe(
          response => {
            console.log("User creation response came ", response);
            this.showSnackBar("User Created Successfully!","success",4000);
            this.userForm.reset();
          },
          error => {
            console.log("User creation error came ", error);
            this.showSnackBar("User Creation Failed!","failure",4000);
          });
    } else {
      this.mandatory = true
      setTimeout(() => {
        this.mandatory = false
      }, 2000);
    }
  }

  updateUser(){
    if(this.role.value==this.updateUserData.role) return;
    let userData = {
      employee_id: this.updateUserData.employee_id,
      role: this.role.value
    }
    this.userservice.updateUserRole(userData).subscribe(
      data => {
        console.log("User role updated success ",data);
        this.userEmitter.emit(true);
      },error => {
        console.log("user role update failed ",error);
      }
    )
  }

  showSnackBar(message:string, type:string, interval:number){
    this.notifyText = message;
    this.notifyType = type;
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    }, interval);
  }

  getLocalDate(dateString) {
    let selectedDate = new Date(dateString);
    let localDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    return localDate.getFullYear() + "-" + (localDate.getMonth() + 1) + "-" + localDate.getDate();
  }
}