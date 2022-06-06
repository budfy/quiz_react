import React, { useState, useEffect, useRef } from "react";
import "./Subscribe.scss";
import config from "../../config/config.json"

export default function Subscribe() {

  const [firstNumbers, setFirstNumbers] = useState(0);
  const [lastNumbers, setLastNumbers] = useState(0);
  const [btnStatus, setBtnStatus] = useState(true);
  const [status, setStatus] = useState(null);
  const form = useRef(null);

  function validateNumbers(e) {
    let number = e.target.value;
    let type = e.target.dataset.type;
    number = parseInt(number.replace(/[^.,\d]+/g, "").replace(/[^0-9]\g/, '$1'));
    e.target.value = Number.isNaN(number) ? "" : number
    if (type === "first") {
      if (number.toString().length === 6) {
        setFirstNumbers(number);
      }
      else {
        setFirstNumbers(0)
      }
    }
    else if (type === "last") {
      if (number.toString().length === 4) {
        setLastNumbers(number);
      } else {
        setLastNumbers(0)
      }
    }
  }

  async function sendForm(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${config.SERVER.url}/payment/unsubscribe`, {
        method: "POST",
        headers: config.REQUEST_HEADERS,
        body: JSON.stringify({
          "firstNumbers": firstNumbers.toString(),
          "lastNumbers": lastNumbers.toString()
        })
      })
      switch (response.status) {
        case 200:
          setStatus({ code: response.status, message: "Вы успешно отписались от сервиса." });
          form.current.reset();
          break;
        case 400 || 500:
          let answer = response;
          setStatus({ code: response.status, message: answer.message });
          break;
        default:

          setStatus(null);
      }
    } catch (error) {
      console.log(error);
      setStatus({ code: 400, message: error });
    }

    setFirstNumbers(0)
    setLastNumbers(0)
    setBtnStatus(true)
  }

  useEffect(() => {
    if (firstNumbers && lastNumbers) {
      setBtnStatus(false)
    }
    else (setBtnStatus(true))
  }, [firstNumbers, lastNumbers])

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
          <form className="poll-form" onSubmit={sendForm} ref={form}>
            <h3 className="poll__subtitle poll-form__subtitle">Карта</h3>
            <div className="poll-form__inner">
              <div className="poll-form__group">
                <span className="poll-form__help">Первые 6 цифр</span>
                <input type="text" className="input poll-form__input" placeholder={123456} data-type="first" onChange={validateNumbers} maxLength="6" />
              </div>
              <div className="poll-form__group">
                <span className="poll-form__help">Последние 4 цифры</span>
                <input type="text" className="input poll-form__input" placeholder={1234} data-type="last" onChange={validateNumbers} maxLength="4" />
              </div>
            </div>
            <div className="poll-form__info">
              <div className="c-info">
                <div className="c-info__icon" style={{ backgroundImage: 'url(../img/sprite.svg#icon-lock)' }} />
                <span className="c-info__text">Все данные передаются по зашифрованному каналу с использованием протокола TLS. Использование данной страницы абсолютно безопасно.</span>
              </div>
              <div className="c-info">
                <div className="c-info__icon" style={{ backgroundImage: 'url(../img/sprite.svg#icon-card)' }} />
                <span className="c-info__text">Указывается только часть данных, это безопасно</span>
              </div>
            </div>

            {status ? <span className={`c-info__error --${status.code}`}>{status.message}</span> : ""}

            <button className="poll-form__btn btn btn--green" type="submit
            " disabled={btnStatus}>Отписаться</button>
          </form>
        </div>
      </div>
    </div>
  )
}