import React, {useContext, useState} from 'react';
import CustomRadio from "../CustomRadio/CustomRadio";
import {Context} from "@/context/AppWrapper";

const RadioGroup = () => {
    const [woman, setWoman] = useState(true)
    const {userStore} = useContext(Context)

    return (
        <div className='d-flex'>
            <CustomRadio checked={woman}
                         onClick={() => {
                             setWoman(true)
                             userStore.setGender('female')
                         }}
                         label={'Женский'}
                         margin={40}
            />
            <CustomRadio checked={!woman}
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