import { Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Stok from '../Stok/Stok'
import Pembelian from '../Pembelian/Pembelian'
import Penjualan from '../Penjualan/Penjualan'
import InputPenjualan from '../Penjualan/Input_Penjualan'
import InputPembelian from '../Pembelian/Input_Pembelian'
import DataBarang from '../DataBarang/DataBarang'
import InputDataBarang from '../DataBarang/Input_DataBarang'
import Admin from '../Adm/Admin'

const NavbarWide = ({ isAdmin, tab ,setTab, bahasaApp, sbTagTheme, sbLinkTheme }) => {
  return (
    <div className='side-div'>
        <Row className={`input-tag ${sbTagTheme}`}>
        <h5>
            {bahasaApp.mskn}
        </h5>
        </Row>
        <Row>
        <Link className={tab === 'IPJ' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/input-penjualan" element={<InputPenjualan /> }  
        onClick={() => setTab('IPJ')} >
            {bahasaApp.penjualan}
        </Link>
        </Row>
        <Row>
        <Link  className={tab === 'IPB' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/input-pembelian" element={<InputPembelian />} 
        onClick={() => setTab('IPB')} >
            {bahasaApp.pembelian}
        </Link>
        </Row>
        <Row>
        <Link className={tab === 'IDB' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/input-data-barang" element={<InputDataBarang />} 
        onClick={() => setTab('IDB')} >
            {bahasaApp.dtbrg}
        </Link>
        </Row>
        -------------------------------
        <Row className={`input-tag ${sbTagTheme}`}>
        <h5>
            {bahasaApp.rkmn}
        </h5>
        </Row>
        <Row>
        <Link className={tab === 'STK' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/" element={<Stok />} onClick={() => setTab('STK')} >
            {bahasaApp.stok}
        </Link>
        </Row>
        <Row>
        <Link className={tab === 'RPJ' ? `link on ${sbLinkTheme}` : 'link'}
        to="/penjualan" element={<Penjualan />} onClick={() => setTab('RPJ')} >
            {bahasaApp.penjualan}
        </Link>
        </Row>
        <Row>
        <Link  className={tab === 'RPB' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/pembelian" element={<Pembelian />} onClick={() => setTab('RPB')} >
            {bahasaApp.pembelian}
        </Link>
        </Row>
        <Row>
        <Link className={tab === 'DBR' ? `link on ${sbLinkTheme}` : 'link'} 
        to="/data-barang" element={<DataBarang />} onClick={() => setTab('DBR')} >
            {bahasaApp.dtbrg}
        </Link>
        </Row>
        { isAdmin &&
            <>
            -------------------------------
            <Row className={`input-tag ${sbTagTheme}`}>
            <h5>
                ADMIN
            </h5>
            </Row>
            <Row>
            <Link  className={tab === 'USL' ? `link on ${sbLinkTheme}` : 'link'}
            to="/adm" element={<Admin />} onClick={() => setTab('USL')} >
                User List
            </Link>
            </Row>
            </>
        }
    </div>
  )
}

export default NavbarWide