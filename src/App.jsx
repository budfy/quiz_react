import { useState, useEffect } from 'react';

import {
  Routes,
  Route,
  NavLink,
  Navigate
} from "react-router-dom";

import './App.scss';
import Header from './Components/Header/Header';
import Poll from './Components/Poll/Poll';
import Footer from './Components/Footer/Footer';

import bg1 from './img/dist/page-chicken.svg';
import bg2 from './img/dist/page-milk.svg';
import bg3 from './img/dist/page-sport.svg';
import bg4 from './img/dist/page-calendar.svg';
import bg5 from './img/dist/page-data.svg';
import bg6 from './img/dist/page-budget.svg';
import bg7 from './img/dist/page-time.svg';
import bg8 from "./img/dist/page-sex.svg"
import Subscribe from './Components/Subscribe/Subscribe';

function App(props) {
  const [bg, setBg] = useState(null);
  const [header, setHeader] = useState("Пройди наш тест и узнай, какой способ похудения поможет тебе избавиться от пары лишних килограммов.");
  const [pollSubTitle, setPollSubTitle] = useState('Начнем!');
  const [pollTitle, setPollTitle] = useState('Выберите пол');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    meat: null,
    milk: null,
    physical: null,
    day: null,
    sex: null,
    data: {
      age: null,
      height: null,
      weight: null,
      wishedWeight: null
    },
    budget: null,
    time: null
  });

  useEffect(() => {
    const stepData = [
      {
        bg: bg8,
        subTitle: "Начнем!",
        title: "Выберите пол"
      },
      {
        bg: bg1,
        subTitle: "Белок",
        title: "Едите ли вы мясо?"
      },
      {
        bg: bg2,
        subTitle: "Молочные продукты",
        title: "Как вы относитесь к молочным продуктам?"
      },
      {
        bg: bg3,
        subTitle: "Физическая активность",
        title: "Каков ваш регулярный уровень физической активности?"
      },
      {
        bg: bg4,
        subTitle: "Ваш типичный день",
        title: "Опишите ваш типичный день"
      },
      {
        bg: bg5,
        subTitle: "Параметры",
        title: "Ваши данные"
      },
      {
        bg: bg6,
        subTitle: "Бюджет",
        title: "Ваш месячный бюджет на рацион"
      },
      {
        bg: bg7,
        subTitle: "Приготовление",
        title: "Время на готовку"
      },
      {
        bg: null,
        subTitle: null,
        title: "Создание вашего плана"
      },
      {
        bg: null,
        subTitle: null,
        title: "Резюме вашего профиля"
      },
      {
        bg: null,
        subTitle: "Ваш персональный план готов!",
        title: "Индивидуальный план питания"
      },
      {
        bg: null,
        subTitle: "",
        title: ""
      },
    ]
    let currentStep = step - 1;
    if (currentStep >= 1) {
      setHeader(null);
    }
    else { setHeader("Пройди наш тест и узнай, какой способ похудения поможет тебе избавиться от пары лишних килограммов.") }
    setBg(stepData[currentStep].bg);
    setPollSubTitle(stepData[currentStep].subTitle);
    setPollTitle(stepData[currentStep].title);
  }, [step])

  async function sendData(type = "payment", data, option = false) {
    let parameters = type;
    if (option && userData.id) parameters += `/${userData.id}/${option}`;
    try {
      const response = await fetch(`http://144.76.116.190:5587/${parameters}`, {
        method: "POST",
        headers: {
          'accept': "application/json",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      let res = await response;
      console.log(res.headers.get("content-type"));
      let answer = res.json();
      if (res.ok && answer) {
        return answer;
      }
      else if (res.ok) {
        return true;
      }
    } catch (error) {
      console.warn("Error in sendData:");
      console.error(error);
      return null;
    }
  }

  function bgPic() {
    if (bg) {
      return (
        <picture className={"page-img fade" + anim}>
          <img src={bg} alt="" />
        </picture>
      )
    }
  }

  function bgIcons() {
    if (step >= 1 && step <= 8) {
      return (
        <div className="bg-icons"></div>
      )
    }
    else { return null }
  }

  const [anim, setAnim] = useState(" fade");

  useEffect(() => {
    setAnim("");
    setTimeout(() => {
      setAnim(" fade-in")
    }, 400);
    return () => { setAnim(" fade") }
  }
    , [step]);

  return (
    <div className='wrapper'>
      <div className="wrapper__inner">
        <Header description={header} step={step} />
        <Routes>
          <Route path="/" element={
            <Poll
              subtitle={pollSubTitle}
              title={pollTitle}
              step={step}
              setStep={setStep}
              userData={userData}
              setUserData={setUserData}
              anim={anim}
              sendData={sendData} />}>
          </Route>
          <Route path="unsubscribe" element={<Subscribe />}></Route>
        </Routes>
      </div>
      {bgPic()}
      {bgIcons()}
      <Footer />
    </div>
  );
}

export default App;