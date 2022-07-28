import { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const Input_DataBarang = () => {
  return (
    <>
      <h1>Input Data Barang</h1>
      <div className='table-record'>
        <Row className='add-row'>
          <Button className='col-2'>[+] Tambah Baris</Button>
        </Row>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Harga Beli Unit</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Jumlah Dibeli</Col>
          <Col>Total Harga Dibeli</Col>
          <Col>Total Jumlah Dijual</Col>
          <Col>Total Harga Dijual</Col>
        </Row>
        <Row className='data-record' >
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
        </Row>
        <Row className='data-record' >
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
          <Col><input type="text" className='input' disabled/></Col>
        </Row>
      </div>
    </>
  )
}

export default Input_DataBarang