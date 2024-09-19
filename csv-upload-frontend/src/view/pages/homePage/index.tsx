/**
*
* Home page component
* @author - Faizal
* @date   - 19th September 2024
*
***/
// REACT IMPORT
import { useState } from 'react';

// GENERIC COMPONENT
import FileUpload from '../../components/fileUpload';
import DataTable from '../../components/dataTable';
import Pagination from '../../components/pagination';

// STYLE IMPORT
import './styles.css';

const HomePage = () => {

  	// DECLARE STATE VARIABLE
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const itemsPerPage = 10;
  
    // HANDLE SEARCH FUNCTIONALITY
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      const term = event.target.value;
      setSearchTerm(term);
      const filtered = data.filter((row) => {
          let combinedData = Object.values(row).join(" ");
          return combinedData.toLowerCase().includes(term.toLowerCase());
      });
      setFilteredData(filtered);
      // RESET THE PAGE TO 1 AFTER SEARCH
      setCurrentPage(1); 
    };
  
    // PAGINATION LOGIC
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const offset = (currentPage - 1) * itemsPerPage;
    const pageData = filteredData.slice(offset, offset + itemsPerPage);
  
    return (
        <div className="App">
            <h1>CSV Upload & Search</h1>
            <FileUpload setData={setData} setFilteredData={setFilteredData} />
            <div className='paper-container'>
             <div className='filter-container'>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  className='textfield'
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <DataTable pageData={pageData} />
            </div>
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default HomePage;
