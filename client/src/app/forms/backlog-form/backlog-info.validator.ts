import { BacklogInfoComponent } from './../../backlogs/backlog-info/backlog-info.component';
import { ValidationErrors } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { BacklogFormComponent } from './backlog-form.component';
import { BacklogService } from './../../services/backlog.service';
export class BacklogInfoValidation {

    static alreadyExists(backlogservice: BacklogService, backlog: BacklogFormComponent) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                let log_data = {
                    backlog_name: control.value,
                    // project_uid: backlog.projectUid
                }
                backlogservice.getBacklogWithNameAndProjectUid(log_data)
                    .subscribe(data => {
                        if (data.message && data.message == 'No Data Found') {
                            resolve(null)
                        } else {
                            resolve({ alreadyExists: true })
                        }
                    },
                        error => {
                            console.log("Backlog Validation Error", error)
                        }
                    )
            })
        }
    }

    static nameAlreadyExists(backlogservice: BacklogService, backlog: BacklogInfoComponent) {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise((resolve, reject) => {
                let log_data = {
                    backlog_name: control.value,
                    // project_uid: backlog.projectUid
                }
                backlogservice.getBacklogWithNameAndProjectUid(log_data)
                    .subscribe(data => {
                        if (data.message && data.message == 'No Data Found') {
                            resolve(null)
                        } else {
                            resolve({ nameAlreadyExists: true })
                        }
                    },
                        error => {
                            console.log("Backlog Validation Error", error)
                        }
                    )
            })
        }
    }
}