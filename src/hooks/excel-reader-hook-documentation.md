# useExcelReader React Hook Documentation

## Overview

`useExcelReader` is a custom React hook designed to simplify the process of reading Excel files (`.xlsx`, `.xls`) in React applications. This hook leverages the SheetJS (xlsx) library to parse Excel files and convert them into JSON data structures that can be easily used within your React components.

## Installation Prerequisites

Before using this hook, make sure you have the SheetJS library installed in your project:

```bash
npm install xlsx
# or
yarn add xlsx
```

## Hook Implementation

```jsx
import { useState } from 'react';
import * as XLSX from 'xlsx';

const useExcelReader = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const readExcelFile = (file) => {
    if (!file) {
      setError('No file provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const binaryStr = event.target.result;
          const workbook = XLSX.read(binaryStr, { type: 'binary' });
          
          // Get all worksheets as an object with sheet names as keys
          const result = {};
          
          workbook.SheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
          });
          
          setData(result);
          setLoading(false);
        } catch (err) {
          setError('Failed to parse Excel file: ' + err.message);
          setLoading(false);
        }
      };
      
      reader.onerror = () => {
        setError('Failed to read file');
        setLoading(false);
      };
      
      reader.readAsBinaryString(file);
    } catch (err) {
      setError('Error processing file: ' + err.message);
      setLoading(false);
    }
  };

  return { data, loading, error, readExcelFile };
};

export default useExcelReader;
```

## Hook Components Explained

### State Variables

The hook manages three state variables:

1. **`data` (object | null)**: Contains the parsed Excel data as a JSON object, with sheet names as keys and arrays of row objects as values. Initially `null` when no file has been loaded.

2. **`loading` (boolean)**: Indicates whether the Excel file is currently being read and processed. Used to display loading indicators in the UI.

3. **`error` (string | null)**: Contains error messages if file reading or parsing fails. Set to `null` when no errors have occurred.

### The `readExcelFile` Function

This is the main function exposed by the hook, which handles the Excel file processing:

1. **Input Validation**:
   ```jsx
   if (!file) {
     setError('No file provided');
     return;
   }
   ```
   Checks if a file was provided, sets an error if not.

2. **State Setup**:
   ```jsx
   setLoading(true);
   setError(null);
   ```
   Sets the loading state to true and clears any previous error messages.

3. **File Reading Logic**:
   ```jsx
   const reader = new FileReader();
   ```
   Creates a FileReader instance to read the binary content of the Excel file.

4. **Success Handler**:
   ```jsx
   reader.onload = (event) => {
     try {
       const binaryStr = event.target.result;
       const workbook = XLSX.read(binaryStr, { type: 'binary' });
       
       // Get all worksheets as an object with sheet names as keys
       const result = {};
       
       workbook.SheetNames.forEach(sheetName => {
         const worksheet = workbook.Sheets[sheetName];
         result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
       });
       
       setData(result);
       setLoading(false);
     } catch (err) {
       setError('Failed to parse Excel file: ' + err.message);
       setLoading(false);
     }
   };
   ```
   When the file is successfully read:
   - Converts the binary data to a workbook object using SheetJS
   - Iterates through all sheets in the workbook
   - Converts each sheet to JSON format using `sheet_to_json`
   - Organizes the data in an object with sheet names as keys
   - Updates the state with the parsed data
   - Sets loading to false

5. **Error Handlers**:
   ```jsx
   reader.onerror = () => {
     setError('Failed to read file');
     setLoading(false);
   };
   ```
   Handles any errors that occur during file reading.

   ```jsx
   try {
     // ...file reading logic
   } catch (err) {
     setError('Error processing file: ' + err.message);
     setLoading(false);
   }
   ```
   Catches any other errors that might occur during the overall process.

6. **File Reading Initiation**:
   ```jsx
   reader.readAsBinaryString(file);
   ```
   Starts the file reading process using the binary string format.

### Return Value

The hook returns an object with four properties:

```jsx
return { data, loading, error, readExcelFile };
```

- **`data`**: The parsed Excel data in JSON format
- **`loading`**: Boolean indicating if a file is being processed
- **`error`**: Any error messages that occurred
- **`readExcelFile`**: Function to call when you want to process an Excel file

## Usage Example

Here's how to use the `useExcelReader` hook in a React component:

```jsx
import React from 'react';
import useExcelReader from './useExcelReader';

function ExcelImporter() {
  const { data, loading, error, readExcelFile } = useExcelReader();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      readExcelFile(file);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleFileChange} 
      />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {data && (
        <div>
          <h3>Excel Data:</h3>
          {Object.keys(data).map(sheetName => (
            <div key={sheetName}>
              <h4>Sheet: {sheetName}</h4>
              <pre>{JSON.stringify(data[sheetName], null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Data Structure

The hook converts Excel data into the following structure:

```json
{
  "Sheet1": [
    { "Column1": "value1", "Column2": "value2", ... },
    { "Column1": "value3", "Column2": "value4", ... },
    ...
  ],
  "Sheet2": [
    { "ColumnA": "valueA", "ColumnB": "valueB", ... },
    ...
  ],
  ...
}
```

Each sheet becomes a property in the result object, and each row becomes an object in the sheet's array.

## Common Customizations

### Reading Only the First Sheet

If you only need data from the first sheet:

```jsx
const readExcelFile = (file) => {
  // ... existing code
  
  reader.onload = (event) => {
    try {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      
      // Get only the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const result = XLSX.utils.sheet_to_json(worksheet);
      
      setData(result);
      setLoading(false);
    } catch (err) {
      // ... error handling
    }
  };
  
  // ... rest of the code
};
```

### Including Headers

To ensure column headers are included:

```jsx
result[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
```

This will include the header row in the data and return an array of arrays instead of array of objects.

### Handling Different File Types

To handle different file types (CSV, etc.):

```jsx
const fileType = file.name.split('.').pop().toLowerCase();
const readerOptions = fileType === 'csv' ? { type: 'string' } : { type: 'binary' };

reader.onload = (event) => {
  try {
    const content = event.target.result;
    const workbook = XLSX.read(content, readerOptions);
    // Rest of parsing logic
  } catch (err) {
    // Error handling
  }
};

if (fileType === 'csv') {
  reader.readAsText(file);
} else {
  reader.readAsBinaryString(file);
}
```

## Error Handling

The hook provides robust error handling for common issues:

1. No file provided
2. File reading errors
3. Excel parsing errors

Each error updates the `error` state with a descriptive message that can be displayed to the user.

## Performance Considerations

For large Excel files, consider adding these optimizations:

1. **Debouncing**: Add a delay before processing to prevent excessive parsing on rapid file selection changes.

2. **Web Workers**: For very large files, move the parsing logic to a Web Worker to avoid blocking the main thread.

3. **Chunking**: For extremely large datasets, process the data in chunks rather than all at once.

## Conclusion

The `useExcelReader` hook provides a clean, reusable way to handle Excel file imports in React applications. It encapsulates all the complexity of file reading and Excel parsing, while providing helpful states for loading and error handling.
