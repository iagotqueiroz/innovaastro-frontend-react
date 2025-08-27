import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/query'

function App() {
  return <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  </QueryClientProvider>
}

export default App
