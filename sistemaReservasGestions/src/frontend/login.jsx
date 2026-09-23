import { MongoClient } from "mongodb";
import React, { useState } from "react";
import userController from '../backend/controller/user.controller';

export default function login(){
     const {email, setEmail} = useState();
     const {passwoard, setPasswoard} = useState();
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