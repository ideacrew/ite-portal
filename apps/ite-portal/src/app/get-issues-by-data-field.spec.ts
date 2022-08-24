import {
  getAffectedRecords,
  getIssuesByDataField,
  getUniqueFieldNames,
} from './get-issues-by-data-field';
import { ExtractRecordValidation } from './models';

const mockRecords: ExtractRecordValidation[] = [
  {
    _id: { $oid: '62fe6a3431ea6700058fe6b1' },
    extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
    payload: {
      record_type: 'A',
      provider_id: '15',
      episode_id: '194062',
      num_of_prior_episodes: '1',
      admission_date: '07/31/2022',
      last_contact_date: '31/02/2022',
      first_name: 'Test',
      last_name: 'One',
      treatment_type: '1',
      client_id: '',
      collateral: '2',
      dob: '05/11/1992',
      gender: '2',
      race: '1',
      ethnicity: '5',
      primary_language: '1',
      num_of_prior_admissions: '96',
      arrests_past_30days: '0',
      education: '12',
      employment: '4',
    },
    status: 'Fail',
    warnings: [],
    critical_errors: [],
    fatal_errors: [
      { client_id: { text: 'Must be filled', category: 'Missing Value' } },
      {
        last_contact_date: {
          text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
          category: 'Wrong Format',
        },
      },
      { client_id: { text: 'Must be filled', category: 'Missing Value' } },
    ],
    updated_at: '2022-08-18T16:35:00.531Z',
    created_at: '2022-08-18T16:35:00.531Z',
  },
  {
    _id: { $oid: '62fe6a3431ea6700058fe6b3' },
    extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
    payload: {
      record_type: 'T',
      provider_id: '15',
      episode_id: '194068',
      num_of_prior_episodes: '2',
      admission_date: '07/31/2022',
      last_contact_date: '7/32/2022',
      first_name: 'Test',
      last_name: 'Two',
      treatment_type: '8',
      client_id: 'AEWE31561025620',
      collateral: '2',
      dob: '07/28/1992',
      gender: '1',
      race: '2',
      ethnicity: '6',
      primary_language: '2',
      num_of_prior_admissions: '0',
      arrests_past_30days: '0',
      education: '10',
      employment: '3',
    },
    status: 'Fail',
    warnings: [],
    critical_errors: [],
    fatal_errors: [
      {
        last_contact_date: {
          text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
          category: 'Wrong Format',
        },
      },
    ],
    updated_at: '2022-08-18T16:35:00.545Z',
    created_at: '2022-08-18T16:35:00.545Z',
  },
];

