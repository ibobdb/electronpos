export default function QuickButton(props) {
  const handleClick = (value) => {
    props.handleValue(value)
  }
  return (
    <div className="d-flex gap-2 mt-2">
      <button className="btn btn-primary btn-sm" value={props.uang_pas} onClick={(e) => handleClick(e.target.value)} type="button">Uang PAS</button>
      <button className="btn btn-primary btn-sm" value={10000} onClick={(e) => handleClick(e.target.value)} type="button">10.000</button>
      <button className="btn btn-primary btn-sm" value={20000} type="button" onClick={(e) => handleClick(e.target.value)} >20.000</button>
      <button className="btn btn-primary btn-sm" value={50000} type="button" onClick={(e) => handleClick(e.target.value)} >50.000</button>
      <button className="btn btn-primary btn-sm" value={100000} type="button" onClick={(e) => handleClick(e.target.value)} >100.000</button>
    </div>
  )
}