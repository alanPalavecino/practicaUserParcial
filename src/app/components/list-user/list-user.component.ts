import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { UserService } from '../../services/user.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit{

  userList : User [] = [];
  filteredUsers : User [] = [];

  constructor(private userService : UserService, private route : Router){}

ngOnInit(): void {

 this.getUsers();
 
  
}

getUsers(){
  this.userService.getUsers().subscribe(users => {
    this.userList = users
    this.filterUsers();
    this.orderByLastName();
  }
  );
}

filterUsers() {
  this.filteredUsers = this.userList.filter(user => user.id % 2 === 0);
}

orderByLastName(){
  this.filteredUsers.sort((a,b)=> a.lastname.localeCompare(b.lastname))
}


deleteUserById(id : number){
  this.userService.deleteById(id).subscribe();
  this.getUsers();
}

edit(user : User){
  this.route.navigate(['/edit-user/', user.id]);
}


}
