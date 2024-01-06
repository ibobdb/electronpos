import Tabs from "../../components/Tabs";
import NewTable from "../../components/NewTable";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import batchstockAPI from "../../api/batchstockAPI";
import SearchProduct from "../../views/product/searchProduct";

export default function BatchStock() {
  const [dataTable, setDataTable] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [keyword, setKeyword] = useState('');
  const button = [
    {
      buttonText: 'Batch & Stok',
      target: '#nav-batch',
      key: 'batch'
    },
    {
      buttonText: 'Buat Batch',
      target: '#nav-add-batch',
      key: 'add-batch'
    }
  ]
  const columns = [
    {
      name: 'Nomor Batch',
      selector: row => row.batch_code,
      sortable: true
    },
    {
      name: 'Barcode',
      selector: row => row.product_barcode,
      sortable: true
    },
    {
      name: 'Nama Produk',
      selector: row => row.product && row.product.product_name,
      sortable: true
    },
    {
      name: 'Stok',
      selector: row => row.stock,
      sortable: true
    },
    {
      name: 'Tanggal Expire',
      selector: row => row.expire_date,
      sortable: true
    },
    {
      name: 'Status Expire',
      selector: row => <span className={`badge rounded-pill ${row.status == 0 ? 'text-bg-danger' : 'text-bg-success'}`}>
        {row.status == 0 ? 'Kadaluarsa' : 'Aman'}
      </span>,
      sortable: true
    },
    {
      name: 'Adjust Stok',
      cell: (row) =>
        row.status == 1 ? <div className="button-group">
          <button className="btn-primary btn-sm btn" onClick={() => handleAdjustStock(row.batch_code)}>
            <i className="bx bx-plus"></i>
          </button>
        </div> : <small className="text-muted">Tidak dapat ditambah</small>
    }, {
      name: 'Return Batch',
      cell: (row) =>
        <button className="btn-danger btn-sm btn" onClick={() => handleReturnBatch(row.batch_code)}>
          <i className="bx bx-power-off"></i>
        </button>
    },
  ]
  const getBatch = async () => {
    await batchstockAPI.get_batch(page, limit, keyword)
      .then((response) => {
        setDataTable(response.results)
      })
  }
  const handleSearch = (value) => {
    setKeyword(value);
  }
  useEffect(() => {
    getBatch()
  }, [keyword])
  useEffect(() => {
    document.title = 'Batch & Stock';
    getBatch()
  }, []);

  const handleAdjustStock = (batch_id) => {
    Swal.fire({
      title: 'Update Stock',
      text: 'Jumlah',
      showCancelButton: true,
      input: "number",
      confirmButtonText: "Simpan",
      icon: "question",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Apakah anda yakin menyimpan stok baru?',
          showCancelButton: true,
          confirmButtonText: "Simpan",
          icon: "question",
          showCancelButton: true,
        }).then((confirm) => {
          if (confirm.isConfirmed) {
            batchstockAPI.adjust_stock(batch_id, result.value).then((response) => {
              Swal.fire({
                title: 'Stock berhasil di update',
                icon: 'success'
              });
              getBatch();
            })
          }
        })
      }
    });
  }
  const handleReturnBatch = (batch_id) => {
    Swal.fire({
      title: 'Apakah anda akan menghapus batch?',
      showCancelButton: true,
      confirmButtonText: "Hapus",
      icon: "question",
      showCancelButton: true,
    }).then(results => {
      if (results.isConfirmed) {
        batchstockAPI.delete_batch(batch_id).then(() => {
          Swal.fire({
            title: 'Data berhasil di hapus',
            icon: 'success'
          })
          getBatch()
        })
      }
    })
  }
  // Handle form
  const [productName, setProductName] = useState('');
  const [productBarcode, setProductBarcode] = useState('');
  const handleTargetValueSearch = (value) => {
    setProductName(value.product_name.trim());
    setProductBarcode(value.barcode.trim());
  }
  const [batchCode, setBatchCode] = useState('');
  const [batchExpireDate, setBatchExpireDate] = useState('')
  const [batchStock, setBatchStock] = useState('');
  const handleSubmitBatch = (e) => {
    e.preventDefault();
    if (productBarcode == '') {
      return Swal.fire({
        title: 'Produk tidak boleh kosong',
        icon: 'error'
      })

    }
    const data = {
      batch_code: batchCode,
      expire_date: batchExpireDate,
      product_barcode: productBarcode,
      stock: batchStock
    }
    Swal.fire({
      title: 'Apakah data akan disimpan?',
      text: 'Pastikan data yang anda masukan benar',
      showCancelButton: true,
      confirmButtonText: "Simpan",
      icon: "question",
      showCancelButton: true,
    }).then(results => {
      if (results.isConfirmed) {
        batchstockAPI.create_batch(data).then(response => {
          Swal.fire({
            title: 'Data berhasil disimpan',
            icon: 'success'
          })
        })
        setBatchCode('');
        setBatchExpireDate('');
        setProductBarcode('');
        setProductName('');
        setBatchStock('');
        getBatch();
      }
    })

  }
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Batch & Stok</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-batch" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalPages}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-batch" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="row">
            <div className="col-md-6">
              <SearchProduct
                targetValue={handleTargetValueSearch} />
              <div className="form-group">
                <label htmlFor="">Nama Produk</label>
                <input type="text" className="form-control form-control-sm" readOnly disabled value={productName} />
              </div>
              <div className="form-group">
                <label htmlFor="">Nama Barcode</label>
                <input type="text" className="form-control form-control-sm" readOnly disabled value={productBarcode} />
              </div>
            </div>
            <div className="col-md-6">
              <form onSubmit={handleSubmitBatch}>
                <div className="form-group">
                  <label htmlFor="">Kode Batch</label>
                  <input type="text" className="form-control form-control-sm" value={batchCode} onChange={(e) => setBatchCode(e.target.value.trim())} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Tanggal Expire</label>
                  <input type="date" className="form-control form-control-sm" value={batchExpireDate} onChange={(e) => setBatchExpireDate(e.target.value.trim())} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Stok</label>
                  <input type="number" className="form-control form-control-sm" value={batchStock} onChange={(e) => setBatchStock(e.target.value.trim())} required />
                </div>

                <div className="form-group d-flex gap-2 justify-content-end">
                  <button className="btn btn-sm btn-primary">
                    Simpan
                  </button>
                  <button className="btn btn-sm btn-danger">
                    Reset
                  </button>
                </div>
              </form>
            </div>
            <div className="form-text">Perhatikan data produk</div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}