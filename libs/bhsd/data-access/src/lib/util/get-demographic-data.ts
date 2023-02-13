/* eslint-disable unicorn/no-useless-undefined */
/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  DemographicData,
  ExtractRecordValidation,
  ExtractSubmissionResponse,
  ExtractSubmissionDemographics,
} from '../models';

type humanMap = {
  text: string;
  dataValue: string;
};

export const convertExtractToDemographics = (
  submission: ExtractSubmissionResponse
): ExtractSubmissionDemographics => {
  const { records } = submission;
  const recordCount = records.length;

  const genders = getGenderBreakdown(records);
  const races = getRaceBreakdown(records);
  const ethnicities = getEthnicityBreakdown(records);
  const ages = getAgeBreakdown(records);
  return { recordCount, genders, races, ethnicities, ages };
};

export const getGenderBreakdown = (
  records: ExtractRecordValidation[]
): DemographicData[] => {
  const genders = records.map((record) => record.payload.gender);
  const genderOptions: humanMap[] = [
    { dataValue: '1', text: 'Male' },
    { dataValue: '2', text: 'Female' },
    { dataValue: '3', text: 'Transgender Male' },
    { dataValue: '4', text: 'Transgender Female' },
    { dataValue: '5', text: 'Transgender, Not Specified' },
    { dataValue: '6', text: 'Non-conforming Gender' },
    { dataValue: '95', text: 'Prefer Not to Disclose' },
    { dataValue: '97', text: 'Unknown' },
    { dataValue: '98', text: 'Not Collected' },
  ];
  return getDemographics(genders, genderOptions);
};

export const getRaceBreakdown = (
  records: ExtractRecordValidation[]
): DemographicData[] => {
  const races = records.map((record) => record.payload.race);
  const raceOptions: humanMap[] = [
    { dataValue: '1', text: 'Alaskan native (Aleut,Eskimo)' },
    { dataValue: '2', text: 'American Indian/Alaska native' },
    { dataValue: '3', text: 'Asian or Pacific Islander' },
    { dataValue: '4', text: 'Black or African American' },
    { dataValue: '5', text: 'White' },
    { dataValue: '13', text: 'Asian' },
    { dataValue: '20', text: 'Other single race' },
    { dataValue: '21', text: 'Two or more races' },
    { dataValue: '23', text: 'Native Hawaiian or other Pacific Islander' },
    { dataValue: '97', text: 'Unknown' },
    { dataValue: '98', text: 'Not Collected' },
  ];
  return getDemographics(races, raceOptions);
};

export const getEthnicityBreakdown = (
  records: ExtractRecordValidation[]
): DemographicData[] => {
  const ethnicities = records.map((record) => record.payload.ethnicity);
  const ethnicityOptions: humanMap[] = [
    { dataValue: '1', text: 'Puerto Rican' },
    { dataValue: '2', text: 'Mexican' },
    { dataValue: '3', text: 'Cuban' },
    { dataValue: '4', text: 'Other specific Hispanic or Latino' },
    { dataValue: '5', text: 'Not of Hispanic or Latino origin' },
    { dataValue: '6', text: 'Hispanic or Latino, Not Specified' },
    { dataValue: '97', text: 'Unknown' },
    { dataValue: '98', text: 'Not Collected' },
  ];
  return getDemographics(ethnicities, ethnicityOptions);
};

export const getDemographics = (
  values: Array<string | null | undefined>,
  options: humanMap[]
): DemographicData[] => {
  const demos: DemographicData[] = [];
  for (const option of options) {
    const count = findValueCount(values, option.dataValue);
    const percent = Math.round((count / values.length) * 100);
    demos.push({ label: option.text, count: count, percent: percent });
  }
  const missingCount =
    findValueCount(values, null) + findValueCount(values, undefined);
  const dataMissing = {
    label: 'Missing Data',
    count: missingCount,
    percent: Math.round((missingCount / values.length) * 100),
  };
  if (dataMissing.count > 0) {
    demos.push(dataMissing);
  }
  const dataValues = options.map((option) => option.dataValue);
  const nonValidCount = findNonValidCount(values, [
    ...dataValues,
    null,
    undefined,
  ]);
  const dataNonValid = {
    label: 'Non-Valid Data',
    count: nonValidCount,
    percent: Math.round((nonValidCount / values.length) * 100),
  };
  if (dataNonValid.count > 0) {
    demos.push(dataNonValid);
  }
  return demos.sort(
    (a: DemographicData, b: DemographicData) => b.count - a.count
  );
};

const findValueCount = (
  possibles: Array<string | number | null | undefined>,
  value: string | null | undefined
): number => possibles.filter((possible) => possible === value).length;
const findNonValidCount = (
  possibles: Array<string | null | undefined>,
  values: Array<string | null | undefined>
): number => possibles.filter((possible) => !values.includes(possible)).length;

const getAgeBreakdown = (
  records: ExtractRecordValidation[]
): DemographicData[] => {
  const ages = records.map((record) =>
    record.payload.dob ? getAges(record.payload.dob) : 'Missing DoB'
  );

  const demos: DemographicData[] = [];

  const ageOptions: humanMap[] = [
    { dataValue: '0-9', text: '0-9' },
    { dataValue: '10-19', text: '10-19' },
    { dataValue: '20-29', text: '20-29' },
    { dataValue: '30-39', text: '30-39' },
    { dataValue: '40-49', text: '40-49' },
    { dataValue: '50-59', text: '50-59' },
    { dataValue: '60-69', text: '60-69' },
    { dataValue: '70-79', text: '70-79' },
    { dataValue: '80-89', text: '80-89' },
    { dataValue: '90-200', text: '90+' },
    { dataValue: 'Missing DoB', text: 'Missing' },
    { dataValue: 'Invalid DoB', text: 'Invalid' },
  ];

  for (const option of ageOptions) {
    const count = findAgeCount(ages, option.dataValue);
    const percent = Math.round((count / ages.length) * 100);
    demos.push({ label: option.text, count: count, percent: percent });
  }

  return demos;
};

const findAgeCount = (
  ages: Array<number | 'Invalid DoB' | 'Missing DoB'>,
  ageRange: string
): number => {
  if (ageRange === 'Invalid DoB' || ageRange === 'Missing DoB') {
    return ages.filter((age) => age === ageRange).length;
  } else {
    const min = Number(ageRange.split('-')[0]);
    const max = Number(ageRange.split('-')[1]);
    return ages.filter(
      (age) => typeof age !== 'string' && age >= min && age <= max
    ).length;
  }
};

const getAges = (dateString: string): number | 'Invalid DoB' => {
  const date_regex1 =
    /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/\d{4}$/;
  const date_regex2 = /^\d{4}-\d{2}-\d{2}$/;

  if (date_regex1.test(dateString) || date_regex2.test(dateString)) {
    const birthDate = new Date(dateString);
    return Math.floor(
      (Date.now() - new Date(birthDate).getTime()) / 3.155_76e+10
    );
  } else {
    return 'Invalid DoB';
  }
};
