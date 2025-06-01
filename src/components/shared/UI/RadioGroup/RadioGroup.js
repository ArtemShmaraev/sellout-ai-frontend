import React, {useContext, useState} from 'react';
import CustomRadio from "../CustomRadio/CustomRadio";
import {Context} from "@/context/AppWrapper";

const RadioGroup = () => {
    const [woman, setWoman] = useState(null)
    const {userStore} = useContext(Context)

    return (
        <div className='d-flex'>
            <CustomRadio checked={woman === true}
                         onClick={() => {
                             setWoman(true)
                             userStore.setGender('female')
                         }}
                         label={'Женский'}
                         margin={40}
            />
            <CustomRadio checked={woman === false}
                         onClick={() => {
                             setWoman(false)
                             userStore.setGender('male')
                         }}
                         label={'Мужской'}
            />
        </div>
    );
};

export default RadioGroup;