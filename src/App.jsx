import { useState, useEffect } from 'react';
import './App.scss';
import Header from './Components/Header/Header';
import Poll from './Components/Poll/Poll';
import Footer from './Components/Footer/Footer';

function App() {
  const [bg, setBg] = useState(null);
  const [header, setHeader] = useState("Пройди наш тест и узнай, какой способ похудения поможет тебе избавиться от пары лишних килограммов.");
  const [pollSubTitle, setPollSubTitle] = useState('Начнем!');
  const [pollTitle, setPollTitle] = useState('Выберите пол');
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    sex: null,
    meat: null,
    milk: null,
    physical: null,
    day: null,
    data: {
      age: null,
      height: null,
      weight: null,
      wishedWeight: null
    },
    budget: null,
    time: null
  });

  const stepData = [
    {
      bg: null,
      subTitle: "Начнем!",
      title: "Выберите пол"
    },
    {
      bg: "../img/dist/page-chicken.svg",
      subTitle: "Белок",
      title: "Едите ли вы мясо?"
    },
    {
      bg: "../img/dist/page-milk.svg",
      subTitle: "Молочные продукты",
      title: "Как вы относитесь к молочным продуктам?"
    },
    {
      bg: "../img/dist/page-sport.svg",
      subTitle: "Физическая активность",
      title: "Каков ваш регулярный уровень физической активности?"
    },
    {
      bg: "../img/dist/page-calendar.svg",
      subTitle: "Ваш типичный день",
      title: "Опишите ваш типичный день"
    },
    {
      bg: "../img/dist/page-data.svg",
      subTitle: "Параметры",
      title: "Ваши данные"
    },
    {
      bg: "../img/dist/page-budget.svg",
      subTitle: "Бюджет",
      title: "Ваш месячный бюджет на рацион"
    },
    {
      bg: "../img/dist/page-time.svg",
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
      subTitle: "Ваш персональный план готов!",
      title: "Индивидуальный план питания"
    },
    {
      bg: null,
      subTitle: "",
      title: ""
    },
  ]

  useEffect(() => {
    let currentStep = step - 1;
    if (currentStep >= 1) {
      setHeader(null);
    }
    setBg(stepData[currentStep].bg);
    setPollSubTitle(stepData[currentStep].subTitle);
    setPollTitle(stepData[currentStep].title)
  }, [step])

  function bgPic() {
    if (bg) {
      return (
        <picture className="page-img">
          <img src={bg} alt="Image" />
        </picture>
      )
    }
  }

  return (
    <div className='wrapper'>
      <div className="wrapper__inner">
        <Header description={header} />
        <Poll
          subtitle={pollSubTitle}
          title={pollTitle}
          step={step}
          setStep={setStep}
          userData={userData}
          setUserData={setUserData} />
      </div>
      {bgPic()}
      <Footer />
    </div>
  );
}

export default App;