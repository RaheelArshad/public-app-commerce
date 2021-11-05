import React, { useEffect, useState } from 'react';
import { IonSearchbar, IonList, IonItem, IonLabel } from '@ionic/react';
import { Storage } from '@capacitor/storage';


interface ContainerProps {
    name: string;
}

const Search: React.FC<ContainerProps> = ({ name }) => {

    const [searchText, setSearchText] = useState('');
    const [searchItems, setSearchItems] = useState<any[]>([]);
    const [searchCss, setSearchCss] = useState('none');

    // function will execute when user input something in search bar
    const getSearchText = async (text: any) => {
        const tmp = await text;
        if (tmp) {
            setSearchCss('block')
            const global_products = await Storage.get({ key: 'global_products' });
            const tmp_json = JSON.parse(global_products.value || '{}');
            const searched_items = tmp_json.filter(function (i: any, n: any) {
                if (tmp_json[n].name.includes(tmp)) {
                    return tmp_json[n];
                }
            })
            setSearchItems(searched_items)
        } else {
            setSearchCss('none')
        }
    }

    return (
        <>
            <IonSearchbar placeholder={"Search"} value={searchText} onIonChange={e => { setSearchText(e.detail.value!); getSearchText(e.detail.value!); }}></IonSearchbar>
            <IonList className="search-list" style={{ display: searchCss }}>
                {
                    searchItems && searchItems !== null ?
                        searchItems.map((item, i) => (
                            <IonItem key={i}>
                                <IonLabel>
                                    {item.name}
                                </IonLabel>
                            </IonItem>
                        )) : ''
                }
            </IonList>
        </>
    );
}

export default Search;