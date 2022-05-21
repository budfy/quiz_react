import React, { useState } from "react";
import "./Resume.scss"
import imt from "../../img/dist/icon-imt.svg";
import age from "../../img/dist/icon-age.svg";
import calories from "../../img/dist/icon-calories.svg";
import water from "../../img/dist/icon-water.svg";
import weightLoss from "../../img/dist/icon-weight-loss.svg";
import weight from "../../img/dist/icon-weight.svg";

export default function Resume(props) {

  function nextStep() {
    let step = props.step;
    props.setStep(step + 1)
  }

  function ages() {
    const age = props.userData.data.metabolic_age + "";
    const age1 = age.split("")[age.length - 1];
    const age2 = age.split("")[age.length - 2];
    if (age2 == 1 || age1 >= 5 || age1 == 0) {
      return (<>{age} лет</>)
    } else if (age1 >= 2 && age1 <= 4) {
      return (<>{age} года</>)
    }
    else if (age1 == 1) {
      return (<>{age} год</>)
    }
    else {
      return (<>{age} лет</>)
    }
  }

  return (
    <div className="resume" id="resume">
      <div className="container">
        <div className="resume__wrap">
          <h1 className="resume__heading">Резюме вашего профиля</h1>
          <div className="resume__wrapper">
            <div className="resume__item">
              <h3 className="resume__title">Ваш ИМТ</h3>
              <picture className="resume__img">
                <span className="resume__amount">{props.userData.data.body_mass_index}</span>
                <img src={imt} alt="Image" />
              </picture>
              <span className="resume__value">Ожидание резкое</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Метаболический возраст</h3>
              <picture className="resume__img">
                <img src={age} alt="Image" />
              </picture>
              <span className="resume__value">{ages()}</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Рекомендуемое количество калорий</h3>
              <picture className="resume__img">
                <img src={calories} width="50px" height="50px" alt="Image" />
              </picture>
              <span className="resume__value">{props.userData.data.recommended_calories.min} - {props.userData.data.recommended_calories.max}</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Рекомендуемое количество воды</h3>
              <picture className="resume__img">
                <img src={water} width="62px" height="56px" alt="Image" />
              </picture>
              <span className="resume__value">{props.userData.data.recommended_water} литров</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Похудение в зонах</h3>
              <picture className="resume__img">
                <img src={weightLoss} alt="Image" />
              </picture>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Достижимый вес после 28 дней диеты</h3>
              <picture className="resume__img">
                <img src={weight} width="50px" height="50px" alt="Image" />
              </picture>
              <span className="resume__value">{props.userData.data.achieved_weight} кг</span>
            </div>
          </div>
          <button className="resume__btn btn btn--green" onClick={nextStep}>Получить прямо сейчас</button>
        </div>
      </div>
    </div>
  )
}