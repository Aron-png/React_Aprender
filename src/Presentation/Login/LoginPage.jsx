import { Await, useNavigate } from "react-router-dom"
import LoginForm from "./components/LoginForm"

function LoginPage() {
/*
useNavigate()->Principalmente, me permite cambiar de pesteña, en este caso "/React_Aprender/main"

Nota:          Prefiero cambiar de pagina aca y no en el LoginForm
               por temas de orden, se estan intercambiando con el mismo nivel de padre.
El navigate se usa mas adelante, buscar con ctrl+F
*/
    const navigate = useNavigate()
    const loginHttp = async function(usuario, password){
        //1. Peticion HTTP POST -> /endpoints/login
        //El fetch esta configurado por defecto hacer peticiones GET, lo transformamos a POST
        const response = await fetch("http://localhost:8000/endpoints/login",
        {
            method : "POST",//Transformamos
            //Se va a enviar el objeto en formato JSON como STRING.
            body : JSON.stringify(
                {usuario : usuario, password : password}
                )
        }
        )
        //Respuesta en forma de JSON
        const data = await response.json()
        
        return data.error
    }
/*
Nota: hubs funciones que nos permiten tener ciertas funcionalidades que no tiene relacion con los 
hijos y que restringen los "function".
*/
    const onLoginOk = async function(
        usuario, password
    ) {
        const error = await loginHttp(usuario, password)
        if(error === ""){
                                            //Login Correcto
            //dataUsuario es un objeto JavaScript, "podemos" convertirlo en un STRING, si queremos.
            const dataUsuario = {
                username : usuario,
                password : password
            }

            // JSON.stringify : convierte el objeto JavaScript a un STRING de JSON 
            //(necesitamos hacer esto para el sessionStorage)
            const dataUsuarioJSON = JSON.stringify(dataUsuario)
            console.log(dataUsuario)
            console.log(dataUsuarioJSON)
            // Guardado en session storage
            //el "sessionStorage" se guarda data solo de tipo STRING hasta que se cierre la pestaña
            //(mejor conocido, hasta que se cierre la SESION)
            //Con el "localStorage", es por siempre, asi apagues la pc.
            //sessionStorage.setItem("nombre", valor) = guardando info
            sessionStorage.setItem("DATA_USUARIO", dataUsuarioJSON)

            navigate("/React_Aprender/main", {
                //Con el state podemos enviar un objeto javaScript y poder obtenerlo en la
                //siguiennte pagina (MainPage), se busca como "location.state", poner ctrl+F
                state : {
                    username : usuario
                }
            })
        }else{
            console.error(error)
        }
        /*
        Gracias a que pusimos console.log(dataUsuario... y la de JASON, podemos ver:
        Una vez que nos hallamos registrado con el Login, vemos en inspeccionar elemento...
        en console... lo siguiente...
        Este es un objeto JavaScript
        const dataUsuario = {
            username : 'pw',
            password : '123'
        }
        Ahora lo convertiremos en un String de JSON
        const dataUsuario = {
            "username" : "pw",
            "password" : "123"
        }
        Nota: En AboutPage vemos el proceso contrario (de JSON a OBJETO).
        */
    }

    return <div className="container">
        <div className="row">
            <div className="col"></div>
            <div className="col">
            {
                /*
                El LoginForm solito ejecuta el codigo que hay dentro del archivo
                Recibe como parametro el onLoginOk, aqui 
                LoginPage(Padre)->hereda el onLoginOk->LoginFrom(hijo)
                Aca en onLoginOk lo estoy pasando como props, lo podemos ver en 
                LoginForm(dentro de componentes) en clik

                */
            }
                <LoginForm 
                    onLoginOk={ onLoginOk } />
            </div>
            <div className="col"></div>
        </div>
    </div>
}

export default LoginPage