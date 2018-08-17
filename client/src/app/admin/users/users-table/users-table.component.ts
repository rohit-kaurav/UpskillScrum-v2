import { ProjectService } from './../../../services/project.service';
import { UpdateUserDialogComponent } from './../../../common/dialogs/users/update-user-dialog/update-user-dialog.component';
import { DialogBoxComponent } from './../../../common/dialog-box/dialog-box.component';
import { popInOut } from './../../../animations/animation-effects.component.animation';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { UserService } from './../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
  animations: [popInOut]
})
export class UsersTableComponent implements OnInit {

  constructor(private userservice: UserService,
              private projectservice: ProjectService,
              private dialog: MatDialog)
  {
    this.currentUser = this.userservice.getCurrentUser();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: any;
  displayedColumns: string[] = ['name', 'username', 'role', 'employee_id', 'actions'];
  usersData = new MatTableDataSource<{}>();
  showForm = false;
  notifyText: string = "";
  notifyType: string = "";
  notify: boolean = false;

  ngOnInit() {
    this.getAllUsersList();
  }

  ngAfterViewInit() {
    this.usersData.paginator = this.paginator;
    this.usersData.sort = this.sort;
  }

  getAllUsersList() {
    this.userservice.getAllUsers().subscribe(
      data => {
        console.log("all users are here ", data)
        if (data.length) {
          for (let i = 0; i < data.length; i++) {
            if (data[i]['username'] == this.currentUser.username) {
              data.splice(i, 1);
            }
          }
          this.usersData.data = data;
        } else {
          this.showSnackBar("No Users added!", "other", 4000);
        }
      },
      error => {
        console.log("Error came while fetching users ", error)
        this.showSnackBar("Could not fetch users, please try later!", "other", 3000)
      }
    )
  }

  applySearch(searchValue: string) {
    console.log("searchValue", searchValue);
    searchValue = searchValue.trim();
    searchValue = searchValue.toLowerCase();
    this.usersData.filter = searchValue;
  }

  editUser(user){
    this.dialog.open(UpdateUserDialogComponent,{
      minHeight: "350px",
      minWidth: "500px",
      data: {
        user: user
      }
    }).afterClosed().subscribe(
      result => {
        if(result){
          this.getAllUsersList();
          this.showSnackBar("User updated!","success",1500);
        }
      }
    )
  }

  isUserUnassigned(user){
    if(user.role=="manager"){
      this.projectservice.getProjectWithManagerId(user.employee_id).subscribe(
        data => {
          console.log("manager is assigned success ",data);          
          if(data.message){
            this.removeUser(user.employee_id);
          }else{
            this.showSnackBar("Unable to remove "+user.name+", the manager is assigned to Project!","failure",2000);
          }
        },error => {
          console.log("manager is assigned error ",error);
          this.showSnackBar("Unable to remove "+user.name+", the manager is assigned to Project!","failure",2000);          
        }
      )
    }else if(user.role=="employee"){
      this.projectservice.getProjectWithEmployeeId(user.employee_id).subscribe(
        data => {
          console.log("employee is assigned success ",data);
          if(data.message){
            this.removeUser(user.employee_id);
          }else{
            this.showSnackBar("Unable to remove "+user.name+", the employee is assigned!","failure",2000);
          }
        },error => {
          console.log("employee is assigned error ",error);
          this.showSnackBar("Unable to remove "+user.name+", the employee is assigned!","failure",2000);          
        }
      )
    }
  }

  removeUser(id) {
    this.openDialog(this.getNameWithEmployeeId(id)).subscribe(
      data => {
        if(data){
          this.userservice.deleteUser(id).subscribe(
            data => {
              console.log("User removed successfully ", data);
              this.showSnackBar("User removed Successfully!", "success", 3000);
              this.removeUserFromTable(id);
            }, error => {
              console.log("User deletion failed ", error);
              this.showSnackBar("User not found!", "failure", 3000);
            }
          )
        }
      },error => {
        console.log("Dialog box error in users ",error);
      }
    )
  }

  openDialog(user) {
    return this.dialog.open(DialogBoxComponent, {
              minWidth: '360px',
              data: {
                title: "Remove User",
                content: "Do you want to remove user '" + user + "'?"
              }
            }).afterClosed();
  }

  getNameWithEmployeeId(id) {
    for (let i = 0; i < this.usersData.data.length; i++) {
      if (this.usersData.data[i]['employee_id'] == id) {
        return this.usersData.data[i]['name'];
      }
    }
  }

  removeUserFromTable(id) {
    for (let i = 0; i < this.usersData.data.length; i++) {
      if (this.usersData.data[i]['employee_id'] == id) {
        this.usersData.data.splice(i, 1);
        this.usersData.data = this.usersData.data;
      }
    }
  }

  showSnackBar(message: string, type: string, interval: number) {
    this.notifyText = message;
    this.notifyType = type;
    this.notify = true;
    setTimeout(() => {
      this.notify = false;
      this.notifyText = "";
      this.notifyType = "";
    }, interval);
  }
}