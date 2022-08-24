import { ExtractRecordData } from '../models';

export const getRecordIdentifier = (payload: ExtractRecordData): string => {
  const { client_id, admission_date, record_type, treatment_type } = payload;

  return `${client_id ?? 'no-client-id'}_${
    admission_date ?? 'no-admission-date'
  }_${record_type ?? 'no-record-type'}${treatment_type ?? 'no-treatment-type'}`;
};
