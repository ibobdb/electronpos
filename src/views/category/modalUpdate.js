import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import productAPI from '../../api/productAPI';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
export default function ModalUpdateCategory(props) {
  const handleClose = () => {
    props.onClose()
  }
  const [desc, setDesc] = useState('');
  const [name, setName] = useState('');

  const onSubmit = (e) => {
    e.preventDefault()
    const data = {
      name: name,
      description: desc
    }

    Swal.fire({
      title: "Apakah data akan diperbarui?",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      icon: "question"
    }).then((result) => {
      if (result.isConfirmed) {
        // productAPI.updateProduct(barcode, data).then((response) => {
        //   props.reloadData();
        //   handleClose();
        //   toast.success('Data berhasil disimpan', {
        //     position: "top-right",
        //     autoClose: 2000,
        //     theme: "light",
        //   });
        // }).catch(error => {
        //   // console.log(error.response.data.errors)
        //   const errList = error.response.data.errors;
        //   // setErrors(errList);
        // })
      }
    });
  }
  // const getCategoryById = async (barcode) => {
  //   try {
  //     const response = await productAPI.getCategoryId(barcode);
  //     const data = response.results;
  //     setName(data.name)
  //     setDesc(data.desc)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  useEffect(() => {
    // getCategoryId(props.dataId)
  }, [props.dataId])
  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      fullscreen={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Produk</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form method='post' onSubmit={onSubmit} >
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Barcode">Nama Produk</label>
                <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} value={name} />
              </div>

            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label htmlFor="Barcode">Harga Modal</label>
                <input type="text" className="form-control" onChange={(e) => setDesc(e.target.value)} value={desc} />
              </div>

            </div>

          </div>
          <div className="form-group d-flex gap-2 my-3">
            <button className="btn btn-primary btn-sm" type="submit">Simpan</button>
            <button className="btn btn-danger btn-sm" type="reset">Reset</button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}