import './style.scss'
export default function Tabs({ button, children }) {
  return (
    <div className="mt-4">
      <nav>
        <div className="nav nav-tabs bg-white p-2" id="nav-tab" role="tablist">
          {button && button.map((button, buttonIndex) => {
            return (
              <button className={`nav-link text-dark ${buttonIndex == 0 ? 'active' : ''}`} id="nav-home-tab" data-bs-toggle="tab" data-bs-target={button.target} type="button" role="tab" aria-controls="nav-home" aria-selected="true" key={buttonIndex}>{button.buttonText}</button>
            )
          })}
        </div>
      </nav>
      <div className="tab-content bg-white vh-100 p-4" id="nav-tabContent">
        {children}
      </div>
    </div>
  )
}