import { InvisibleSmartCaptcha } from '@yandex/smart-captcha';
import {useCallback, useState} from "react";

const InvisibleCaptcha = () => {
    const [token, setToken] = useState('');
    const [visible, setVisible] = useState(false);

    const handleChallengeHidden = useCallback(() => setVisible(false), []);

    const handleButtonClick = () => setVisible(true);

    return (
        <>
            <button onClick={handleButtonClick}>Validate</button>
            <InvisibleSmartCaptcha
                sitekey="ysc1_Mv7mBNR4HtAUi0sNynbQ87jBGypFFDYojn2qA3dC1fe2c235"
                onSuccess={setToken}
                onChallengeHidden={handleChallengeHidden}
                visible={visible}
                hideShield={true}
            />
        </>
    );
};

export default InvisibleCaptcha;