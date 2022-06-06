import React, { useState, useEffect } from "react";
import SubmitBtn from "../SubmitBtn/SubmitBtn";
import Email from "../Email/Email";
import "./Form.scss";
import config from "./../../config/config.json";

function Form(props) {
  const [formEmail, setFormEmail] = useState(false);
  const [formCheckbox, setFormCheckbox] = useState({
    "poll-form-rules": false,
    "poll-form-autopay": false
  });
  const [email, setEmail] = useState("");
  const [paymentData, setPaymentData] = useState({});
  const [btnStatus, setBtnStatus] = useState(false);
  let cloudPay;

  async function setUserEmail() {
    let userData = props.userData;
    userData.email = email;
    props.setUserData(userData);
    await
      props.sendData("payment", { "email": props.userData.email }, "set-email");
  }

  async function getPaymentData() {
    console.log("GPD");
    return fetch(`${config.SERVER.url}/payment/${props.userData.id}/pay`, {
      method: "GET",
      headers: config.REQUEST_HEADERS
    })
      .then(response => {
        if (response.ok) {
          let answer = response.json()
          return answer;
        }
      }
      )
      .then(
        answer => {
          console.log("GPD answer: ", answer);
          console.log(paymentData);
          setPaymentData(answer.cloudpayments)
          cloudPay = answer.cloudpayments;
          console.log(cloudPay);
        }
      )
      .catch(err => {
        console.warn("Error in sendData:");
        console.error(err);
        return null;
      }
      )
  }

  function payment() {
    console.log("P");
    let cp = window.cp;

    var widget = new cp.CloudPayments();

    widget.charge(cloudPay,
      function (options) {
        setTimeout(() => {
          nextStep()
        }, 500);
      },
      function (reason, options) {
        console.warn("Fail!");
        console.log("Reason: ", reason)
        console.log("Options: ", options)
      });
  }

  function nextStep() {
    let step = props.step;
    props.setStep(step + 1)
  }

  function submit(e) {
    e.preventDefault();
    setUserEmail()
      .then(() => {
        getPaymentData()
          .then(
            payment
          )
      }
      )
  }

  function checkboxesValidation(e) {
    let obj = Object.seal(formCheckbox);
    obj[e.target.id] = e.target.checked;
    setFormCheckbox(obj);
    for (const key in formCheckbox) {
      if (!formCheckbox[key]) {
        setBtnStatus(false);
        break;
      }
      setBtnStatus(true);
    }
  }

  return (
    <form className="poll-form" onSubmit={submit}>
      <Email setFormEmail={setFormEmail} setEmail={setEmail} />
      <SubmitBtn formEmail={formEmail} btnStatus={btnStatus} />

      {/*<label htmlFor="poll-form-data" className="circle-checkbox poll-form__checkbox">*/}
      {/*  <input type="checkbox" id="poll-form-data" className="circle-checkbox__input" onChange={checkboxesValidation} />*/}
      {/*  <span className="circle-checkbox__icon"></span>*/}
      {/*  <span className="circle-checkbox__label">Нажимая кнопку "Оплатить" Вы даете согласие на обработку персональных данных, а также подтверждаете ознакомление с публичной офертойи тарифами</span>*/}
      {/*</label>*/}

      <label htmlFor="poll-form-rules" className="circle-checkbox poll-form__checkbox">
        <input type="checkbox" id="poll-form-rules" className="circle-checkbox__input" onChange={checkboxesValidation} />
        <span className="circle-checkbox__icon"></span>
        <span className="circle-checkbox__label">Согласен с <a href={config.RULES_LINKS.policy} target="_blank">политикой обработки персональных данных, правилами предоставления услуг</a> по подписке, <a href={config.RULES_LINKS.oferta} target="_blank">офертой рекуррентных платежей, договором-офертой и условиями использования</a>. Пожалуйста, ознакомьтесь с действующим тарифным планом сервиса по разработке индивидуального курса диеты. Стоимость услуги составляет {props.price} рублей (разовый платёж) за получение начального плана питания. В дальнейшем через сутки после получения начального плана питания за каждую неделю использования взимается комиссия сервиса в размере {props.oldPrice} рублей</span>
      </label>

      <label htmlFor="poll-form-autopay" className="circle-checkbox poll-form__checkbox">
        <input type="checkbox" id="poll-form-autopay" className="circle-checkbox__input" onChange={checkboxesValidation} />
        <span className="circle-checkbox__icon"></span>
        <span className="circle-checkbox__label">Я согласен подключить АВТОМАТИЧЕСКИЕ платежи подписки которые будут списываться у меня с карты без моего дальнейшего участия! Сумма списаний согласно тарифам!</span>
      </label>
    </form>
  )
}

export default Form;
