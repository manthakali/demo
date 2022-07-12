import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  username?: string;
  public users: User[] = [];
  public editUser: User | undefined;
  public deleteUser: User | undefined;

  constructor(private userService: UserService, private router: Router, private storageService: StorageService, private authService: AuthService){
    
  }
  ngOnInit() {
    this.getUsers();
  } 
   public getUsers(): void{
    this.userService.getUsers().subscribe({
       next:(response: User[]) => {
         this.users=response;
         console.log(this.users);
         
       },
      error: (error: HttpErrorResponse) => { 
         alert(error.message);
       }
      });
   }

   public onAddUser(addForm: NgForm): void {
    document.getElementById('add-user-form')?.click();
    this.userService.addUser(addForm.value).subscribe({
      next: (response: User) => {
        console.log(response);
        this.getUsers();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
   });
  }

  public onUpdateUser(user: User): void {
    this.userService.updateUser(user).subscribe({
      next: (response: User) => {
        console.log(response);
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  public onDeleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getUsers();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }
  public searchUsers(key: string): void {
    const results: User[] = [];
    for (const user of this.users) {
      if (user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }

    this.users = results;
    if (results.length === 0 || !key) {
      this.getUsers();
    }
  }

   public onOpenModal( mode:string, user?:User):void{
    const container = document.getElementById("main-container");
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle','modal');
    if(mode==='add'){
      button.setAttribute('data-target','#addUserModal');
    }
    else if(mode==='edit'){
      this.editUser = user;
      button.setAttribute('data-target','#updateUserModal');
    }
    else if(mode==='delete'){
      this.deleteUser = user;
      button.setAttribute('data-target','#deleteUserModal');
    }
    container?.appendChild(button);
    button.click();
   }

   logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        this.router.navigate(['login']);
      },
      error: err => {
        console.log(err);
      }
    });

    window.location.reload();
  }
  }






    
 
