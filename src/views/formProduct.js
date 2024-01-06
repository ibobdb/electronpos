import { useEffect, useState } from "react";
import productAPI from "../api/productAPI";
import { toast } from 'react-toastify';

export default function FormProduct(props) {
  const [barcode, setBarcode] = useState(null);
  const [productName, setProductName] = useState(null);
  const [category, setCategory] = useState(null);
  const [cost, setCost] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [errors, setErrors] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

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
    setErrors(null);
    const data = {
      barcode: barcode,
      product_name: productName,
      cost: cost,
      price: price,
      stock: stock
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
    }).catch(error => {
      // console.log(error.response.data.errors)
      const errList = error.response.data.errors;
      setErrors(errList);
    })
  }
  const getProduct = async (barcode) => {
    try {
      const response = await productAPI.getProductById(barcode);
      const data = response.results;
      setBarcode(data.barcode)
      setCategory(data.category)
      setCost(data.cost)
      setPrice(data.price)
      setProductName(data.product_name)
      setStock(data.stock)
      setIsUpdate(true);
    } catch (error) {
      console.log(error)
    }
  }
  const onUpdate = (e) => {
    e.preventDefault()
    const data = {
      product_name: productName,
      cost: cost,
      price: price,
      stock: stock
    }
    productAPI.updateProduct(barcode, data).then((response) => {

      toast.success('Data berhasil disimpan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }).catch(error => {
      // console.log(error.response.data.errors)
      const errList = error.response.data.errors;
      setErrors(errList);
    })
  }
  useEffect(() => {
    errors && errors.map(err => {
      toast.error(err.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    })
  }, [errors])
  useEffect(() => {
    if (props.isUpdate) {
      getProduct(props.isUpdate)
    }
  }, [])
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card my-3">
          <div className="card-body">
            <h5>{props.title}</h5>
            <form method='post' onSubmit={(isUpdate ? onUpdate : onSubmit)}>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Barcode">Barcode</label>
                    <input type="text" className="form-control" onChange={handleBarcode} required value={barcode} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Barcode">Nama Produk</label>
                    <input type="text" className="form-control" onChange={handleProductName} value={productName} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Barcode">Kategori</label>
                    <select value={category} className="form-select" onChange={handleCategory} >
                      <option value="1">Barang Harian</option>
                      <option value="2">Barang Bulanan</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Barcode">Harga Modal</label>
                    <input type="text" className="form-control" onChange={handleCost} value={cost} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Barcode">Harga Jual</label>
                    <input type="text" className="form-control" onChange={handlePrice} value={price} />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="Barcode">Stok</label>
                    <input type="text" className="form-control" onChange={handleStock} value={stock} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="Barcode">Satuan</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className="form-check-label" for="flexRadioDefault1">
                        Box
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                      <label className="form-check-label" for="flexRadioDefault2">
                        Pcs
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group d-flex gap-2 my-3">
                <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
                <button className="btn btn-danger btn-sm" type="reset">Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}