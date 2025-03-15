import React, {useState} from 'react';
import CustomRadio from "../CustomRadio/CustomRadio";

const RadioGroup = () => {
    const [woman, setWoman] = useState(true)

    return (
        <div className='d-flex'>
            <CustomRadio checked={woman}
                         onClick={() => setWoman(true)}
                         label={'Женский'}
                         margin={40}
            />
            <CustomRadio checked={!woman}
                         onClick={() => setWoman(false)}
                         label={'Мужской'}
            />
        </div>
    );
};

export default RadioGroup;