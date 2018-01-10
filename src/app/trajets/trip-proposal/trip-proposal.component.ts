import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
// import DirectionsService = google.maps.DirectionsService;
// import DirectionsRenderer = google.maps.DirectionsRenderer;

// declare var google: any;

@Component({
  selector: 'app-trip-proposal',
  templateUrl: './trip-proposal.component.html',
  styleUrls: ['./trip-proposal.component.css']
})
export class TripProposalComponent implements OnInit {

  @ViewChild('search')
  public searchElementRef: ElementRef;

  @ViewChild('map')
  public mapElement: ElementRef;

  map: any;
  dir = undefined; // Map directions



  start = 'chicago, il';
  end = 'chicago, il';
  // directionsService = google.maps.DirectionsService;
  // directionsDisplay = google.maps.DirectionsRenderer;




  model: any = {};
  loading = false;
  heureDepart: Date = new Date(); // géré hors formulaire

  // elements du gmap

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  constructor(private router: Router,
              private trajetService: TrajetsService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              // private directionService: DirectionsService,
              // private directionDisplay: DirectionsRenderer
  ) { }

  ngOnInit() {

    // TODO : remove
    this.model.villeDepart = 'Montpellier';
    this.model.adresseDepart = 'Place Eugene Bataillon';
    this.model.villeArrivee = 'Lyon';
    this.model.adresseArrivee = 'Gare Lyon Perrache';
    this.model.dateDepart = '2017-12-31';
    // this.model.heureDepart = '54';
    // this.model.minuteDepart = '69';
    this.model.prix = '8';
    this.model.nbPlaces = '2';

    // set google maps defaults
    this.zoom = 10;
    this.latitude = 43.610769; // coordonnées de Montpellier par défaut
    this.longitude = 3.876716;
    // create search FormControl
    this.searchControl = new FormControl();
    this.loadMapsAPILoader();
    // set current position
    this.setCurrentPosition();

    this.getDirection();

    // this.initDirectionsMap();


  }

  // private initDirectionsMap() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: google.maps.TravelMode.DRIVING
  //   }, (response, status) => {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }


  submit() {
    // console.log("Submitting new trip");
    this.loading = true;

    // transformer au format ii:ss
    const hour: string = (this.heureDepart.getHours() < 10 ? '0' : '') + this.heureDepart.getHours();
    const minutes: string = (this.heureDepart.getMinutes() < 10 ? '0' : '') + this.heureDepart.getMinutes();
    const time: string = hour + ':' + minutes;
    this.model.heureDepart = time;
    this.model.conducteur = Cookie.get('_id'); // id_conducteur


    this.trajetService.create(this.model).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    });
  }

  private loadMapsAPILoader() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: //['cities']
         ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      }); // end event listener on place_changed


    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  public getDirection() {
    this.dir = {
      origin: { lat: 24.799448, lng: 120.979021 },
      destination: { lat: 24.799524, lng: 120.975017 }
    };
  }

}
