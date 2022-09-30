import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../Pagination/Pagination'

const Penjualan = ({wideContent, bahasaApp, tbTheme}) => {
  const [transaksi, setTransaksi] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [transaksiPerPage] = useState(10)
  
  useEffect(() => {
    const dataJual = async () => {
      const { data } = await axios.get("https://inventory-bd-mfr.herokuapp.com/api/sales/");
      const allData = data;
      setTransaksi(allData)
    }
    dataJual()
  },[])

  const indexLastProject = currentPage * transaksiPerPage;
  const indexFirstProject = indexLastProject - transaksiPerPage;
  const currentTransaksi = transaksi.slice(indexFirstProject, indexLastProject);

  const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
  }

  const convertDay = (hari) => {
    if( hari === 0 ) {
      return (bahasaApp.hrmi)
    } else if ( hari === 1 ) {
      return (bahasaApp.hrse)
    } else if ( hari === 2 ) {
      return (bahasaApp.hrsel)
    } else if ( hari === 3 ) {
      return (bahasaApp.hrrb)
    } else if ( hari === 4 ) {
      return (bahasaApp.hrkm)
    } else if ( hari === 5 ) {
      return (bahasaApp.hrju)
    } else if ( hari === 6 ) {
      return (bahasaApp.hrsa)
    }
  }

  return (
    <>
      <h1>{bahasaApp.rcpen}</h1>
      <div className='table-record'>
        <Row className={`label-record ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`} >
          <Col className='col-2' >{bahasaApp.tgl2}</Col>
          <Col className='col-2' >{bahasaApp.nmt2}</Col>
          <Col className='col-2'>{bahasaApp.ibar}</Col>
          <Col className='col-2'>{bahasaApp.nbar}</Col>
          <Col className='jml' >{bahasaApp.jm}</Col>
          <Col className='jml' >{bahasaApp.hj}</Col>
          <Col className='jml' >{bahasaApp.ttj}</Col>
        </Row>
        {
          currentTransaksi.map((dijual) => (
            <Row className='data-record' >
              <Col className='col-2' >{ convertDay(new Date(dijual.createdAt).getDay()) +', '+new Date(dijual.createdAt).toLocaleDateString()} </Col>
              <Col className='col-2' > {dijual.no_transaksi_jual} </Col>
              <Col className='col-2'> {dijual.id_barang} </Col>
              {
                dijual.detail_barang.map((detail) => (
                  <Col className='col-2'>
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
      <Pagination transaksiPerPage={transaksiPerPage} totalTransaksi={transaksi.length} 
        paginate={paginate} currentPage={currentPage}
        setCurrentPage={setCurrentPage} wideContent={wideContent} />
    </>
  )
}

export default Penjualan