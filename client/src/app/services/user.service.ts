import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  constructor(private http:Http) { }

  url = "http://127.0.0.1:8000/api/users/";

  getCurrentUser(){
    let currentUser = {
      name: localStorage.getItem('name'),
      username: localStorage.getItem('username'),
      role: localStorage.getItem('role'),
      employee_id: localStorage.getItem('employee_id'),
      email: localStorage.getItem('email'),
      dob: localStorage.getItem('dob'),
      phone: localStorage.getItem('phone')
    };
    return currentUser;
  }

  getUser(username){
    return this.http.get(this.url+"verify/"+username)
          .map(data =>{
            return JSON.parse(data['_body'])
          })
  }
  getUserByEmployeeId(employee_id){
    return this.http.get(this.url+"employeeId/"+employee_id)
          .map(data =>{
            return JSON.parse(data['_body'])
          })
  }

  getAllUsers(){
    return this.http.get(this.url)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  getAllUsersByRole(role){
    return this.http.get(this.url+"role/"+role)
          .map(data => {
            return JSON.parse(data['_body']);
          })
  }

  createUser(newUser){
    return this.http.post(this.url+"add",newUser)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateUser(user){
    return this.http.put(this.url+"update",user)
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  updateUserRole(user){
    return this.http.put(this.url+"update/role",user)
          .map(data => {
            return JSON.parse(data['_body'])
          })
          .catch(error => {
            return Observable.throw(error)
          })
  }

  deleteUser(employee_id){
    return this.http.delete(this.url+employee_id+"/")
          .map(data => {
            return JSON.parse(data['_body'])
          })
  }

  authorizeUser(credentials){
    return this.http.post(this.url+"authorize",credentials)
          .map(data => {
            return JSON.parse(data['_body'])
          })
          // .catch(err => {
          //   return Observable.throw(err)
          // })
  }

  isLoggedIn(){
    if(localStorage.username) return true;
    return false;
  }

  isAdmin(){
    let currentUser = this.getCurrentUser();
    if(currentUser.role=='admin') return true;
    return false;
  }
}
