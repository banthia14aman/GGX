import { createRoot } from 'react-dom/client'
import '@fontsource/big-shoulders-display/800'
import '@fontsource/big-shoulders-display/900'
import '@fontsource-variable/geist'
import '@fontsource/kalam/400'
import '@fontsource/kalam/700'
import '../index.css'
import './deck.css'
import Deck from './Deck'

createRoot(document.getElementById('root')!).render(<Deck />)
