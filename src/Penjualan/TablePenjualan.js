import Autocomplete from "./Autocomplete"
import { Row, Col, Button, Form } from 'react-bootstrap'
import { BsSave } from 'react-icons/bs'

const TablePenjualan = ({auto, setAuto, autoComplete, autoClickID, autoClickName, noTransaksi, tanggal, handleSubmit, handleIdBarang, handleNamaBarang, handleJumlah, addField, delField, field, idBarang, namaBarang, jumlah, hargaJual, total, totalAll }) => {
  return (
    <div>
      <h1>Penjualan</h1>
      <div className='table-record'>
        <Row>
          <Col className='notra col-3'>No.Transaksi:</Col>
          <Col className='notra col-2'>Tanggal:</Col>
        </Row>
        <Row className='add-row'>
          <Col className='col-3'><input type="text" className='input' value={noTransaksi} readOnly /></Col>
          <Col className='col-2'><input type="text" className='input' value={tanggal} readOnly /></Col>
          <Col className='col-6'></Col>
          <Button className='add-field col-1' onClick={addField} >Tambah</Button>
        </Row>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Per-Item</Col>
          <Col className='col-1'>Field</Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          {
            field.map((inputField, index) => (
            <>
              <Row className='data-record' key={index}>
                <Col>
                  <input type="text" className='input' value={idBarang[index]} onChange={e => handleIdBarang(e, index)} 
                  onBlur={() => setTimeout(() => {setAuto('')}, 200)} required />
                  {
                    auto === `ID-${index}` ? <Autocomplete indexOfRow={index} autoStatus={auto} data={autoComplete} onClickID={autoClickID}/> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' value={namaBarang[index]} onChange={e => handleNamaBarang(e, index)} required />
                  {
                    auto === `Nama-${index}` ? <Autocomplete indexOfRow={index} autoStatus={auto} data={autoComplete}  onClickName={autoClickName} /> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' value={jumlah[index] === 0 ? '' : jumlah[index]} onChange={e => handleJumlah(e, index)} required />
                </Col>
                <Col>
                  <input type="text" className='input' value={hargaJual[index]} required readOnly />
                </Col>
                <Col>
                  <input type="text" className='input' value={total[index] === 0 ? '' : total[index]} required readOnly />
                </Col>
                <Col className='del-field col-1'>
                  <div className='del-field-button' onClick={() => delField(index)}>Hapus</div>
                </Col>
              </Row>
            </>
            ))
          }
          <Row className='data-summary'>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col>Total Penjualan</Col>
                <Col><input type="text" className='total-all' value={totalAll} readOnly/></Col>
                <Col className='col-1'></Col>
              </Row>
          {/* <Row className='input-total' >
            <Col className='col-7' ></Col>
            <Col className='col-2 totalAll-label'>Total Penjualan</Col>
            <Col className='col-3 total-col'><input type="text" className='total-all' value={totalAll} readOnly/></Col>
          </Row> */}
          <Row className='record-transaksi' >
            <Col className='col-8'></Col>
            <Col className='save'><Button className='save-button' onClick={handleSubmit}><BsSave/> Save</Button></Col>
          </Row>
          
        </Form>
      </div>
    </div>
  )
}

export default TablePenjualan