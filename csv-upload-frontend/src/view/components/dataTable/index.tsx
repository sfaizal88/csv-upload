/**
*
* Data table component
* @author - Faizal
* @date   - 19th September 2024
*
***/
// IMAGE IMPORT
import PlanetImage from '../../../assets/img/planet.png';

// UTILS
import {formatTableTitle} from '../../../utils';

// STYLE IMPORT
import './styles.css';

// COMPONENT PROPS TYPE
type DataTableProps = {
  pageData: any[];
}

const DataTable = ({ 
    pageData = []
}: DataTableProps) => {

  // LOCAL BVARIABLE DECLARE
  const keys = Object.keys(pageData?.[0] || {}) || [];

  return (
    <>
    {pageData.length === 0 ? 
    <div className='empty-container'>
      <img src={PlanetImage} alt="" width={120}/>
      No data available.
    </div> :
    <table className='table' cellPadding={5}>
      <thead>
        <tr className='table-header'>
          {keys?.map(item => <th key={`${item}-header`}>{formatTableTitle(item)}</th>)}
        </tr>
      </thead>
      <tbody>
        {pageData.map((row, index) => (
          <tr key={`data-row-${index}`} className='table-data-row'>
            {keys?.map((item, index) => <td key={`data-row-item${index}`}>{row[item]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>}
    </>
  );
};

export default DataTable;
