import React, { useState, useEffect } from "react";
import './Progress.scss'

function Progress(props) {
  const [pr, setPr] = useState(0);
  const [loaderClass, setLoaderClass] = useState('');
  function countProgress() {
    let timeout = pr >= 98 ? 2500 : 75;
    setTimeout(() => {
      let i = pr;
      if (i < 100) {
        setPr(i += 1);
      }
      if (i == 50) {
        setLoaderClass(" loading");
      }
      if (i >= 100) {
        let step = props.step;
        props.setStep(step + 1);
      }
    }, timeout);
  }
  countProgress()
  return (
    < div className={"progress" + loaderClass} >
      <div className="progress__inner" style={{ width: pr + "%" }}></div>
      <span className="progress__value">{pr}%</span>
    </div >
  )
}

export default Progress;