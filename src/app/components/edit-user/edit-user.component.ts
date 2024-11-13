import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  userId = 0;


  userForm = new FormGroup({
    id: new FormControl(),
    firstname: new FormControl (''),
    lastname : new FormControl (''),
    email: new FormControl(''),
    country : new FormControl('') 
  })

  constructor(private userservice: UserService, private route : ActivatedRoute, private router : Router){}

  ngOnInit(): void {
    this.loadForm();
  }
  
  loadForm(){
    const useriD = +this.route.snapshot.paramMap.get('id')!;
    if(useriD){
      this.userId = useriD;
      this.userservice.getUserbyId(useriD).subscribe(user=>{
        this.userForm.setValue({
          id : user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email:user.email,
          country:user.country
        });
      });
    }

  }

  editUser() {
    let updatedUser: User = {
      id: this.userId,
      firstname: this.userForm.get('firstname')?.value || '',
      lastname: this.userForm.get('lastname')?.value || '',
      email: this.userForm.get('email')?.value || '',
      country: this.userForm.get('country')?.value || ''
    };

    this.userservice.editUser(updatedUser).subscribe();
    this.router.navigate(['']);
  }


}
