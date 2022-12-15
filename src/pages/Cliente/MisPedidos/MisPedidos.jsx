import ListaPedidosEnCurso from "./ListadoPedidosEnCurso";
import * as React from "react";
import "./MisPedidos.css";



// const rows = [
//   {
//     id: "000006",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000007",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000008",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000009",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000010",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000011",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000012",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000013",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
//   {
//     id: "000014",
//     dateHourPedido: "2022-03-24 23:06",
//     amount: 20,
//     place: "Tarapoto, San Martín",
//   },
// ];

export default function MisPedidos() {
  // const path = 'misPedidos/detalle';
  // const columns = [
  //   { field: "id", headerName: "Código", width: 140 },
  //   {
  //     field: "dateHourPedido",
  //     headerName: "Fecha y hora de pedido",
  //     width: 240,
  //     editable: true,
  //   },
  //   {
  //     field: "amount",
  //     headerName: "Cantidad",
  //     type: "number",
  //     width: 140,
  //     editable: true,
  //   },
  //   {
  //     field: "place",
  //     headerName: "Lugar",
  //     type: "number",
  //     width: 220,
  //     editable: true,
  //   },
  //   {
  //     field: "actions",
  //     headerName: "Acciones",
  //     sortable: false,
  //     width: 140,
  //     renderCell: () => (
  //       <button className="action" onClick={(event) => {handleDetail(event, path)}}>
  //         <IoEye size={25} />
  //       </button>
  //     ),
  //   },
  // ];
  // const handleDetail = (e, path) => {
  //   history.push(path);
  // }
  // const history = useHistory();

  return (<ListaPedidosEnCurso/>);
  // return (
  //   <div style={{ height: 400, width: "100%" }}>
  //     <DataGrid
  //       rows={rows}
  //       columns={columns}
  //       pageSize={5}
  //       checkboxSelection
  //       disableSelectionOnClick
  //     />
  //   </div>
  // );
}
