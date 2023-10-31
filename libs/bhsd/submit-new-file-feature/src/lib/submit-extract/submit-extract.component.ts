/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable unicorn/no-null */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { lastDayOfMonth } from 'date-fns';
import { HttpErrorResponse } from '@angular/common/http';

import { BHSDService, ExtractRecordData } from '@dbh/bhsd/data-access';
import { AuthService } from '@dbh/auth';
import {
  BHSDSubmissionForm,
  coveragePeriodNotTooLong,
  dateNotInFuture,
  extractDateWithinCoveragePeriod,
  startDateNotAfterEndDate,
} from '@dbh/bhsd/ui';
// https://alberthaff.dk/projects/ngx-papaparse/docs/v8/introduction
import { Papa } from 'ngx-papaparse';

@Component({
  templateUrl: './submit-extract.component.html',
  styleUrls: ['./submit-extract.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmitExtractComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  title = 'ite-portal';
  debug = false;
  sendingData = new BehaviorSubject(false);
  sendingData$ = this.sendingData.asObservable().pipe(shareReplay(1));
  result = new Subject<string | null>();
  result$ = this.result.asObservable();
  resultsMessage = false;
  errorMessage: undefined | string = undefined;
  largeFileWarning = false;
  closedFrom = '31 Oct 2023 23:00:00 UTC';
  closedUntil = '01 Nov 2023 10:00:00 UTC';
  //closedWarning = this.checkIfClosedWarning(this.closedUntil, this.closedFrom);
  closedWarning = false;

  extractForm!: FormGroup<BHSDSubmissionForm>;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private bhsdService: BHSDService,
    private authService: AuthService,
    private papa: Papa
  ) {}

  ngOnInit(): void {
    this.getFormData();
  }

  private createExtractForm(): FormGroup<BHSDSubmissionForm> {
    const providerGatewayIdentifier =
      this.authService.providerGatewayId ?? '000';
    const coverageStart = this.lastMonthStart.toISOString().slice(0, 10);
    const coverageEnd = this.lastMonthEnd.toISOString().slice(0, 10);

    return this.fb.group<BHSDSubmissionForm>(
      {
        provider_gateway_identifier: new FormControl<string | null>(
          providerGatewayIdentifier,
          Validators.required
        ),
        coverage_start: new FormControl<string | null>(coverageStart, [
          Validators.required,
          dateNotInFuture,
        ]),
        coverage_end: new FormControl<string | null>(coverageEnd, [
          Validators.required,
          dateNotInFuture,
        ]),
        extracted_on: new FormControl<string | null>('', [
          Validators.required,
          dateNotInFuture,
        ]),
        records: new FormControl<ExtractRecordData[] | null>(
          null,
          Validators.required
        ),
        file_name: new FormControl<string | null>(''),
        file_type: new FormControl<string | null>(
          'Initial',
          Validators.required
        ),
      },
      {
        validators: [
          startDateNotAfterEndDate,
          coveragePeriodNotTooLong,
          extractDateWithinCoveragePeriod,
        ],
      }
    );
  }

  private getFormData(): void {
    this.extractForm = this.createExtractForm();
  }

  checkIfClosedWarning(closedUntil: string, closedFrom: string): boolean {
    const now = new Date();
    const now_utc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(),
                now.getUTCDate(), now.getUTCHours(),
                now.getUTCMinutes(), now.getUTCSeconds());
    const closedFromDate = Date.parse(closedFrom);
    const closedUntilDate = Date.parse(closedUntil);
    return (closedFromDate <= now_utc) &&  (now_utc <= closedUntilDate);
  }

  public resetMessages(): void {
    this.sendingData.next(false);
    this.resultsMessage = false;
    this.errorMessage = undefined;
    this.largeFileWarning = false;
    this.cdr.detectChanges();
  }

  public sendData(): void {
    if (this.extractForm.status === 'VALID') {
      this.sendingData.next(true);
      this.result.next(null);
      this.bhsdService.sendData(this.extractForm.value).subscribe({
        next: () => {
          this.sendingData.next(false);
          this.resultsMessage = true;
          this.errorMessage = undefined;
          setTimeout(() => {
            this.resultsMessage = false;
            this.largeFileWarning = false;
            this.cdr.detectChanges();
          }, 10_000);
          this.extractForm.reset({
            provider_gateway_identifier:
              this.authService.providerGatewayId ?? '000',
            coverage_start: this.lastMonthStart.toISOString().slice(0, 10),
            coverage_end: this.lastMonthEnd.toISOString().slice(0, 10),
            extracted_on: '',
          });
          if (this.fileInput.nativeElement) {
            this.fileInput.nativeElement.value = '';
          }
        },
        error: (error: HttpErrorResponse) => {
          this.resultsMessage = false;
          this.largeFileWarning = false;
          this.sendingData.next(false);
          if (error && error.error) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            this.errorMessage = error.error;
          }
          this.cdr.detectChanges();
        },
      });
    }
  }

  public fileSelected(files: FileList | null): void {
    if (files) {
      this.records.setValue(null);
      const file: File | null = files.item(0);
      if (file) {
        this.extractForm.controls['file_type'].setValue(file.type);
        const reader = new FileReader();
        const fileName = file.name;
        reader.readAsText(file);
        reader.addEventListener('load', () => {
          const csvText = reader.result as string;
          // const recordData: ExtractRecordData[] = convertCsvToJson(csvText);
          const recordData: ExtractRecordData[] = this.papa.parse(csvText, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => results.data,
          }).data;

          // Sheets uses a return and newline for each new row
          if (recordData.length > 0) {
            this.extractForm.patchValue({
              records: recordData,
              file_name: fileName,
            });
            // console.log(recordData);
            this.largeFileWarning = recordData.length >= 1000 ? true : false;
            this.cdr.detectChanges();
          } else {
            this.largeFileWarning = false;
            this.records.setErrors({ notValidCsv: true });
            this.cdr.detectChanges();
          }
        });
      }
    }
  }

  get lastMonthStart(): Date {
    const thisMonth = new Date().getMonth();
    const lastMonth = thisMonth - 1;

    return new Date(new Date().getFullYear(), lastMonth, 1);
  }

  get lastMonthEnd(): Date {
    return lastDayOfMonth(this.lastMonthStart);
  }

  // These are helper methods to get at the FormControl object in the template
  get coverage_start(): FormControl<string | null> {
    return this.extractForm.get('coverage_start') as FormControl<string | null>;
  }

  get coverage_end(): FormControl<string | null> {
    return this.extractForm.get('coverage_end') as FormControl<string | null>;
  }

  get extracted_on(): FormControl<string | null> {
    return this.extractForm.get('extracted_on') as FormControl<string | null>;
  }

  get records(): FormControl<Array<Record<string, unknown>> | null> {
    return this.extractForm.get('records') as FormControl<Array<
      Record<string, unknown>
    > | null>;
  }
}
