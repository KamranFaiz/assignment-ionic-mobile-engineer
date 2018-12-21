import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  Polyline,
  GoogleMapsAnimation,
  MyLocation,
  LatLng
} from '@ionic-native/google-maps';

declare var google;

/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage implements OnInit{

  map: GoogleMap;
   AIR_PORTS = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }



 

  

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    // Create a map after the view is loaded.
    // (platform is already ready in app.component.ts)
    this.map = GoogleMaps.create('map_canvas');
    this.map.getMyLocation()
    .then((location: MyLocation) => {
      console.log(JSON.stringify(location, null ,2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      })
      .then(() => {
        // add a marker
        let marker: Marker = this.map.addMarkerSync({
          position: location.latLng,
          animation: GoogleMapsAnimation.BOUNCE
        });

        // show the infoWindow
        marker.showInfoWindow();

        // If clicked it, display the alert
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
          this.showToast('clicked!');
        });
      });
    });

  }



  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

  ngOnInit(){
  setInterval(()=> {
    this.drawline(); },4000); 
  }


  drawline(){
    
    this.map.getMyLocation()
    .then((location: MyLocation) => {
    let HND_AIR_PORT = {lat: location.latLng.lat, lng: location.latLng.lng};
    
    this.AIR_PORTS.push(HND_AIR_PORT)
    

    this.map.animateCamera({target: this.AIR_PORTS});

    let polyline: Polyline = this.map.addPolylineSync({
      points: this.AIR_PORTS,
      color: '#AA00FF',
      width: 10,
      geodesic: true,
      clickable: true  // clickable = false in default
    });

    polyline.on(GoogleMapsEvent.POLYLINE_CLICK).subscribe((params: any) => {
      let position: LatLng = <LatLng>params[0];

      let marker: Marker = this.map.addMarkerSync({
        position: position,
        title: position.toUrlValue(),
        disableAutoPan: true
      });
      marker.showInfoWindow();
    });
  });
  }
  
}
