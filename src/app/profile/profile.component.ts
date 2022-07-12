import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { data } from 'autoprefixer';
import { User } from '../_models/user';
import { ProfileserviceService } from '../_services/profile.service';
import { StorageService } from '../_services/storage.service';
import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User[] = [];
  currentUser: any;
  userService!: UserService;
  //userId!: number;
  username!: string;

  constructor(private storageService: StorageService, userService: UserService, private profileService: ProfileserviceService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
   //this.currentUser = this.userService.getUsers();
  }

  getProfile() {
    this.profileService.getProfileByUserName(this.currentUser.get(this.username)).subscribe(data => {
      next: (response: User) => {
        console.log(response);
        this.getProfile();

      }
    })
  }


  editProfile(addForm: NgForm){
    document.getElementById('profile-form')?.click();
    this.userService.updateUser(addForm.value).subscribe({
      next: (response: User) => {
        console.log(response);
        this.getProfile();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
   });
  }
    }