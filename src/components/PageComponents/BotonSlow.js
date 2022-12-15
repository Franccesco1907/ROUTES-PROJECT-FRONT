import React from "react";

import "../../assets/estilos/BotonSlow.css";

function BotonSlow(props){
    return (
        <div className={`boton-slow`}>
            <img 
                onClick={()=>props.desacelerar()}
                style={{cursor:`${props.touchable?"pointer":"default"}`,
                        pointerEvents:`${props.touchable?"auto":"none"}`
                    }}
                className="img"
                src={require("../../assets/images/Back.png")}
                alt="imgSlow"
            />
        </div>
    );
}

export default BotonSlow;