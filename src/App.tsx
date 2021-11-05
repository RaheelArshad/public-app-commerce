import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonPage, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Splash from './pages/Splash';
import PrepareData from './pages/PrepareData';
import Dashboard from './pages/Dashboard';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css';

const App: React.FC = () => (
	<IonApp>
		<IonReactRouter>
			<IonSplitPane contentId="main">
				<Menu />
				<IonPage id="main">
					<IonRouterOutlet>
						<Route exact path="/">
							<Splash name={'splash'} />
						</Route>
						<Route exact path="/prepare-data">
							<PrepareData name={'prepare_data'} />
						</Route>
						<Route exact path="/dashboard">
							<Dashboard name={'dashboard'} />
						</Route>
					</IonRouterOutlet>
				</IonPage>
			</IonSplitPane>
		</IonReactRouter>
	</IonApp>
);

export default App;
