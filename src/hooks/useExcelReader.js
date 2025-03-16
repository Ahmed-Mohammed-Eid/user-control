import { useState } from "react";
import * as XLSX from "xlsx";

const useExcelReader = () => {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const readExcelFile = (file) => {
		if (!file) {
			setError("No file provided");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const reader = new FileReader();

			reader.onload = (event) => {
				try {
					const binaryStr = event.target.result;
					const workbook = XLSX.read(binaryStr, { type: "binary" });

					// Get all worksheets as an object with sheet names as keys
					const result = {};

					workbook.SheetNames.forEach((sheetName) => {
						const worksheet = workbook.Sheets[sheetName];
						result[sheetName] = XLSX.utils.sheet_to_json(worksheet);
					});

					setData(result);
					setLoading(false);
				} catch (err) {
					setError("Failed to parse Excel file: " + err.message);
					setLoading(false);
				}
			};

			reader.onerror = () => {
				setError("Failed to read file");
				setLoading(false);
			};

			reader.readAsBinaryString(file);
		} catch (err) {
			setError("Error processing file: " + err.message);
			setLoading(false);
		}
	};

	return { data, loading, error, readExcelFile };
};

export default useExcelReader;
