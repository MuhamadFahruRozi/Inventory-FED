import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { BsSave } from 'react-icons/bs'

const Input_Pembelian = () => {
  const [field, setField] = useState([0])
  // const [fieldCount, setFieldCount] = useState(0)
  const [idBarang, setIdBarang] = useState([])
  const [namaBarang, setNamaBarang] = useState([])
  const [hargaBeli, setHargaBeli] = useState([])
  const [hargaJual, setHargaJual] = useState([])
  const [tanggal, setTanggal] = useState('')
  const [hari, setHari] = useState('')

  useEffect(() => {  
    const hariData = () => {
      const getHari = new Date().getDay()
      if( getHari === 0 ) {
        setHari('Minggu')
      } else if ( getHari === 1 ) {
        setHari('Senin')
      } else if ( getHari === 2 ) {
        setHari('Selasa')
      } else if ( getHari === 3 ) {
        setHari('Rabu')
      } else if ( getHari === 4 ) {
        setHari('Kamis')
      } else if ( getHari === 5 ) {
        setHari('Jumat')
      } else {
        setHari('Sabtu')
      }
    }
    hariData()

    const firsthandleIdBarang = () => {
      const allNewID = []
      const getYear = new Date().getFullYear()
      const getMonth = new Date().getMonth()
      const getSec = new Date().getSeconds()
      const getMilSec = new Date().getMilliseconds()
      allNewID[0] = 'ITEM-'+getYear+'-'+getMonth+'-'+getSec+'-'+getMilSec;
      // console.log(index)
      setIdBarang(allNewID)
    }
    firsthandleIdBarang()

  }, [])

  // useEffect(() => {
  //   const handleIdBarang = () => {
  //     const allNewID = []
  //     const getYear = new Date().getFullYear()
  //     const getMonth = new Date().getMonth()
  //     const getSec = new Date().getSeconds()
  //     const getMilSec = new Date().getMilliseconds()
  //     allNewID[field.length-1] = 'ITEM-'+getYear+'-'+getMonth+'-'+getSec+'-'+getMilSec;
  //     // console.log(index)
  //     setIdBarang(allNewID)
  //   }
  //   handleIdBarang()
  //   // setFieldCount(field.length)
  // }, [field])

  useEffect(() => {
    setTanggal(hari +', '+new Date().toLocaleDateString())
  }, [hari])

  const addField = () => {
    setField([...field, 'field'])

    const allNewID = [...idBarang]
    const getYear = new Date().getFullYear()
    const getMonth = new Date().getMonth()
    const getSec = new Date().getSeconds()
    const getMilSec = new Date().getMilliseconds()
    allNewID[field.length] = 'ITEM-'+getYear+'-'+getMonth+'-'+getSec+'-'+getMilSec;
    // console.log(index)
    setIdBarang(allNewID)

    // setFieldCount(field.length)
  }

  const delField = () => {
    const allField = [...field]
    const num = field.length-1
    allField.splice(num, 1)
    setField(allField)

    const allID = [...idBarang]
    const allNama = [...namaBarang]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]

    allID.splice(num, 1)
    allNama.splice(num, 1)
    allHargaBeli.splice(num, 1)
    allHargaJual.splice(num, 1)

    setIdBarang(allID)
    setNamaBarang(allNama)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
  }

  const handleNamaBarang = (e, index) => {
    const allNama = [...namaBarang]
    allNama[index] = e.target.value
    setNamaBarang(allNama)
  }

  const handleHargaBeli = (e, index) => {
    const allHargaBeli = [...hargaBeli]
    allHargaBeli[index] = e.target.value
    setHargaBeli(allHargaBeli)
  }

  const handleHargaJual = (e, index) => {
    const allHargaJual = [...hargaJual]
    allHargaJual[index] = e.target.value
    setHargaJual(allHargaJual)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    for (let index = 0; index < idBarang.length; index++) {
      if(idBarang[index] !== undefined && namaBarang[index] !== undefined 
        && hargaBeli[index] !== undefined && hargaJual[index] !== undefined) {

        //BarangRecord
        let barangFormData = new FormData();
        barangFormData.append('idbar', idBarang[index])
        barangFormData.append('nambar', namaBarang[index])
        barangFormData.append('harbel', hargaBeli[index])
        barangFormData.append('harjul', hargaJual[index])

        const barangUrl =`https://portofolio-api-mfr.herokuapp.com/api/barang/`;

        axios.post(barangUrl, barangFormData).then(res => {
            alert(`Items data recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        // StokRecord
        let stokFormData = new FormData();
        stokFormData.append('idbar', idBarang[index])

        const stokUrl =`https://portofolio-api-mfr.herokuapp.com/api/inventory/`;

        axios.post(stokUrl, stokFormData).then(res => {
            alert(`Stok data for ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })
        
        // console.log(index ,idBarang[index])
        console.log(index ,idBarang[index], namaBarang[index], hargaBeli[index], hargaJual[index])
      } else {
        console.log(`All data for row ${index+1} is not filled, item data ${index+1} is not recorded!`)
      }      
    }
    
  }

  console.log(idBarang, namaBarang, hargaBeli, hargaJual)
  
  return (
    <div>
      <h1>Pembelian</h1>
      <div className='table-record'>
        <Row className='row-label'>
          <Col>Tanggal:</Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className='row-record'>
          <Col><input type="text" className='input' value={tanggal} readOnly /></Col>
          <Col></Col>
          <Col className='blue-button' ><Button className='btn btn-secondary' onClick={addField}>[+] Tambah Baris</Button></Col>
          <Col className='red-button' ><Button className='btn btn-danger' onClick={delField}>[-] Hapus Baris</Button></Col>
          <Col className='save-button' ><Button className='btn btn-primary' onClick={handleSubmit}><BsSave/> Simpan</Button></Col>
        </Row>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col className='jml' >Harga Beli / Unit (Rp)</Col>
          <Col className='jml' >Harga Jual / Unit (Rp)</Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          {
            field.map((inputField, index) => (
            <>
              <Row className='data-record' key={index}>
                <Col>
                  <input type="text" className='input' value={idBarang[index]} required />
                </Col>
                <Col>
                  <input type="text" className='input' onChange={e => handleNamaBarang(e, index)} required />
                </Col>
                <Col>
                  <input type="text" className='input' onChange={e => handleHargaBeli(e, index)} required />
                </Col>
                <Col>
                  <input type="text" className='input' onChange={e => handleHargaJual(e, index)} required />
                </Col>
              </Row>
            </>
            ))
          }
        </Form>
      </div>
      <div className='note-barang'>
        <ul className='note-ul'>
          <li>* Jumlah barang akan terhitung otomatis 0 unit saat data barang pertama kali dibuat</li>
          <li>* Total jumlah dibeli akan terhitung otomatis 0 unit saat data barang pertama kali dibuat</li>
          <li>* Total dibeli akan terhitung otomatis 0 Rupiah saat data barang pertama kali dibuat</li>
          <li>* Total jumlah dijual akan terhitung otomatis 0 unit saat data barang pertama kali dibuat</li>
          <li>* Total dijual akan terhitung otomatis 0 Rupiah saat data barang pertama kali dibuat</li>
        </ul>
      </div>
    </div>
  )
}

export default Input_Pembelian