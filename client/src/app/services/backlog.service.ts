import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BacklogService {

  constructor(private http: Http) { }

  private url = "http://127.0.0.1:8000/api/backlogs/"

  getBacklogWithNameAndProjectUid(backlog_data){
    return this.http.post(this.url+"verify",backlog_data)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getBacklogWithBacklogId(backlog_uid){
    return this.http.get(this.url+backlog_uid+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getAllBacklogsWithProject(project_uid){
    return this.http.get(this.url+"project/"+project_uid)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getAllBacklogsWithIteration(iteration_uid){
    return this.http.get(this.url+"iterations/"+iteration_uid+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  createBacklog(backlog){
    //backlog = project_uid, backlog_name, backlog_description,planned_start_date,planned_end_date, estimated_efforts
    return this.http.post(this.url+"add",backlog)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateBacklog(backlog){
    console.log("backlog info going to server ",backlog)
    return this.http.put(this.url+"update", backlog)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateBacklogAssignee(backlog){
    return this.http.put(this.url+"assign", backlog)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  deleteBacklog(backlog_uid){
    return this.http.delete(this.url+backlog_uid+"/")
          .map(data => {
            return JSON.parse(data['_body']);
          })
  }

  addComment(comment_data){
    return this.http.post(this.url+"comments/add",comment_data)
          .map(data => {
            return JSON.parse(data['_body']);
          })
  }

  deleteComment(comment_uid){
    return this.http.delete(this.url+"comments/"+comment_uid+"/")
          .map(data => {
            return JSON.parse(data['_body']);
          })
  }
}
