import React from "react";
import './Payment.scss';
import visa from "../../img/visa.png"
import master from "../../img/mastercard.png"
import apple from "../../img/apple-pay.png"
import gpay from "../../img/google-pay.png"


function Payment(props) {
  return (
    <div className={"c-payment " + props.subclass}>
      <h3 className="c-payment__subtitle">Принимаем к оплате:</h3>
      <ul className="c-payment__list">
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src={visa} width="92px" height="30px" alt="Visa" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src={master} width="50px" height="30px" alt="Mastercard" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src={apple} width="73px" height="30px" alt="Apple Pay" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src={gpay} width="76px" height="30px" alt="Google Pay" />
          </picture>
        </li>
      </ul>
    </div>)
}

export default Payment;