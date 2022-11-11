import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users1.service';
import { ActivatedRoute, ResolveStart, Router } from '@angular/router';
import { Users } from 'src/app/Models/users1.model';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { identifierName } from '@angular/compiler';
import { AppComponent } from 'src/app/app.component'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input() viewMode = false;

  @Input() currentUser: Users = {
    username: '',
    email: '',
    password: '',
    roles: [],
  }

  isAdmin = false;
  message = '';

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private appComp: AppComponent) { }

  ngOnInit(): void {
    for(var name in this.currentUser.roles) {
      console.log(name)
    }



    if (!this.viewMode) {
      this.message = '';
      this.getUser(this.route.snapshot.params["id"]);
    }
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe({
        next: (data) => {
          this.currentUser = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }


  updateUser(): void {
    this.message = '';

    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message ? res.message : 'This user was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteUser(): void {
    this.userService.delete(this.currentUser.id)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/users']);
        },
        error: (e) => console.error(e)
      });
  }

  adminToggle(): void {
    this.userService.adminToggle(this.currentUser.id)
      .subscribe({
        next: (data) => {
          console.log(data);
        }
      })
  }


}
