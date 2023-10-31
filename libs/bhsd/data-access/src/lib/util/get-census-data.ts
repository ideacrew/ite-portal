/* eslint-disable @typescript-eslint/naming-convention */
import {
  Metric,
  ExtractRecordValidation,
  ExtractSubmissionResponse,
  ExtractSubmissionCensusBreakdown,
} from '../models';

export const convertExtractToCensus = (
  submission: ExtractSubmissionResponse
): ExtractSubmissionCensusBreakdown => {
  const { records, coverage_start, coverage_end } = submission;
  const reportingPeriod = new Date(coverage_start);
  reportingPeriod.setUTCHours(0,0,0,0)
  const reportingPeriodEnd = new Date(coverage_end);
  reportingPeriodEnd.setUTCHours(23,59,59,999)
  const totalEpisodes = getMetrics(records);
  const censusAtStartOfReportingPeriod = getMetrics(
    records.filter(
      (record) =>
        getDate(record.payload.admission_date) !== 'Invalid' &&
        new Date(record.payload.admission_date).getTime() <
          reportingPeriod.getTime()
    )
  );
  const admissionsTransfersDuringReportingPeriod = getMetrics(
    records.filter(
      (record) =>
        getDate(record.payload.admission_date) !== 'Invalid' &&
        new Date(record.payload.admission_date).getTime() >=
          reportingPeriod.getTime() &&
        new Date(record.payload.admission_date).getTime() <=
          reportingPeriodEnd.getTime()
    )
  );
  const countOfUniqueClientsServedDuringReportingPeriod =
    getUniqueClientMetrics(records);
  const dischargesDuringReportingPeriod = getMetrics(
    records.filter(
      (record) =>
        record.payload.discharge_date &&
        getDate(record.payload.discharge_date) !== 'Invalid' &&
        new Date(record.payload.discharge_date).getTime() >=
          reportingPeriod.getTime() &&
        new Date(record.payload.discharge_date).getTime() <=
          reportingPeriodEnd.getTime()
    )
  );
  const censusAtEndOfReportingPeriod = getMetrics(
    records.filter(
      (record) =>
        record.payload.discharge_date === undefined ||
        record.payload.discharge_date === null ||
        record.payload.discharge_date === ''
    )
  );
  return {
    totalEpisodes,
    censusAtStartOfReportingPeriod,
    admissionsTransfersDuringReportingPeriod,
    dischargesDuringReportingPeriod,
    censusAtEndOfReportingPeriod,
    countOfUniqueClientsServedDuringReportingPeriod,
  };
};

export const getMetrics = (records: ExtractRecordValidation[]): Metric => {
  const total = records.length;
  const mhInitialAdmissions = records.filter(
    (record) => record.payload.record_type === 'M'
  ).length;
  const mhTransfers = records.filter(
    (record) => record.payload.record_type === 'X'
  ).length;
  const sudInitialAdmissions = records.filter(
    (record) => record.payload.record_type === 'A'
  ).length;
  const sudTransfers = records.filter(
    (record) => record.payload.record_type === 'T'
  ).length;
  const coOccurringRecords = records.filter(
    (record) => record.payload.co_occurring_sud_mh === '1'
  ).length;
  return {
    total,
    mhInitialAdmissions,
    mhTransfers,
    sudInitialAdmissions,
    sudTransfers,
    coOccurringRecords,
  };
};

export const getUniqueClientMetrics = (
  records: ExtractRecordValidation[]
): Metric => {
  const total = getGroup(records).size;
  const mhInitialAdmissions = getGroup(
    records.filter((record) => record.payload.record_type === 'M')
  ).size;
  const mhTransfers = getGroup(
    records.filter((record) => record.payload.record_type === 'X')
  ).size;
  const sudInitialAdmissions = getGroup(
    records.filter((record) => record.payload.record_type === 'A')
  ).size;
  const sudTransfers = getGroup(
    records.filter((record) => record.payload.record_type === 'T')
  ).size;
  const coOccurringRecords = getGroup(
    records.filter((record) => record.payload.co_occurring_sud_mh === '1')
  ).size;
  return {
    total,
    mhInitialAdmissions,
    mhTransfers,
    sudInitialAdmissions,
    sudTransfers,
    coOccurringRecords,
  };
};

const getDate = (dateString: string): Date | 'Invalid' => {
  const dateRegex1 = /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/\d{4}$/;
  const dateRegex2 = /^\d{4}-\d{2}-\d{2}$/;

  return dateRegex1.test(dateString) || dateRegex2.test(dateString)
    ? new Date(dateString)
    : 'Invalid';
};

const getGroup = (
  records: ExtractRecordValidation[]
): Map<string, ExtractRecordValidation[]> => {
  const groupedMap = new Map<string, ExtractRecordValidation[]>();
  for (const record of records) {
    const thisArray = groupedMap.get(record.payload.client_id);
    if (thisArray !== undefined) {
      thisArray.push(record);
    } else {
      groupedMap.set(record.payload.client_id, [record]);
    }
  }
  return groupedMap;
};
