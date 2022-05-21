import { useState } from "react";

import validator from 'validator';

export default function Email(props) {
  const [emailError, setEmailError] = useState('')

  const validateEmail = (e) => {
    var email = e.target.value

    if (validator.isEmail(email)) {
      setEmailError('')
      props.setFormEmail(true)
    } else {
      setEmailError('Введите корректный Email!')
      props.setFormEmail(false)
    }
  }

  function inputHandler(e) {
    props.setEmail(e.target.value)
  }

  return (
    <>
      <input type="text" id="userEmail" className="input poll-form__input" placeholder="Ваш Email"
        onChange={validateEmail} onInput={inputHandler}></input> <br />
      {emailError ? <span style={{
        fontWeight: 'bold',
        color: '#EA2121',
        position: ''
      }}>{emailError}</span> : ""}
    </>
  );
}