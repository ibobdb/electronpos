import { useState, useEffect } from "react";
import productAPI from "../../api/productAPI";
import SearchDropDown from "../../components/SearchDropDown";
export default function SearchProduct({ targetValue }) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [productListKeyword, setProductListKeyword] = useState('');
  const searchColumn = {
    title: 'product_name',
    subTitle: 'barcode',
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
    targetValue(data)
    setShowSearch(false);
    setProductListKeyword('');
  }

  const getProductList = async () => {
    productAPI.getProduct(1, 10, productListKeyword).then(response => {
      setSearchList(response.results.data);
    })
  }
  useEffect(() => {
    getProductList();
  }, [productListKeyword])
  return (
    <div className="form-group">
      <label htmlFor="">Pencarian</label>
      <input type="text" className="form-control form-control-sm" placeholder='Cari barcode/nama produk' value={productListKeyword} onChange={(e) => handleProductSearch(e.target.value.trim())} />
      <SearchDropDown
        show={showSearch}
        list={searchList}
        onClick={searchListOnClick}
        columns={searchColumn}
      />
    </div>

  )
}