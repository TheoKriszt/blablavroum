import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {TrajetsService} from '../trajets.service';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {} from '@types/googlemaps';
import {VehiculesService} from '../../membres/vehicules.service';

@Component({
  selector: 'app-trip-proposal',
  templateUrl: './trip-proposal.component.html',
  styleUrls: ['./trip-proposal.component.css']
})

export class TripProposalComponent implements OnInit {

  // Elements du DOM à observer / manipuler
  @ViewChild('searchFrom')
  public searchFromRef: ElementRef; // text input : départ

  @ViewChild('searchTo')
  public searchToRef: ElementRef; // text input : arrivée


  // Elements du model de Google (Maps, Directions)
  public latitude: number;  // coordonnées du centre de la carte par défaut
  public longitude: number;
  public zoom: number;      // niveau de zoom de la carte

  public searchFromControl: FormControl; // Google Places  checker : depart
  public searchToControl: FormControl;   // Google Places  checker : arrivee

  autocompleteFrom: any;  // Google Places autocomplete  : depart
  autocompleteTo: any;    // Google Places autocomplete  : arrivee

  directions = undefined; // Map directions (itineraire)


  // Elements du formulaire
  model: any = {}; // modèle champs du formulaire
  loading = false;
  heureDepart: Date = new Date(); // géré hors formulaire

  //vehicules possedés
  vehicules: any = [];


  constructor(private router: Router,
              private trajetService: TrajetsService,
              private vehiculesService: VehiculesService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.vehiculesService.getByUserID(Cookie.get('_id')).subscribe(res => {
      for (const vehicule of res) {
        this.vehicules.push({
          'label': vehicule.marque + ' ' + vehicule.modele + ', couleur ' + vehicule.couleur,
          'value': vehicule._id
        });
      }
      this.model.selectedVehicule = this.vehicules[0];
    });
    // TODO : remove
    // this.model.villeDepart = 'Montpellier';
    // this.model.adresseDepart = 'Place Eugene Bataillon';
    // this.model.villeArrivee = 'Lyon';
    // this.model.adresseArrivee = 'Gare Lyon Perrache';
    this.model.dateDepart = '2018-02-24';
    this.model.prix = '8';
    this.model.nbPlaces = '2';
    // fin todo remove

    // set google maps defaults
    this.zoom = 9;
    this.latitude = 43.610769; // coordonnées de Montpellier par défaut
    this.longitude = 3.876716;

    // create search FormControl
    this.searchFromControl = new FormControl();
    this.searchToControl = new FormControl();

    this.loadMapsAPILoader();
  }


  // soumission du formulaire
  onSubmit() {
    console.log('modele', this.model);

    if (! this.checkPlaces()) {
      return;
    }

    if ( this.model.dateDepart === undefined || this.model.prix === undefined || this.model.nbPlaces === undefined) {
      return;
    }

    this.loading = true;

    // const hours = this.heureDepart.getHours() + ''.padEnd(2, '0');
    // const minutes = this.heureDepart.getMinutes() + ''.padEnd(2, '0');


    let hours = this.heureDepart.getHours() + '';
    let minutes = this.heureDepart.getMinutes() + '';

    hours = (hours.length === 2 ? '' : '0') + hours;
    minutes = (minutes.length === 2 ? '' : '0') + minutes;

    this.model.heureDepart = hours + ':' + minutes;

    this.model.conducteur = Cookie.get('_id'); // id_conducteur

    // console.log('Envoi du formulaire : ');
    // console.log(this.model);

    this.trajetService.create(this.model).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/dashboard']);
    });
  }

  private loadMapsAPILoader() {
    this.mapsAPILoader.load().then(() => {

      this.autocompleteFrom = new google.maps.places.Autocomplete(this.searchFromRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {country: 'fr'}
      });
      this.autocompleteTo = new google.maps.places.Autocomplete(this.searchToRef.nativeElement, {
        types: ['address'],
        componentRestrictions: {country: 'fr'}
      });

      // this.autocompleteFrom.setComp
      // autocomplete.setComponentRestrictions(
      //   {'country': ['us', 'pr', 'vi', 'gu', 'mp']});


      // Quand la destination est entrée
      this.autocompleteTo.addListener('place_changed', () => this.onGooglePlaceSelected());
      this.autocompleteFrom.addListener('place_changed', () => this.onGooglePlaceSelected());

    });
  }

  checkPlaces(): boolean {
    const originPlace: google.maps.places.PlaceResult = this.autocompleteFrom.getPlace();
    const destinationPlace: google.maps.places.PlaceResult = this.autocompleteTo.getPlace();

    // verify result
    if (destinationPlace.geometry === undefined || destinationPlace.geometry === null ||
      originPlace.geometry === undefined || originPlace.geometry === null) {
      return false;
    }

    return true;
  }

  /**
   * Event handler quand un champ autocomplete de Google Places est validé
   */
  private onGooglePlaceSelected(): void {
    this.ngZone.run(() => {
      // get the place result
      const originPlace: google.maps.places.PlaceResult = this.autocompleteFrom.getPlace();
      const destinationPlace: google.maps.places.PlaceResult = this.autocompleteTo.getPlace();

      console.log('getPlace : ');
      console.log(this.autocompleteFrom.getPlace());

      // verify result
      if (! this.checkPlaces()) {
        return;
      }

      this.getDirection(originPlace, destinationPlace);
      // console.log(originPlace, destinationPlace);

      this.model.directions = this.directions;

      this.model.adresseDepart = originPlace.formatted_address;
      this.model.villeDepart = originPlace.vicinity;
      this.model.villeDepart = originPlace.vicinity;
      // this.model.villeDepart = originPlace.address_components[1].long_name;

      this.model.adresseArrivee = destinationPlace.formatted_address;
      this.model.villeArrivee = destinationPlace.vicinity;
      // this.model.villeArrivee = destinationPlace.address_components[1].long_name;
      console.log(destinationPlace);

    });
  }

  public getDirection(originPlace: google.maps.places.PlaceResult, destinationPlace: google.maps.places.PlaceResult) {
    this.directions = {
      origin: {
        lat: originPlace.geometry.location.lat(),
        lng: originPlace.geometry.location.lng() },
      destination: {
        lat: destinationPlace.geometry.location.lat(),
        lng: destinationPlace.geometry.location.lng() }
    };
  }

}
