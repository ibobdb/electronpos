import Tabs from '../../components/Tabs'
import { useState, useEffect } from 'react';
import NewTable from '../../components/NewTable';
import discountAPI from '../../api/discountAPI'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import SearchDropDown from '../../components/SearchDropDown'
import productAPI from '../../api/productAPI';
import ModalDetailDiscount from '../../views/discount/modalDiscountDetail';
export default function Discount() {
  const [keyword, setKeyword] = useState('');
  const [dataTable, setDataTable] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const button = [
    {
      buttonText: 'Discount',
      target: '#nav-discount',
      key: 'discount'
    },
    {
      buttonText: 'Buat Discount',
      target: '#nav-add-discount',
      key: 'add-discount'
    }
  ]
  const columns = [
    {
      name: 'Status',
      selector: row => <span className={`badge rounded-pill ${row.discount_status == true ? 'text-bg-primary' : 'text-bg-danger'}`}>{row.discount_status == true ? 'Aktif' : 'Tidak Aktif'}</span>,
    },
    {
      name: 'Nama Diskon',
      selector: row => row.discount_name,
      sortable: true,
    },
    {
      name: 'Nilai Diskon',
      selector: row => row.discount_value,
      sortable: true,
    },
    {
      name: 'Jenis Diskon',
      selector: row => row.discount_type,
    },
    {
      name: 'Tanggal Mulai',
      selector: row => row.discount_start_on,
    },
    {
      name: 'Tanggal Berakhir',
      selector: row => row.discount_end_on,
    },
    {
      name: 'Perintah',
      selector: row => row.discount_status == true ?
        <div className='d-flex gap-2 justify-content-end'>
          <button className='btn btn-sm btn-warning' data-bs-toggle="tooltip" data-bs-placement="top" title="Hentikan Diskon" onClick={() => handleSwitchOffDiscount(row.id)}><i className="bx bx-power-off"></i></button>
          <button className='btn btn-sm btn-info' data-bs-toggle="tooltip" data-bs-placement="top" title="Hentikan Diskon" onClick={() => onDetailClick(row)}><i className="bx bx-door-open"></i></button>
          <button className='btn btn-sm btn-primary' data-bs-toggle="tooltip" data-bs-placement="top" title="Hentikan Diskon" onClick={() => console.log('Tambahkan Produk Diskon Baru')}><i className="bx bx-plus"></i></button></div>
        : '-'
    },

  ]
  // Pencarian Produk Pada Create Diskon
  const [showSearch, setShowSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [productListKeyword, setProductListKeyword] = useState('');
  const [selectedProduct, setSelectedProduct] = useState([]);
  const searchColumn = {
    title: 'product_name',
    subTitle: 'barcode',
    condition: {
      background: (row) => row.discount_id != null ? 'text-decoration-line-through  disabled' : '',
    }
  }
  const add_to_selected_product = (data) => {
    const existingProduct = selectedProduct.find(item => item.barcode == data.barcode);
    if (existingProduct) {
      return
    }
    setSelectedProduct([...selectedProduct, {
      barcode: data.barcode,
      product_name: data.product_name
    }]);
    console.log(selectedProduct);
  }
  const handleProductSearch = (value) => {
    setProductListKeyword(value);
    if (value != '') {
      setShowSearch(true)
    } else {
      setShowSearch(false)
    }
  }
  const searchListOnClick = (data) => {
    add_to_selected_product(data);
    setShowSearch(false);
    setProductListKeyword('');
  }
  const removeSelectedProduct = (barcode) => {
    const updateSelectedProduct = selectedProduct.filter(item => item.barcode != barcode)
    setSelectedProduct(updateSelectedProduct);
  }
  const resetSelectedProduct = () => {
    setSelectedProduct([]);
  }
  const getProductList = async () => {
    productAPI.getProduct(1, 10, productListKeyword).then(response => {
      setSearchList(response.results.data);
    })
  }
  useEffect(() => {
    getProductList();
  }, [productListKeyword])
  // End of Pencarian


  const handleSearch = (value) => {
    setKeyword(value)
  }
  const getDiscount = async () => {
    const response = await discountAPI.getDiscount(page, limit, keyword);
    setDataTable(response.results);
  }
  const handleSwitchOffDiscount = async (id) => {
    Swal.fire({
      title: "Apakah Diskon Akan Di Hentikan?",
      showCancelButton: true,
      confirmButtonText: "Hentikan",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        discountAPI.change_status(id)
          .then(() => {
            toast.success('Diskon Berhasil di Hentikan', {
              position: "top-right",
              autoClose: 2000,
              progress: undefined,
              theme: "light",
            });
            getDiscount();
          })
      }
    });
  }
  const [modalDetail, setModalDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const onDetailClick = async (data) => {
    setModalDetail(true);
    setDataDetail(data);
  }
  const onDetailClose = () => {
    setModalDetail(false)
  }
  useEffect(() => {
    getDiscount();
  }, [page, keyword]);
  useEffect(() => {
    document.title = 'Diskon'
    getDiscount();
  }, [])
  // FORM
  const [discountName, setDiscountName] = useState('');
  const [discountValue, setDiscountValue] = useState('');
  const [discountStartOn, setDiscountStartOn] = useState('');
  const [discountEndOn, setDiscountEndOn] = useState('');
  const [discountType, setDiscountType] = useState('percent');
  const onDiscountSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct.length == 0)
      return Swal.fire({
        title: 'Produk List tidak boleh kosong',
        icon: 'error'
      })
    const data =
    {
      "discount_name": discountName,
      "discount_value": discountValue,
      "discount_start_on": discountStartOn,
      "discount_end_on": discountEndOn,
      "discount_type": discountType,
      "discount_status": 1,
      "product_list": selectedProduct.map(item => {
        return item.barcode
      })
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
        discountAPI.create_discount(data).then(() => {
          Swal.fire({
            title: 'Data berhasil disimpan',
            icon: 'success'
          })
          setDiscountName('');
          setDiscountEndOn('');
          setDiscountStartOn('')
          setDiscountType('percent')
          setDiscountValue('')
          getDiscount();
          resetSelectedProduct();
        })
      }
    })

  }

  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Discount</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-discount" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalPages}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-discount" role="tabpanel" aria-labelledby="nav-profile-tab">
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={onDiscountSubmit}>
                <div className="form-group">
                  <label htmlFor="">Nama Diskon</label>
                  <input type="text" className="form-control form-control-sm" placeholder='Nama' value={discountName} onChange={(e) => setDiscountName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Nilai</label>
                  <input type="number" className="form-control form-control-sm" placeholder='10' value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Tipe Diskon</label>
                  <select className='form-select form-select-sm' value={discountType} onChange={(e) => setDiscountType(e.target.value)} required>
                    <option value="percent">Persen</option>
                    <option value="static">Statis</option>
                  </select>
                  <div className="form-text">"Persen" Harga Jual - (Harga Jual x Nilai Diskon) || "Statis" Harga Jual - Nilai Diskon</div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Tanggal Mulai</label>
                  <input type="date" className="form-control form-control-sm" placeholder='Nama' value={discountStartOn} onChange={(e) => setDiscountStartOn(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label htmlFor="">Tanggal Berakhir</label>
                  <input type="date" className="form-control form-control-sm" placeholder='Nama' value={discountEndOn} onChange={(e) => setDiscountEndOn(e.target.value)} required />
                </div>
                <div className="form-group">
                  <div className="button-group d-flex gap-2 justify-content-end">
                    <button className="btn btn-sm btn-primary" type='submit'>Buat Diskon</button>
                    <button className="btn btn-sm btn-danger" type='reset'>Reset Form</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="">Pencarian</label>
                <input type="text" className="form-control form-control-sm" placeholder='Cari barcode/nama produk' value={productListKeyword} onChange={(e) => handleProductSearch(e.target.value.trim())} />
                <SearchDropDown
                  show={showSearch}
                  list={searchList}
                  onClick={searchListOnClick}
                  columns={searchColumn}
                />
                <div className="form-text">Produk yang ditampilkan hanya produk yang belum mempunyai diskon</div>
              </div>
              <span onClick={resetSelectedProduct} type='button'><i className="bx bx-refresh"></i></span>
              <div className="list-title d-flex justify-content-between mb-2">
                <span className=''>List Produk</span>
                <span className='text-muted'>Total:{selectedProduct.length}</span>
              </div>
              <ul class="list-group">
                {selectedProduct && selectedProduct.map((item, i) => {
                  return (
                    <li class="list-group-item d-flex justify-content-between align-items-start" key={i}>
                      <div class="me-auto">
                        {item.product_name}
                      </div>
                      <button class="btn btn-sm btn-danger" type='button' onClick={() => removeSelectedProduct(item.barcode)}>
                        <i className='bx bx-trash'></i>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div >
      </Tabs >
      {/* Modal */}
      <ModalDetailDiscount
        show={modalDetail}
        onClose={onDetailClose}
        data={dataDetail}
      />
    </div >
  );
}
