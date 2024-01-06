import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
// import Swal from 'sweetalert2'
import dbConfigAPI from '../../api/dbConfigAPI';
export default function DatabaseSettings() {
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [port, setPort] = useState('');
  const getConfig = async () => {
    try {
      await dbConfigAPI.getConfig().then(response => {
        setHost(response.host)
        setUsername(response.username)
        setPassword(response.password)
        setDatabase(response.database)
        setPort(response.port)
      })
    } catch (error) {
      throw (error)
    }
  }
  const getConnection = async () => {
    const data = {
      host: host,
      username: username,
      password: password,
      database: database,
      port: port,
    }

    await dbConfigAPI.getConnection(data).then(response => {
      toast.success('Database Terhubung', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }).catch(error => {
      toast.error('Database tidak dapat terhubung, perhatikan kembali pengaturan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    })

  }

  const updateConfig = async (e) => {
    e.preventDefault()
    const data = {
      host: host,
      username: username,
      password: password,
      database: database,
      port: port,
    }

    await dbConfigAPI.updateConfig(data).then(response => {
      toast.success('Konfiguarsi telah disimpan, jangan lupa untuk test koneksi sebelum menyimpan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    }).catch(error => {
      toast.error('Data config tidak dapat disimpan, silahkan check koneksi sebelum menyimpan', {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    })
  }
  useEffect(() => {
    getConfig()
  }, [])
  return (
    <div>
      <div className="page-header w-100 bg-white p-2 my-3">
        <h4>DATABASE</h4>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="container">
            <h5>Pengaturan Database</h5>
            <div className="row">
              <form action="" onSubmit={updateConfig}>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="">HOST</label>
                    <input type="text" className="form-control" value={host} onChange={(e) => setHost(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">PORT</label>
                    <input type="number" className="form-control" value={port} onChange={(e) => setPort(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">USERNAME</label>
                    <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">PASSWORD</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Database</label>
                    <input type="text" className="form-control" value={database} onChange={(e) => setDatabase(e.target.value)} />
                  </div>
                  <div className="form-group mt-2 gap-2 d-flex">
                    <button className="btn btn-primary" type="submit">Simpan</button>
                    <button className="btn btn-success" type="button" onClick={getConnection}>Uji Koneksi</button>
                    <button className="btn btn-primary" type="button">Kembali</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}