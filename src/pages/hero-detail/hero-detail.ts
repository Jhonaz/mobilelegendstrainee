import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';


@Component({
  selector: 'page-hero-detail',
  templateUrl: 'hero-detail.html',
})
export class HeroDetailPage {

  selected: any;

  constructor(public viewCtrl: ViewController, public navParams: NavParams,public db:AngularFireDatabase) {
    this.selected = navParams.data;
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
