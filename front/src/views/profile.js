import { useContext, useState } from "react"
import { FaUpload } from "react-icons/fa"
import { Context } from "../store/appContext";
import Swal from "sweetalert2";

export default function Profile() {
    const { actions } = useContext(Context);
    const [avatar, setAvatar] = useState(null);
    const [cv, setCV] = useState(null);


    const handleSubmit = async e => {
        e.preventDefault();

        const data = new FormData();
        data.append('avatar', avatar);
        data.append('instagram', 'ljavierrodriguez');

        const resp = await actions.uploadAvatar(data);
        console.log(resp);
        if (resp.id) {
            Swal.fire({
                icon: 'success',
                title: 'Actualizacion exitosa',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.msg,
                footer: 'Please try again!'
            })
        }
    }

    const handleSubmit2 = async e => {
        e.preventDefault();

        const data = new FormData();
        data.append('cv', cv);
        data.append('instagram', 'ljavierrodriguez');

        const resp = await actions.uploadCV(data);
        console.log(resp);
        if (resp.id) {
            Swal.fire({
                icon: 'success',
                title: 'Actualizacion exitosa',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: resp.msg,
                footer: 'Please try again!'
            })
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="avatar">Upload Avatar</label>
                            <div className="input-group">
                                <input type="file" name="avatar" className="form-control" onChange={e => setAvatar(e.target.files[0])} />
                                <button className="btn btn-primary">
                                    <FaUpload />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-8 offset-md-2">
                    <form onSubmit={handleSubmit2}>
                        <div className="form-group">
                            <label htmlFor="cv">Upload CV</label>
                            <div className="input-group">
                                <input type="file" name="cv" className="form-control" onChange={e => setCV(e.target.files[0])} />
                                <button className="btn btn-primary">
                                    <FaUpload />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}