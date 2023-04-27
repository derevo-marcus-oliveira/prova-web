import React, { createContext, useContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Pages
import './index.css'

const context = createContext([]);

function Home() {
  const [lista] = useContext(context);
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <div>
        <Link to={'/service'}>Serviço</Link>
      </div>
      <div>
        <ul>
          {lista.map((item, id) => (
            <li key={id}>
              {item.nome}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Service() {

  const [lista, setLista] = useContext(context);

  var click = (nome) => {

    const obj = { nome: nome !== "" ? nome : "Vazio" };
    setLista([...lista, obj])
  }

  return (
    <>
      <div>
        <h1>Service</h1>
      </div>
      
      <div>
        <label htmlFor="nome">Nome - </label>
        <input type="text" id='nome' />
        <button onClick={() => click(document.getElementById('nome').value)}>
          Add
        </button>
      </div>

      <br />

      <div>
        <Link to={'/'}> Retonar</Link>
      </div>
    </>
  )
}

const Router = () => {

  const [lista, setLista] = useState([]);

  return (
    <context.Provider value={[lista, setLista]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </BrowserRouter>
    </context.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
