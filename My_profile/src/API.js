import Axios from "axios";
import swal from 'sweetalert'

export const login = async (userCredentials ,dispatch) =>{
    dispatch({type : "LOGIN_START"})
        const res = await Axios.post('http://localhost:3001/user_authentication' , userCredentials);
        dispatch({type : "LOGIN_PASS" , payload : res.data.user })
        if (res.data.success === true) {
                    // swal({
                    //     title: "Done",
                    //     text: res.data.message,
                    //     icon: "success"
                    // })
        }
        else
        {
            dispatch({type : "LOGIN_FAIL" , payload : res.emessage })
            swal({
                title: "Opps !",
                text: res.data.emessage,
                icon: "warning"
            })
        }  
}

export const adminUp = async (name , dispatch)=>{
    const res = await Axios.post('http://localhost:3001/user_admin_update' , name);
        dispatch({type : "LOGIN_PASS" , payload : res.data.user })
        if (res.data.success === true) {
                    swal({
                        title: "Done",
                        text: res.data.message,
                        icon: "success"
                    })
        }
        else
        {
            dispatch({type : "LOGIN_FAIL" , payload : res.emessage })
            swal({
                title: "Opps !",
                text: res.data.emessage,
                icon: "warning"
            })
        } 
}
export const userUp = async (user_id , dispatch)=>{
    const res = await Axios.post('http://localhost:3001/user_update' , user_id);
        dispatch({type : "LOGIN_PASS" , payload : res.data.user })
        if (res.data.success === true) {
                    swal({
                        title: "Done",
                        text: res.data.message,
                        icon: "success"
                    })
        }
        else
        {
            dispatch({type : "LOGIN_FAIL" , payload : res.emessage })
            swal({
                title: "Opps !",
                text: res.data.emessage,
                icon: "warning"
            })
        } 
}

export const followFriend = (from ,to) => {
    Axios.put("http://localhost:3001/followfriend/" + from, { to: to })
        .then((Response) => {
            swal({
                title: "Done",
                text: Response.data.msg,
                icon: "success"
            })
        })
        .catch((err) => {
            alert(err)
        })
}

export const unFollow = (who , to) => {
    Axios.put("http://localhost:3001/unfollow_following/" + who, { to: to })
        .then((Response) => {
            swal({
                title: "Done",
                text: Response.data.msg,
                icon: "success"
            })
        })
        .catch((err) => {
            alert(err)
        })
}