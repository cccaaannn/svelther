import './app.css'
import './config/axios-config'
import App from './App.svelte'

const app = new App({
	target: document.getElementById('app'),
})

export default app
