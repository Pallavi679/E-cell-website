import { Component, OnInit } from '@angular/core';
import { HomeModel, BlogModel, Upcoming, Initiative} from 'src/app/home/home-model';
import { DatahandlerService } from '../datahandler.service';



@Component({
  
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  val: 300

  loading = false;
  regEnabled = false;

  upDesc;
  upTitle;
  upLink;
  upId;
  upImage;

  iImage;
initiativeImg="https://firebasestorage.googleapis.com/v0/b/e-cell-sakec.appspot.com/o/Events%2Fimage_caf313b8-62db-434d-af52-b88b8d89338220200827_084531.jpg?alt=media&token=fbcbb57e-d793-43be-aaae-e3489ef73f5c";
  hData:HomeModel[]
  bData:BlogModel[]
  uData:Upcoming[]
  zData:Initiative[]
  

  constructor(private dataService: DatahandlerService) {
    this.dataService.setTitle('E-Cell Home');
   }
  

  ngOnInit() {

    this.dataService.getHomeData().subscribe((data)=>{
      this.hData = data
    });
    
    this.dataService.getBlog().subscribe((data)=>{
      this.bData = data
    });
    
    // this.dataService.getInitiative().subscribe((data)=>{
    //   this.iImage=data
    // });
   

    this.dataService.getUpcoming().subscribe((data)=>{
      this.uData = data
      this.upId = data[0].id;
      this.upTitle = data[0].title;
      this.upDesc = data[0].description;
      this.upImage = data[0].image;
      if(this.uData[0].link === 'website'){
        this.regEnabled = true;
      }
      else{
        this.upLink = data[0].link
      }
    });

  }


}
