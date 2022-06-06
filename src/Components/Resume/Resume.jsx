import "./Resume.scss"
import imt from "../../img/icon-imt.svg";
import calories from "../../img/icon-calories.svg";
import water from "../../img/icon-water.svg";
import weightLoss from "../../img/icon-weight-loss.svg";
import weight from "../../img/icon-weight.svg";
import yong from "../../img/PC/yong.png";
import default_man from "../../img/PC/default.png";
import old from "../../img/PC/old.png"

export default function Resume(props) {

  function nextStep() {
    let step = props.step;
    props.setStep(step + 1)
  }

  function ages() {
    const age = props.userData.data.metabolicAge + "";
    const age1 = parseInt(age.split("")[age.length - 1]);
    const age2 = parseInt(age.split("")[age.length - 2]);
    if (age2 === 1 || age1 >= 5 || age1 === 0) {
      return (<>{age} лет</>)
    } else if (age1 >= 2 && age1 <= 4) {
      return (<>{age} года</>)
    }
    else if (age1 === 1) {
      return (<>{age} год</>)
    }
    else {
      return (<>{age} лет</>)
    }
  }

  function showPortrait() {
    if (props.userData.data.metabolicAge < 18) {
      return "yong";
    } else if (props.userData.data.metabolicAge > 50) {
      return "old";
    }
    else {
      return "default";
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
                <span className="resume__amount">{props.userData.data.bodyMassIndex.value}</span>
                <img src={imt} alt="" />
              </picture>
              <span className="resume__value">{props.userData.data.bodyMassIndex.description}</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Метаболический возраст</h3>
              <div className="resume__img">
                <picture className={`resume__img-item${showPortrait() === "yong" ? " --current" : ""}`}>
                  <img src={yong} alt="" />
                </picture>
                <picture className={`resume__img-item${showPortrait() === "default" ? " --current" : ""}`}>
                  <img src={default_man} alt="" />
                </picture>
                <picture className={`resume__img-item${showPortrait() === "old" ? " --current" : ""}`}>
                  <img src={old} alt="" />
                </picture>
              </div>
              <span className="resume__value">{ages()}</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Рекомендуемое количество калорий</h3>
              <picture className="resume__img">
                <img src={calories} width="50px" height="50px" alt="" />
              </picture>
              <span className="resume__value">{props.userData.data.recommendedCalories.min} - {props.userData.data.recommendedCalories.max}</span>
            </div>
            <div className="resume__item">
              <h3 className="resume__title">Рекомендуемое количество воды</h3>
              <picture className="resume__img">
                <img src={water} width="62px" height="56px" alt="" />
              </picture>
              <span className="resume__value">{props.userData.data.recommendedWater} литров</span>
            </div>

            {props.userData.data.type !== "dump" ? null :
              <div className="resume__item">
                <h3 className="resume__title">Похудение в зонах</h3>
                <picture className="resume__img">
                  <img src={weightLoss} alt="" />
                </picture>
              </div>
            }

            <div className="resume__item">
              <h3 className="resume__title">Достижимый вес после 28 дней диеты</h3>
              <picture className="resume__img">
                <img src={weight} width="50px" height="50px" alt="" />
              </picture>
              <span className="resume__value">{props.userData.data.achievedWeight} кг</span>
            </div>
          </div>
          <button className="resume__btn btn btn--green" onClick={nextStep}>Получить прямо сейчас</button>
        </div>
      </div>
    </div>
  )
}