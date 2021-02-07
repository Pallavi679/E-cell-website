import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
 } from 'angularfire2/firestore';
 import { HomeModel, BlogModel, Upcoming, Teams, Member, Registration, Years, Division, Event , Initiative, Contact, Membership} from './home-model';

import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MembershipComponent } from './membership/membership.component';

@Injectable({
  providedIn: 'root'
})
export class DatahandlerService {

  webTitle:string = "E-Cell";

  homeDataCollection: AngularFirestoreCollection<HomeModel>
  homeDataDoc: AngularFirestoreDocument<HomeModel>

  blogDataCollection: AngularFirestoreCollection<BlogModel>
  blogDataDoc: AngularFirestoreDocument<BlogModel>

  upcomingDataCollection: AngularFirestoreCollection<Upcoming>
  upcomingDataDoc: AngularFirestoreDocument<Upcoming>

  eventDataCollection: AngularFirestoreCollection<Event>
  eventDataDoc: AngularFirestoreDocument<Event>

  teamsDataCollection: AngularFirestoreCollection<Teams>
  teamsDataDoc: AngularFirestoreDocument<Teams>

  memberDataCollection: AngularFirestoreCollection<Member>
  memberDataDoc: AngularFirestoreDocument<Member>

  yearsDataCollection: AngularFirestoreCollection<Years>
  divDataCollection: AngularFirestoreCollection<Division>

  initiativeDataCollection: AngularFirestoreCollection<Initiative>
  // initiativeDataDoc: AngularFirestoreDocument<Initiative>
  arr: any[]

  registrationDataCollection: AngularFirestoreCollection<Registration>;

  contactDataCollection: AngularFirestoreCollection<Contact>;
  membershipDataCollection: AngularFirestoreCollection<Membership>;

  constructor(private afs: AngularFirestore, private titleService:Title) {
    this.homeDataCollection = this.afs.collection('homepage');
    this.blogDataCollection = this.afs.collection('blog');
    this.upcomingDataCollection = this.afs.collection('upcoming');
    this.teamsDataCollection = this.afs.collection('teams');
    this.memberDataCollection = this.afs.collection('council');
    this.yearsDataCollection = this.afs.collection('years');
    this.divDataCollection = this.afs.collection('divisions');
    this.eventDataCollection = this.afs.collection('events');
    // this.eventDataCollection=this.afs.collection('initiative');
    this.contactDataCollection = this.afs.collection('contact');
    this.membershipDataCollection=this.afs.collection('membership');
  }

  getHomeData(){
    return this.homeDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as HomeModel
        const id = a.payload.doc.id
        return {id, ...data}
      });
     }));
  }

  setTitle(title:string){
    this.titleService.setTitle(title);
  }

  getBlog(){
    return this.blogDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as BlogModel
        const id = a.payload.doc.id
        return {id, ...data}
      });
     }));
  }

  getUpcoming(){
    return this.upcomingDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Upcoming
        const id = a.payload.doc.id
        return {id, ...data}
      });
     }));
  }

  getEvents(){
    return this.eventDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Event
        const id = a.payload.doc.id
        return {id, ...data}
      });
     }));
  }

  getTeams(){
    return this.teamsDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Teams
        const id = a.payload.doc.id
        return {id, ...data}
      });
     }));
  }

  getMenbers(){
    return this.memberDataCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Member
        const id = a.payload.doc.id

        return {id, ...data}
      });
     }));
    }

    getUpcomingData(id:string){
      this.upcomingDataDoc = this.afs.doc<Upcoming>(`upcoming/${id}`)
      return this.upcomingDataDoc.valueChanges()
    }

    getEventData(id:string){
      this.eventDataDoc = this.afs.doc<Event>(`events/${id}`)
      return this.eventDataDoc.valueChanges()
    }

    register(id:string, data: Registration){
      this.registrationDataCollection = this.afs.collection(`upcoming/${id}/registrations`);
      this.registrationDataCollection.add(data);
    }
  
    contact(data: Contact){
      this.contactDataCollection.add(data);
    }

    membership(data: Membership){
      console.log(data)

      this.membershipDataCollection.add(data);
     
    }
    
    

    getYears(){
      return this.yearsDataCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Years
          const id = a.payload.doc.id
          return {id, ...data}
        });
       }));
    }
    // getInitiative(){
    //   return this.initiativeDataCollection.snapshotChanges().pipe(map(actions => {
    //     return actions.map(a => {
    //       const data = a.payload.doc.data() as Initiative
    //       const id = a.payload.doc.id
    //       return {id, ...data}
    //     });
    //    }));
    // }
    

    getDivisions(){
      return this.divDataCollection.snapshotChanges().pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Division
          const id = a.payload.doc.id
          return {id, ...data}
        });
       }));
    }

    

}
