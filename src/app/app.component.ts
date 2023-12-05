import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  roads: any[] = [];
  selectedRoadId: string = '';
  roadworksData: any;
  webcamsData: any;
  chargingStationsData: any;
  restAreasData: any;
  trafficReportsData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getRoads().subscribe((data:any) => {
      this.roads = data.roads;
      this.selectedRoadId = this.roads.length > 0 ? this.roads[0] : '';
      this.onRoadSelected();
    });
  }

  onRoadSelected(): void {
    if (this.selectedRoadId) {
      this.dataService.getRoadworks(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.roadworks)) {
          this.roadworksData = data.roadworks;
  
          console.log('Roadworks Data:', this.roadworksData);
        } else {
          console.error('Invalid data format for roadworks:', data);
        }
      });
  
      this.dataService.getWebcams(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.webcam)) {
          this.webcamsData = data.webcam;
  
          console.log('Webcams Data:', this.webcamsData);
        } else {
          console.error('Invalid data format for webcams:', data);
        }
      });

      this.dataService.getRestAreas(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.parking_lorry)) {
          this.restAreasData = data.parking_lorry;
      
          console.log('Rest Areas Data:', this.restAreasData); 
        } else {
          console.error('Invalid data format for rest areas:', data);
        }
      });
      
      this.dataService.getTrafficReports(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.warning)) {
          this.trafficReportsData = data.warning;
      
          console.log('Rest Areas Data:', this.trafficReportsData); 
        } else {
          console.error('Invalid data format for rest areas:', data);
        }
      });
  
      this.dataService.getElectricChargingStations(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.electric_charging_station)) {
          this.chargingStationsData = data.electric_charging_station;
  
          console.log('Charging Stations Data:', this.chargingStationsData);
        } else {
          console.error('Invalid data format for charging stations:', data);
        }
      });
    }
  }
  
  
  
  
}
