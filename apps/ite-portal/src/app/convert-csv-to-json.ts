import {
  ExtractRecordData,
  RecordKeys,
} from './submission-detail/submission-detail.component';

export const convertCsvToJson = (csv: string): ExtractRecordData[] => {
  console.log({ csv });
  // Container list for the JSON data
  const csvAsObject: ExtractRecordData[] = [];

  // Begin by separating headers from lines
  const [rawHeaders, ...rawLines] = csv.split('\r\n');
  console.log({ rawHeaders, rawLines });

  if (rawLines.length > 0) {
    const headers: RecordKeys[] = rawHeaders.split(',') as RecordKeys[];
    const parsedLines = rawLines.filter((line) => line.length > 0);
    for (const line of parsedLines) {
      const record: Partial<ExtractRecordData> = {};
      const currentLine = line.split(',');

      for (const header of headers) {
        record[header] = currentLine[headers.indexOf(header)];
      }

      // Need to cast this as the full record, rather than Partial<T>
      csvAsObject.push(record as ExtractRecordData);
    }
  }

  return csvAsObject;
};
