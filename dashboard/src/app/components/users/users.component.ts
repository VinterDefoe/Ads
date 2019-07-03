import { Component, OnInit } from '@angular/core';
import {EchoService} from "../../services/echo.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private echoService: EchoService) { }

  ngOnInit() {
    this.echoService.echo.channel('redis_test').listen('TestEvent',
        (e)=>{
          console.log(e);
        });
  }

}
