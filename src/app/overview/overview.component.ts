import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { ChargingStation, Closure, RestArea, Roadwork, TrafficReport, Webcam } from '../data.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  roadworksLoaded: boolean = false;
  webcamsLoaded: boolean = false;
  chargingStationsLoaded: boolean = false;
  restAreasLoaded: boolean = false;
  trafficReportsLoaded: boolean = false;
  closuresLoaded: boolean = false;
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
      this.resetLoadedFlags();
      this.dataService.getRoadworks(this.selectedRoadId).subscribe((data: any) => {
        this.roadworksLoaded = true;
        if (data && Array.isArray(data.roadworks)) {
          this.roadworksData = data.roadworks;
          this.dataSource.data = this.roadworksData;
        } else {
          this.roadworksData = [];
          this.dataSource.data = [];
          console.error('Invalid data format for roadworks:', data);
        }
      });
  
      this.dataService.getWebcams(this.selectedRoadId).subscribe((data: any) => {
        this.webcamsLoaded = true;
        if (data && Array.isArray(data.webcam)) {
          this.webcamsData = data.webcam;
          this.dataSourceWebCam.data = this.webcamsData;
        } else {
          this.webcamsData = [];
          this.dataSourceWebCam.data = [];
          console.error('Invalid data format for webcams:', data);
        }
      });

      this.dataService.getRestAreas(this.selectedRoadId).subscribe((data: any) => {
        this.restAreasLoaded = true;
        if (data && Array.isArray(data.parking_lorry)) {
          this.restAreasData = data.parking_lorry;
          this.dataSourceRestArea.data = this.restAreasData;
        } else {
          this.restAreasData = [];
          this.dataSourceRestArea.data = [];
          console.error('Invalid data format for rest areas:', data);
        }
      });
      
      this.dataService.getTrafficReports(this.selectedRoadId).subscribe((data: any) => {
        this.trafficReportsLoaded = true;
        if (data && Array.isArray(data.warning)) {
          this.trafficReportsData = data.warning;
          this.dataSourceTrafficReports.data = this.trafficReportsData;
        } else {
          this.trafficReportsData = [];
          this.dataSourceTrafficReports.data = [];
          console.error('Invalid data format for traffic reports:', data);
        }
      });

      this.dataService.getSuspensions(this.selectedRoadId).subscribe((data: any) => {
        this.closuresLoaded = true;
        if (data && Array.isArray(data.closure)) {
          this.ClosuresData = data.closure;
          this.dataSourceClosure.data = this.ClosuresData;
        } else {
          this.ClosuresData = [];
          this.dataSourceClosure.data = [];
          console.error('Invalid data format for closures:', data);
        }
      });
  
      this.dataService.getElectricChargingStations(this.selectedRoadId).subscribe((data: any) => {
        this.chargingStationsLoaded = true;
        if (data && Array.isArray(data.electric_charging_station)) {
          this.chargingStationsData = data.electric_charging_station;
          this.dataSourceChargingStations.data = this.chargingStationsData;
        } else {
          this.chargingStationsData = [];
          this.dataSourceChargingStations.data = [];
          console.error('Invalid data format for charging stations:', data);
        }
      });
    }
  }

  resetLoadedFlags(): void {
    this.roadworksLoaded = false;
    this.webcamsLoaded = false;
    this.chargingStationsLoaded = false;
    this.restAreasLoaded = false;
    this.trafficReportsLoaded = false;
    this.closuresLoaded = false;
  }

  openMap(coordinates: { lat: string; long: string }): void {
    const url = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.long}`;
  
    window.open(url, '_blank');
  }
  
  openGoogleMaps() {
    const url = `/map/${this.selectedRoadId}`;
    window.open(url, '_blank');
  }
}