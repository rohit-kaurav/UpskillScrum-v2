import { fade, popInOut } from './../../animations/animation-effects.component.animation';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IterationService } from '../../services/iteration.service';

@Component({
  selector: 'iteration-form',
  templateUrl: './iteration-form.component.html',
  styleUrls: ['./iteration-form.component.css'],
  animations: [fade,popInOut]
})
export class IterationFormComponent implements OnInit {

  constructor(private iterationservice: IterationService,
              private fb: FormBuilder)
  {
    this.iterationForm = fb.group({
      iterationname: ['', Validators.required],
      description: ['',[Validators.required, Validators.minLength(5)]]
    })
  }

  @Input('project') project: any;
  @Input('iterationData') updateIterationData: any;
  @Output('updateFlag') iterationEmitter = new EventEmitter()

  iterationForm: any;
  notify: boolean = false;
  notifyText: string;
  notifyType: string;

  ngOnInit() {
    if(this.updateIterationData){
      this.iterationname.setValue(this.updateIterationData.iteration_name);
      this.description.setValue(this.updateIterationData.iteration_description);
    }
  }

  get iterationname(){
    return this.iterationForm.get('iterationname');
  }

  get description(){
    return this.iterationForm.get('description');
  }

  onSubmit(){
    if(this.iterationForm.valid){
      let iterationData = {
        project_uid: this.project.project_uid,
        iteration_name: this.iterationname.value,
        iteration_description: this.description.value
      }
      this.iterationservice.createIteration(iterationData).subscribe(
        data => {
          console.log("Iteration added success data came ",data);
          this.iterationEmitter.emit(data);
        },error => {
          console.log("Iteration add failed error ",error);
          this.showSnackBar("Iteration add failed, try again!","failure",2500);
        }
      )
    }
  }

  updateIteration(){
    if(this.iterationForm.valid){
      if(this.iterationname.value==this.updateIterationData.iteration_name && this.description.value==this.updateIterationData.iteration_description) return;
      let iterationData = {
        iteration_uid: this.updateIterationData.iteration_uid,
        iteration_name: this.iterationname.value,
        iteration_description: this.description.value
      }
      this.iterationservice.updateIteration(iterationData).subscribe(
        data => {
          console.log("iteration updated successfully ",data);
          if(data.message=="Updated Successfully."){
            this.iterationEmitter.emit(true);
          }
        }, error => {
          console.log("iteration update failed ",error);
          this.showSnackBar("Invalid data","failure",2500);
        }
      )
    }
  }

  showSnackBar(message: string, action: string,timeLimit:number){
    this.notify = true;
    this.notifyText = message;
    this.notifyType = action;
    setTimeout(()=>{
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    },timeLimit);
  }
}