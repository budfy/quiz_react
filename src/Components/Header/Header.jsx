import React from "react";
import './Header.scss'

function Header(props) {
  let descr = () => {
    if (props.description) {
      return <p className="header__description">{props.description}</p>
    } else {
      return null
    }
  };

  return (
    <header className="header">
      <div className="container">
        <button className="logotype">
          <img src="../../img/dist/logotype.svg" alt="Logotype" />
        </button>
        {descr()}
      </div>
    </header>
  )
}

export default Header;