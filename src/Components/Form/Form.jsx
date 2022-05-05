import React from "react";

function Form(props) {
  return (
    <form className="poll-form">
      <input type="email" className="input poll-form__input" placeholder="Ваш Email" />
      <button className="poll-form__btn btn btn--green" type="button">Оплатить</button>
      <label htmlFor="poll-form" className="circle-checkbox poll-form__checkbox">
        <input type="checkbox" id="poll-form" className="circle-checkbox__input" />
        <span className="circle-checkbox__icon"></span>
        <span className="circle-checkbox__label">Нажимая кнопку "Оплатить" Вы даете согласие на обработку персональных данных, а также подтверждаете ознакомление с публичной офертойи тарифами</span>
      </label>
    </form>
  )
}

export default Form;
