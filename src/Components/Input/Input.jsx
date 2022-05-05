import React from "react";

function Input(props) {

  function setData(e) {
    let userData = props.userData;
    userData.data[props.userDataItem] = e.target.value;
    props.setUserData(userData);
  }

  return (
    <input type="number" className="input poll__input" placeholder={props.placeholder} onInput={setData} />
  )
}

export default Input;