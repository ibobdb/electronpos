import { useEffect, useState } from "react";
import productAPI from "../api/productAPI";
import Table from "../components/Tables";
import FormProduct from '../views/formProduct'
export default function TableProduct() {
  const [dataProduct, setDataProduct] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const header = [
    {
      name: 'Barcode',
      key: 'barcode',
    }, {
      name: 'Nama Produk',
      key: 'product_name'
    }, {
      name: 'Harga Modal',
      key: 'cost'
    }, {
      name: 'Harga Jual',
      key: 'price'
    }, {
      name: 'Stok',
      key: 'stock'
    }
  ]
  const getProduct = async (page, limit) => {
    try {
      const response = await productAPI.getProduct(page, limit);
      setDataProduct(response.results.data)
      setTableInfo(response.results)
    } catch (error) {
    }

  }
  const handlePageAndLimitChange = (newPage, newLimit) => {
    setLimit(newLimit);
    setPage(newPage)
    getProduct(newPage, newLimit);
  };
  const onDeleteProduct = (barcode) => {
    // deleteProduct
    productAPI.deleteProduct(barcode)
      .then(() => {
        getProduct(page, limit)
      })
  }
  const onUpdateProduct = () => {
    // productAPI.getProductById(barcode).then((response) => {

    // })

  }
  useEffect(() => {
    getProduct(page, limit)
  }, [])

  return (
    <div>
      <Table
        tableHeader={header}
        tableData={dataProduct}
        tableInfo={tableInfo}
        actionButton={true}
        onDelete={onDeleteProduct}
        onUpdate={onUpdateProduct}
        onLimitChange={handlePageAndLimitChange}
      />
    </div>
  )
}