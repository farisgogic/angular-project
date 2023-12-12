import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChargingStation, Closure, RestArea, Roadwork, TrafficReport } from './data.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://verkehr.autobahn.de/o/autobahn';

  constructor(private http: HttpClient) {}

  getRoads(): Observable<any> {
    const endpoint = `${this.apiUrl}/`;
    return this.http.get(endpoint);
  }

  getRoadworks(roadId: string): Observable<any> {
    return this.http.get<{ roadworks: Roadwork[] }>(`${this.apiUrl}/roadworks/${roadId}`);
  }

  getData(roadId: string, dataType: string, page: number, itemsPerPage: number): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/${dataType}`;
    const params = {
      page: page.toString(),
      itemsPerPage: itemsPerPage.toString(),
    };

    return this.http.get(endpoint, { params });
  }

  getRoadworkDetails(roadworkId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/roadworks/${roadworkId}`;
    return this.http.get<{ roadworks: Roadwork[] }>(endpoint);
  }

  getWebcams(roadId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/webcam`;
    return this.http.get(endpoint);
  }

  getWebcamDetails(webcamId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/webcam/${webcamId}`;
    return this.http.get(endpoint);
  }

  getRestAreas(roadId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/parking_lorry`;
    return this.http.get<{ restArea: RestArea[] }>(endpoint);
  }

  getRestAreasDetails(lorryId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/parking_lorry/${lorryId}`;
    return this.http.get<{ restArea: RestArea[] }>(endpoint);
  }

  getTrafficReports(roadId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/warning`;
    return this.http.get<{ trafficReport: TrafficReport[] }>(endpoint);
  }

  getTrafficReportDetails(warningId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/warning/${warningId}`;
    return this.http.get<{ trafficReport: TrafficReport[] }>(endpoint);
  }

  getSuspensions(roadId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/closure`;
    return this.http.get<{ closure: Closure[] }>(endpoint);
  }

  getSuspensionDetails(closureId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/closure/${closureId}`;
    return this.http.get<{ closure: Closure[] }>(endpoint);
  }

  getElectricChargingStations(roadId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/${roadId}/services/electric_charging_station`;
    return this.http.get<{ chargingStation: ChargingStation[] }>(endpoint);
  }

  getChargingStationDetails(stationId: string): Observable<any> {
    const endpoint = `${this.apiUrl}/details/electric_charging_station/${stationId}`;
    return this.http.get<{ chargingStation: ChargingStation[] }>(endpoint);
  }
}
