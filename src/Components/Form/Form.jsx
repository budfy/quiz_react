import React, { useState, useEffect } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import Email from "../Email/Email";
import "./Form.scss";

function Form(props) {
  const [formEmail, setFormEmail] = useState(false);
  const [formCheckbox, setFormCheckbox] = useState(false);
  const [email, setEmail] = useState("");

  function submit(e) {
    e.preventDefault();
    setUserEmail();
  }

  function setUserEmail() {
    let userData = props.userData;
    userData.email = email;
    props.setUserData(userData);
    props.sendData("payment", { "email": props.userData.email }, "set-email")
  }

  return (
    <form className="poll-form" onSubmit={submit}>
      <Email setFormEmail={setFormEmail} setEmail={setEmail} />
      <SubmitBtn formEmail={formEmail} formCheckbox={formCheckbox} />
      <label htmlFor="poll-form" className="circle-checkbox poll-form__checkbox">
        <input type="checkbox" id="poll-form" className="circle-checkbox__input" onChange={(e) => setFormCheckbox(e.target.checked)} />
        <span className="circle-checkbox__icon"></span>
        <span className="circle-checkbox__label">Нажимая кнопку "Оплатить" Вы даете согласие на обработку персональных данных, а также подтверждаете ознакомление с публичной офертойи тарифами</span>
        <picture>
          <source media="(min-width: )" srcset="" />
          <img src="" alt="" />
        </picture>
      </label>
    </form>
  )
}

export default Form;
