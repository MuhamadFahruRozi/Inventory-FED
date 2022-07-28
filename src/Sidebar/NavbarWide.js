import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Stok from '../Stok/Stok'
import Pembelian from '../Pembelian/Pembelian'
import Penjualan from '../Penjualan/Penjualan'
import InputPenjualan from '../Penjualan/Input_Penjualan'
import InputPembelian from '../Pembelian/Input_Pembelian'
import DataBarang from '../DataBarang/DataBarang'
import InputDataBarang from '../DataBarang/Input_DataBarang'
import Admin from '../Adm/Admin'

const NavbarWide = ({ isAdmin }) => {
  const [tab, setTab] = useState('')

  return (
    <div className='side-div'>
        <Row className='input-tag'>
        <h5>
            INPUT
        </h5>
        </Row>
        <Row>
        <Link className={tab === 'IPJ' ? 'link on' : 'link'} 
        to="/input-penjualan" element={<InputPenjualan /> }  
        onClick={() => setTab('IPJ')} >
            Penjualan
        </Link>
        </Row>
        <Row>
        <Link  className={tab === 'IPB' ? 'link on' : 'link'} 
        to="/input-pembelian" element={<InputPembelian />} 
        onClick={() => setTab('IPB')} >
            Pembelian
        </Link>
        </Row>
        <Row className={tab === 'IDB' ? 'link on' : 'link'} >
        <Link className='link' to="/input-data-barang" 
        element={<InputDataBarang />} onClick={() => setTab('IDB')} >
            Data Barang
        </Link>
        </Row>
        -------------------------------
        <Row className='input-tag'>
        <h5>
            RECORD
        </h5>
        </Row>
        <Row className={tab === 'STK' ? 'link on' : 'link'} >
        <Link className='link' to="/" 
        element={<Stok />} onClick={() => setTab('STK')} >
            Stok
        </Link>
        </Row>
        <Row className={tab === 'RPJ' ? 'link on' : 'link'} >
        <Link className='link' to="/penjualan" 
        element={<Penjualan />} onClick={() => setTab('RPJ')} >
            Penjualan
        </Link>
        </Row>
        <Row className={tab === 'RPB' ? 'row on' : 'row'} >
        <Link className='link' to="/pembelian" 
        element={<Pembelian />} onClick={() => setTab('RPB')} >
            Pembelian
        </Link>
        </Row>
        <Row className={tab === 'DBR' ? 'row on' : 'row'} >
        <Link className='link' to="/data-barang" 
        element={<DataBarang />} onClick={() => setTab('DBR')} >
            Data Barang
        </Link>
        </Row>
        { isAdmin &&
            <>
            -------------------------------
            <Row className='input-tag'>
            <h5>
                ADMIN
            </h5>
            </Row>
            <Row className={tab === 'USL' ? 'link on' : 'link'} >
            <Link className='link' to="/adm" 
            element={<Admin />} onClick={() => setTab('USL')} >
                User List
            </Link>
            </Row>
            </>
        }
    </div>
  )
}

export default NavbarWide