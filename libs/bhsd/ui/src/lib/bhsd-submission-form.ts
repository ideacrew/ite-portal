import { FormControl } from '@angular/forms';

import { ExtractRecordData } from '@dbh/bhsd/data-access';

export interface BHSDSubmissionForm {
  provider_gateway_identifier: FormControl<string | null>;
  coverage_start: FormControl<string | null>;
  coverage_end: FormControl<string | null>;
  extracted_on: FormControl<string | null>;
  records: FormControl<ExtractRecordData[] | null>;
  file_type: FormControl<string | null>;
  file_name: FormControl<string | null>;
}
