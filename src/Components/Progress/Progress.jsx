import React, { useState, useEffect } from "react";
import './Progress.scss'

function Progress(props) {
  const [pr, setPr] = useState(0);
  const [loaderClass, setLoaderClass] = useState('');

  function profile() {

    props.sendData('profile', {
      age: props.userData.data.age,
      sex: props.userData.sex,
      weight: props.userData.data.weight,
      wantWeight: props.userData.data.wishedWeight,
      growth: props.userData.data.height
    })
      .then(
        answer => {
          let userData = props.userData;
          let newData = { ...userData.data, ...answer }
          userData.data = newData;
          props.setUserData(userData);
        }
      ).then(() => {
        setPr(98);
      }
      )
  }

  useEffect(() => {
    if (pr === 1) {
      profile();
    }
    if (pr === 50) {
      setLoaderClass(" loading");
    }
  }, [pr])

  function countProgress() {
    let timeout = 25;
    setTimeout(() => {
      let i = pr;
      if (i === 1) {

      }
      if (i < 100) {
        setPr(i += 1);
      }
      if (i === 50) {
        setLoaderClass(" loading");
      }
      if (i >= 100) {
        setTimeout(() => {
          let st = props.step;
          props.setStep(st + 1)
        }, 3000);
      }
    }, timeout);
  }
  countProgress();
  return (
    < div className={"progress" + loaderClass} >
      <div className="progress__inner" style={{ width: pr + "%" }}></div>
      <span className="progress__value">{pr}%</span>
    </div >
  )
}

export default Progress;