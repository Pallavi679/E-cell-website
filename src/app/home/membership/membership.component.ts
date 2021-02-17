import { Component, OnInit } from '@angular/core';
import { Upcoming, Years, Division } from 'src/app/home/home-model';
import { DatahandlerService } from '../datahandler.service';
import {ActivatedRoute} from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators, NgForm} from '@angular/forms';


@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent implements OnInit {

  loading = false;

  uData:Upcoming;
  yData:Years[];
  dData: Division[];

  id:string;
  fname:string
  lname:string
  email:string
  class:number
  contact: number
  division: number
  rollNo: number

  buttonText: string = "Submit"

  constructor(private dataService: DatahandlerService, private route: ActivatedRoute) { 
 
      this.dataService.setTitle('E-Cell Membership');
     
  }

  checkfname(event){
    event=this.fname
    if(event.valu=="^[a-ZA-Z]+$"){
      console.log("enter vaild name")
    }else{
      console.log("zdxcfgv")
    }
  }
  ngOnInit() {
    this.getData();
    this.getYears();
    this.getDivs();
  }

  getData(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.dataService.getUpcomingData(this.id).subscribe((data)=>{
      this.uData = data;
    });

  }

  getYears(){
    this.dataService.getYears().subscribe((data)=>{
      this.yData = data;
    });
  }

  getDivs(){
    this.dataService.getDivisions().subscribe((data)=>{
      this.dData = data;
    });
  }

  membership(){
  
    console.log("HERE");
     
      const data = {
        
        fname:this.fname,
        lname: this.lname,
        email:this.email,
        contact: this.contact,
        class:this.class,
        division:this.division,
        rollno:this.rollNo

        
      };
      console.log("before register");
      this.dataService.membership(data);
      this.buttonText = 'Contact Request Sent!';
      setTimeout(() => this.buttonText = "Register", 2000)
      this.fname = ''
      this.contact
      this.lname = ''
      this.email=''
      this.division
      this.rollNo
      this.class
      
      
 
  }

}
