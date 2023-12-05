import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  roads: any[] = [];
  selectedRoadId!: string;
  roadworksData: any;
  webcamsData: any;
  chargingStationsData: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getRoads().subscribe((data) => {
      this.roads = data.roads;
    });
  }

  onRoadSelected(): void {
    // Call other methods based on the selected road
    if (this.selectedRoadId) {
      this.dataService.getRoadworks(this.selectedRoadId).subscribe((data) => {
        this.roadworksData = data;
      });

      this.dataService.getWebcams(this.selectedRoadId).subscribe((data) => {
        this.webcamsData = data;
      });

      this.dataService.getElectricChargingStations(this.selectedRoadId).subscribe((data) => {
        this.chargingStationsData = data;
      });
    }
  }
}
