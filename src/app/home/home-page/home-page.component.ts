import { Component, OnInit } from '@angular/core';
import { HomeModel, BlogModel, Upcoming, Initiative} from 'src/app/home/home-model';
import { DatahandlerService } from '../datahandler.service';
import Typewriter from 'typewriter-effect/dist/core';
import AOS from 'aos';
import { ViewChild } from '@angular/core';

@Component({
  
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  
  i = 0;
  val: 300
  loading = false;
  regEnabled = false;
  flag = true;
  nextTxt = false;
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
    

   
    // const target2 = this.typewriterElement2.nativeElement;
    // const target3 = this.typewriterElement3.nativeElement;
    // const writer2 = new Typewriter(target2, {
    //   typeColor: "blue"
    // });
    // const writer3 = new Typewriter(target3, {
    //   typeColor: "red"
    // });

    // writer2
    //   .type("Combo typewriters to")
    //   .removeCursor()
    //   .then(writer3.start.bind(writer3))
    //   .start();

    // writer3
    //   .type("create complex effects")
    //   .rest(500)
    //   .clear()
    //   .changeTypeColor("red")
    //   .type("defy user expectations")
    //   .rest(500)
    //   .clear()
    //   .changeTypeColor("blue")
    //   .type("generate a custom loop")
    //   .rest(500)
    //   .clear()
    //   .changeTypeColor("black")
    //   .then(writer2.start.bind(writer2));
    AOS.init();

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

  ngAfterViewInit(){
    
    this.typeWriter("Be a Entrepreneur");
    this.nextTxt=false
    
    
  }

  typeWriter(txt:string){
    var element = document.getElementById("typingtext");
    console.log("first i: " + this.i);
    if (this.i < txt.length && this.flag) {
      element.innerHTML += txt.charAt(this.i);
      this.i++;
      setTimeout(()=> this.typeWriter(txt),300);
    }
    else if(this.i <6){
      if(!this.nextTxt ){
        this.nextTxt = true;
        this.flag = true;
        this.typeWriter("Be a Innovator");
      }
     
      else if (this.i <6 ){
        this.nextTxt = true;
        this.flag = true;
        this.typeWriter("Be a thinker");
        this.nextTxt=false
        
      }
      
    }
    else{
      this.flag = false;
      let str = txt.substring(0, this.i - 1);
        element.innerHTML = str;
        this.i--;
        setTimeout(()=>this.typeWriter(txt), 300);
    }
    
    
   }

  

}
