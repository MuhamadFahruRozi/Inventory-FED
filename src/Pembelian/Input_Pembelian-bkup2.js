import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { BsSave } from 'react-icons/bs'
import Autocomplete from './Autocomplete'

const Input_Penjualan = () => {
  const [field, setField] = useState(['field'])
  const [noTransaksi, setNoTransaksi] = useState('')
  const [idBarang, setIdBarang] = useState([])
  const [namaBarang, setNamaBarang] = useState([])
  const [jumlah, setJumlah] = useState([])
  const [hargaBeli, setHargaBeli] = useState([])
  const [hargaJual, setHargaJual] = useState([])
  const [total, setTotal] = useState([])
  const [totalAll, setTotalAll] = useState('')
  const [dataBarang, setDataBarang] = useState('')
  const [auto, setAuto] = useState('')
  const [autoComplete, setAutoComplete] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/api/barang/");
      const allData = data;
      setDataBarang(allData)
    }
    fetchData()
  }, [])

  const addField = () => {
    setField([...field, 'field'])
  }

  const delField = (index) => {
    const allField = [...field]
    allField.splice(index, 1)
    setField(allField)
  }

  const handleIdBarang = (e, index) => {
    setAuto(`ID-${index}`)

    const allID = [...idBarang]
    allID[index] = e.target.value;
    setIdBarang(allID)

    const match = dataBarang.filter((barang) => {
      if(barang.id_barang === allID[index]) {
        return barang
      } else {
        return ''
      }
    })

    const allNama = [...namaBarang]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]
    if (match && match.length > 0) {
      allNama[index] = match[0].nama_barang;
      allHargaBeli[index] = match[0].harga_beli;
      allHargaJual[index] = match[0].harga_jual;
    } else {
      allNama[index] = '';
      allHargaBeli[index] = '';
      allHargaJual[index] = '';
    }
    setNamaBarang(allNama)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)

    const recommend = dataBarang.filter((rec) => {
      if(allID[index] !== '' ) {
        return rec.id_barang.toLowerCase().includes(allID[index].toLowerCase() || allID[index.toUpperCase()])
      } else {
        return ''
      }
    })

    setAutoComplete(recommend)
    // console.log(recommend)
  }

  const handleNamaBarang = (e, index) => {
    setAuto(`Nama-${index}`)

    const allNama = [...namaBarang]
    allNama[index] = e.target.value;
    setNamaBarang(allNama)

    const match = dataBarang.filter((barang) => {
      if(barang.nama_barang === allNama[index]) {
        return barang
      } else {
        return ''
      }
    })

    const allID = [...idBarang]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]
    if (match && match.length > 0) {
      allID[index] = match[0].id_barang;
      allHargaBeli[index] = match[0].harga_beli;
      allHargaJual[index] = match[0].harga_jual;
    } else {
      allID[index] = '';
      allHargaBeli[index] = '';
      allHargaJual[index] = '';
    }

    setIdBarang(allID)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)

    const recommend = dataBarang.filter((rec) => {
      if(allNama[index] !== '' ) {
        return rec.nama_barang.toLowerCase().includes(allNama[index].toLowerCase() || allNama[index.toUpperCase()])
      } else {
        return ''
      }
    })

    setAutoComplete(recommend)
    // console.log(recommend)

  }

  const handleJumlah = (e, index) => {
    const allJumlah = [...jumlah]
    const totalPerItem = [...total]
    allJumlah[index] = e.target.value;
    totalPerItem[index] = allJumlah[index]*hargaJual[index];
    setTotal(totalPerItem)
    setJumlah(allJumlah)
  }

  // const handleTotal = (e, index) => {
  //   const totalPerItem = [...total]
  //   totalPerItem[index] = e.target.value;
  //   setTotal(totalPerItem)
  // }

  // useEffect(() => {
  //   const handleTotal = (e, index) => {
  //     const totalPerItem = [...total]
  //     totalPerItem[index] = jumlah[index]*harga[index];
  //     setTotal(totalPerItem)
  //   }
  //   handleTotal()
  // }, [jumlah])

  // console.log(total)
  
  useEffect(() => {
    const handleTotalAll = () => {
      const result = total.reduce((all, value) => all = all*1 + value*1 ,0)
      setTotalAll(result)
    }
    handleTotalAll()
    // console.log(totalAll)
  },[total])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    for (let index = 0; index < idBarang.length; index++) {
      // const inputData = {notra: noTransaksi,idbar: idBarang[index],nama: namaBarang[index],
      //   jumlah: jumlah[index],harga: harga[index],total: total[index]}
      if(noTransaksi !== undefined && idBarang[index] !== undefined && namaBarang[index] 
      !== undefined && jumlah[index] !== undefined && total[index] !== undefined) {

        //SalesRecord
        let salesFormData = new FormData();
        salesFormData.append('notrajul', noTransaksi);
        salesFormData.append('idbar', idBarang[index]);
        salesFormData.append('jumjul', jumlah[index])
        salesFormData.append('tojul', total[index]);

        const salesUrl ='http://localhost:8000/api/sales/';

        axios.post(salesUrl, salesFormData).then(res => {
            alert(`Sales ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        //StokRecord
        let stokFormData = new FormData();
        const totalHargaNet = jumlah[index] * hargaBeli[index]
        stokFormData.append('jumjul', jumlah[index])
        stokFormData.append('tobel', totalHargaNet)
        stokFormData.append('tojul', total[index])

        const stokUrl =`http://localhost:8000/api/inventory/sales/${idBarang[index]}`;

        axios.put(stokUrl, stokFormData).then(res => {
            alert(`Stok change for ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        //BarangRecord
        let barangFormData = new FormData();
        barangFormData.append('jumjul', jumlah[index])
        barangFormData.append('tojul', total[index])

        const barangUrl =`http://localhost:8000/api/barang/sales/${idBarang[index]}`;

        axios.put(barangUrl, barangFormData).then(res => {
            alert(`Item sales overall for ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        // console.log({notrajul: noTransaksi, idbar: idBarang[index], jumjul: jumlah[index],
        //   hargabeli: hargaBeli[index], hargajual: hargaJual[index], tojul: total[index], totalNet: totalHargaNet})
      } else {
        console.log(`All data for row ${index+1} is not filled, sales ${index+1} is not recorded!`)
      }      
    }
    
    // console.log({totalSales : totalAll})

    //Total per no. Transaksi
    let totalFormData = new FormData();
    totalFormData.append('notrajul', noTransaksi);
    totalFormData.append('tojulall', totalAll);

    const urlTotal ='http://localhost:8000/api/total/sales';

    axios.post(urlTotal, totalFormData).then(res => {
        alert("Total Sales Recorded!")
    }).catch(err =>{
        console.log(err)
    })

  }

  const handleBlur = () => {
    setAuto('')
  }

  // console.log(noTransaksi ,idBarang, namaBarang, jumlah, harga, total ,totalAll)
  console.log(dataBarang)
  // console.log(field)

  return (
    <div onBlur={handleBlur}>
      <h1>Penjualan</h1>
      <div className='table-record'>
        <Row>
          <Col className='notra col-2'>No.Transaksi:</Col>
        </Row>
        <Row className='add-row'>
          <Col className='col-2'><input type="text" className='input' onChange={(e) => setNoTransaksi(e.target.value) } /></Col>
          <Col className='col-9'></Col>
          <Button className='add-field col-1' onClick={addField} >Tambah</Button>
        </Row>
        <Row className='label-record'>
          <Col>ID Barang</Col>
          <Col>Nama Barang</Col>
          <Col>Jumlah</Col>
          <Col>Harga Jual Unit</Col>
          <Col>Total Per-Item</Col>
          <Col className='col-1'>Field</Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          {
            field.map((inputField, index) => (
            <>
              <Row className='data-record' key={index}>
                <Col>
                  <input type="text" className='input' value={idBarang[index]} onChange={e => handleIdBarang(e, index)} required />
                  {
                    auto === `ID-${index}` ? <Autocomplete autoStatus={auto} data={autoComplete} /> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' value={namaBarang[index]} onChange={e => handleNamaBarang(e, index)} required />
                  {
                    auto === `Nama-${index}` ? <Autocomplete autoStatus={auto} data={autoComplete} /> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' onChange={e => handleJumlah(e, index)} required />
                </Col>
                <Col>
                  <input type="text" className='input' value={hargaJual[index]} required readOnly />
                </Col>
                <Col>
                  <input type="text" className='input' value={total[index]} required readOnly />
                </Col>
                <Col className='del-field col-1'>
                  <div className='del-field-button' onClick={() => delField(index)}>Hapus</div>
                </Col>
              </Row>
            </>
            ))
          }
          <Row className='data-summary'>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col>Total Penjualan</Col>
                <Col><input type="text" className='total-all' value={totalAll} readOnly/></Col>
                <Col className='col-1'></Col>
              </Row>
          {/* <Row className='input-total' >
            <Col className='col-7' ></Col>
            <Col className='col-2 totalAll-label'>Total Penjualan</Col>
            <Col className='col-3 total-col'><input type="text" className='total-all' value={totalAll} readOnly/></Col>
          </Row> */}
          <Row className='record-transaksi' >
            <Col className='col-8'></Col>
            <Col className='save'><Button className='save-button' onClick={handleSubmit}><BsSave/> Save</Button></Col>
          </Row>
          
        </Form>
      </div>
    </div>
  )
}

export default Input_Penjualan