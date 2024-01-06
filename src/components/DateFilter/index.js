import { useState } from "react"

export default function DateFilter({ onChange }) {
  const currentDate = new Date();
  const [day, setDay] = useState(currentDate.getDate());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);
  const [year, setYear] = useState(currentDate.getFullYear());
  // Menghasilkan opsi untuk tanggal (1-31)
  const dayOptions = Array.from({ length: 31 }, (_, index) => index + 1);
  // Menghasilkan opsi untuk bulan (Januari-Desember)
  const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);
  // Menghasilkan opsi untuk tahun (sekarang hingga 7 tahun ke depan)
  const yearOptions = Array.from({ length: 20 }, (_, index) => 2020 + index);
  const handleSubmit = () => {
    const data = `?tahun=${year}&bulan=${month}&tanggal=${day}`;
    onChange(data)
  }
  return (
    <div className="row filter">
      <div className="col-md-3">
        <select value={day} className="form-select" onChange={(e) => setDay(e.target.value)}>
          <option value="0">Semua</option>
          {dayOptions.map((dayOption) => (
            <option key={dayOption} value={dayOption}>
              {dayOption}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <select value={month} className="form-select" onChange={(e) => setMonth(e.target.value)}>
          <option value="0">Semua</option>
          {monthOptions.map((monthOption) => (
            <option key={monthOption} value={monthOption}>
              {new Date(0, monthOption - 1).toLocaleString('id-ID', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <select value={year} className="form-select" onChange={(e) => setYear(e.target.value)}>
          {yearOptions.map((yearOption) => (
            <option key={yearOption} value={yearOption}>
              {yearOption}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <button className="btn btn-sm btn-primary" type="button" onClick={handleSubmit}>
          <i className="bx bx-refresh pe-2"></i>
          Muat Ulang
        </button>
      </div>
    </div >
  )
}