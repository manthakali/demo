import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project:2';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdmin = false;
  username?: string;
  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      //this.roles = user.roles;
      //this.showAdmin = this.roles.includes('ADMIN');
      //this.username = user.username;
    }
  }
  // logout(): void {
  //   this.authService.logout().subscribe({
  //     next: res => {
  //       console.log(res);
  //       this.storageService.clean();
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
    
  //   window.location.reload();
  // }
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

