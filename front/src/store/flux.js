import Swal from 'sweetalert2';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            apiUrl: "https://5000-ljavierrodr-websiteblog-roq9do7mpjm.ws-us46.gitpod.io",
            currentUser: null,
        },
        actions: {
            getLogin: async (info = { username: '', password: '' }) => {
                try {
                    const { apiUrl } = getStore();
                    const response = await fetch(`${apiUrl}/api/login`, {
                        method: 'POST',
                        body: JSON.stringify(info),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })

                    const data = await response.json()

                    if (data.access_token) {
                        setStore({ currentUser: data })
                        sessionStorage.setItem('currentUser', JSON.stringify(data));
                    }

                    return data;

                } catch (error) {
                    console.log(error);
                }
            },
            checkSession: () => {
                if(sessionStorage.getItem('currentUser')){
                    setStore({ currentUser: JSON.parse(sessionStorage.getItem('currentUser')) })
                }
            }
        }
    }
}

export default getState;