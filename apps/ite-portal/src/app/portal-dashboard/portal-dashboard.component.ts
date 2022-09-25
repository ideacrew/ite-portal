import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './portal-dashboard.component.html',
  styleUrls: ['./portal-dashboard.component.scss'],
})
export class PortalDashboardComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .post('https://dbh3-tableau.openhbx.org/trusted?username=dbhViewer', {})
      .subscribe({ next: (response) => console.log('success', response) });
  }
}
