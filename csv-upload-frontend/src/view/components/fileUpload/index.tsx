/**
*
* File upload component
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import { useState } from 'react';

// IMAGE
import FileImage from '../../../assets/img/files.png';

// UTILS IMPORT
import {FILE_UPLOAD_API} from '../../../utils/constants';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS TYPE
type FileUploadProps = {
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  setFilteredData: React.Dispatch<React.SetStateAction<any[]>>;
}

const FileUpload = ({ 
    setData, 
    setFilteredData 
}: FileUploadProps) => {
  // DECLARE STATE VARIABLE
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');

  // HANDLE FILE CHANGE
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(0);
    try {
      const selectedFile = event.target.files ? event.target.files[0] : null;
      if (selectedFile) {
        setFileName(selectedFile.name);
        setProgress(50);
        if (selectedFile.type === 'text/csv') {
          setFile(selectedFile);
          setErrorMessage('');
          setProgress(100);
        } else {
          // SHOW ERROR WHEN THE FILE TYPE IS NOT CSV
          setErrorMessage('Only CSV files are allowed.');
          setFileName(''); 
        }
      }
    } catch(err) {
      setErrorMessage('File upload failed. Please try again later.');
      setFileName(''); 
      setProgress(0);
    } 
  };

  // HANDLE FILE UPLOAD
  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch(FILE_UPLOAD_API, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error uploading file');
      }

      const result = await response.json();
      setData(result);
      setFilteredData(result);

      if (result.length === 0) {
        setErrorMessage('No data available in the uploaded CSV.');
      }
    } catch (error) {
      setErrorMessage('Error uploading file.');
    }
  };

  return (
      <div>
      <div className='form-container'>
        <label htmlFor="file-upload" className="file-upload-container">
          <img src={FileImage} width={100} alt=""/>
          <div className='file-upload-info'>Upload you file, Only .csv allowed</div>
          <div className='upload-progress'>Upload Progress: {progress}%</div>
          {fileName && <div className='file-upload-info'>Selected file: {fileName}</div>} {/* Display file name */}
          <input id="file-upload" type="file" onChange={handleFileChange} className='d-none'/>
        </label>
        <button onClick={handleFileUpload} className='primary-btn'>Upload CSV</button>
      </div>
      {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    
  );
};

export default FileUpload;