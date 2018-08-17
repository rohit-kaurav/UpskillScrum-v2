import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class IterationService {

  constructor(private http: Http) { }

  private url = "http://127.0.0.1:8000/api/iterations/"

  getIterationByNameAndProjectUid(iter_data){
    return this.http.post(this.url+"verify",iter_data)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getIteration(iteration_uid){
    return this.http.get(this.url+"iteration_uid/"+iteration_uid+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getAllIterationsByProjectId(project_uid){
    return this.http.get(this.url+"project/"+project_uid+"/")
          .map(data =>{
            return JSON.parse(data['_body'])
          })
  }

  createIteration(new_iteration){
    return this.http.post(this.url+"add",new_iteration)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateIteration(iteration){
    return this.http.put(this.url+"update",iteration)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  deleteIteration(iteration_id){
    return this.http.delete(this.url+iteration_id+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }
}
