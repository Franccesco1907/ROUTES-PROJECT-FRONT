import React from "react";

import "../../assets/estilos/BotonPlay.css";


function BotonPlay(props){
    return (
        <div className={`boton-play`}>
            <img 
                className="imgPlay"
                onClick={()=>props.handleClick()}
                src={require("../../assets/images/play.png")}
                alt="imgPlay"
                style={{cursor:`${props.touchable?"pointer":"default"}`,
                        pointerEvents:`${props.touchable?"auto":"none"}`
                    }}
            />
        </div>
    );
}

export default BotonPlay;