import Axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'

const Penjualan = () => {
  const [transaksi, setTransaksi] = useState([])
  const [idBarang, setIdBarang] = useState([])
  const [namaBarang, setNamaBarang] = useState([])
  const [jumlah, setJumlah] = useState([])
  const [harga, setHarga] = useState([])
  const [total, setTotal] = useState([])

  const fetchData = async () => {
    // const { data } = await Axios.get(
    //   "https://jsonplaceholder.typicode.com/todos/"
    // );
    // const products = data;
    // setNoTransaksi(products);
    // console.log(products);
    const { data } = await Axios.get(
      "http://localhost:5000/record_penjualan/"
    );
    const products = data;
    setTransaksi(products);
    console.log(products);
  };

  useEffect(() => {  
    fetchData()
  },[])

  // console.log(noTransaksi)

  //retrive data

  // dataBeli()

  return (
    <>
      <h1>Record Penjualan</h1>
      <div className='table-record'>
        {/* <Row className='label-record'>
          <Col>No. Transaksi</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Dijual</Col>
        </Row>
        <Row className='data-record' >
          <Col>dw</Col>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Dijual</Col>
        </Row> */}
        {
          noTransaksi.map((mew) => (
            <div> {mew.id_barang} </div>
          ))
        }
        {/* {
          noTransaksi.map((mew) => (
            <div> {mew.title} </div>
          ))
        } */}
        {/* {
          noTransaksi.map((notra) => (
            <>
            <Row className='data-record' >
              <Col>{ noTransaksi._id }</Col>
              <Col>ID Barang</Col>
              <Col>Nama Barang</Col>
              <Col>Jumlah</Col>
              <Col>Harga Jual Unit</Col>
              <Col>Total Dijual</Col>
            </Row>
            </>
          ))
        } */}
      </div>
    </>
  )
}

export default Penjualan