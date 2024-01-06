import Tabs from '../../components/Tabs'
import { useState, useEffect } from 'react';
import Table from '../../components/Tables'
import { toast } from 'react-toastify';
import ModalDetailTransaction from '../../views/transaction/modalDetailTransaction';
import transactionAPI from '../../api/transactionAPI';
export default function Product() {
  const button = [
    {
      buttonText: 'Transaksi',
      target: '#nav-product',
      key: 'product'
    },
  ]
  const tableHeader = [
    {
      name: 'Transaksi ID',
      key: 'id',
    },
    {
      name: 'Member',
      key: 'member_id',
    },
    {
      name: 'Diskon',
      key: 'discount',
    },
    {
      name: 'Total Transaksi',
      key: 'total',
    },
  ]
  const [dataTable, setDataTable] = useState([]);
  const [tableInfo, setTableInfo] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [modal, setModal] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const getData = async (page, limit) => {
    try {
      const response = await transactionAPI.getTransaction(page, limit, keyword);
      setDataTable(response.results.data)
      setTableInfo(response.results)
    } catch (error) {
    }
  }
  const handlePageAndLimitChange = (newPage, newLimit) => {
    setLimit(newLimit);
    setPage(newPage)
    getData(newPage, newLimit, keyword);
  };

  const handleSearch = (keyword) => {
    setKeyword(keyword)
  }
  // Hanlde Modal
  const handleCloseModal = () => {
    setModal(false)
  }
  const handleOpenModal = (id) => {
    const detail = dataTable.find(item => {
      return item.id == id
    });
    setDataDetail(detail);
    setModal(true);
  }

  useEffect(() => {
    getData(page, limit, keyword)
  }, [keyword])

  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Transaksi</h4>
      </div>
      <Tabs button={button}>
        <div className="tab-pane fade show active" id="nav-product" role="tabpanel" aria-labelledby="nav-home-tab">
          <Table
            tableHeader={tableHeader}
            tableData={dataTable}
            tableInfo={tableInfo}
            onLimitChange={handlePageAndLimitChange}
            search={handleSearch}
            modalTitle='Detail Transaksi'
          >
            <button className='btn btn-primary btn-sm' onClick={(e) => handleOpenModal(e.target.id)}>Detail</button>
          </Table>
        </div>
      </Tabs>
      {/* Modal */}
      <ModalDetailTransaction
        show={modal}
        onClose={handleCloseModal}
        data={dataDetail}
      />
    </div>
  );
}
