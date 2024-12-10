import { Injectable } from '@angular/core'; 
import { environment } from '../../environments/environments';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  title = 'PIAVC';  
  fileToUpload: string | null = null;  
  tokenClient: any;  
  accessToken: string | null = null;  

  userName: string = '';  
  userEmail: string = '';  
  userPicture: string = '';  
  profileMenuVisible: boolean = false;  

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
          this.fetchUserProfile();  
        }
      }
    });
  }

  fetchUserProfile() {  
    fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: 'Bearer ' + this.accessToken  
      }
    })
    .then(response => response.json())
    .then(data => {
      this.userName = data.name;  
      this.userEmail = data.email;  
      this.userPicture = data.picture;  
    })
    .catch(error => console.error('Error fetching profile:', error));  
  }

  signIn() {  
    if (this.accessToken) {
      return;  
    }
    this.tokenClient.requestAccessToken();  
  }

  signInAndUpload(fileURL: string, fileType: string) {  
    this.fileToUpload = fileURL;  
    if (this.accessToken) {
      this.uploadAndOpenDocument(fileType);  
    } else if (this.tokenClient) { 
      this.tokenClient.requestAccessToken();  
    } else {
      console.error('Token client is not initialized.');
    }
  }

  uploadAndOpenDocument(fileType: string) {  
    if (!this.accessToken || !this.fileToUpload) {
      console.error('No access token or file to upload.');  
      return;
    }

    const fileName = this.fileToUpload.split('/').pop();  
    const mimeType = this.getMimeType(fileName);  

    const metadata = {
      name: fileName,
      mimeType: mimeType  
    };

    fetch(this.fileToUpload)
      .then(response => response.blob())
      .then(file => {
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));  
        form.append('file', file);  

        console.log('Uploading document to Google Drive...');
        return fetch(
          'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
          {
            method: 'POST',
            headers: new Headers({ Authorization: 'Bearer ' + this.accessToken }),  
            body: form  
          }
        );
      })
      .then(response => response.json())
      .then(result => {
        console.log('Document uploaded:', result.id);  
        this.openDocument(result.id, mimeType);  
      })
      .catch(error => console.error('Error uploading document:', error));  
  }

  getMimeType(fileName: string | undefined): string {  
    if (fileName?.endsWith('.docx')) {
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';  
    } else if (fileName?.endsWith('.xlsx')) {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';  
    } else if (fileName?.endsWith('.pptx')) {
      return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';  
    } else if (fileName?.endsWith('.pdf')) {
      return 'application/pdf';  
    } else if (fileName?.endsWith('.jpg') || fileName?.endsWith('.jpeg')) {
      return 'image/jpeg';  
    } else if (fileName?.endsWith('.png')) {
      return 'image/png';  
    }
    return 'application/octet-stream';  
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

  logout() {  
    this.accessToken = null;  
    this.userName = '';  
    this.userEmail = '';  
    this.userPicture = '';  
    this.profileMenuVisible = false;  
  }

  toggleProfileMenu() {  
    this.profileMenuVisible = !this.profileMenuVisible;  
  }
}
