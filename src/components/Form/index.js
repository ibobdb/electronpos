export default function Form(props) {

  return (
    <div>
      <h4>{props.formName}</h4>
      <form >
        {/* props.formInput */}
        {props.formInput && props.formInput.map((el, i) => {
          return (
            <div className="form-group" key={i}>
              <label htmlFor="">{el.label}</label>
              {(el.type == 'select') ?
                <select {...el.field.attr} className="form-select">
                  {el.option && el.option.map(op => {
                    return <option value={op.value}>{op.text}</option>
                  })}
                </select> : el.type == 'input' ?
                  <input {...el.field.attr} className="form-control" /> : ''
              }
            </div>)
        })}

        <div className="button-group">
          <button className="btn btn-primary" type="submit">Simpan</button>
          <button className="btn btn-danger" type="reset">Reset</button>
        </div>
      </form>
    </div>
  )
}