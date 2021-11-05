import React from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonMenuToggle, IonLabel, IonMenuButton } from '@ionic/react';

interface ContainerProps {
    name: string;
}

//defining type for type array 
type Item = {
    text: string;
    path: string;
    logo: string;
};

//array for menu
const items: Item[] = [{ text: 'Item 1', path: '/test', logo: '/assets/path_to_image' }, { text: 'Item 2', path: '/test', logo: '/assets/path_to_image' }, { text: 'Item 3', path: '/test', logo: '/assets/path_to_image' }];


const Menu: React.FC = (name: any) => (
    <>
        <IonMenu contentId="main">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    {items.map((item, i) => (
                        <IonItem href={item.path} key={i} className="removeLines" lines="none">
                            <IonMenuToggle key={i} auto-hide="false">
                                <IonLabel>{item.text}</IonLabel>
                            </IonMenuToggle>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonMenu>
    </>
);

export default Menu;
