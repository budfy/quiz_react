import { useState, useEffect } from "react";

export default function SubmitBtn(props) {

  const [disabledBtn, setDisabledBtn] = useState(true);

  useEffect(() => {
    if (props.formEmail && props.formCheckbox) {
      setDisabledBtn(false)
    }
    else {
      setDisabledBtn(true)
    }
  }, [props.formCheckbox, props.formEmail])
  return (
    <button className="poll-form__btn btn btn--green" type="submit" disabled={disabledBtn}>Оплатить</button>
  )
}