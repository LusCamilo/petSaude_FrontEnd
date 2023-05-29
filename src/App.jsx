import { Rotas } from './routes.jsx'
import {useEffect} from "react";
import verifyLoggedUser from "./utils/verifyLoggedUser";

function App() {
	useEffect(() => {
		async function checkedLoggedUser() {
			const isLogged = await verifyLoggedUser()
			if (!isLogged) {
				if (!document.location.href.includes('/login') && !document.location.href.includes('/register')) {
					document.location.href = '/login'
				}
			}
		}
		checkedLoggedUser().catch(err => console.log(err))
	}, [])

	return (
		<>
			<Rotas/>
		</>
	);
}

export default App;
