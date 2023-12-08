/// <reference types="@types/googlemaps" />

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  selectedRoadId!: string;
  roadworksData: any[] = [];
  WebCamsData: any[] = [];
  restAreaData: any[] = [];
  trafficReportsData: any[] = [];
  ClosuresData: any[] = [];
  ElectricChargingStationsData: any[] = [];
  map!: google.maps.Map;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.route.params.subscribe((params) => {
      this.selectedRoadId = params['selectedRoadId'];
    });
    this.getRoadworksData();
    this.getWebCamsData();
    this.getRestAreaData();
    this.getTrafficReportsData();
    this.getClosuresData();
    this.getElectricChargingStationsData();
  }

  getRoadworksData(): void {
    this.dataService.getRoadworks(this.selectedRoadId).subscribe(
      (response) => {
        this.roadworksData = response.roadworks;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching roadworks data:', error);
      }
    );
  }

  getWebCamsData(): void {
    this.dataService.getWebcams(this.selectedRoadId).subscribe(
      (response) => {
        this.WebCamsData = response.webcam;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching webcam data:', error);
      }
    );
  }

  getRestAreaData(): void {
    this.dataService.getRestAreas(this.selectedRoadId).subscribe(
      (response) => {
        this.restAreaData = response.parking_lorry;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching rest areas data:', error);
      }
    );
  }

  getTrafficReportsData(): void {
    this.dataService.getTrafficReports(this.selectedRoadId).subscribe(
      (response) => {
        this.trafficReportsData = response.warning;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching traffic reports data:', error);
      }
    );
  }

  getClosuresData(): void {
    this.dataService.getSuspensions(this.selectedRoadId).subscribe(
      (response) => {
        this.ClosuresData = response.closure;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching closure data:', error);
      }
    );
  }
  
  getElectricChargingStationsData(): void {
    this.dataService.getElectricChargingStations(this.selectedRoadId).subscribe(
      (response) => {
        this.ElectricChargingStationsData = response.electric_charging_station;
        this.initMap();
      },
      (error) => {
        console.error('Error fetching electric charging station data:', error);
      }
    );
  }

  initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: 51.850000, lng: 11.000000 },
      zoom: 6,
    };

    this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

    this.roadworksData.forEach((roadwork) => {
      const latLng = new google.maps.LatLng(
        parseFloat(roadwork.coordinate.lat),
        parseFloat(roadwork.coordinate.long)
      );
  
      const roadworkImagePath = 'assets/images/roadworks.png';
  
      const roadworkMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: roadwork.title,
        icon: {
          url: roadworkImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const roadworkInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${roadwork.title}</strong><br><strong>Description</strong> ${roadwork.description.join('<br/>')}`,
      });
  
      roadworkMarker.addListener('click', () => {
        roadworkInfowindow.open(this.map, roadworkMarker);
      });
    });

    this.WebCamsData.forEach((webcam) => {
      const latLng = new google.maps.LatLng(
        parseFloat(webcam.coordinate.lat),
        parseFloat(webcam.coordinate.long)
      );
  
      const webcamImagePath = 'assets/images/webcam.png';
  
      const webcamMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: webcam.title,
        icon: {
          url: webcamImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const webcamInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${webcam.title}</strong><br><strong>Description</strong> ${webcam.description.join('<br/>')}`,
      });
  
      webcamMarker.addListener('click', () => {
        webcamInfowindow.open(this.map, webcamMarker);
      });
    });
  
    this.restAreaData.forEach((restArea) => {
      const latLng = new google.maps.LatLng(
        parseFloat(restArea.coordinate.lat),
        parseFloat(restArea.coordinate.long)
      );
  
      const restAreaImagePath = 'assets/images/parkingLorry.png';
  
      const restAreaMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: restArea.title,
        icon: {
          url: restAreaImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const restAreaInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${restArea.title}</strong><br><strong>Description</strong> ${restArea.description.join('<br/>')}`,
      });
  
      restAreaMarker.addListener('click', () => {
        restAreaInfowindow.open(this.map, restAreaMarker);
      });
    });

    this.trafficReportsData.forEach((warning) => {
      const latLng = new google.maps.LatLng(
        parseFloat(warning.coordinate.lat),
        parseFloat(warning.coordinate.long)
      );
  
      const warningImagePath = 'assets/images/warning.png';
  
      const warningMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: warning.title,
        icon: {
          url: warningImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const warningInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${warning.title}</strong><br><strong>Description</strong> ${warning.description.join('<br/>')}`,
      });
  
      warningMarker.addListener('click', () => {
        warningInfowindow.open(this.map, warningMarker);
      });
    });

    this.ClosuresData.forEach((closure) => {
      const latLng = new google.maps.LatLng(
        parseFloat(closure.coordinate.lat),
        parseFloat(closure.coordinate.long)
      );
  
      const closureImagePath = 'assets/images/closure.png';
  
      const closureMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: closure.title,
        icon: {
          url: closureImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const closureInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${closure.title}</strong><br><strong>Description</strong> ${closure.description.join('<br/>')}`,
      });
  
      closureMarker.addListener('click', () => {
        closureInfowindow.open(this.map, closureMarker);
      });
    });

    this.ElectricChargingStationsData.forEach((chargingStation) => {
      const latLng = new google.maps.LatLng(
        parseFloat(chargingStation.coordinate.lat),
        parseFloat(chargingStation.coordinate.long)
      );
  
      const chargingStationImagePath = 'assets/images/chargingStation.png';
  
      const chargingStationMarker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: chargingStation.title,
        icon: {
          url: chargingStationImagePath,
          scaledSize: new google.maps.Size(32, 32),
        },
      });
  
      const chargingStationInfowindow = new google.maps.InfoWindow({
        content: `<strong>Title ${chargingStation.title}</strong><br><strong>Description</strong> ${chargingStation.description.join('<br/>')}`,
      });
  
      chargingStationMarker.addListener('click', () => {
        chargingStationInfowindow.open(this.map, chargingStationMarker);
      });
    });
  }
  
}