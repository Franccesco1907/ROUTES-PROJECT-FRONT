import "../../assets/estilos/CheckBox.css";

export default function CheckBox(props) {
  return (
    <label className="container">
      Mostrar todos los caminos de los camiones
      <input
        type="checkbox"
        onChange={() => props.handleClick()}
        checked={props.value}
      />
      <span className="checkmark"></span>
    </label>
  );
}
