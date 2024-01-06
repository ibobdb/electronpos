import { useEffect, useState } from "react";
import './style.scss';
import React from "react";
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
export default function Table(props) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [keyword, setKeyword] = useState('');
  const handleLimitChange = (evt) => {
    const value = evt.target.value
    setLimit(value);
    props.onLimitChange(currentPage, value)
  }

  const pageList = () => {
    const list = Array.from(Array(props.tableInfo.totalPages).keys()).slice(0, 10);
    setPage(list);
    setCurrentPage(props.tableInfo.currentPage)
  }
  const onPreviousClick = () => {
    const prevPage = currentPage - 1
    props.onLimitChange(prevPage, limit)
  }
  const onNextClick = () => {
    const nextPage = currentPage + 1
    props.onLimitChange(nextPage, limit)
  }
  const onPageClick = (page, limit) => {
    props.onLimitChange(page, limit)
  }
  const deleteOnClick = (barcode) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        props.onDelete(barcode)
        toast.success('Data berhasil di hapus', {
          position: "top-right",
          autoClose: 2000,
          progress: undefined,
          theme: "light",
        });
      }
    });
  }
  const updateOnClick = (barcode) => {
    // handleOpenModal();
    props.handleUpdateData(barcode)
  }
  useEffect(() => {
    props.search(keyword);
  }, [keyword])
  useEffect(() => {
    pageList()
  }, [props.tableData])

  return (
    <div className="card-body">
      <div className="table-header d-flex mb-2 gap-2">
        <div className="form-group me-auto">
          <label htmlFor="">Tampilan</label>
          <select
            name=""
            id=""
            className="form-select form-select-sm"
            value={limit}
            onChange={handleLimitChange}
          >
            <option value="1">1</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Pencarian</label>

          <input type="text" className="form-control form-control-sm" placeholder="Cari disini" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
      </div>
      <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true">
        <table className="table table-striped table-bordered ">
          <thead className="table-primary">
            <tr>
              <th>NO</th>
              {props.tableHeader && props.tableHeader.map((th, i) => {
                return <th key={i}>{th.name}</th>
              })}
              {props.actionButton || props.children ? <th>
                Perintah
              </th> : ''}
            </tr>
          </thead>
          <tbody className="scrollable-content">
            {props.tableData && props.tableData.map((tr, i) => {
              return (
                <tr key={i}>
                  <td className="fw-bold">{i + 1}</td>
                  {props.tableHeader && props.tableHeader.map((th, thI) => {
                    return (
                      <td className={`text-capitalize ${tr.stock <= 0 ? 'table-danger' : tr.stock < 2 ? 'table-warning' : ''}`} key={thI}>
                        {/* {th.key == 'batch_code' ?
                          tr.batch_list.length == 0 ? 'Batch tidak ada' :
                            <select name="" id="" className="form-select">
                              {tr.batch_list.map((batch, batchIndex) => {
                                return <option value={batch.batch_code} key={batchIndex}>{batch.batch_code}</option>
                              })}
                            </select>
                          : tr[th.key]} */}
                        <span className={th.key == 'category' ? 'badge rounded-pill text-bg-primary' : ''}>
                          {th.key == 'category' ? tr.category == null ? 'Tidak ada kategori' : tr[th.key].name : tr[th.key]}
                        </span>
                      </td>
                    )
                  })}
                  {props.actionButton ? <td>
                    <div className="button-group d-flex gap-2">
                      <button className="btn btn-primary btn-sm" type="button" onClick={() => updateOnClick((tr.barcode == undefined ? tr.id : tr.barcode))}>  <span className="bx bx-edit-alt"></span> </button>
                      <button className="btn btn-danger btn-sm" type="button" onClick={(e) => deleteOnClick((tr.barcode == undefined ? tr.id : tr.barcode))}> <span className="bx bx-trash"></span></button>
                      {props.children}
                    </div>
                  </td> :
                    <td>
                      <div className="button-group d-flex gap-2">
                        {
                          React.Children.map(props.children, (child) =>
                            React.cloneElement(child, { id: tr.barcode === undefined ? tr.id : tr.barcode }))
                        }
                      </div>
                    </td>
                  }
                </tr>
              )
            })}
          </tbody>
        </table>
        <nav className="">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}>
              <button className="page-link" type="button" aria-label="Previous" onClick={onPreviousClick}>
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>

            {/* Loop Pagination */}
            {page && page.map((el, i) => {
              const pageValue = el + 1
              return (
                <li className={`page-item ${pageValue == currentPage ? 'active' : ''}`} onClick={() => onPageClick(pageValue, limit)} key={i}>
                  <button className="page-link" aria-label="Previou" type="button">
                    <span aria-hidden="true">{pageValue}</span>
                  </button>
                </li>
              )
            })}
            <li className={`page-item ${currentPage == 10 ? 'disabled' : ''}`}>
              <button className="page-link" type="button" aria-label="Previous" onClick={onNextClick}>
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
          <div className="table-data-information d-flex mb-2 gap-2">
            <span className="text-muted">Total Rows: {props.tableInfo.totalItems}</span>
          </div>
          <small className="text-muted">Pencarian dibatasi 10 halaman, jika ingin mencari yang lebih spesifik silahkan cari pada form pencarian</small>
        </nav>
      </div>
      {/* <Modal
        show={modalShow}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        fullscreen={true}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update {props.modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        </Modal.Body>
      </Modal> */}
    </div>
  );
}