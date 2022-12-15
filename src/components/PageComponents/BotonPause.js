import React from "react";

import "../../assets/estilos/BotonPause.css";

function BotonPause(props){
    return (
        <div className={`boton-pause`}>
            <img 
                className="imgPause"
                onClick={()=>props.handleClick()}
                src={require("../../assets/images/Pause.png")}
                alt="imgPause"
            />
        </div>
    );
}

export default BotonPause;