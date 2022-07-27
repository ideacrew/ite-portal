export interface ExtractMetaData {
  provider_gateway_identifier: string;
  coverage_start: string;
  coverage_end: string;
  extracted_on: string;
  transaction_group: 'admission' | 'discharge';
  file_type: 'Initial';
}

export interface ExtractSubmission {
  id: string;
  coverage_end: string;
  coverage_start: string;
  submission_date: string;
  file_type: string | null;
  transaction_group: string | null;
  number_of_transactions: number;
  transaction_failure_count: number;
  transaction_warning_count: number;
}

export interface ExtractTransaction {
  _id: {
    $oid: string;
  };
  created_at: string;
  failures: TransactionIssue[];
  payload: Record<string, unknown>;
  status: 'Valid' | 'Invalid';
  updated_at: string;
  warnings: TransactionIssue[];
}

export type TransactionIssue = Record<string, string[]>;
