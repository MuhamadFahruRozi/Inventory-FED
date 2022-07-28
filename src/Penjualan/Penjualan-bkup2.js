import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const Penjualan = () => {
  const [transaksi, setTransaksi] = useState([])
  
  const dataJual = async () => {
    const { data } = await axios.get("http://localhost:5000/record_penjualan/");
    const allData = data;
    setTransaksi(allData)
    console.log(allData)
  }

  useEffect(() => {
    dataJual()
  },[])

  return (
    <>
      <h1>Record Penjualan</h1>
      <div className='table-record'>
        <Row className='label-record'>
          <Col>No. Transaksi</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Dijual</Col>
        </Row>
        {
          transaksi.map((terjual) => (
            <Row className='data-record' >
              <Col> {terjual.no_transaksi_jual} </Col>
              <Col> {terjual.id_barang} </Col>
              <Col> {terjual.id_barang} </Col>
              <Col> {terjual.jumlah_jual_barang} </Col>
              <Col> {terjual.id_barang} </Col>
              <Col> {terjual.total_jual} </Col>
            </Row>
          ))
        }
      </div>
    </>
  )
}

export default Penjualan