import { PasswordValidation } from './../forms/user-form/validators/password.validator';
import { UserService } from './../services/user.service';
import { User } from './../models/user.model';
import { fade, popInOut } from './../animations/animation-effects.component.animation';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserValidation } from '../forms/user-form/validators/user.validator';

@Component({
  selector: 'my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css'],
  animations: [fade, popInOut]
})
export class MyAccountComponent {

  constructor(private fb: FormBuilder,
    private userservice: UserService) {

    this.currentUser = this.userservice.getCurrentUser();

    this.updateUserForm = fb.group({
      name: [this.currentUser.name,
      Validators.required
      ],
      username: [{ value: this.currentUser.username, disabled: true },
      [Validators.required]
      ],
      employeeid: [{ value: this.currentUser.employee_id, disabled: true }],
      email: [this.currentUser.email,
      Validators.required
      ],
      phone: [this.currentUser.phone,
      Validators.required
      ],
      dob: [this.currentUser.dob,
      Validators.required
      ]
    })

    this.passwordForm = fb.group({
      currentpassword: ['',
        Validators.required,
        PasswordValidation.invalidPassword(this.userservice)
      ],
      passwordgroup: fb.group({
        password: ['',
          [Validators.required, Validators.minLength(5)]
        ],
        confirmpassword: ['',
          Validators.required
        ]
      }, { validator: PasswordValidation.passwordsDontMatch })
    })
  }

  loading: boolean = false;
  notifyText: string = "";
  notifyType: string = "";
  notify: boolean = false;
  currentUser: any;
  updateUserForm: any;
  passwordForm: any;
  changePasswordFlag: boolean = false;

  get name() {
    return this.updateUserForm.get('name');
  }

  get username() {
    return this.updateUserForm.get('username');
  }

  get email() {
    return this.updateUserForm.get('email');
  }

  get employeeid(){
    return this.updateUserForm.get('employeeid');
  }

  get phone() {
    return this.updateUserForm.get('phone');
  }

  get dob() {
    return this.updateUserForm.get('dob');
  }

  get passwordgroup() {
    return this.passwordForm.get('passwordgroup');
  }

  get currentpassword() {
    return this.passwordForm.get('currentpassword');
  }

  get password() {
    return this.passwordForm.get('passwordgroup').get('password');
  }

  get confirmpassword() {
    return this.passwordForm.get('passwordgroup').get('confirmpassword');
  }

  onSubmit() {
    console.log("checking user form ", this.updateUserForm);
    if (this.updateUserForm.valid) {
      if(this.name.value != this.currentUser.name || this.email.value != this.currentUser.email
        || this.dob.value != this.currentUser.dob || this.phone.value != this.currentUser.phone){
        let updatedUser = {
          name: this.name.value,
          username: this.currentUser.username,
          email: this.email.value,
          employee_id: this.currentUser.employee_id,
          dob: this.getLocalDate(this.dob.value),
          phone: this.phone.value
        }
        this.userservice.updateUser(updatedUser).subscribe(
          data => {
            console.log("User Update response came ",data);
            this.showSnackBar("User Updated Successfully!","success",4000);
          },
          error => {
            console.log("User Update error came ",error);
            this.showSnackBar("User Update Failed!","failure",4000);            
          }
        )
      }else{
        this.showSnackBar("No Field is Changed!","other",4000);
      }
    } else {
      this.showSnackBar("All fields must be Valid!","failure",4000);      
    }
  }

  onSubmitPassword() {
    if(this.passwordForm.valid){
      let updatedUser = {
        employee_id: this.currentUser.employee_id,
        password: this.password.value
      }
      this.userservice.updateUser(updatedUser).subscribe(
        data => {
          console.log("Password Updated Successfully response ",data);
          this.resetPasswordForm();
          this.showSnackBar("Password changed Successfully!","success",4000);
        }, error => {
          console.log("Password change error ",error);
          this.showSnackBar("Password NOT changed!","failure",4000);
        }
      )
    }
  }

  resetForm() {
    this.name.setValue(this.currentUser.name);
    this.dob.setValue(this.currentUser.dob);
    this.email.setValue(this.currentUser.email);
    this.phone.setValue(this.currentUser.phone);
    this.username.setValue(this.currentUser.username);
    this.employeeid.setValue(this.currentUser.employee_id);
  }

  resetPasswordForm() {
    this.passwordForm.reset();
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

  getLocalDate(dateString){
    let selectedDate = new Date(dateString);
    let localDate = new Date(selectedDate.getTime() - (selectedDate.getTimezoneOffset() * 60000));
    return localDate.getFullYear() + "-" + (localDate.getMonth() + 1) + "-" + localDate.getDate();
  }
}
