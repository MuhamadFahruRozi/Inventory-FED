import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Pagination from '../Pagination/Pagination'

const Pembelian = ({wideContent, bahasaApp, tbTheme}) => {
  const [transaksi, setTransaksi] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [transaksiPerPage] = useState(10)
  
  useEffect(() => {
    const dataBeli = async () => {
      const { data } = await axios.get("https://inventory-bd-mfr.herokuapp.com/api/restock/");
      const allData = data;
      setTransaksi(allData)
    }
    dataBeli()
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
      <h1>{bahasaApp.rcpem}</h1>
      <div className='table-record'>
        <Row className={`label-record ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}>
          <Col className='col-2'>{bahasaApp.tgl2}</Col>
          <Col className='col-2' >{bahasaApp.nmt2}</Col>
          <Col className='col-2' >{bahasaApp.ibar}</Col>
          <Col className='col-2' >{bahasaApp.nbar}</Col>
          <Col className='jml' >{bahasaApp.jm}</Col>
          <Col className='jml' >{bahasaApp.hb}</Col>
          <Col className='jml' >{bahasaApp.ttb}</Col>
        </Row>
        {
          currentTransaksi.map((dibeli) => (
            <Row className='data-record' >
              <Col className='col-2' > { convertDay(new Date(dibeli.createdAt).getDay()) +', '+new Date(dibeli.createdAt).toLocaleDateString()} </Col>
              <Col className='col-2' > {dibeli.no_transaksi_beli} </Col>
              <Col className='col-2' > {dibeli.id_barang} </Col>
              {
                dibeli.detail_barang.map((detail) => (
                  <Col className='col-2' >
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
      <Pagination transaksiPerPage={transaksiPerPage} totalTransaksi={transaksi.length} 
        paginate={paginate} currentPage={currentPage}
        setCurrentPage={setCurrentPage} wideContent={wideContent} />
    </>
  )
}

export default Pembelian