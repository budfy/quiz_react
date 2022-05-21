import React from "react";
import "./Subscribe.scss";
import icon1 from "../../img/dist/icon-bg-01.svg";
import icon2 from "../../img/dist/icon-bg-02.svg";

export default function Subscribe() {
  return (
    <div className="poll" id="poll">
      <div className="container">
        <div className="poll__wrapper">
          <div className="poll__top">
            <h3 className="poll__subtitle">Управление подписками</h3>
          </div>
          <h2 className="poll__title">Где я нахожусь в данный момент?</h2>
          <p className="poll__help poll__help--center">Это страница по управлению подписками, а&nbsp;также мы ответим на самые распространенные вопросы</p>
          <div className="poll__body">
            <div className="poll__block" >
              <h3 className="poll__subheading">Почему без моего согласия была совершена оплата?</h3>
              <p className="poll__text">На сайте Вы оформили пробную подписку, которая продлевается автоматически на несколько дней или неделю с помощью рекуррентного платежа, с которым вы согласились при оплате.</p>
            </div>
            <div className="poll__block" >
              <h3 className="poll__subheading">Почему без моего согласия была совершена оплата?</h3>
              <p className="poll__text">
                Мы используем рекуррентные платежи, также известные как рекарринговые платежи или «автоплатежи» — это возможность выполнять регулярные списания денег с банковской карты покупателя или электронного кошелька без повторного ввода реквизитов карты и без участия плательщика для инициации очередного платежа.
                <br /><br />
                Рекарринговые платежи используют так же такие компании как Яндекс, Google, Amazon, IVI, Netflix и многие другие.
              </p>
            </div>
          </div>
          <form action="#" className="poll-form">
            <h3 className="poll__subtitle poll-form__subtitle">Карта</h3>
            <div className="poll-form__inner">
              <div className="poll-form__group">
                <span className="poll-form__help">Первые 6 цифр</span>
                <input type="text" className="input poll-form__input" placeholder={123456} />
              </div>
              <div className="poll-form__group">
                <span className="poll-form__help">Последние 4 цифры</span>
                <input type="text" className="input poll-form__input" placeholder={1234} />
              </div>
            </div>
            <div className="poll-form__info">
              <div className="c-info">
                <div className="c-info__icon" style={{ backgroundImage: 'url(../img/dist/sprite.svg#icon-lock)' }} />
                <span className="c-info__text">Все данные передаются по зашифрованному каналу с использованием протокола TLS. Использование данной страницы абсолютно безопасно.</span>
              </div>
              <div className="c-info">
                <div className="c-info__icon" style={{ backgroundImage: 'url(../img/dist/sprite.svg#icon-card)' }} />
                <span className="c-info__text">Указывается только часть данных, это безопасно</span>
              </div>
            </div>
            <button className="poll-form__btn btn btn--green">Отписаться</button>
          </form>
        </div>
      </div>
    </div>
  )
}