import './Choicebox.scss'

function Choicebox(props) {

  const step = (e) => {
    e.target.checked = true;
    let data = props.userData;
    let newStep = props.step;
    data[props.userDataItem.name] = props.userDataItem.data
    props.setUserData(data);
    props.setStep(newStep += 1);
  };

  return (
    <label htmlFor={props.id} className={"poll-checkbox poll__checkbox"}>
      <input type="radio" id={props.id} name={props.name} className="poll-checkbox__input" onClick={step} defaultChecked={false} />
      <span className="poll-checkbox__icon">
        <img src={props.pic} alt={props.picAlt} />
      </span>
      <span className="poll-checkbox__label">{props.children}</span>
    </label>
  )
}

export default Choicebox;