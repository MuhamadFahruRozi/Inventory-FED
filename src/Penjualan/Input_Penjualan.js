import axios from 'axios'
import { useState, useEffect } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { BsSave } from 'react-icons/bs'
import Autocomplete from './Autocomplete'

const Input_Penjualan = ({ bahasaApp, tbTheme }) => {
  const [field, setField] = useState(['field'])
  const [noTransaksi, setNoTransaksi] = useState('')
  const [idBarang, setIdBarang] = useState([])
  const [namaBarang, setNamaBarang] = useState([])
  const [jumlah, setJumlah] = useState([])
  const [hargaBeli, setHargaBeli] = useState([])
  const [hargaJual, setHargaJual] = useState([])
  const [total, setTotal] = useState([0])
  const [totalAll, setTotalAll] = useState('')
  const [dataBarang, setDataBarang] = useState('')
  const [auto, setAuto] = useState('')
  const [autoComplete, setAutoComplete] = useState([])
  const [tanggal, setTanggal] = useState('')
  const [hari, setHari] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('https://web-production-883e.up.railway.app/api/barang/');
      const res = await axios.get('https://web-production-883e.up.railway.app/api/total/')
      const allData = data;
      setDataBarang(allData)

      const allDataPenjualan = res.data.dataTotalSales
      setNoTransaksi('SALES/'+new Date().toLocaleDateString()+'/No.'+(allDataPenjualan.length+1))
    }
    fetchData()
    const hariData = () => {
      const getHari = new Date().getDay()
      if( getHari === 0 ) {
        setHari(bahasaApp.hrmi)
      } else if ( getHari === 1 ) {
        setHari(bahasaApp.hrse)
      } else if ( getHari === 2 ) {
        setHari(bahasaApp.hrsel)
      } else if ( getHari === 3 ) {
        setHari(bahasaApp.hrrb)
      } else if ( getHari === 4 ) {
        setHari(bahasaApp.hrkm)
      } else if ( getHari === 5 ) {
        setHari(bahasaApp.hrju)
      } else {
        setHari(bahasaApp.hrsa)
      }
    }
    hariData()
  }, [bahasaApp])

  useEffect(() => {
    setTanggal(hari +', '+new Date().toLocaleDateString())
  }, [hari])
  
  // console.log(tanggal)
  // console.log(noTransaksi)

  const addField = () => {
    // const allField = [...field]
    setField([...field, 'field'])
    setTotal([...total, 0])
    // console.log(field.length)
  }

  console.log(field)

  const delField = () => {
    const allField = [...field]
    const num = field.length-1
    allField.splice(num, 1)
    // console.log(field)
    setField(allField)

    const allID = [...idBarang]
    const allNama = [...namaBarang]
    const allJumlah = [...jumlah]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]
    const allTotal = [...total]

    allID.splice(num, 1)
    allNama.splice(num, 1)
    allJumlah.splice(num, 1)
    allHargaBeli.splice(num, 1)
    allHargaJual.splice(num, 1)
    allTotal.splice(num, 1)

    setIdBarang(allID)
    setNamaBarang(allNama)
    setJumlah(allJumlah)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
    setTotal(allTotal)

  }

  const handleIdBarang = (e, index) => {
    if(e.target.value !== '') {
      setAuto(`ID-${index}`)
    } else {
      setAuto('')
    }
    
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
    const allJumlah = [...jumlah]
    const allTotal = [...total]
    if (match && match.length > 0) {
      allNama[index] = match[0].nama_barang;
      allHargaBeli[index] = match[0].harga_beli;
      allHargaJual[index] = match[0].harga_jual;
      allJumlah[index] = 0;
      allTotal[index] = 0;
    } else {
      allNama[index] = '';
      allHargaBeli[index] = '';
      allHargaJual[index] = '';
      allJumlah[index] = '';
      allTotal[index] = '';
    }
    setNamaBarang(allNama)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
    setJumlah(allJumlah)
    setTotal(allTotal)

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
    if(e.target.value !== '') {
      setAuto(`Nama-${index}`)
    } else {
      setAuto('')
    }

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
    const allJumlah = [...jumlah]
    const allTotal = [...total]
    if (match && match.length > 0) {
      allID[index] = match[0].id_barang;
      allHargaBeli[index] = match[0].harga_beli;
      allHargaJual[index] = match[0].harga_jual;
      allJumlah[index] = 0;
      allTotal[index] = 0;
    } else {
      allID[index] = '';
      allHargaBeli[index] = '';
      allHargaJual[index] = '';
      allJumlah[index] = '';
      allTotal[index] = '';
    }
    setIdBarang(allID)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
    setJumlah(allJumlah)
    setTotal(allTotal)

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

    if ( allJumlah[index] !== undefined && hargaJual[index] !== undefined ) {
      totalPerItem[index] = allJumlah[index]*hargaJual[index];
    } else {
      totalPerItem[index] = 0;
    }
    
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

        const salesUrl ='https://web-production-883e.up.railway.app/api/sales/';

        axios.post(salesUrl, salesFormData).then(res => {
            // alert(`Sales ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        //StokRecord
        let stokFormData = new FormData();
        const totalHargaNet = jumlah[index] * hargaBeli[index]
        stokFormData.append('jumjul', jumlah[index])
        stokFormData.append('tobel', totalHargaNet)
        stokFormData.append('tojul', total[index])

        const stokUrl =`https://web-production-883e.up.railway.app/api/inventory/sales/${idBarang[index]}`;

        axios.put(stokUrl, stokFormData).then(res => {
            // alert(`Stok change for ${namaBarang[index]} recorded!`)
        }).catch(err =>{
            console.log(err)
        })

        //BarangRecord
        let barangFormData = new FormData();
        barangFormData.append('jumjul', jumlah[index])
        barangFormData.append('tojul', total[index])

        const barangUrl =`https://web-production-883e.up.railway.app/api/barang/sales/${idBarang[index]}`;

        axios.put(barangUrl, barangFormData).then(res => {
            // alert(`Item sales overall for ${namaBarang[index]} recorded!`)
            // alert(`Item sales overall for ${namaBarang[index]} recorded!`)
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

    const urlTotal ='https://web-production-883e.up.railway.app/api/total/sales';

    axios.post(urlTotal, totalFormData).then(res => {
        alert(`Sales ${noTransaksi} Recorded!`)
    }).catch(err =>{
        console.log(err)
    })

  }

  // const handleBlur = () => {
  //   setAuto('')
  // }

  const autoClickID = (text, indexOfRow) => {
    // const allID = [...idBarang]
    // allID[index] = autoComplete[index];
    // setIdBarang(allID)
    const allID = [...idBarang]
    allID[indexOfRow] = text.id_barang ;
    setIdBarang(allID)

    console.log(text, indexOfRow)
    setAuto('')

    const match = dataBarang.filter((barang) => {
      if(barang.id_barang === allID[indexOfRow]) {
        return barang
      } else {
        return ''
      }
    })

    const allNama = [...namaBarang]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]
    const allJumlah = [...jumlah]
    const allTotal = [...total]
    if (match && match.length > 0) {
      allNama[indexOfRow] = match[0].nama_barang;
      allHargaBeli[indexOfRow] = match[0].harga_beli;
      allHargaJual[indexOfRow] = match[0].harga_jual;
      allJumlah[indexOfRow] = 0;
      allTotal[indexOfRow] = 0;
    } else {
      allNama[indexOfRow] = '';
      allHargaBeli[indexOfRow] = '';
      allHargaJual[indexOfRow] = '';
      allJumlah[indexOfRow] = '';
      allTotal[indexOfRow] = '';
    }
    setNamaBarang(allNama)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
    setJumlah(allJumlah)
    setTotal(allTotal)
  }

  const autoClickName = (text, indexOfRow) => {
    const allNama = [...namaBarang]
    allNama[indexOfRow] = text.nama_barang ;
    setNamaBarang(allNama)
    
    console.log(text, indexOfRow)
    setAuto('')

    const match = dataBarang.filter((barang) => {
      if(barang.nama_barang === allNama[indexOfRow]) {
        return barang
      } else {
        return ''
      }
    })

    const allID = [...idBarang]
    const allHargaBeli = [...hargaBeli]
    const allHargaJual = [...hargaJual]
    if (match && match.length > 0) {
      allID[indexOfRow] = match[0].id_barang;
      allHargaBeli[indexOfRow] = match[0].harga_beli;
      allHargaJual[indexOfRow] = match[0].harga_jual;
    } else {
      allID[indexOfRow] = '';
      allHargaBeli[indexOfRow] = '';
      allHargaJual[indexOfRow] = '';
    }

    setIdBarang(allID)
    setHargaBeli(allHargaBeli)
    setHargaJual(allHargaJual)
  }

  console.log(noTransaksi ,idBarang, namaBarang, jumlah, hargaBeli, hargaJual, total ,totalAll)
  // console.log(dataBarang)
  // console.log(field)

  return (
    <div>
      <h1> { bahasaApp.penjualan } </h1>
      <div className='table-record'>
        <Row className='row-label'>
          <Col>{ bahasaApp.nmt }</Col>
          <Col>{ bahasaApp.tgl }</Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row className='row-record'>
          <Col><input type="text" className='input' value={noTransaksi} readOnly /></Col>
          <Col><input type="text" className='input' value={tanggal} readOnly /></Col>
          <Col className='blue-button' >
          {field.length < 10 ?
            <Button className='btn btn-secondary' onClick={addField}>[+] { bahasaApp.tb }</Button>
            :
            <Button className='btn btn-secondary' onClick={addField} disabled >[+] { bahasaApp.tb }</Button>
          }
          </Col>
          <Col className='red-button' >
          {field.length > 1 ?
            <Button className='btn btn-danger' onClick={delField}>[-] { bahasaApp.hb }</Button>
            :
            <Button className='btn btn-danger' onClick={delField} disabled>[-] { bahasaApp.hb }</Button>
          }
          </Col>
          <Col className='save-button' ><Button className='btn btn-primary' onClick={handleSubmit}><BsSave/> { bahasaApp.sm }</Button></Col>
        </Row>
        <Row className={`label-record ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}>
          <Col>{ bahasaApp.ibar }</Col>
          <Col>{ bahasaApp.nbar }</Col>
          <Col>{ bahasaApp.jm }</Col>
          <Col>{ bahasaApp.hj }</Col>
          <Col>{ bahasaApp.tpi }</Col>
        </Row>
        <Form onSubmit={handleSubmit} >
          {
            field.map((inputField, index) => (
            <>
              <Row className='data-record' key={index}>
                <Col>
                  <input type="text" className='input' value={idBarang[index]} onChange={e => handleIdBarang(e, index)} 
                  onBlur={() => setTimeout(() => {setAuto('')}, 200)} required />
                  {
                    auto === `ID-${index}` ? <Autocomplete indexOfRow={index} autoStatus={auto} data={autoComplete} onClickID={autoClickID}/> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' value={namaBarang[index]} onChange={e => handleNamaBarang(e, index)} required />
                  {
                    auto === `Nama-${index}` ? <Autocomplete indexOfRow={index} autoStatus={auto} data={autoComplete}  onClickName={autoClickName} /> : ''
                  }
                </Col>
                <Col>
                  <input type="text" className='input' value={jumlah[index] === 0 ? '' : jumlah[index]} onChange={e => handleJumlah(e, index)} required />
                </Col>
                <Col>
                  <input type="text" className='input' value={hargaJual[index]} required readOnly />
                </Col>
                <Col>
                  <input type="text" className='input' value={total[index] === 0 ? '' : total[index]} required readOnly />
                </Col>
              </Row>
            </>
            ))
          }
          <Row className='data-record summary'>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>{ bahasaApp.ttj }</Col>
            <Col><input type="text" className='total-all' value={totalAll} readOnly/></Col>
          </Row>
        </Form>
      </div>
    </div>
  )
}

export default Input_Penjualan