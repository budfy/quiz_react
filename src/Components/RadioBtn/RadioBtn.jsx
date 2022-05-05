import React from "react";
import './RadioBtn.scss';
function RadioBtn(props) {
  const step = (e) => {
    e.target.checked = true;
    let data = props.userData;
    let newStep = props.step;
    data[props.userDataItem.name] = props.userDataItem.data
    props.setUserData(data);
    props.setStep(newStep += 1);
  };

  return (
    <label htmlFor={props.id} className="btn-checkbox poll__radio">
      <input
        type="radio"
        id={props.id}
        name={props.name}
        className="btn-checkbox__input"
        onClick={step}
        checked={false}
      />
      <span className="btn-checkbox__label">{props.children}</span>
    </label>
  )
}

export default RadioBtn;