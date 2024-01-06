import Tabs from '../../components/Tabs'
import { useState, useEffect } from 'react';
import productAPI from '../../api/productAPI';
import Table from '../../components/Tables'
import NewTable from '../../components/NewTable'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify';
import ModalUpdateProduct from '../../views/product/modalUpdate';
import categoryAPI from '../../api/categoryAPI';
export default function Product() {
  const button = [
    {
      buttonText: 'Produk',
      target: '#nav-product',
      key: 'product'
    },
    {
      buttonText: 'Tambah Produk',
      target: '#nav-add-product',
      key: 'add-product'
    }
  ]
  const [selectedBatch, setSelectedBatch] = useState({});
  const columns = [
    {
      name: 'Diskon Status',
      selector: row => row.discount_id == null ? '-' : <span className='badge rounded-pill text-bg-primary'>Aktif</span>,
      reorder: true,
      grow: 50
    },
    {
      name: 'Barcode',
      selector: row => row.barcode,
      reorder: true,
      grow: 50
    },
    {
      name: 'Nama Produk',
      selector: row => row.product_name,
      sortable: true,
      grow: 500
    },
    {
      name: 'Harga Modal',
      selector: row => row.cost,
      sortable: true,
      grow: 50
    },
    {
      name: 'Harga Jual',
      selector: row => row.price,
      sortable: true,
      grow: 50
    },
    {
      name: 'Nomor Batch',
      cell: (row) =>
        <select className='form-select form-select-sm'
          value={selectedBatch[row.barcode]?.batch_code || ''}
          onChange={(e) => handleBatchCodeChange(e, row)}>
          <option value=''>Pilih Batch</option>
          {row.batch_list && row.batch_list.map((batch, i) => {
            return <option value={batch.batch_code} key={i}>{batch.batch_code}</option>
          })}
        </select>,
      grow: 500
    },
    {
      name: 'Expire Date',
      selector: row => selectedBatch[row.barcode]?.expire_date || '-',
      grow: 50
    },
    {
      name: 'Stok per Batch',
      selector: row => selectedBatch[row.barcode]?.stock || '-',

    },
    {
      name: 'Stok Keseluruhan',
      selector: row => row.stock || '0',

    },
    {
      name: 'Kategori',
      selector: row => row.category?.name || <span className='badge rounded-pill text-bg-warning'>Belum di set</span>,
      grow: 50
    },
    {
      name: 'Diskon',
      selector: row => row.discount?.discount_name || '-',
      grow: 50
    },
    {
      name: 'Type Diskon',
      selector: row => row.discount?.discount_type || '-',

    },
    {
      name: 'Nilai Diskon',
      selector: row => row.discount?.discount_value || '-',

    },
    {
      name: 'Perintah',
      cell: (row) => <div div className='d-flex gap-2'>
        <button className="btn btn-danger btn-sm" type="button" onClick={() => onDeleteProduct(row.barcode)}><i className="bx bx-trash"></i></button>
        <button className="btn btn-primary btn-sm" type="button" onClick={() => onUpdateProduct(row.barcode)}><i className="bx bx-pencil"></i></button>
      </div>
      ,
      ignoreRowClick: true,
      allowoverflow: true,
    },
  ]

  const [dataTable, setDataTable] = useState({});
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [modal, setModal] = useState(false);
  const [dataId, setDataId] = useState('');
  const getProduct = async () => {
    try {
      const response = await productAPI.getProduct(page, limit, keyword);
      setDataTable(response.results)
    } catch (error) {
      setDataTable({})
    }
  }
  const handleBatchCodeChange = (e, row) => {
    const selectedCodes = e.target.value;
    setSelectedBatch(prevSelectedBatch => ({
      ...prevSelectedBatch,
      [row.barcode]: row.batch_list.find(batch => batch.batch_code === selectedCodes) || {},
    }));
  }
  const onDeleteProduct = (barcode) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Save",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        productAPI.deleteProduct(barcode)
          .then(() => {
            toast.success('Data berhasil di hapus', {
              position: "top-right",
              autoClose: 2000,
              progress: undefined,
              theme: "light",
            });
            getProduct();
          })

      }
    });

  }
  const onUpdateProduct = (barcode) => {
    setModal(true);
    setDataId(barcode)
  }

  const handleSearch = (value) => {
    setKeyword(value)
  }
  // Hanlde Modal
  const handleCloseModal = () => {
    setModal(false)
  }
  // Form Add Product
  const [barcode, setBarcode] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [cost, setCost] = useState();
  const [price, setPrice] = useState();
  const [stock, setStock] = useState(0);

  const handleBarcode = (e) => {
    const value = e.target.value
    setBarcode(value);
  }
  const handleProductName = (e) => {
    const value = e.target.value
    setProductName(value);
  }
  const handleCategory = (e) => {
    const value = e.target.value
    setCategory(value);
  }
  const handleCost = (e) => {
    const value = e.target.value
    setCost(value);
  }
  const handlePrice = (e) => {
    const value = e.target.value
    setPrice(value);
  }
  const handleStock = (e) => {
    const value = e.target.value
    setStock(value);
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      barcode: barcode,
      product_name: productName,
      cost: cost,
      price: price,
      stock: stock,
      category_id: category
    }
    productAPI.addProduct(data).then(() => {
      toast.success('Data berhasil disimpan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      setBarcode('')
      setProductName('')
      setCategory('')
      setPrice('')
      setCost('')
      setStock('')
      getProduct(page, limit)
    }).catch(error => {
      const errList = error.response.data.errors;

    })
  }
  const handleReloadData = () => {
    getProduct(page, limit, keyword)
  }
  // Handle Category List
  const [categoryList, setCategoryList] = useState([]);
  const getCategoryList = async () => {
    await categoryAPI.getCategory().then((response) => {
      setCategoryList(response.results.data)
    })
  }
  useEffect(() => {
    getProduct();
    getCategoryList()
    document.title = 'Produk'
  }, [keyword, page])

  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Kelola Produk</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-product" role="tabpanel" aria-labelledby="nav-home-tab">
          <NewTable
            data={dataTable.data}
            rows={dataTable.totalPages}
            columns={columns}
            limit={limit}
            onChangePage={page => setPage(page)}
            onSearch={handleSearch}
          />
        </div>
        <div className="tab-pane fade" id="nav-add-product" role="tabpanel" aria-labelledby="nav-profile-tab">
          <form method='post' onSubmit={onSubmit} >
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="Barcode">Barcode</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleBarcode} required value={barcode} />
                </div>
                <div className="form-group">
                  <label htmlFor="Barcode">Nama Produk</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleProductName} value={productName} />
                </div>
                <div className="form-group">
                  <label htmlFor="Barcode">Kategori</label>
                  <select value={category} className="form-select form-select-sm" onChange={handleCategory} required >
                    <option>Pilih Kategori</option>
                    {categoryList && categoryList.map((list, i) => {
                      return <option value={list.id} key={i}>{list.name}</option>
                    })}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="Barcode">Harga Modal</label>
                  <input type="text" className="form-control form-control-sm" onChange={handleCost} value={cost} placeholder='0' />
                </div>
                <div className="form-group">
                  <label htmlFor="Barcode">Harga Jual</label>
                  <input type="text" className="form-control form-control-sm" onChange={handlePrice} value={price} placeholder='0' required />
                </div>
              </div>
            </div>
            <div className="form-group d-flex gap-2 my-3">
              <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
              <button className="btn btn-danger btn-sm" type="reset">Reset</button>
            </div>
          </form>
        </div>
      </Tabs>
      {/* Modal */}
      <ModalUpdateProduct
        show={modal}
        onClose={handleCloseModal}
        dataId={dataId}
        reloadData={handleReloadData}
      />
    </div>
  );
}
