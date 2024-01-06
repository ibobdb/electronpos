import Navbar from "../../components/Navbar"
import productAPI from "../../api/productAPI"
import './style.scss'
import { useEffect, useRef, useState } from "react"
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap'
import transactionAPI from "../../api/transactionAPI"
import QuickButton from "../../components/QuickButton"
export default function Cashier() {
  const [modal, setModal] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [barcode, setBarcode] = useState('');
  const [subTotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [member, setMember] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const get_price_with_discount = (discount_type, discount_value, product_price) => {
    var total = 0;
    if (!discount_type || discount_value == 0) {
      return total = product_price
    }
    if (discount_type == 'percent') {
      total = (product_price - (product_price * discount_value / 100))
    } else {
      total = (product_price - discount_value)
    }
    return total;
  }
  const addToCart = async (e) => {
    e.preventDefault();
    const product = await productAPI.getProductById(barcode, {
      include: {
        model: 'discountmodel',
        as: 'discount'
      }
    });

    if (!product.success) {
      return Swal.fire({
        title: "Produk tidak ditemukan",
        icon: "error"
      });
    }
    const existingProduct = cartList.find(item => item.barcode == product.results.barcode);
    if (existingProduct) {
      const updateCart = cartList && cartList.map(item => {
        return item.barcode == product.results.barcode ? { ...item, qty: item.qty + 1 } : item
      });
      setCartList(updateCart)
    } else {
      Swal.fire({
        title: product.results.product_name,
        text: 'Jumlah',
        showCancelButton: true,
        input: "number",
        confirmButtonText: "Tambah",
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          if (result.value == 0) {
            return
          }
          const get_discount_product = product.results.discount;
          const discount = get_discount_product ? parseInt(get_discount_product.discount_value) : 0;
          const discount_type = get_discount_product ? get_discount_product.discount_type : null;

          setCartList([...cartList, {
            barcode: product.results.barcode,
            product_name: product.results.product_name,
            price: product.results.price,
            qty: parseInt(result.value),
            price_with_discount: get_price_with_discount(discount_type, discount, product.results.price),
            discount: discount,
            total: get_price_with_discount(discount_type, discount, product.results.price) * parseInt(result.value),
            addedAt: new Date()
          }]);
        }
      });
    }
    setBarcode('');
  }
  const removeFromCart = (barcode) => {
    Swal.fire({
      title: "Apakah data akan di hapus?",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        const updateCart = cartList.filter(item => item.barcode != barcode);
        setCartList(updateCart);
      }
    });
  }
  const addQty = (barcode) => {
    const updateCart = cartList.map(item =>
      item.barcode === barcode ? { ...item, qty: Math.max(0, item.qty + 1), total: item.price_with_discount * Math.max(0, item.qty + 1) } : item
    );
    setCartList(updateCart);
  }
  const subtractQty = (barcode) => {
    const updateCart = cartList.map(item =>
      item.barcode === barcode ? { ...item, qty: Math.max(0, (item.qty - 1 == 0 ? 1 : item.qty - 1)), total: item.price_with_discount * Math.max(0, (item.qty - 1 == 0 ? 1 : item.qty - 1)) } : item
    );
    setCartList(updateCart);
  }
  const updateTotal = () => {
    const subtotal = cartList.reduce((total, item) => {
      // console.log(item)
      return total + item.total;
    }, 0);
    setSubtotal(subtotal);

    const total = subtotal - (subtotal * discount / 100) + (subtotal * tax / 100);
    setTotal(total);
  }
  const handlePaymentModal = () => {
    if (cartList.length == 0) {
      Swal.fire({
        title: 'Tidak ada data dalam keranjang',
        icon: 'error'
      })
    } else {
      setModal(true);
    }
  }
  const handleClose = () => {
    setModal(false);
  }
  useEffect(() => {
    updateTotal()

  }, [cartList])

  const [change, setChange] = useState(0);
  const [amount, setAmount] = useState();
  const calcChange = () => {
    if (amount < total) {
      setChange('Uang tidak cukup');
    } else {
      const change = amount - total;
      setChange(change);
    }
  }
  useEffect(() => {
    calcChange()
  }, [amount])
  const onCreateTransaction = (e) => {
    e.preventDefault();
    if (amount < total || amount == 0 || amount == null || amount == undefined) {
      setChange('Uang tidak cukup');
      Swal.fire({
        title: `Uang Tidak Cukup`,
        icon: 'error',
      })
      return
    }
    const adjustList = cartList.map(item => ({
      product_barcode: item.barcode,
      qty: item.qty,
      discount: item.discount,
      // total: 0,
      // subtotal: 0
    }))

    const data = {
      transaction: {
        member_id: member,
        tax: tax,
        discount: discount,
        total: 0
      },
      productList: adjustList
    };
    transactionAPI.createTransaction(data).then(response => {
      Swal.fire({
        title: `Transaksi berhasil, Kembalian:${change}`,
        icon: 'success',
      })
      setCartList([]);
      setBarcode('');
      setChange(0)
      setAmount();
      setDiscount(0)
      setMember(0);
      setModal(false)
      setTax(0)
      setSubtotal(0)
      setTotal(0)
      setPaymentMethod('cash');
    })
  }

  const [dataProduct, setDataProduct] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [search, setSearch] = useState(false);
  const getProduct = async (keyword) => {
    try {
      const response = await productAPI.getProduct(1, 10, keyword);
      setDataProduct(response.results.data)
    } catch (error) {
      throw error
    }
  }
  const handlePencarian = (value) => {
    if (!value) {
      setSearch(false);
    }
    if (value.startsWith('=')) {
      setBarcode(value)
      setSearch(true);
      getProduct(barcode.replace(/^=/, ''))
    } else {
      setBarcode(value)
    }
  }
  const formRef = useRef();
  const handleSearchResultsClick = (value) => {
    setBarcode(value)
    setSearch(false)
    formRef.current.focus();
  }
  const handleValue = (value) => {
    setAmount(value);
  }
  useEffect(() => {
    document.title = 'Cashier'
  }, [])
  return (
    <div className="bg-white vh-100">
      <Navbar />
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-8">
            <h5 className="text-muted">Cari Produk</h5>
            <form onSubmit={addToCart} >
              <input type="text" className="form-control" placeholder="Scan barcode" value={barcode} onChange={(e) => handlePencarian(e.target.value)} autoFocus ref={formRef} />
            </form>
            <small className="text-muted">Tambahkan "=" untuk mengetik nama atau mencari barcode</small>
            <div className={`dropdown-search-product ${search ? 'show' : ''}`}>
              <small className="text-muted fst-italic">Hasil pencarian</small>
              {dataProduct.map((item, i) => {
                return (
                  <li className="row my-2 py-3" key={i} onClick={() => handleSearchResultsClick(item.barcode)}>
                    <div className="col-md-10">
                      <span className="fw-bold">{item.product_name}</span>
                    </div>
                    <div className="col-md-2">
                      <span className="fw-bold">Rp{item.price}</span>
                    </div>
                  </li>
                )
              })}
            </div>

          </div>
          <div className="col-md-4">
            <h5 className="text-muted">Total Transaksi</h5>
            <hr />
            <div className="">
              <span className="total-font">Rp. {total}</span>
              <button className="btn btn-primary w-100" onClick={handlePaymentModal}>
                Pembayaran
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <h5 className="text-muted">List Produk</h5>
          <div className="table-responsive">
            <table class="table table-sm table-bordered">
              <thead>
                <tr>
                  <th>Barcode</th>
                  <th>Nama</th>
                  <th>Harga</th>
                  <th>Qty</th>
                  <th>Disc</th>
                  <th>Sub Total</th>
                  <th>Perintah</th>
                </tr>
              </thead>
              <tbody>
                {cartList && cartList.slice().sort((a, b) => b.addedAt - a.addedAt).map((item, i) => {
                  return <tr key={i}>
                    <td>{item.barcode}</td>
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    <td className="d-flex">
                      <span className="">{item.qty}</span>
                      <div className="button-group px-2 w-100 d-flex gap-2 justify-content-end">
                        <button className="btn btn-sm btn-primary" onClick={() => subtractQty(item.barcode)}>
                          <i className="bx bx-minus"></i>
                        </button>
                        <button className="btn btn-sm btn-primary" onClick={() => addQty(item.barcode)}>
                          <i className="bx bx-plus"></i>
                        </button>
                      </div></td>
                    <td>{item.discount}</td>
                    <td >
                      {
                        item.total
                      }
                    </td>
                    <td>
                      <button className="btn btn-sm btn-danger" type="button" onClick={() => removeFromCart(item.barcode)}>
                        <i className="bx bx-trash"></i>
                      </button>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        show={modal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        fullscreen={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pembayaran</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Metode Pembayaran</span>
          <div className="form-group">
            <select name="" id="" className="form-select form-select-sm" onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
              <option value="cash" selected>Tunai</option>
              <option value="debit" selected>Debit</option>
              <option value="qris" selected>Qris</option>
            </select>
          </div>
          <div className="detail-pembayaran">
            <form action="post" onSubmit={onCreateTransaction}>
              <div className="form-group">
                <span className="fw-bold">Total Belanja</span>
                <input type="text" className="form-control" readOnly disabled value={total} />
              </div>
              <div className="form-group">
                <span className="fw-bold">Kembalian</span>
                <input type="text" className="form-control" readOnly disabled value={change} />
              </div>
              <div className="form-group">
                <span className="fw-bold">Masukan uang pembayaran</span>
                <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} autoFocus placeholder="0" />
              </div>
              <div className="form-group">
                <QuickButton uang_pas={total} handleValue={handleValue} />
              </div>
              <div className="form-group py-2">
                <button className="btn btn-primary w-100" type="submit">Bayar</button>
              </div>
            </form>
          </div>

        </Modal.Body>
      </Modal >
    </div >
  )
}