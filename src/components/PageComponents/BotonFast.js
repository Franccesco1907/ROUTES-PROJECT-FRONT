import React from "react";

import "../../assets/estilos/BotonFast.css";

function BotonFast(props){
    return (
        <div className={`boton-fast`}>
            <img 
                className="imgFast"
                onClick={()=>props.acelerar()}
                src={require("../../assets/images/Forward.png")}
                alt="imgFast"
                style={{cursor:`${props.touchable?"pointer":"default"}`,
                        pointerEvents:`${props.touchable?"auto":"none"}`
                    }}
            />
        </div>
    );
}

export default BotonFast;