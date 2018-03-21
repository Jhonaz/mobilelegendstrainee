import { Component } from '@angular/core';
import { LoadingController, ModalController, ViewController } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

import { HeroDetailPage } from '../hero-detail/hero-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allHeroRef: AngularFireList<any>;
  //:TODO esto deberia cargarse luego 
  heroesTopTenRef : AngularFireList<any>;
  // skiilsHeroRef : AngularFireList<any>;

  // local
  allHero = [];
  heroTopTenList = [];
  skiilsHero = [];
  galleryType = 'regular';
  loading: any;

  constructor(
      public loadingCtrl: LoadingController, 
      public db:AngularFireDatabase, 
      public modalCtrl: ModalController,
      public viewCtrl: ViewController) {
    this.presentLoading();

    this.allHeroRef = this.db.list('herolist');
    this.heroesTopTenRef = this.db.list('topten/data');
    // this.skiilsHeroRef = this.db.list('skilllist');    

    this.allHeroRef.snapshotChanges(['child_added']).subscribe( heroes => {
      heroes.forEach(hero => {
        this.allHero.push(hero.payload.val());
      });
      this.loading.dismiss();
    });

    this.heroesTopTenRef.snapshotChanges(['child_added']).subscribe( heroes => {
      heroes.forEach(hero => {
        this.heroTopTenList.push(hero.payload.val());
      });
    });
  }

  presentLoading(){
    this.loading = this.loadingCtrl.create({
      content : "Cargando"
    });
    this.loading.present();
  }

  viewHeroDetail(hero){
    if(hero){
      let modal = this.modalCtrl.create(HeroDetailPage, hero);
      modal.present();
    }  
  }

}
