import { Component, Input, OnInit } from '@angular/core';
import { Users } from 'src/app/Models/users1.model';
import { TokenStorageService } from 'src/app/Services/token-storage.service';
import { UsersService } from 'src/app/Services/users1.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  passwordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    verifyNewPassword: new FormControl('')
  });
  

  message = '';

  constructor(private usersService: UsersService, private token: TokenStorageService) { }
 

}
