import { Modal } from 'react-bootstrap'
import { useEffect, useState } from 'react';
export default function ModalDetailDiscount(props) {
  const handleClose = () => {
    props.onClose()
  }


  return (
    <Modal
      show={props.show}
      onHide={handleClose}
      backdrop="static"
      keyboard={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Detail Diskon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className='d-flex justify-content-between'>
            <span>Nama</span>
            <span className='text-muted'>{props.data.discount_name}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span>Nilai</span>
            <span className='text-muted'>{props.data.discount_value}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span>Tipe</span>
            <span className='text-muted'>{props.data.discount_type}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span>Tanggal Mulai</span>
            <span className='text-muted'>{props.data.discount_start_on}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span>Tanggal Berakhir</span>
            <span className='text-muted'>{props.data.discount_end_on}</span>
          </div>
          <div className='d-flex justify-content-between'>
            <span>Status</span>
            <span className='text-muted'>{props.data.discount_status ? <span className='badge text-bg-primary'>Aktif</span> : ''}</span>
          </div>
        </div>
        <hr />
        List Produk
        <ul class="list-group">
          {props.data.product_list && props.data.product_list.map((item, i) => {
            return (
              <li class="list-group-item d-flex justify-content-between align-items-start" key={i}>
                <div class="me-auto">
                  {item.product_name}
                </div>
              </li>
            )
          })}
        </ul >
      </Modal.Body>
    </Modal >
  )
}