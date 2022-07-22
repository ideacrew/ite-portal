export interface ExtractMetaData {
  provider_gateway_identifier: string;
  coverage_start: string;
  coverage_end: string;
  extracted_on: string;
  transaction_group: 'admission' | 'discharge';
  file_type: 'Initial';
}
