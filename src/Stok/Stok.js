import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Stok = () => {
  const [stok, setStok] = useState([])

  useEffect(() => {
    const fetchStok = async () => {
      const {data} = await axios.get('http://localhost:8000/api/inventory/');
      const dataStok = data;
      setStok(dataStok)
      // console.log(data.id_barang)
    }
    fetchStok()
  },[])

  return (
    <>
      <h1>Stok</h1>
      <div className='table-record'>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col className='jml' >Jumlah Tersedia</Col>
          <Col className='jml' >Harga Beli Unit</Col>
          <Col className='jml' >Harga Jual Unit</Col>
          <Col className='jml' >Total Dibeli</Col>
          <Col className='jml' >Total Sedia Jual</Col>
        </Row>
        {
          stok.map((item, index) => (
            <>
            <Row className='data-record stok' key={item.id_barang} >
              <Col> {item.id_barang} </Col>
              { item.Stok_Barang.map((barang, index) => (
                // console.log(barang.nama_barang)
                <Col> {barang.nama_barang} </Col>
              ))}
              <Col className='jml'>{item.jumlah_barang} </Col>
              { item.Stok_Barang.map((barang, index) => (
                <>
                  <Col className='number'>
                    <span className='left-number'>Rp</span>
                    <span className='right-number'>{barang.harga_beli}</span>
                  </Col>
                  <Col className='number'>
                    <span className='left-number'>Rp</span>
                    <span className='right-number'>{barang.harga_jual}</span>
                  </Col>
                </>
              ))}
              <Col className='number'>
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.total_harga_stok}</span>
              </Col>
              <Col className='number'>
                <span className='left-number'>Rp</span>
                <span className='right-number'>{item.total_potensi_jual}</span>
              </Col>
            </Row>
            </>
          ))
        }
      </div>
    </>
  )
}

export default Stok