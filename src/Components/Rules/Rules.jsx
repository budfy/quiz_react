import React from 'react';
import './Rules.scss';

export default function PaymentRules(props) {
  return (
    <div className="c-paymentrules">
      <ul className="c-paymentrules__list">
        <li className="c-paymentrules__item">Стоимость услуги составляет 29₽ за пробный период доступа в
          личный кабинет на 72 часа;</li>
        <li className="c-paymentrules__item">По истечению пробного периода, доступ к личному
          кабинету автоматически продлевается на 7 дней за 880₽;</li>
        <li className="c-paymentrules__item">Далее взимается комиссия в размере 880₽ за каждые 7 дней
          доступа в личный кабинет;</li>
        <li className="c-paymentrules__item">Пользователь может отменить подписку в любой момент нажав
          кнопку "Отменить подписку" в нижней части страницы;</li>
        <li className="c-paymentrules__item">В случае невозможности списания 880₽ за 7 дней доступа,
          возможно списание из расчета 127₽ за каждые сутки доступа в
          личный кабинет.</li>
      </ul>
    </div>)
}