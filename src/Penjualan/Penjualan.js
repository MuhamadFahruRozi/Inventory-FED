import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const Penjualan = () => {
  const [transaksi, setTransaksi] = useState([])
  
  useEffect(() => {
    const dataJual = async () => {
      const { data } = await axios.get("https://portofolio-api-mfr.herokuapp.com/api/sales/");
      const allData = data;
      setTransaksi(allData)
    }
    dataJual()
  },[])

  const convertDay = (hari) => {
    if( hari === 0 ) {
      return 'Minggu'
    } else if ( hari === 1 ) {
      return 'Senin'
    } else if ( hari === 2 ) {
      return 'Selasa'
    } else if ( hari === 3 ) {
      return 'Rabu'
    } else if ( hari === 4 ) {
      return 'Kamis'
    } else if ( hari === 5 ) {
      return 'Jumat'
    } else if ( hari === 6 ) {
      return 'Sabtu'
    }
  }

  return (
    <>
      <h1>Record Penjualan</h1>
      <div className='table-record'>
        <Row className='label-record'>
          <Col className='col-2' >Tanggal</Col>
          <Col className='col-3' >No. Transaksi</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col className='jml' >Jumlah</Col>
          <Col className='jml' >Harga Jual Unit</Col>
          <Col className='jml' >Total Dijual</Col>
        </Row>
        {
          transaksi.map((dijual) => (
            <Row className='data-record' >
              <Col className='col-2' > { convertDay(new Date(dijual.createdAt).getDay()) +', '+new Date(dijual.createdAt).toLocaleDateString()} </Col>
              <Col className='col-3' > {dijual.no_transaksi_jual} </Col>
              <Col> {dijual.id_barang} </Col>
              {
                dijual.detail_barang.map((detail) => (
                  <Col>
                    {detail.nama_barang}
                  </Col>
                ))
              }
              <Col className='jml' > {dijual.jumlah_dijual} </Col>
              {
                dijual.detail_barang.map((detail) => (
                  <Col className='number' >
                    <span className='left-number'>Rp</span>
                    <span className='right-number'>{detail.harga_jual}</span>
                  </Col>
                ))
              }
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{dijual.total_dijual}</span>
              </Col>
            </Row>
          ))
        }
      </div>
    </>
  )
}

export default Penjualan