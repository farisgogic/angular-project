import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ChargingStation, Closure, RestArea, Roadwork, TrafficReport, Webcam } from '../data.model';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  roads: any[] = [];
  selectedRoadId: string = '';
  roadworksData: Roadwork[] = [];
  webcamsData: Webcam[] = [];
  chargingStationsData: ChargingStation[] = [];
  restAreasData: RestArea[] = [];
  trafficReportsData: TrafficReport[] = [];
  ClosuresData: Closure[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Roadwork>();
  dataSourceWebCam = new MatTableDataSource<Webcam>();
  dataSourceRestArea = new MatTableDataSource<RestArea>();
  dataSourceTrafficReports = new MatTableDataSource<TrafficReport>();
  dataSourceClosure = new MatTableDataSource<Closure>();
  dataSourceChargingStations = new MatTableDataSource<ChargingStation>();

  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
    this.dataSourceWebCam.paginator = this.paginator;
    this.dataSourceRestArea.paginator = this.paginator;
    this.dataSourceTrafficReports.paginator = this.paginator;
    this.dataSourceClosure.paginator = this.paginator;
    this.dataSourceChargingStations.paginator = this.paginator;
  }

  loadData(){
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
          this.dataSource.data = this.roadworksData;
        } else {
          console.error('Invalid data format for roadworks:', data);
        }
      });
  
      this.dataService.getWebcams(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.webcam)) {
          this.webcamsData = data.webcam;
          this.dataSourceWebCam.data = this.webcamsData;
          
        } else {
          console.error('Invalid data format for webcams:', data);
        }
      });

      this.dataService.getRestAreas(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.parking_lorry)) {
          this.restAreasData = data.parking_lorry;
          this.dataSourceRestArea.data = this.restAreasData;
      
        } else {
          console.error('Invalid data format for rest areas:', data);
        }
      });
      
      this.dataService.getTrafficReports(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.warning)) {
          this.trafficReportsData = data.warning;
          this.dataSourceTrafficReports.data = this.trafficReportsData;
      
        } else {
          console.error('Invalid data format for rest areas:', data);
        }
      });

      this.dataService.getSuspensions(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.closure)) {
          this.ClosuresData = data.closure;
          this.dataSourceClosure.data = this.ClosuresData;
      
        } else {
          console.error('Invalid data format for rest areas:', data);
        }
      });
  
      this.dataService.getElectricChargingStations(this.selectedRoadId).subscribe((data: any) => {
        if (data && Array.isArray(data.electric_charging_station)) {
          this.chargingStationsData = data.electric_charging_station;
          this.dataSourceChargingStations.data = this.chargingStationsData;
  
        } else {
          console.error('Invalid data format for charging stations:', data);
        }
      });
    }
  }
  

  openMap(coordinates: { lat: string; long: string }): void {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.long}`;
  
    window.open(url, '_blank');
  }
  
  openGoogleMaps() {
    this.router.navigate(['/map', this.selectedRoadId]);
  }
}