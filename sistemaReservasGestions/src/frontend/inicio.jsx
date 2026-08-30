import React, { useEffectEvent } from "react";

function inicio(){
    const [publicidad, setPublicidad] = useEffectEvent(0);
    publicidad((p)=>{
      // contenido de la publicidad
    });

    return(
       <>
            <div className="bodi">
                  <h2>Bienveido a registerGestions</h2>
                  {/* publicidad */}
                  <a href="http:">inicia seccion</a>
                  <p>novedades</p>
                  {/* apartado de novedades */}
            </div> 
       </>
    )
}

export default inicio