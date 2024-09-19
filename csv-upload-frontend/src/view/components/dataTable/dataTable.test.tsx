/**
*
* Data table component test case
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// COMPONENT
import DataTable from './index';

// MOCK FUNCTION
jest.mock('../../../utils', () => ({
  formatTableTitle: jest.fn((title) => title.toUpperCase())
}));

describe('DataTable Component', () => {
  
  // TEST CASE 1
  it('renders "No data available" when pageData is empty', () => {
    render(<DataTable pageData={[]} />);
    expect(screen.getByText('No data available.')).toBeInTheDocument();
  });

  // TEST CASE 2
  it('renders the table correctly with pageData', () => {
    const pageData = [
      { name: 'Earth', id: '1'},
      { name: 'Mars', id: '2'}
    ];

    render(<DataTable pageData={pageData} />);

    expect(screen.getByText('Earth')).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
