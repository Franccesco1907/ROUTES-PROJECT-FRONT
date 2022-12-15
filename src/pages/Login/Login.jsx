import React, { useRef } from 'react';
import { Controls } from "../../components/controls/Controls";
import { UserContext } from '../../constants/UserContext';
import userService from '../../services/userService';
import { useHistory } from 'react-router-dom';


import './Login.css';
import Notification from '../../components/utils/Notification';



const Login = () => {
	const form = useRef(null);
	const { setUser, setRol } = React.useContext(UserContext);
	const history = useHistory();
	const [notify, setNotify] = React.useState({
	  isOpen: false,
	  message: "",
	  type: "",
	});

	const handleSubmit = async(event) => {
		event.preventDefault();
		const formData = new FormData(form.current);
		const data = {
			email: formData.get('email'),
			password: formData.get('password')
		}
		console.log(data);
		let us = await userService.getLogin(data);
		if(us !== '') {
			console.log("res login ",us);
			/* success */
			setUser(us);
			let cliente = await userService.getClientebyUser(us.id);
			console.log("cliente", cliente);
			if(cliente) setRol(1);
			else setRol(0);
			localStorage.setItem("ind", 0);
			setNotify({
				isOpen: true,
				message: "Logueo exitoso",
				type: "success",
			});
			if(cliente)
			history.push("/client");
			else history.push("/admin");
				/* redirect to next page */
			// window.location.reload();
		} else {
			console.log("ramon")
			setNotify({
				isOpen: true,
				message: "Logueo fallido",
				type: "error",
			});
		}
	}

	return (
		<div className="Login">
            <h2 className="title-login">INGRESO A PACKRUNNER</h2>
			<div className="Login-container">
				<form action="/" className="form" ref={form}>
                    <div style={{margin: "10px"}}>
                        <Controls.Input
                            label="Email"
                            name="email"
                            sx={{ width: 1 }}
                            type="email"
                            required
                        />
                    </div>
                    <div style={{margin: "10px"}}>
                        <Controls.Input
                            label="Password"
                            name="password"
                            sx={{ width: 1 }}
                            type="password"
                            required
                        />
                    </div>
					<button
						onClick={handleSubmit}
						className="primary-button login-button">
						Ingresar
					</button>
					<a href="/">¿Olvidó su contraseña?</a>
				</form>
				<button
					className="secondary-button signup-button"
					onClick={(e)=>{
						e.preventDefault();
							history.push("/registro");
					}}
				>
					Registrarse
				</button>
			</div>
			<Notification notify={notify} setNotify={setNotify} />
		</div >
	);
}

export default Login;
