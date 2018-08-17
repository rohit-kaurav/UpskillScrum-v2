import { UserService } from './../../../services/user.service';
import { ValidationErrors, AbstractControl } from '@angular/forms';

export class PasswordValidation {

    static passwordsDontMatch(control: AbstractControl): ValidationErrors | null {
        if (control.get('password').value != control.get('confirmpassword').value) {
            return { passwordsDontMatch: true }
        }
        return null
    }

    static invalidPassword(userservice: UserService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                let credentials = {
                    username: localStorage.getItem('username'),
                    password: control.value
                }
                userservice.authorizeUser(credentials).subscribe(
                    data => {
                        console.log("Password is correct data ", data);
                        resolve(null);
                    }, error => {
                        console.log("Password is incorrect data ", error);
                        resolve({ invalidPassword: true });
                    }
                )
            })
        }
    }
}