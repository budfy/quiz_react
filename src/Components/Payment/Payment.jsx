import React from "react";
import './Payment.scss';

function Payment(props) {
  return (
    <div className={"c-payment " + props.subclass}>
      <h3 className="c-payment__subtitle">Принимаем к оплате:</h3>
      <ul className="c-payment__list">
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src="../../img/dist/visa.png" width="92px" height="30px" alt="Visa" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src="../../img/dist/mastercard.png" width="50px" height="30px" alt="Mastercard" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src="../../img/dist/apple-pay.png" width="73px" height="30px" alt="Apple Pay" />
          </picture>
        </li>
        <li className="c-payment__item">
          <picture className="c-payment__img">
            <img src="../../img/dist/google-pay.png" width="76px" height="30px" alt="Google Pay" />
          </picture>
        </li>
      </ul>
    </div>)
}

export default Payment;