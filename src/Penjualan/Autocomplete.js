const Autocomplete = ({indexOfRow, onClickID, onClickName, autoStatus, data }) => {
  return (
    <div className="auto-complete">
        {
        data.map((brg, index) => (
          <div className="auto-fill" key={brg.id_barang} 
          onClick={ autoStatus.includes('ID') ? () => onClickID(brg, indexOfRow) : () => onClickName(brg, indexOfRow)} >
            {
              autoStatus.includes('ID') ? 
              brg.id_barang 
              : 
              brg.nama_barang
            }
          </div>
        ))
        }
    </div>
  )
}

export default Autocomplete