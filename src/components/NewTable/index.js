
import { useState } from 'react';
import DataTable from 'react-data-table-component';
export default function NewTable({ columns, data, rows, limit, title, onChangePage, onSearch }) {
  const [keyword, setKeyword] = useState('');
  const handleSearch = (value) => {
    setKeyword(value)
    onSearch(value)
  }
  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <div className="input-group input-group-sm px-2">
              <input type="text" className="form-control form-control-sm" placeholder="Cari barcode,nama produk" value={keyword} onChange={(e) => handleSearch(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="button-group d-flex gap-2 justify-content-end">
            <button className='btn btn-primary btn-sm'>
              <i className='bx bx-printer'></i>
              <span className="ps-2">
                CSV/EXCEL
              </span>
            </button>
          </div>
        </div>
      </div>
      <DataTable
        sortactive
        fixedHeader={true}
        title={title}
        columns={columns}
        data={data}
        highlightOnHover
        pagination
        paginationServer
        paginationTotalRows={rows}
        paginationPerPage={limit}
        paginationComponentOptions={{
          noRowsPerPage: true
        }}
        pointerOnHover
        onChangePage={onChangePage}
        responsive
      />
    </div>

  )
}