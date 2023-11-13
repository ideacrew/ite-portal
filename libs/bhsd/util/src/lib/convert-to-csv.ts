export const getCsvBlob = (rows: object[], columns: string[]): Blob => {
  const csvData = convertToCsv(rows, columns);
  const blob = new Blob(['\uFEFF' + csvData], {
    type: 'text/csv;charset=utf-8;',
  });
  return blob;
};

const convertToCsv = (rows: object[], columns: string[]): string => {
  if (!rows || rows.length === 0) {
    return '';
  }
  console.log(rows);
  console.log(columns);
  const rowContent = rows
    .map((row) =>
      typeof row == 'object'
        ? columns
            .map((key) => {
              const cellData = row[key as keyof typeof row] as string;

              let cell =
                cellData === null || cellData === undefined ? '' : cellData;
              if (cellData) {
                cell =
                  String(cellData).search(/([\n",])/g) >= 0
                    ? `"${cellData}"`
                    : `${cellData}`;
              }
              return cell;
            })
            .join(',')
        : ''
    )
    .join('\n');
  return columns.join(',') + '\r\n' + rowContent;
};
