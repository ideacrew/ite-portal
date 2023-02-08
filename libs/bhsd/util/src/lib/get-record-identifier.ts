/* eslint-disable @typescript-eslint/naming-convention */
import { ExtractRecordData } from '@dbh/bhsd/data-access';

export const getRecordIdentifier = (payload: ExtractRecordData): string => {
  const { client_id, admission_date, record_type, treatment_type } = payload;

  const formattedDate = new Date(admission_date).toISOString().slice(0, 10);

  return `${client_id ?? 'no-client-id'}_${
    formattedDate ?? 'no-admission-date'
  }_${record_type ?? 'no-record-type'}${treatment_type ?? 'no-treatment-type'}`;
};
