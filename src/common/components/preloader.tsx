import React from 'react';
import img from 'asserts/images/loading.svg'

type PropsType = {
}

let Preloader: React.FC = () => {    
    return <div  style={ { backgroundColor: 'white' } }>
        <img src={img} />
    </div>
}

export default Preloader;