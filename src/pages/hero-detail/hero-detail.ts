import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-hero-detail',
  templateUrl: 'hero-detail.html',
})
export class HeroDetailPage {

  skiilsHeroRef : AngularFireList<any>;
  skiilsHeroes = [];
  skillsSelected = [];
  selected: any;
  

  constructor(public viewCtrl: ViewController, public navParams: NavParams,public db:AngularFireDatabase) {
    console.log("hola constructod")
    this.selected = navParams.data;

    this.skiilsHeroRef = this.db.list('skilllist'); 
    
    this.skiilsHeroRef.snapshotChanges(['child_added']).subscribe( skills => {
      skills.forEach(skill => {
        this.skiilsHeroes.push(skill.payload.val());
        // console.log(skill.payload.val());
      });

      this.skiilsHeroes.map( data => {
        if(data.id == `${this.selected.id}10` || data.id == `${this.selected.id}20` || data.id == `${this.selected.id}30` || data.id == `${this.selected.id}40`){
          this.skillsSelected.push(data);
        }
      });
    }); 
  }

  // loadSkill(id) { 
  //   let min = `${id}00`;
  //   let max = `${id+1}00`;
    
  //   console.log(`max es ${max} y min es ${min}`);
  //   this.skiilsHeroes.map( data => {
  //     if(data.id == `${id}10` || data.id == `${id}20` || data.id == `${id}30` || data.id == `${id}40`){
  //       this.skillsSelected.push(data);
  //     }
  //   });
  // }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
