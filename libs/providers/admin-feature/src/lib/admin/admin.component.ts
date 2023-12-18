import { Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { BHSDService } from '@dbh/bhsd/data-access';
import { ProvidersDetails } from '@dbh/providers/data-access';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  providers$: Observable<ProvidersDetails> = this.bhsdService.getProvidersDetails();
  constructor(private bhsdService: BHSDService) {}

}
