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
    payment();
  }

  function payment() {
    console.count("payment");
    const widget = new window.cp.CloudPayments();
    let options = {
      publicId: 'test_api_00000000000000000000001',
      description: 'За стройность',
      amount: props.userData.price,
      accountId: props.userData.email, //идентификатор плательщика (необязательно)
      invoiceId: props.userData.id, //номер заказа  (необязательно)
      email: props.userData.email, //email плательщика (необязательно)
      skin: "mini", //дизайн виджета (необязательно)
    };
    const callbacks = {
      onSuccess: options => {
        console.log("Options: ", options)
      },
      onFail: (reason, options) => {
        console.log("Reason: ", reason)
        console.log("Options: ", options)
      },
      onSuccess: (paymentResult, options) => {
        console.log("Payment result: ", paymentResult)
        console.log("Options: ", options)
      }
    }
    widget.pay('auth', options, callbacks)
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
          <source media="(min-width: )" srcSet="" />
          <img src="" alt="" />
        </picture>
      </label>
    </form>
  )
}

export default Form;
