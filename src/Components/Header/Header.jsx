import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';
import logo from "../../img/dist/logotype.svg"

function Header(props) {
  let descr = () => {
    if (props.description) {
      return <p className="header__description">{props.description}</p>
    } else {
      return null
    }
  };

  function clear() {
    if (props.step === 9) {
      return " header--clear";
    }
    else {
      return "";
    }
  }

  return (
    <header className={"header" + clear()}>
      <div className="container">
        <Link to="/" className="logotype">
          <img src={logo} alt="Logotype" />
        </Link>
        {descr()}
      </div>
    </header>
  )
}

export default Header;