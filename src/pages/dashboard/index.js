import "./style.scss";
import Dummy from "../../dummyData";
import Table from "../../components/Tables";
import axios from 'axios';
import { useEffect, useState } from "react";
import DateFilter from '../../components/DateFilter';
export default function Dashboard() {
  const [dataTable, setDataTable] = useState([]);
  const [limit, setLimit] = useState(10);
  const rowHeader = [
    { title: "ID", titleName: "id" },
    { title: "Name", titleName: "name" },
    { title: "Adress", titleName: "alamat" },
    { title: "From", titleName: "asal" },
  ];
  const getData = async (page, limit) => {
    try {
      const response = await Dummy(page, limit);
      setDataTable(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLimitChange = (value) => {
    setLimit(value);
  };
  const [nonFilterData, setNonFilterData] = useState({});
  const getNonfilterData = async () => {
    await axios.get(`http://localhost:8080/api/v1/dashboard/non_filter_data`).then((response) => {
      setNonFilterData(response.data.results);
    })
  }
  const [filterData, setFilterData] = useState({});
  const getFilterData = async (data = '') => {
    await axios.get(`http://localhost:8080/api/v1/dashboard/filter_data${data}`).then(response => {
      setFilterData(response.data.results);
    })
  }
  const handleFilterChange = (data) => {
    getFilterData(data);

  }
  useEffect(() => {
    getData(1, limit);
    getNonfilterData();
    getFilterData();
  }, []);
  useEffect(() => {
    getData(1, limit);
  }, [limit]);

  return (
    <div>
      <div className="page-header w-100 bg-white p-2 mt-3">
        <h4>Dashboard</h4>
        <h5 className="text-muted">{new Date(nonFilterData.tanggal).toLocaleString('id-ID')}</h5>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="box-row box-primary">
            <h5>Total Produk</h5>
            <h3 className="text-primary fw-bold">{nonFilterData.total_produk}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box-row">
            <h5>Total Member</h5>
            <h3 className="text-primary fw-bold">{nonFilterData.total_member}</h3>
          </div>
        </div>
        <div className="col-md-4">
          <div className="box-row">
            <h5>Diskon Aktif</h5>
            <h3 className="text-primary fw-bold">{nonFilterData.total_diskon_aktif}</h3>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <h5>Filter</h5>
              </div>
              <DateFilter onChange={handleFilterChange} />
              <div className="row">
                <div className="col-md-4">
                  <div className="box-row">
                    <h5>Total Transaksi</h5>
                    <h3 className="text-primary fw-bold">{filterData.total_transaksi}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="box-row">
                    <h5>Pendapatan Kotor</h5>
                    <h3 className="text-primary fw-bold">{filterData.revenue_kotor}</h3>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="box-row">
                    <h5>Pendapatan Bersih</h5>
                    <h3 className="text-primary fw-bold">{filterData.revenue_bersih}</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col md-4">
          <div className="card">
            <div className="card-body">
              <h5>Pelanggan Teratas</h5>
              <hr />
              <li className="d-flex justify-content-between">
                <span className="fw-bold">Boby nugraha</span>
                <span className="text-muted">5000 Point</span>
                <button className="btn btn-sm btn-primary">Detail</button>
              </li>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
