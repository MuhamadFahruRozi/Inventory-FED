import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const Pembelian = () => {
  const [transaksi, setTransaksi] = useState([])
  
  useEffect(() => {
    const dataBeli = async () => {
      const { data } = await axios.get("https://inventory-bd-mfr.herokuapp.com/api/restock/");
      const allData = data;
      setTransaksi(allData)
    }
    dataBeli()
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
      <h1>Record Pembelian</h1>
      <div className='table-record'>
        <Row className='label-record'>
          <Col className='col-2' >Tanggal</Col>
          <Col className='col-3' >No. Transaksi</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col className='jml' >Jumlah dibeli</Col>
          <Col className='jml' >Harga Beli Unit</Col>
          <Col className='jml' >Total Dibeli</Col>
        </Row>
        {
          transaksi.map((dibeli) => (
            <Row className='data-record' >
              <Col className='col-2' > { convertDay(new Date(dibeli.createdAt).getDay()) +', '+new Date(dibeli.createdAt).toLocaleDateString()} </Col>
              <Col className='col-3' > {dibeli.no_transaksi_beli} </Col>
              <Col> {dibeli.id_barang} </Col>
              {
                dibeli.detail_barang.map((detail) => (
                  <Col>
                    {detail.nama_barang}
                  </Col>
                ))
              }
              <Col className='jml' > {dibeli.jumlah_dibeli} </Col>
              {
                dibeli.detail_barang.map((detail) => (
                  <Col className='number' >
                    <span className='left-number'>Rp</span>
                    <span className='right-number'>{detail.harga_beli}</span>
                  </Col>
                ))
              }
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{dibeli.total_dibeli}</span>
              </Col>
            </Row>
          ))
        }
      </div>
    </>
  )
}

export default Pembelian