import { Component } from '@angular/core';
import { User } from '../../user';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {


  userform = new FormGroup({
    firstname: new FormControl(''),
    lastName: new FormControl(''),
    dni: new FormControl(''),
    email: new FormControl(''),
    country: new FormControl(''),
  })

  constructor(private userService: UserService) { }

  addUser() {
    let user: User = {
      id: 0,
      firstname: this.userform.get('firstname')?.value || '',
      lastname: this.userform.get('lastName')?.value || '',
      email: this.userform.get('email')?.value ?? '',
      country: this.userform.get('country')?.value ?? ''
    };
    console.log(user);
    this.userService.addUser(user).subscribe();


  }

  

}
