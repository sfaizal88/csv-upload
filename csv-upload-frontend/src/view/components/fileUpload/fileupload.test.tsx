/**
*
* File upload component test case
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import { render, screen } from '@testing-library/react';
import FileUpload from './';

describe('FileUpload Component', () => {
  const mockSetData = jest.fn();
  const mockSetFilteredData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  // TEST CASE 1
  it('renders file upload component', () => {
    render(<FileUpload setData={mockSetData} setFilteredData={mockSetFilteredData} />);
    
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
    expect(screen.getByText('Upload Progress: 0%')).toBeInTheDocument();
  });
});

