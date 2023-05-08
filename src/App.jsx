import Intro from "./components/homepage/Intro"
import Home from "./components/home/Home"

function App() {

  let component 
  switch (window.location.pathname) {
    case '/':
      component = <Intro/>
      break
    case '/main':
      component = <Home/>
      break
  }

  return (
    <>
      {component}
    </>
  )
}

export default App
