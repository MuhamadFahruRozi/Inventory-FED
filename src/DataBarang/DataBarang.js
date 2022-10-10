import { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
import Pagination from '../Pagination/Pagination'

const DataBarang = ({wideContent, bahasaApp, tbTheme}) => {
  const [barang, setBarang] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [transaksiPerPage] = useState(10)

  const fetchBarang = async () => {
    const { data } = await axios.get("https://inventory-bd-mfr.herokuapp.com/api/barang/");
    const allData = data;
    setBarang(allData)
    // console.log(allData)
  }

  useEffect(() => {
    fetchBarang()
  },[])

  const indexLastProject = currentPage * transaksiPerPage;
  const indexFirstProject = indexLastProject - transaksiPerPage;
  const currentBarang = barang.slice(indexFirstProject, indexLastProject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <h1>{bahasaApp.dtbrg}</h1>
      <div className='table-record'>
        <Row className={`label-record ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}>
          <Col>{bahasaApp.ibar}</Col>
          <Col>{bahasaApp.nbar}</Col>
          <Col className='jml' >{bahasaApp.hb}</Col>
          <Col className='jml' >{bahasaApp.hj}</Col>
          <Col className='jml' >{bahasaApp.ttab}</Col>
          <Col className='jml' >{bahasaApp.ttnb}</Col>
          <Col className='jml' >{bahasaApp.ttaj}</Col>
          <Col className='jml' >{bahasaApp.ttnj}</Col>
        </Row>
        {
          currentBarang.map((item) => (
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
      <Pagination transaksiPerPage={transaksiPerPage} totalTransaksi={barang.length} 
        paginate={paginate} currentPage={currentPage}
        setCurrentPage={setCurrentPage} wideContent={wideContent} />
    </>
  )
}

export default DataBarang