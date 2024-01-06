import { Modal } from 'react-bootstrap'
export default function ModalUpdateProduct(props) {
  const handleClose = () => {
    props.onClose()
  }
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
        modAL update produk
      </Modal.Body>
    </Modal>
  )
}