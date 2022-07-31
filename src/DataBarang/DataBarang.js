import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const DataBarang = () => {
  const [barang, setBarang] = useState([])

  const fetchBarang = async () => {
    const { data } = await axios.get("https://portofolio-api-mfr.herokuapp.com/api/barang/");
    const allData = data;
    setBarang(allData)
    console.log(allData)
  }

  useEffect(() => {
    fetchBarang()
  },[])

  return (
    <>
      <h1>Data Barang</h1>
      <div className='table-record'>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col className='jml' >Harga Beli / Unit</Col>
          <Col className='jml' >Harga Jual / Unit</Col>
          <Col className='jml' >Total Jumlah Dibeli</Col>
          <Col className='jml' >Total Harga Dibeli</Col>
          <Col className='jml' >Total Jumlah Dijual</Col>
          <Col className='jml' >Total Harga Dijual</Col>
        </Row>
        {
          barang.map((item) => (
            <Row className='data-record barang' >
              <Col> {item.id_barang} </Col>
              <Col> {item.nama_barang} </Col>
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.harga_beli}</span>
              </Col>
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.harga_jual}</span>
              </Col>
              <Col className='jml' > {item.jumlah_dibeli} </Col>
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.total_dibeli_seluruh}</span>
              </Col>
              <Col className='jml' > {item.jumlah_dijual} </Col>
              <Col className='number' >
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.total_dijual_seluruh}</span>
              </Col>
            </Row>
          ))
        }
      </div>
    </>
  )
}

export default DataBarang