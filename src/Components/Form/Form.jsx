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
    let cp = window.cp;
    let options = {
      publicId: 'pk_a60581fd2eaa8838a56351191174',
      description: 'За стройность',
      amount: props.userData.price,
      accountId: props.userData.email, //идентификатор плательщика (необязательно)
      invoiceId: props.userData.id, //номер заказа  (необязательно)
      email: props.userData.email, //email плательщика (необязательно)
      skin: "mini", //дизайн виджета (необязательно)
    };

    var widget = new cp.CloudPayments();
    var receipt = {
      Items: [//товарные позиции
        {
          label: props.userData.name, //наименование товара
          price: props.userData.price, //цена
          quantity: 1.00, //количество
          amount: props.userData.price, //сумма
          vat: 20, //ставка НДС
          method: 0, // тег-1214 признак способа расчета - признак способа расчета
          object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
        }
      ],
      taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
      email: props.userData.email, //e-mail покупателя, если нужно отправить письмо с чеком
      phone: '', //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
      isBso: false, //чек является бланком строгой отчетности
      amounts:
      {
        electronic: props.userData.price, // Сумма оплаты электронными деньгами
        advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после запятой)
        credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после запятой)
        provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после запятой)
      }
    };

    var data = {};
    data.CloudPayments = {
      CustomerReceipt: receipt, //чек для первого платежа
      recurrent: {
        interval: 'Month',
        period: 1,
        customerReceipt: receipt //чек для регулярных платежей
      }
    }; //создание ежемесячной подписки

    widget.charge({ // options
      // publicId: 'test_api_00000000000000000000001',
      publicId: 'pk_a60581fd2eaa8838a563551191174', //id из личного кабинета
      description: props.userData.subDescr, //назначение
      amount: props.userData.price, //сумма
      currency: 'RUB', //валюта
      invoiceId: props.userData.id, //номер заказа  (необязательно)
      accountId: props.userData.email, //идентификатор плательщика (обязательно для создания подписки)
      skin: "modern",
      data: data
    },
      function (options) {
        props.sendData("payment", {
          status: "paid"
        },
          "set-status");
        setTimeout(() => {
          nextStep()
        }, 1500);
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
