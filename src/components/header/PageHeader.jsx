import "./PageHeader.css"

const PageHeader = ({text}) => {
    return (
    <div className="Header">
        <div className="logo">
          <img src="/logo.svg" />
        </div>
        <div className="createDescription">{text}</div>
      </div>
      )
}

export default PageHeader;