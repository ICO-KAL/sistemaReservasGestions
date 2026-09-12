import { MongoClient } from "mongodb";
import React, { useState } from "react";
const mongo = require('../backend/reservasGestionsBD');

function login(){
     const [contraseña, setContraseña] = useState('');
     const coneection = mongo();
     // function de contrase;a
     const handleChange = (event) => {
         setContraseña(event.target.value);
     };
     return (
         <div>
             <input 
                 type="password" 
                 value={contraseña} 
                 onChange={handleChange} 
             />
         </div>
     );
    
}

export default login;