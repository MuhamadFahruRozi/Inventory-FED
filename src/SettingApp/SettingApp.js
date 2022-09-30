import { useState } from "react"
import { Col, Row } from 'react-bootstrap'

const SettingApp = ({ isBhs, setIsBhs,bahasaApp, sbTheme, handleSbTheme, tbTheme, handleTbTheme}) => {
  const [bhsButton ,setBhsButton] = useState(true)
    const handleBahasa = () => {
        console.log(!bhsButton)

        setIsBhs(!isBhs)
        setBhsButton(!bhsButton)
    }

  const [optColor] = useState([
    "black","gray","red","lightcoral","blue","lightskyblue","aqua","violet"
  ])
  
  return (
    <div>
        <h1>SettingApp</h1>
        <div className="language-tab">
          <h3>Language</h3>
          <div className="language-change" >
            <h4 className={ bhsButton ? "language-text on" : "language-text"}>B. Indonesia</h4>
            <div className="language-field" onClick={handleBahasa}>
              <div className={ bhsButton ? "language-txt-ind" : "language-txt-eng"}>
                {
                  bhsButton ? "IND" : "ENG"
                }
              </div>
              <div className={ bhsButton ? "language-button-ind" : "language-button-eng"}>
                '
              </div>
            </div>
            <h4 className={ bhsButton ? "language-text" : "language-text on"} >English</h4>
          </div>
        </div>
        <div className="sb-tab">
          <h3>
            Sidebar Theme
          </h3>
          <div className="st-input">
            <select value={sbTheme}  className={`sidebar-theme ${sbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}  onChange={handleSbTheme} >
              {
                optColor.map((clr) => <option value={clr} className={`optn ${clr}`} />) 
              }
            </select>
          </div>
        </div>
        <div className="tb-tab">
          <h3>Table Theme</h3>
          <div className="st-input">
           <select value={tbTheme}  className={`table-theme ${tbTheme} ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue' || tbTheme === 'red' ?
            'white-text' : '' }`}  onChange={handleTbTheme}>
              {
                optColor.map((clr) => <option value={clr} className={`optn ${clr}`} />)
              }
            </select>
          </div>
          <div className={`table-record example-table ${
            tbTheme === 'black' || tbTheme === 'gray' || tbTheme === 'blue'|| tbTheme === 'red' ?
            'white-text' : '' }`}>
            <Row className={`label-record  ${tbTheme}`}>
              <Col>{bahasaApp.tgl2}</Col>
              <Col>{bahasaApp.nmt2}</Col>
              <Col>{bahasaApp.ibar}</Col>
              <Col>{bahasaApp.nbar}</Col>
            </Row>
          </div>
        </div>
    </div>
  )
}

export default SettingApp