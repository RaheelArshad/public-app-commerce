import React, { useEffect, useState } from 'react';
import { Storage } from '@capacitor/storage';
import { IonThumbnail, IonImg, IonSpinner } from '@ionic/react';
import '../theme/style.css';
import { useHistory } from 'react-router';


interface ContainerProps {
    name: string;
}

const PrepareData: React.FC<ContainerProps> = ({ name }) => {

    const [loading, setLoading] = useState(true);

    // for routing purposes
    const history = useHistory();

    //check language or set default language to be EN
    useEffect(() => {
        ; (async () => {
            try {
                const global_language = await Storage.get({ key: 'global_language' });
                if (!global_language.value) {
                    Storage.set({
                        key: 'global_language',
                        value: 'en',
                    });
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [loading])

    //check products or set products to local storage
    useEffect(() => {
        ; (async () => {
            try {
                const global_products = await Storage.get({ key: 'global_products' });
                if (global_products && global_products.value == null) {
                    const requestOptions = {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjUzMzMyMSIsIm5hbWUiOiJQcmFrYXNoIEJob2xhaCIsImlhdCI6MTUxNjIzOTAyMn0.wSi2BCi8r9jrqLowInSj_dFkYat1I1VeIof_5tW18A0',
                            'Content-Type': 'application/json'
                        }),
                    };
                    fetch(process.env.REACT_APP_SECRET_API_URL + 'products', requestOptions)
                        .then(response => response.json())
                        .then((data) => {
                            Storage.set({
                                key: 'global_products',
                                value: JSON.stringify(data.products),
                            });
                            Storage.set({
                                key: 'global_products_date',
                                value: new Date().toISOString().slice(0, 10),
                            });
                        })
                } else {
                    const today = new Date().toISOString().slice(0, 10)
                    const last_fetch_date = await Storage.get({ key: 'global_products_date' });
                    if (today && last_fetch_date) {
                        if (last_fetch_date.value! < today) {
                            const requestOptions = {
                                method: 'POST',
                                headers: new Headers({
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjUzMzMyMSIsIm5hbWUiOiJQcmFrYXNoIEJob2xhaCIsImlhdCI6MTUxNjIzOTAyMn0.wSi2BCi8r9jrqLowInSj_dFkYat1I1VeIof_5tW18A0',
                                    'Content-Type': 'application/json'
                                }),
                            };
                            fetch(process.env.REACT_APP_SECRET_API_URL + 'products', requestOptions)
                                .then(response => response.json())
                                .then((data) => {
                                    Storage.set({
                                        key: 'global_products',
                                        value: JSON.stringify(data.products),
                                    });
                                    Storage.set({
                                        key: 'global_products_date',
                                        value: new Date().toISOString().slice(0, 10),
                                    });
                                })
                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [loading])

    //check categories or set categories to local storage
    useEffect(() => {
        ; (async () => {
            try {
                const global_categories = await Storage.get({ key: 'global_categories' });
                if (global_categories && global_categories.value == null) {
                    const requestOptions = {
                        method: 'POST',
                        headers: new Headers({
                            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjUzMzMyMSIsIm5hbWUiOiJQcmFrYXNoIEJob2xhaCIsImlhdCI6MTUxNjIzOTAyMn0.wSi2BCi8r9jrqLowInSj_dFkYat1I1VeIof_5tW18A0',
                            'Content-Type': 'application/json'
                        }),
                    };
                    fetch(process.env.REACT_APP_SECRET_API_URL + 'categories', requestOptions)
                        .then(response => response.json())
                        .then((data) => {
                            Storage.set({
                                key: 'global_categories',
                                value: JSON.stringify(data.clusters),
                            });
                        })
                } else {
                    const today = new Date().toISOString().slice(0, 10)
                    const last_fetch_date = await Storage.get({ key: 'global_products_date' });
                    if (today && last_fetch_date) {
                        if (last_fetch_date.value! < today) {
                            const requestOptions = {
                                method: 'POST',
                                headers: new Headers({
                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1MjUzMzMyMSIsIm5hbWUiOiJQcmFrYXNoIEJob2xhaCIsImlhdCI6MTUxNjIzOTAyMn0.wSi2BCi8r9jrqLowInSj_dFkYat1I1VeIof_5tW18A0',
                                    'Content-Type': 'application/json'
                                }),
                            };
                            fetch(process.env.REACT_APP_SECRET_API_URL + 'categories', requestOptions)
                                .then(response => response.json())
                                .then((data) => {
                                    Storage.set({
                                        key: 'global_categories',
                                        value: JSON.stringify(data.clusters),
                                    });
                                    Storage.set({
                                        key: 'global_products_date',
                                        value: new Date().toISOString().slice(0, 10),
                                    });
                                })
                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                }
            } catch (err) {
                console.log(err)
            }
        })()
    }, [loading])

    //check language or set default language to be EN
    useEffect(() => {
        ; (async () => {
            try {
                setLoading(false)
                setTimeout(() => {
                    history.push("/dashboard");
                }, 3000);
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])



    return <>
        <div className="cnMainWrap">
            <div className="prepare-data">
                <div className="prepare-data-wrapper">
                    <div className="prepare-data-inner">
                        <div className="cnLogo">
                            <IonThumbnail slot="app-logo">
                                <IonImg src="../assets/images/logo.svg" />
                            </IonThumbnail>
                        </div>
                        <div className="prepare-data-loading">
                            <IonSpinner className="custom-loader" name="crescent" color="dark"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
};

export default PrepareData;
