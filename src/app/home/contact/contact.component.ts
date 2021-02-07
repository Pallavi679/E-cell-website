import { Component, OnInit } from '@angular/core';
import { Upcoming, Years, Division } from 'src/app/home/home-model';
import { DatahandlerService } from '../datahandler.service';
import {ActivatedRoute} from '@angular/router';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  loading = false;

  uData:Upcoming;
  yData:Years[];
  dData: Division[];

  id:string;
  fname:string
  lname:string
  email:string
  class:string
  phone: number

  buttonText: string = "Submit"

  constructor(private dataService: DatahandlerService, private route: ActivatedRoute) { 
    
      this.dataService.setTitle('E-Cell Contact');
     
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

  contact(){
  
    console.log("HERE");
     
      const data = {
        
        fname:this.fname,
        lname: this.lname,
        email:this.email,
        phone: this.phone,

        
      };
      console.log("before register");
      this.dataService.contact (data)
      this.buttonText = 'COntact Request Sent!'
      setTimeout(() => this.buttonText = "Register", 2000)
      this.fname = ''
      this.phone
      this.lname = ''
      this.email=''
      
      
 
  }

}
