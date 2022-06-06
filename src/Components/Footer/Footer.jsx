import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import './Footer.scss'
import Payment from './../Payment/Payment';
import config from '../../config/config.json'

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
                  <span className="footer__link">ИП Бондарь М.А.</span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">ИНН: 310208225142</span>
                </li>
                <li className="footer__item">
                  <span className="footer__link">ОГРНИП: 321312300035189</span>
                </li>
                {/*<li className="footer__item">*/}
                {/*  <span className="footer__link">Тел.: <a href="tel:+381111111101">+38 (111) 111-11-01</a></span>*/}
                {/*</li>*/}
                <li className="footer__item">
                  <span className="footer__link">E-mail: <a href="mailto:support@support.com">support@ballance.pro</a></span>
                </li>
              </ul>
            </div>
            <div className="footer__block">
              <Payment subclass={""} />
            </div>
            <div className="footer__block">
              <ul className="footer__list">
                <li className="footer__item">
                  <a href={`${config.FOOTER_LINKS.privacy}`} className="footer__link">Политика конфиденциальности</a>
                </li>
                <li className="footer__item">
                  <Link to="unsubscribe" className="footer__link" onClick={open}>Отменить подписку</Link>
                </li>
                <li className="footer__item">
                  <a href={`${config.FOOTER_LINKS.data}`} className="footer__link">Политика обработки данных</a>
                </li>
                <li className="footer__item">
                  <a href={`${config.FOOTER_LINKS.user}`} className="footer__link">Пользовательское соглашение</a>
                </li>
                <li className="footer__item">
                  <a href={`${config.FOOTER_LINKS.tarifes}`} className="footer__link">Тарифы</a>
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