export interface Roadwork {
    title: string;
    description: string[];
    coordinate?: { lat: string; long: string }; 
  }
  
  export interface Webcam {
    webcamName: string;
  }
  
  export interface RestArea {
    title: string;
    description: string[];
    lat?: string;
    coordinate?: { lat: string; long: string }; 
  }
  
  export interface TrafficReport {
    title: string;
    description: string[];
  }
  
  export interface ChargingStation {
    title: string;
    description: string[];
  }