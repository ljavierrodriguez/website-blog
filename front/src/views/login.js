import { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

export default function Login(){

    const { store, actions } = useContext(Context);
    const history = useHistory();
    
    const [data, setData] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await actions.getLogin(data)
        console.log(resp);
        if(resp.access_token){
            Swal.fire({
                title: 'Inicio de Session Exitosa',
                confirmButtonText: 'Ok',
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  history.push('/')
                }
              })
        }
    }

    useEffect(() => {
        if(store.currentUser !== null){
            history.push('/')
        }
    }, [store.currentUser])


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-sm-12 col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" value={data.username} className="form-control" placeholder="Insert username" onChange={handleChange} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={data.password} className="form-control" placeholder="Insert password" onChange={handleChange} />
                        </div>
                        <div className="d-grid">
                            <button className="btn btn-primary gap-2">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}