//import {getFingerprint} from './client.js';

let renderForm = () => {

    let loginForm = document.getElementById("login-form");
    let loginButton = document.getElementById("login-button");

    if(loginButton){

        loginButton.addEventListener("click", (event) => {

            event.preventDefault();//prevengo su comportamiento normal
    
            let url = form.action;//estoy cogiendo la url que voy a enviar mis datos
            //esto se pone en el html en el action
            let data = new FormData(loginForm);//cojo todos lo datos
            data.append("fingerprint", getFingerprint());
    
            let sendPostRequest = async () => {
                //esto se va a ejetutar sin esperar
                //siempre se utiliza para comunicarte con el servidor.
        
                let request = await fetch(url, {//sólo se ejecutaran cuando reciben la respuesta de la bbdd
                    method: 'POST', 
                    body: data
                })
                .then(response => {//entonces cuando el servidor me conteste se ejecutará esto
                    //el then siempre va con un catch
                    if (!response.ok) throw response;//response es la respuesta del servidor. esto significa que si hay un fallo
                    //vete al catch
    
                    console.log(response.data);
    
                    return response.json();
                })
                .then(json => {
                    localStorage.setItem('token', json.data);
                    console.log(json.data);//estoy accediendo al valor de data que será el token
                })
                .catch(error => {
                    
                    if(error.status == '400'){
    
                        error.json().then(jsonError => {
    
                            let errors = jsonError.data;    
    
                            Object.keys(errors).forEach( (key) => {
                                let errorMessage = document.createElement('li');
                                errorMessage.textContent = errors[key];
                                console.log(errorMessage)
                            })
                        })   
                    }
    
                    if(error.status == '500'){
                        console.log(error);
                    }
                });
    
                // En caso de usar Axios
                
                // let request = await axios.post(url, json)
                // .then(response => {
                //     console.log(response);
                // })
                // .catch(error => {
                    
                //     if(error.response.status == '400'){
    
                //         let errors = error.response.data.data;      
                //         let errorMessage = '';
    
                //         Object.keys(errors).forEach( (key) => {
                //             let errorMessage = document.createElement('li');
                //             errorMessage.textContent = errors[key];
                //             console.log(errorMessage)
                //         })
    
                //         console.log(errorMessage);
                //     }
    
                //     if(error.response.status == '500'){
                //         console.log(error);
                //     }
                // });
            };
    
            sendPostRequest();
            
        });
    }
};