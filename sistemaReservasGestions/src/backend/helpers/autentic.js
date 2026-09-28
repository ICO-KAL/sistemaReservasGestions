import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

export async function autentic(email){
    try{
       const token = jsonwebtoken.sign({email},process.env.JWT_TOKEN_SECRET,{expiresIn: '1h'});
       return token;
    }catch(e){
        console.log(e);
    }
}

export async function verificToken(req,res,next){
    const token = await req.header('Authorization')?.replace('Bearer',''); // autentica el token por el controlador bearer
    if(!token) return res.status(401).json({Error: "token no colocado"});

    try{
        const verificar = jsonwebtoken.verify(token,process.env.JWT_TOKEN_SECRET); // verifica el token y lo valida si es valido
        console.log(verificar.email); // mostrarlo por consola 
        next();
    }
    catch(e){
        res.status(401).json({message: "token no autentico"});
    }
}