describe('Get issues by data field', () => {
  test('It should group by field name', () => {
    const fieldNames = getUniqueFieldNames(mockRecords, 'Fatal');

    expect(fieldNames).toEqual(['client_id', 'last_contact_date']);
  });

  test('It should return records with at least one field name failure', () => {
    const affectedRecords = getAffectedRecords(
      mockRecords,
      'client_id',
      'Fatal'
    );

    expect(affectedRecords).toEqual([
      {
        _id: { $oid: '62fe6a3431ea6700058fe6b1' },
        extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
        payload: {
          record_type: 'A',
          provider_id: '15',
          episode_id: '194062',
          num_of_prior_episodes: '1',
          admission_date: '07/31/2022',
          last_contact_date: '31/02/2022',
          first_name: 'Test',
          last_name: 'One',
          treatment_type: '1',
          client_id: '',
          collateral: '2',
          dob: '05/11/1992',
          gender: '2',
          race: '1',
          ethnicity: '5',
          primary_language: '1',
          num_of_prior_admissions: '96',
          arrests_past_30days: '0',
          education: '12',
          employment: '4',
        },
        status: 'Fail',
        warnings: [],
        critical_errors: [],
        fatal_errors: [
          { client_id: { text: 'Must be filled', category: 'Missing Value' } },
          {
            last_contact_date: {
              text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
              category: 'Wrong Format',
            },
          },
          { client_id: { text: 'Must be filled', category: 'Missing Value' } },
        ],
        updated_at: '2022-08-18T16:35:00.531Z',
        created_at: '2022-08-18T16:35:00.531Z',
      },
    ]);
  });

  test('It should return records grouped by field name', () => {
    const issuesByDataField = getIssuesByDataField(mockRecords, 'Fatal');

    expect(issuesByDataField).toEqual([
      {
        fieldName: 'client_id',
        affectedRecords: [
          {
            _id: { $oid: '62fe6a3431ea6700058fe6b1' },
            extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
            payload: {
              record_type: 'A',
              provider_id: '15',
              episode_id: '194062',
              num_of_prior_episodes: '1',
              admission_date: '07/31/2022',
              last_contact_date: '31/02/2022',
              first_name: 'Test',
              last_name: 'One',
              treatment_type: '1',
              client_id: '',
              collateral: '2',
              dob: '05/11/1992',
              gender: '2',
              race: '1',
              ethnicity: '5',
              primary_language: '1',
              num_of_prior_admissions: '96',
              arrests_past_30days: '0',
              education: '12',
              employment: '4',
            },
            status: 'Fail',
            warnings: [],
            critical_errors: [],
            fatal_errors: [
              {
                client_id: {
                  text: 'Must be filled',
                  category: 'Missing Value',
                },
              },
              {
                last_contact_date: {
                  text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
                  category: 'Wrong Format',
                },
              },
              {
                client_id: {
                  text: 'Must be filled',
                  category: 'Missing Value',
                },
              },
            ],
            updated_at: '2022-08-18T16:35:00.531Z',
            created_at: '2022-08-18T16:35:00.531Z',
          },
        ],
      },
      {
        fieldName: 'last_contact_date',
        affectedRecords: [
          {
            _id: { $oid: '62fe6a3431ea6700058fe6b1' },
            extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
            payload: {
              record_type: 'A',
              provider_id: '15',
              episode_id: '194062',
              num_of_prior_episodes: '1',
              admission_date: '07/31/2022',
              last_contact_date: '31/02/2022',
              first_name: 'Test',
              last_name: 'One',
              treatment_type: '1',
              client_id: '',
              collateral: '2',
              dob: '05/11/1992',
              gender: '2',
              race: '1',
              ethnicity: '5',
              primary_language: '1',
              num_of_prior_admissions: '96',
              arrests_past_30days: '0',
              education: '12',
              employment: '4',
            },
            status: 'Fail',
            warnings: [],
            critical_errors: [],
            fatal_errors: [
              {
                client_id: {
                  text: 'Must be filled',
                  category: 'Missing Value',
                },
              },
              {
                last_contact_date: {
                  text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
                  category: 'Wrong Format',
                },
              },
              {
                client_id: {
                  text: 'Must be filled',
                  category: 'Missing Value',
                },
              },
            ],
            updated_at: '2022-08-18T16:35:00.531Z',
            created_at: '2022-08-18T16:35:00.531Z',
          },
          {
            _id: { $oid: '62fe6a3431ea6700058fe6b3' },
            extract_id: { $oid: '62fe6a3431ea6700058fe6af' },
            payload: {
              record_type: 'T',
              provider_id: '15',
              episode_id: '194068',
              num_of_prior_episodes: '2',
              admission_date: '07/31/2022',
              last_contact_date: '7/32/2022',
              first_name: 'Test',
              last_name: 'Two',
              treatment_type: '8',
              client_id: 'AEWE31561025620',
              collateral: '2',
              dob: '07/28/1992',
              gender: '1',
              race: '2',
              ethnicity: '6',
              primary_language: '2',
              num_of_prior_admissions: '0',
              arrests_past_30days: '0',
              education: '10',
              employment: '3',
            },
            status: 'Fail',
            warnings: [],
            critical_errors: [],
            fatal_errors: [
              {
                last_contact_date: {
                  text: 'must be a valid date in format YYYY-mm-dd or mm/dd/YYYY',
                  category: 'Wrong Format',
                },
              },
            ],
            updated_at: '2022-08-18T16:35:00.545Z',
            created_at: '2022-08-18T16:35:00.545Z',
          },
        ],
      },
    ]);
  });
});
