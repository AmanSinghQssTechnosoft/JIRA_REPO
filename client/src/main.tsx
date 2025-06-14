import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { LoadScript } from '@react-google-maps/api'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <BrowserRouter>
        <LoadScript googleMapsApiKey="AIzaSyDQ-eQeD6D7NWNweH1dlOJLfYujubB0p7c" libraries={["places"]}>
          <App />
        </LoadScript>
      </BrowserRouter>
    </Provider>
)
