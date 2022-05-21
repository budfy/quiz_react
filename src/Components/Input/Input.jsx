import React, { useState, useEffect } from "react";
import "./Input.scss";

function Input(props) {

  const [error, setError] = useState(null);

  function NormalizeValue(e) {
    let val = parseInt(e.target.value.replace(/[^.,\d]+/g, "").replace(",", ".").replace(/^([^\.]*\.)|\./g, '$1'));
    let userData = props.userData;
    if (val > props.max) {
      setError(`Вы ввели слишком большое значение. Допустимое максимальное значение ${props.max}.`)
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    else if (val < props.min) {
      setError(`Вы ввели слишком маленькое значение. Допустимое минимальное значение ${props.min}.`)
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    else if (isNaN(val)) {
      e.target.value = "";
    }
    else {
      e.target.value = val;
      userData.data[props.userDataItem] = val;
      props.setUserData(userData);
      setError(null)
    }
  }

  return (
    <label className="input-wrapper poll__input">
      <input type="text" inputMode="decimal" className="input " placeholder={props.placeholder} onChange={NormalizeValue} />
      {error ? <span className="input__error">{error}</span> : null}
    </label>

  )
}

export default Input;