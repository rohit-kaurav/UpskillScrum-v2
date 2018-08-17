import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class ProjectService {

  constructor(private http: Http) { }

  url = "http://127.0.0.1:8000/api/projects/"

  getProject(project_uid){
    return this.http.get(this.url+project_uid+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getAllProjects(){
    return this.http.get(this.url)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getProjectWithManagerId(manager_id){
    return this.http.get(this.url+"manager/"+manager_id+"/")
          .map(data => {
            return JSON.parse(data['_body']);
          })
  }

  getProjectWithEmployeeId(emp_id){
    return this.http.get("http://127.0.0.1:8000/api/backlogs/projects/employees/"+emp_id)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  createProject(project){
    return this.http.post(this.url+"add",project)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateProject(project){
    return this.http.put(this.url+"update",project)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  deleteProject(project_uid){
    return this.http.delete(this.url+project_uid+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }
}
