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

import arrowBack from "../../img/dist/sprite.svg";
import female from "../../img/dist/female.svg";
import man from "../../img/dist/man.svg";
import meat from "../../img/dist/meat.svg";
import vegan from "../../img/dist/vegan.svg"
import milk from "../../img/dist/milk.svg"
import noMilk from "../../img/dist/no-milk.svg"
import lineMob from "../../img/dist/road-line-mobile.svg"
import line from "../../img/dist/road-line.svg"

function Poll(props) {

  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);
  const [planName, setPlanName] = useState('');

  function getPrices() {
    props.sendData("payment", {
      age: props.userData.data.age,
      sex: props.userData.sex,
      weight: props.userData.data.weight
    }).then(
      answer => {
        setPrice(answer.price)
        setOldPrice(answer.old_price)
        setPlanName(answer.name)
        let data = props.userData;
        data.id = answer.id;
        data.price = answer.price;
        props.setUserData(data);
      }
    )
  }

  useEffect(() => {
    if (props.step == 11) {
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
        label: "Женский",
        userDataItem: { name: "sex", data: "female" }
      }, {
        id: "poll-sex-02",
        name: "poll-sex",
        pic: man,
        picAlt: "man",
        label: "Мужской",
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
        label: "Я ем мясо",
        userDataItem: { name: "meat", data: true }
      }, {
        id: "poll-meat-02",
        name: "poll-meat",
        pic: vegan,
        picAlt: "Vegan",
        label: "Я вегетарианец",
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
        label: "Употребляю",
        userDataItem: { name: "milk", data: true }
      }, {
        id: "poll-milk-02",
        name: "poll-milk",
        pic: noMilk,
        picAlt: "No milk",
        label: "Не употребляю",
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
          label: "Почти полное отсутствие физической активности",
          userDataItem: { name: "physical", data: "No activity" }
        },
        {
          id: "poll-physical-02",
          name: "poll-physical",
          label: "Я часто хожу гулять",
          userDataItem: { name: "physical", data: "Walking" }
        },
        {
          id: "poll-physical-03",
          name: "poll-physical",
          label: "Я занимаюсь спортом 1 - 2 раза в неделю",
          userDataItem: { name: "physical", data: "1-2/week" }
        },
        {
          id: "poll-physical-04",
          name: "poll-physical",
          label: "Я занимаюсь спортом 3 - 5 раз в неделю",
          userDataItem: { name: "physical", data: "3-5/week" }
        },
        {
          id: "poll-physical-05",
          name: "poll-physical",
          label: "Я занимаюсь спортом 5 - 7 раз в неделю",
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
          label: "В офисе",
          userDataItem: { name: "day", data: "At office" }
        },
        {
          id: "poll-day-02",
          name: "poll-day",
          label: "В офисе, но регулярно выхожу на улицу",
          userDataItem: { name: "day", data: "Walking" }
        },
        {
          id: "poll-day-03",
          name: "poll-day",
          label: "Большую часть дня я хожу пешком",
          userDataItem: { name: "day", data: "Walk more" }
        },
        {
          id: "poll-day-04",
          name: "poll-day",
          label: "Ручной труд",
          userDataItem: { name: "day", data: "Hand's work" }
        },
        {
          id: "poll-day-05",
          name: "poll-day",
          label: "В основном я сижу дома",
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
          placeholder: "Возраст",
          userDataItem: "age",
          min: 10,
          max: 99
        }, {
          placeholder: "Рост",
          userDataItem: "height",
          min: 110,
          max: 210
        }, {
          placeholder: "Вес",
          userDataItem: "weight",
          min: 20,
          max: 250
        }, {
          placeholder: "Желаемый вес",
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
        <button className="poll-form__btn btn btn--green" onClick={checkCompleteStep}>Дальше</button>
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
          label: "15-30 мин. в день",
          userDataItem: { name: "time", data: "15-30" }
        },
        {
          id: "poll-time-02",
          name: "poll-time",
          label: "30-60 мин. в день",
          userDataItem: { name: "time", data: "30-60" }
        },
        {
          id: "poll-time-03",
          name: "poll-time",
          label: "1 - 2ч. в день",
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
          <span className="weight-grid__value">{props.userData.data.weight} кг</span>
          <span className="weight-grid__title">Желаемый <br />вес</span>
          <picture className="weight-grid__line">
            <source media="(max-width: 639px)" srcSet={lineMob} />
            <img src={line} alt="Line" />
          </picture>
        </div>
        <h2 className="poll__title">{props.title}</h2>
        <p className="poll__description">Хорошо питайтесь, развлекайтесь, <br />выглядите потрясающе</p>
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
          <p className="poll__title">"{planName}"</p>
          <Timer />
          <div className="c-price poll__price">
            <span className="c-price__title">стоимость:</span>
            <div className="c-price__group">
              <span className="c-price__old-price">{oldPrice}</span>
              <span className="c-price__new-price">{price}</span>
            </div>
          </div>
          <Form userData={props.userData} setUserData={props.setUserData} sendData={props.sendData} />
          <Payment subclassName="poll__payment" />
        </>
      )
    }
    if (props.step === 12) {
      return (
        <div className="page">
          <div className="page__wrapper">
            <picture className="page__img">
              <img src="img/dist/icon-success.svg" alt="Success" />
            </picture>
            <h2 className="page__title">Ваш план готов! </h2>
            <p className="page__description">
              Проверьте указанный вами почтовый адрес
            </p>
            <a href="mailto:" className="page__link">Проверить почту</a>
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
        <span>назад</span>
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
