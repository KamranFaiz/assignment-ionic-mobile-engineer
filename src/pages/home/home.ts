import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private fb: Facebook, public toastCtrl: ToastController) {

  }


  login(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => {
    console.log('Logged into Facebook!', res)
    this.showToast('Logged into Facebook!')
    this.navCtrl.push('LocationPage');
  })
  .catch(e => {
     this.showToast('Error logging into Facebook');
});

  
// this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

}
