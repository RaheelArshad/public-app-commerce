import React, { useState, useEffect } from 'react';
import { IonThumbnail, IonImg, IonHeader, IonMenuButton, IonSelect, IonSelectOption } from '@ionic/react';
import { Storage } from '@capacitor/storage';

interface ContainerProps {
    name: string;
}

const Header: React.FC<ContainerProps> = ({ name }) => {

    const [language, setLanguage] = useState<string>();

    // function to execute when changing language
    const changeLanguage = (language: any) => {
        setLanguage(language);
        Storage.set({
            key: 'global_language',
            value: language,
        });
        window.location.reload();
    }

    // Check if user language is set and if not default EN
    const checkLanguage = async () => {
        const global_language = await Storage.get({ key: 'global_language' });
        if (global_language && global_language.hasOwnProperty('value') && global_language.value == null) {
            Storage.set({
                key: 'global_language',
                value: 'en',
            });
            setLanguage('en');
        } else {
            const tmp = global_language.value as string;
            setLanguage(tmp);
        }
    };

    useEffect(() => {
        checkLanguage()
    });

    return (
        <div className="header-bar">
            <IonHeader>
                <div className="dashboard-log cnLogo">
                    <a href="/dashboard">
                        <IonThumbnail slot="app-logo">
                            <IonImg src="../assets/images/logo.svg" />
                        </IonThumbnail>
                    </a>
                </div>
                <div className="cnLanguage">
                    <IonSelect value={language} placeholder="Select One" onIonChange={e => changeLanguage(e.detail.value)}>
                        <IonSelectOption value="en">EN</IonSelectOption>
                        <IonSelectOption value="fr">FR</IonSelectOption>
                    </IonSelect>
                </div>
            </IonHeader>
        </div>
    );
};

export default Header;