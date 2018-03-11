import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allHeroRef: AngularFireList<any>;
  //:TODO esto deberia cargarse luego 
  heroesTopTenRef : AngularFireList<any>;
  // local
  allHero = [];
  heroTopTenList = [];
  galleryType = 'regular';

  constructor(public navCtrl: NavController,public db:AngularFireDatabase) {
    this.allHeroRef = this.db.list('herolist');
    this.heroesTopTenRef = this.db.list('topten/data');
    
    this.allHeroRef.snapshotChanges(['child_added']).subscribe( heroes => {
      heroes.forEach(hero => {
        this.allHero.push(hero.payload.val());
      });
    });
    /*
    this.heroesTopTenRef.snapshotChanges(['child_added']).subscribe( heroes => {
      heroes.forEach(hero => {
        this.heroTopTenList.push(hero.payload.val());
      });
    });
    */
  }

  loadTopTen(){
    this.heroesTopTenRef.snapshotChanges(['child_added']).subscribe( heroes => {
      heroes.forEach(hero => {
        this.heroTopTenList.push(hero.payload.val());
      });
    });
  }

}
