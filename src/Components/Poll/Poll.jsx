import React, { useState, useEffect } from "react";
import './Poll.scss';

import Choicebox from "../ChoiceBox/Choicebox";
import RadioBtn from "../RadioBtn/RadioBtn";
import Input from "../Input/Input";
import Progress from "../Progress/Progress";
import Timer from './../Timer/Timer';
import Payment from './../Payment/Payment';
import Form from './../Form/Form';
import Resume from "../Resume/Resume";
import PaymentRules from "../Rules/Rules";

import arrowBack from "../../img/sprite.svg";
import female from "../../img/female.svg";
import man from "../../img/man.svg";
import meat from "../../img/meat.svg";
import vegan from "../../img/vegan.svg"
import milk from "../../img/milk.svg"
import noMilk from "../../img/no-milk.svg"
import lineMob from "../../img/road-line-mobile.svg"
import line from "../../img/road-line.svg"
import success from "../../img/icon-success.svg"

function Poll(props) {

  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [planName, setPlanName] = useState('');
  const [emailLink, setEmailLink] = useState('https://gmail.com')


  function getPrices() {
    props.sendData("payment", {
      age: props.userData.data.age,
      sex: props.userData.sex,
      weight: props.userData.data.weight,
      wantWeight: props.userData.data.wishedWeight
    }).then(
      answer => {
        setPrice(answer.price)
        setOldPrice(answer.oldPrice)
        setPlanName(answer.name)
        let data = props.userData;
        data.id = answer.id;
        data.price = answer.price;
        data.name = answer.name;
        data.subDescr = answer.subDescription ? answer.subDescription : answer.name;
        props.setUserData(data);
      }
    )
  }
  useEffect(() => {
    if (parseInt(props.step) === 11) {
      getPrices()
    }
  }, [props.step])

  function stepsCounter() {
    if (props.step > 1 && props.step < 8) {
      return (
        <ul className="c-stages poll__stages">
          <li className="c-stages__item c-stages__item--current">{props.step}</li>
          <li className="c-stages__item">8</li>
        </ul>
      )
    } else {
      return null;
    }
  };
  useEffect(() => {
    const mailservices = {
      "mail.ru": "https://e.mail.ru/",
      "bk.ru": "https://e.mail.ru/",
      "list.ru": "https://e.mail.ru/",
      "inbox.ru": "https://e.mail.ru/",
      "yandex.ru": "https://mail.yandex.ru/",
      "ya.ru": "https://mail.yandex.ru/",
      "yandex.ua": "https://mail.yandex.ua/",
      "yandex.by": "https://mail.yandex.by/",
      "yandex.kz": "https://mail.yandex.kz/",
      "yandex.com": "https://mail.yandex.com/",
      "gmail.com": "https://mail.google.com/",
      "googlemail.com": "https://mail.google.com/",
      "outlook.com": "https://mail.live.com/",
      "hotmail.com": "https://mail.live.com/",
      "live.ru": "https://mail.live.com/",
      "live.com": "https://mail.live.com/",
      "me.com": "https://www.icloud.com/",
      "icloud.com": "https://www.icloud.com/",
      "rambler.ru": "https://mail.rambler.ru/",
      "yahoo.com": "https://mail.yahoo.com/",
      "ukr.net": "https://mail.ukr.net/",
      "i.ua": "http://mail.i.ua/",
      "bigmir.net": "http://mail.bigmir.net/",
      "tut.by": "https://mail.tut.by/",
      "inbox.lv": "https://www.inbox.lv/",
      "mail.kz": "http://mail.kz/"
    }
    if (props.userData.email) {
      let email = props.userData.email.split("@")[1];
      if (typeof mailservices[email] !== "undefined") {
        setEmailLink(mailservices[email])
      }
    }
  }, [props.userData.email])


  function checkCompleteStep(e) {
    let newStep = props.step;
    for (const key in props.userData.data) {
      if (!props.userData.data[key]) {
        return false;
      }
    }
    props.setStep(newStep += 1)
  }

  function generateStep() {
    if (props.step === 1) {
      let choiceArr = [{
        id: "poll-sex-01",
        name: "poll-sex",
        pic: female,
        picAlt: "Woman",
        label: "??????????????",
        userDataItem: { name: "sex", data: "female" }
      }, {
        id: "poll-sex-02",
        name: "poll-sex",
        pic: man,
        picAlt: "man",
        label: "??????????????",
        userDataItem: { name: "sex", data: "male" }
      }];
      return (<div className="poll__inner">
        {choiceArr.map((choice, index) => {
          return <Choicebox
            key={index}
            id={choice.id}
            name={choice.name}
            pic={choice.pic}
            picAlt={choice.picAlt}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</Choicebox>
        })}
      </div>
      )
    }

    if (props.step === 2) {
      let choiceArr = [{
        id: "poll-meat-01",
        name: "poll-meat",
        pic: meat,
        picAlt: "Meat",
        label: "?? ???? ????????",
        userDataItem: { name: "meat", data: true }
      }, {
        id: "poll-meat-02",
        name: "poll-meat",
        pic: vegan,
        picAlt: "Vegan",
        label: "?? ????????????????????????",
        userDataItem: { name: "meat", data: false }
      }];
      return (<div className="poll__inner">
        {choiceArr.map((choice, index) => {
          return <Choicebox
            key={index}
            id={choice.id}
            name={choice.name}
            pic={choice.pic}
            picAlt={choice.picAlt}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</Choicebox>
        })}
      </div>
      )
    }

    if (props.step === 3) {
      let choiceArr = [{
        id: "poll-milk-01",
        name: "poll-milk",
        pic: milk,
        picAlt: "Milk",
        label: "????????????????????",
        userDataItem: { name: "milk", data: true }
      }, {
        id: "poll-milk-02",
        name: "poll-milk",
        pic: noMilk,
        picAlt: "No milk",
        label: "???? ????????????????????",
        userDataItem: { name: "milk", data: false }
      }];
      return (<div className="poll__inner">
        {choiceArr.map((choice, index) => {
          return <Choicebox
            key={index}
            id={choice.id}
            name={choice.name}
            pic={choice.pic}
            picAlt={choice.picAlt}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</Choicebox>
        })}
      </div>
      )
    }

    if (props.step === 4) {
      let choiceArr = [
        {
          id: "poll-physical-01",
          name: "poll-physical",
          label: "?????????? ???????????? ???????????????????? ???????????????????? ????????????????????",
          userDataItem: { name: "physical", data: "No activity" }
        },
        {
          id: "poll-physical-02",
          name: "poll-physical",
          label: "?? ?????????? ???????? ????????????",
          userDataItem: { name: "physical", data: "Walking" }
        },
        {
          id: "poll-physical-03",
          name: "poll-physical",
          label: "?? ?????????????????? ?????????????? 1 - 2 ???????? ?? ????????????",
          userDataItem: { name: "physical", data: "1-2/week" }
        },
        {
          id: "poll-physical-04",
          name: "poll-physical",
          label: "?? ?????????????????? ?????????????? 3 - 5 ?????? ?? ????????????",
          userDataItem: { name: "physical", data: "3-5/week" }
        },
        {
          id: "poll-physical-05",
          name: "poll-physical",
          label: "?? ?????????????????? ?????????????? 5 - 7 ?????? ?? ????????????",
          userDataItem: { name: "physical", data: "5-7/week" }
        },
      ];
      return (<div className="poll__inner"><div className="poll__group">
        {choiceArr.map((choice, index) => {
          return <RadioBtn
            key={index}
            id={choice.id}
            name={choice.name}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</RadioBtn>
        })}
      </div></div>
      )
    }

    if (props.step === 5) {
      let choiceArr = [
        {
          id: "poll-day-01",
          name: "poll-day",
          label: "?? ??????????",
          userDataItem: { name: "day", data: "At office" }
        },
        {
          id: "poll-day-02",
          name: "poll-day",
          label: "?? ??????????, ???? ?????????????????? ???????????? ???? ??????????",
          userDataItem: { name: "day", data: "Walking" }
        },
        {
          id: "poll-day-03",
          name: "poll-day",
          label: "?????????????? ?????????? ?????? ?? ???????? ????????????",
          userDataItem: { name: "day", data: "Walk more" }
        },
        {
          id: "poll-day-04",
          name: "poll-day",
          label: "???????????? ????????",
          userDataItem: { name: "day", data: "Hand's work" }
        },
        {
          id: "poll-day-05",
          name: "poll-day",
          label: "?? ???????????????? ?? ???????? ????????",
          userDataItem: { name: "day", data: "Home sitter" }
        },
      ];
      return (<div className="poll__inner"><div className="poll__group">
        {choiceArr.map((choice, index) => {
          return <RadioBtn
            key={index}
            id={choice.id}
            name={choice.name}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</RadioBtn>
        })}
      </div></div>
      )
    }

    if (props.step === 6) {
      let inputsArr = [
        {
          placeholder: "??????????????",
          userDataItem: "age",
          min: 10,
          max: 99
        }, {
          placeholder: "????????",
          userDataItem: "height",
          min: 110,
          max: 210
        }, {
          placeholder: "??????",
          userDataItem: "weight",
          min: 20,
          max: 250
        }, {
          placeholder: "???????????????? ??????",
          userDataItem: "wishedWeight",
          min: 20,
          max: 250
        }
      ];

      return (<div className="poll__inner"><div className="poll__group">
        {inputsArr.map((inp, index) => {
          return <Input key={index}
            userDataItem={inp.userDataItem}
            placeholder={inp.placeholder}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}
            min={inp.min}
            max={inp.max}
          >
          </Input>
        })}
        <button className="poll-form__btn btn btn--green" onClick={checkCompleteStep}>????????????</button>
      </div></div>
      )
    }

    if (props.step === 7) {
      let choiceArr = [
        {
          id: "poll-budget-01",
          name: "poll-budget",
          label: "5000-7000",
          userDataItem: { name: "budget", data: "5000-7000" }
        },
        {
          id: "poll-budget-02",
          name: "poll-budget",
          label: "7000-1000",
          userDataItem: { name: "budget", data: "7000-10000" }
        },
        {
          id: "poll-budget-03",
          name: "poll-budget",
          label: "10000-15000",
          userDataItem: { name: "budget", data: "10000-15000" }
        },
        {
          id: "poll-budget-04",
          name: "poll-budget",
          label: "15000-30000",
          userDataItem: { name: "budget", data: "15000-30000" }
        },
        {
          id: "poll-budget-05",
          name: "poll-budget",
          label: "30000+",
          userDataItem: { name: "budget", data: "30000+" }
        },
      ];
      return (<div className="poll__inner"><div className="poll__group">
        {choiceArr.map((choice, index) => {
          return <RadioBtn
            key={index}
            id={choice.id}
            name={choice.name}
            userDataItem={choice.userDataItem}
            step={props.step}
            userData={props.userData}
            setStep={props.setStep}
            setUserData={props.setUserData}>{choice.label}</RadioBtn>
        })}
      </div></div>
      )
    }

    if (props.step === 8) {
      let choiceArr = [
        {
          id: "poll-time-01",
          name: "poll-time",
          label: "15-30 ??????. ?? ????????",
          userDataItem: { name: "time", data: "15-30" }
        },
        {
          id: "poll-time-02",
          name: "poll-time",
          label: "30-60 ??????. ?? ????????",
          userDataItem: { name: "time", data: "30-60" }
        },
        {
          id: "poll-time-03",
          name: "poll-time",
          label: "1 - 2??. ?? ????????",
          userDataItem: { name: "time", data: "60-120" }
        }
      ];
      return (<div className="poll__inner">
        <div className="poll__group">
          {choiceArr.map((choice, index) => {
            return <RadioBtn
              key={index}
              id={choice.id}
              name={choice.name}
              userDataItem={choice.userDataItem}
              step={props.step}
              userData={props.userData}
              setStep={props.setStep}
              setUserData={props.setUserData}>{choice.label}</RadioBtn>
          })}
        </div>
      </div>
      )
    }

    if (props.step === 9) {
      return (<>
        <div className="weight-grid">
          <div className="weight-grid__inner"></div>
          <div className="weight-grid__inner"></div>
          <div className="weight-grid__inner"></div>
          <div className="weight-grid__inner"></div>
          <div className="weight-grid__inner"></div>
          <div className="weight-grid__inner"></div>
          <span className="weight-grid__value">{props.userData.data.weight} ????</span>
          <span className="weight-grid__title">???????????????? <br />??????</span>
          <picture className="weight-grid__line">
            <source media="(max-width: 639px)" srcSet={lineMob} />
            <img src={line} alt="Line" />
          </picture>
        </div>
        <h2 className="poll__title">{props.title}</h2>
        <p className="poll__description">???????????? ??????????????????, ??????????????????????????, <br />?????????????????? ????????????????????</p>
        <Progress step={props.step} setStep={props.setStep} userData={props.userData} setUserData={props.setUserData} sendData={props.sendData} />
      </>
      )
    }

    if (props.step === 10) {
      return (
        <Resume step={props.step} setStep={props.setStep} userData={props.userData} />
      )
    }

    if (props.step === 11) {
      return (
        <>
          {/*<p className="poll__title">"{planName}"</p>*/}
          <Timer />
          <div className="c-price poll__price">
            <span className="c-price__title">??????????????????:</span>
            <div className="c-price__group">
              <span className="c-price__old-price">{oldPrice}???</span>
              <span className="c-price__new-price">{price}???</span>
            </div>
          </div>
          <Form userData={props.userData} setUserData={props.setUserData} sendData={props.sendData} step={props.step} setStep={props.setStep} price={price} oldPrice={oldPrice} />
          {/*<PaymentRules />*/}
          <Payment subclass="poll__payment" />
        </>
      )
    }

    if (props.step === 12) {
      return (
        <div className="page">
          <div className="page__wrapper">
            <picture className="page__img">
              <img src={success} alt="Success" />
            </picture>
            <h2 className="page__title">?????? ???????? ??????????! </h2>
            <p className="page__description">
              ?????????????????? ?????????????????? ???????? ???????????????? ??????????
            </p>
            <a href={emailLink} className="page__link" target="_blank" rel="nofollow noreferrer">?????????????????? ??????????</a>
          </div>
        </div>
      )
    }
  }

  function stepBack() {
    let currentStep = props.step;
    props.setStep(currentStep - 1);
  }

  function showBackBtn() {
    if (props.step > 1 && props.step < 9) {
      return (<button className="poll__back back-btn" onClick={stepBack}>
        <svg className="back-btn__icon">
          <use xlinkHref={arrowBack + "#icon-arrow-back"}></use>
        </svg>
        <span>??????????</span>
      </button>);
    } else {
      return null;
    }
  }

  if (props.step !== 9) {
    return (<div className={"poll fade" + props.anim}>
      <div className="container">
        <div className="poll__wrapper">
          <div className="poll__top">
            <h3 className="poll__subtitle">{props.subtitle}</h3>
            {stepsCounter()}
          </div>
          <h2 className="poll__title">{props.title}</h2>
          {generateStep()}
          {showBackBtn()}
        </div>
      </div>
    </div>
    )
  } else {
    return (
      <div className={"poll fade" + props.anim}>
        <div className="container">
          <div className="poll__wrapper">
            <div className="poll__top">
              <h3 className="poll__subtitle">{props.subtitle}</h3>
              {stepsCounter()}
            </div>
            {generateStep()}
            {showBackBtn()}
          </div>
        </div>
      </div>
    )
  }

}
export default Poll;
