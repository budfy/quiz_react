import React, { useState, useEffect } from "react";
import './Footer.scss'
import Payment from './../Payment/Payment';

function Footer() {
  const [openFooter, setOpenFooter] = useState(false);
  const open = function () {
    if (openFooter) setOpenFooter(false)
    else setOpenFooter(true);
  }
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrap">
          <button className={openFooter ? "footer__trigger footer__trigger--close" : "footer__trigger"} onClick={open}>О сервисе</button>
          <div className={openFooter ? "footer__wrapper footer__wrapper--active" : "footer__wrapper"}>
            <div className="footer__block">
              <ul className="footer__list">
                <li className="footer__item">
                  <span className="footer__link">2022 ООО «Название»</span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">ИНН: 777777777</span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">ОГРН: 12112121212</span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">Тел.: <a href="tel:+381111111101">+38 (111) 111-11-01</a></span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">E-mail: <a href="mailto:support@support.com">support@support.com</a></span>
                </li>
              </ul>
            </div>
            <div className="footer__block">
              <Payment subclass={""} />
            </div>
            <div className="footer__block">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">Политика конфиденциальности</a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">Отменить подписку</a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">Политика обработки данных</a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">Тарифы</a>
                </li>
                <li className="footer__item">
                  <a href="#" className="footer__link">Возврат средств</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;