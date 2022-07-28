import { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const Input_Penjualan = () => {
  return (
    <>
      <h1>Penjualan</h1>
      <div className='table-record'>
        <Row className='add-row'>
          <Button className='col-2'>[+] Tambah Baris</Button>
        </Row>
        <Row className='label-record'>
          <Col>No. Transaksi</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Dijual</Col>
        </Row>
        <Row className='data-record' >
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
        </Row>
        <Row className='data-record' >
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
          <Col><input type="text" className='input' /></Col>
        </Row>
      </div>
    </>
  )
}

export default Input_Penjualan