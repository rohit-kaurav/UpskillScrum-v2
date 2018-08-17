import { UserService } from './../../../services/user.service';
import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UserValidation {

    static alreadyExists(userservice: UserService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                userservice.getUser(control.value)
                    .subscribe(
                        data => {
                            if(data.message == "Found"){
                                resolve({ alreadyExists: true })
                            }else{
                                resolve(null)
                            } 
                        },
                        error => {
                            console.log("Username validation error coming",error)
                        }
                    )
            })
        }
    }

    static employeeIdAreadyExists(userservice: UserService){
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                userservice.getUserByEmployeeId(control.value)
                    .subscribe(
                        data => {
                            if(data.message == "Found"){
                                resolve({ employeeIdAlreadyExists: true })
                            }else{
                                resolve(null)
                            } 
                        },
                        error => {
                            console.log("User employee id validation error coming",error)
                        }
                    )
            })
        }
    }
}