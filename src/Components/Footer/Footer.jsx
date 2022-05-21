import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Footer.scss'
import Payment from './../Payment/Payment';

function Footer() {
  const footerContent = useRef();
  const footer = useRef();
  const [openFooter, setOpenFooter] = useState(false);

  const open = function () {
    setOpenFooter(!openFooter)
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const content = footerContent.current;
    const f = footer.current;
    let h = content.scrollHeight;
    if (openFooter) {
      f.style.position = "fixed";
      setTimeout(() => {
        content.style.height = h + "px";
        content.style.padding = '20px 0 15px';
      }, 10);
    } else {
      document.body.style.overflow = "auto";
      content.style.height = 0;
      content.style.padding = 0;
      setTimeout(() => {
        f.style.position = "static";
      }, 300);
    }
  }, [openFooter])

  return (
    <footer className={openFooter ? "footer footer--open" : "footer"} ref={footer}>
      <div className="container">
        <div className="footer__wrap">
          <button className={openFooter ? "footer__trigger footer__trigger--close" : "footer__trigger"} onClick={open}>О сервисе</button>
          <div className="footer__wrapper" ref={footerContent}>
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
              <Payment subclassName={""} />
            </div>
            <div className="footer__block">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href="#" className="footer__link">Политика конфиденциальности</a>
                </li>
                <li className="footer__item">
                  <Link to="unsubscribe" className="footer__link" onClick={open}>Отменить подписку</Link>
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