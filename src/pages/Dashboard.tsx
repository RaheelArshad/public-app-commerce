import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import FeaturedSlider from '../components/FeaturedSlider'
import { IonContent, IonGrid, IonRow, IonCol, IonMenuButton } from '@ionic/react';
import Header from '../components/Header';
import Search from '../components/Search';

interface ContainerProps {
    name: string;
}

const Dashboard: React.FC<ContainerProps> = ({ name }) => {

    const history = useHistory();
    const [language, setLanguage] = useState('en');

    return (
        <>
            <IonContent id="main-content">
                <div className="dashboardMainWrapper">
                    <div className="header">
                        <Header name={'header'} />
                        <div className="menu-button">
                            <IonMenuButton>
                                open menu
                            </IonMenuButton>
                        </div>
                    </div>
                    <div className="dashboard">
                        <div className="cnSearch">
                            <Search name={'search'} />
                        </div>
                        <div className="pricelist">
                            <div className="pricelist-top">
                                <IonGrid>
                                    <IonRow>
                                        <IonCol>
                                            {language == 'en' ? 'Pricelist' : 'Liste de prix'}
                                        </IonCol>
                                        <IonCol>
                                            <a className="arrow-right" href="/category-cluster/1">{language == 'en' ? 'More' : 'Plus'}</a>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </div>
                            <div className="pricelist-bottom">
                                <div className="pricelist-slider">
                                    <div>
                                        <FeaturedSlider name="featured_slider" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </>
    );
};

export default Dashboard;