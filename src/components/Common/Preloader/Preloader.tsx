import React from 'react';
import loader from '../../../assets/images/loadeer.gif';

type PropsType = {};

let Preloader: React.FC<PropsType> = (props) => {
    return (
      <div>
        <img src={loader} alt=''/>
      </div>
    )
};

export default Preloader;