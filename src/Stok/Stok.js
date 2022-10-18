import { Col, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../Pagination/Pagination'

const Stok = ({wideContent, bahasaApp, tbTheme}) => {
  const [stok, setStok] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [transaksiPerPage] = useState(10)

  useEffect(() => {
    const fetchStok = async () => {
      const {data} = await axios.get('https://inventory-bd-mfr.herokuapp.com/api/inventory/');
      const dataStok = data;
      setStok(dataStok)
      // console.log(data.id_barang)
    }
    fetchStok()
  },[])

  const indexLastProject = currentPage * transaksiPerPage;
  const indexFirstProject = indexLastProject - transaksiPerPage;
  const currentStok = stok.slice(indexFirstProject, indexLastProject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      <h1>{bahasaApp.stok}</h1>
      <div className='table-record'>
        <Row className={`label-record ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}>
          <Col>{bahasaApp.ibar}</Col>
          <Col>{bahasaApp.nbar}</Col>
          <Col className='jml' >{bahasaApp.jmter}</Col>
          <Col className='jml' >{bahasaApp.hb}</Col>
          <Col className='jml' >{bahasaApp.hj}</Col>
          <Col className='jml' >{bahasaApp.ttb}</Col>
          <Col className='jml' >{bahasaApp.ttsj}</Col>
        </Row>
        {
          currentStok.map((item, index) => (
            <Row className='data-record stok'>
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
          ))
        }
      </div>
      <Pagination transaksiPerPage={transaksiPerPage} totalTransaksi={stok.length}
        paginate={paginate} currentPage={currentPage}
        setCurrentPage={setCurrentPage} wideContent={wideContent} />
    </>
  )
}

export default Stok