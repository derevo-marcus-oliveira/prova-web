import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios"

// Pages
import './index.css'

const context = createContext([]);

function Home() {
  
  const [lista, setLista] = useContext(context);

  async function Excluir(email){
    debugger
    await axios.delete("http://localhost:4003/Excluir", {
      data: {
        "email": email
      }
    })
      .then((response) => {
        debugger
        console.log("Sucesso", response)
        Buscar();                      
      })
      .catch((error) => {
        debugger
        console.log("Erro", error)
      })
  }

  async function Buscar(email){
    debugger
    await axios.get("http://localhost:4003/Buscar")
      .then((response) => {
        debugger
        console.log("Sucesso", response) 
        setLista(response.data);                     
      })
      .catch((error) => {
        debugger
        console.log("Erro", error)
      })
  }

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
              <p>{item.id} - {item.email} - {item.name} - <span style={{cursor: 'pointer'}} onClick={() => Excluir(item.email)}>X</span></p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function Service() {

  const [lista, setLista] = useContext(context);

  var click = (name, email) => {

    const obj = {
      "email": email !== "" ? email : "Vazio",
      "name": name !== "" ? name : "Vazio"
    };
    debugger
    const fectData = async () => {

      await axios.post("http://localhost:4003/Adicionar", {
          email,
          name
      })
        .then((response) => {
          debugger
          console.log("Sucesso", response)
          setLista([...lista, response.data])
        })
        .catch((error) => {
          debugger
          console.log("Erro", error)
        })
    }
    fectData();
  }

  return (
    <>
      <div>
        <h1>Service</h1>
      </div>

      <div>
        <div>
          <label htmlFor="email">Email - </label>
          <input type="email" id='email' style={{height: "30px", width: "300px"}}/>
        </div>
        <div>

          <label htmlFor="nome">Nome - </label>
          <input type="text" id='nome' style={{height: "30px", width: "300px"}}/>
        </div>
        <button onClick={() => click(document.getElementById('nome').value, document.getElementById('email').value)} style={{fontSize: "0.8em"}}>
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

  useEffect(() => {

    const fectData = async () => {

      await axios.get("http://localhost:4003/Buscar")
        .then((response) => {
          debugger
          console.log("Sucesso", response)
          setLista(response.data);
        })
        .catch((error) => {
          debugger
          console.log("Erro", error)
        })
    }
    fectData();
  }, [])

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
