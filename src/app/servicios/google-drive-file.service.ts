import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environments';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveFileService {
  tokenClient: any;  
  accessToken: string | null = null;  

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadGoogleIdentityServices();  
    }
  }

  loadGoogleIdentityServices() {  
    if (typeof document !== 'undefined') {
      const script = document.createElement('script');  
      script.src = 'https://accounts.google.com/gsi/client';  
      script.onload = () => this.initializeGoogleIdentityServices();  
      document.body.appendChild(script);  
    }
  }

  initializeGoogleIdentityServices() { 
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.clientId,  
      scope: 'https://www.googleapis.com/auth/drive.file profile email',  
      callback: (tokenResponse: any) => {  
        if (tokenResponse.error) {
          console.error('Error obtaining token:', tokenResponse);  
        } else {
          console.log('Token obtained:', tokenResponse.access_token);  
          this.accessToken = tokenResponse.access_token;  
        }
      }
    });
  }

  signIn(callback: () => void) {  
    if (this.accessToken) {
      callback();  
    } else {
      this.tokenClient.callback = (tokenResponse: any) => {
        if (tokenResponse.error) {
          console.error('Error obtaining token:', tokenResponse);  
        } else {
          this.accessToken = tokenResponse.access_token;  
          callback();
        }
      };
      this.tokenClient.requestAccessToken();  
    }
  }

  uploadAndOpenDocument(file: File) {  
    if (!this.accessToken) {
      console.error('No access token available.');  
      return;
    }

    const fileName = file.name;  
    const mimeType = file.type;  

    const metadata = {
      name: fileName,
      mimeType: mimeType  
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));  
    form.append('file', file);  

    console.log('Uploading document to Google Drive...');
    fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
      {
        method: 'POST',
        headers: new Headers({ Authorization: 'Bearer ' + this.accessToken }),  
        body: form  
      }
    )
    .then(response => response.json())
    .then(result => {
      console.log('Document uploaded:', result.id);  
      this.openDocument(result.id, mimeType);  
    })
    .catch(error => console.error('Error uploading document:', error));  
  }

  openDocument(documentId: string, mimeType: string) {  
    let url = '';
    if (mimeType.includes('wordprocessingml')) {
      url = `https://docs.google.com/document/d/${documentId}/edit`;  
    } else if (mimeType.includes('spreadsheetml')) {
      url = `https://docs.google.com/spreadsheets/d/${documentId}/edit`;  
    } else if (mimeType.includes('presentationml')) {
      url = `https://docs.google.com/presentation/d/${documentId}/edit`;  
    } else if (mimeType === 'application/pdf') {
      url = `https://drive.google.com/file/d/${documentId}/view`;  
    } else if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
      url = `https://drive.google.com/file/d/${documentId}/view`;  
    }
    console.log('Opening document:', url);
    window.open(url, '_blank');  
  }
}
