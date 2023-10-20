import { ExtractRecordData, ExtractRecordField } from '@dbh/bhsd/data-access';

export const convertCsvToJson = (csv: string): ExtractRecordData[] => {
  // Container list for the JSON data
  const csvAsObject: ExtractRecordData[] = [];

  // Begin by separating headers from lines
  const [rawHeaders, ...rawLines] = csv.split('\n');
  const filteredLines = rawLines.filter((rawLine) => lineHasValue(rawLine));

  if (filteredLines.length > 0) {
    const headers: ExtractRecordField[] = rawHeaders.split(
      ','
    ) as ExtractRecordField[];
    for (const line of filteredLines) {
      const record: Partial<ExtractRecordData> = {};
      const currentLine = csvToArray(line);

      for (const header of headers) {
        record[header] = currentLine[headers.indexOf(header)];
      }

      // Need to cast this as the full record, rather than Partial<T>
      csvAsObject.push(record as ExtractRecordData);
    }
  }

  return csvAsObject;
};

const lineHasValue = (rawLine: string): boolean => {
  const notOnlyCommas = /[^\s,]/.test(rawLine);
  const hasLineLength = rawLine.length > 0;

  return notOnlyCommas && hasLineLength;
};

const csvToArray = (text: string): string[] => {
  const values: string[] = [''];
  let partial = '';
  let notQuoted = true;
  let notSingleQuoted = true;

  for (const letter of text) {
    if ('"' === letter) {
      notQuoted = !notQuoted;
      if ('"' === partial) {
        values[values.length - 1] += '"';
        partial = '!';
      } else if ('' === partial) {
        partial = '!';
      }
    } else if (notQuoted && letter === "'") {
      notSingleQuoted = !notSingleQuoted;
      if ("'" === partial) {
        values[values.length - 1] += "'";
        partial = '!';
      } else if ('' === partial) {
        partial = '!';
      }
    } else if (notQuoted && notSingleQuoted && ',' === letter) {
      values.push('');
    } else {
      values[values.length - 1] += letter;
      partial = letter;
    }
  }

  return values;
};
