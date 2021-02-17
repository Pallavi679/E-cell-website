import { Component, OnInit } from '@angular/core';
import { Upcoming, Years, Division } from 'src/app/home/home-model';
import { DatahandlerService } from '../datahandler.service';
import {ActivatedRoute} from '@angular/router';

import { FormGroup,FormBuilder,FormControl,Validators, NgForm} from '@angular/forms';
import { error } from '@angular/compiler/src/util';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  loading = false;
  // contactusform= new FormGroup({
  //   fname: new FormControl(' ', Validators.required),
  //   lname: new FormControl(' ', Validators.required)
  // })
  // get fnamevaild(){return this.contactusform.get('fname')}
  // uData:Upcoming;
  // yData:Years[];
  // dData: Division[];

  // id:string;
  // fname:string
  // lname:string
  // email:string
  // class:string
  // phone: string

  buttonText: string = "Submit"

  constructor(private dataService: DatahandlerService, private route: ActivatedRoute) { 
    
      this.dataService.setTitle('E-Cell Contact');
     
     
  }
  // validatorsofforms(){
  //   this.fname=="^[a-ZA-Z]+$",
  //   this.lname=="^[a-ZA-Z]+$"

  // }

  // ngOnInit() {
  //   this.getData();
  //   this.getYears();
  //   this.getDivs();
  // }

  // getData(){
  //   this.id = this.route.snapshot.paramMap.get('id');
  //   this.dataService.getUpcomingData(this.id).subscribe((data)=>{
  //     this.uData = data;
  //   });

  // }

  // getYears(){
  //   this.dataService.getYears().subscribe((data)=>{
  //     this.yData = data;
  //   });
  // }

  // getDivs(){
  //   this.dataService.getDivisions().subscribe((data)=>{
  //     this.dData = data;
  //   });
  // }
  exform: FormGroup;
  ngOnInit(){
  this.exform = new FormGroup({
    'name' : new FormControl(null, Validators.required),
    'email' : new FormControl(null, [Validators.required, Validators.email]),
    'phone' : new FormControl(
      null,
      [
        Validators.required,
        Validators.pattern('^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$')
      ]),
    'message' : new FormControl(null, [Validators.required, Validators.minLength(10)])
  });
  
  }
  clicksub() {
    console.log(this.exform.value);
    this.exform.reset();
  }
  get name() {
    return this.exform.get('name');
  }
  get email() {
    return this.exform.get('email');
  }
  get phone() {
    return this.exform.get('phone');
  }
  get message() {
    return this.exform.get('message');
  }


  contact(){
  
    console.log("HERE");
     
      const data = {
        
        name:this.exform.get('name').value,
        // lname: this.lname,
        email:this.exform.get('email').value,
        phone: this.exform.get('phone').value,
        message: this.exform.get('message').value

        
      };
      console.log("before register");
      this.dataService.contact (data)
      this.buttonText = 'Contact Request Sent!'
      setTimeout(() => this.buttonText = "Register", 2000)
      this.exform.reset();
      
      
 
  }

}
