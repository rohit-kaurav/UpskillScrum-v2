import { AbstractControl, ValidationErrors } from '@angular/forms';
import { ProjectService } from './../../services/project.service';
export class ProjectInfoValidation {

    static alreadyExists(projectservice: ProjectService) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                projectservice.getProject(control.value)
                    .subscribe(
                        data => {
                            if (data.message && data.message == "No Data Found") {
                                resolve(null)
                            } else {
                                resolve({ alreadyExists: true })
                            }
                        },
                        error => {
                            console.log("project error ", error)
                        }
                    )
            })
        }
    }
}