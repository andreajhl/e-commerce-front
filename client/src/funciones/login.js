import swal from 'sweetalert';

const APP = 'http://localhost:4000'

export function logaut(){
    swal({
        title: "¡Hasta pronto!",
        icon: "success",
    });
    window.localStorage.removeItem("token")
}

export default function userLogin(data){
   
    return async function (){
    var user = await fetch(`${APP}/auth/login`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(data)
        
    })
        const res = await user.json();
        return res
    };
};

export async function newUser (data){
    
    var user = await fetch(`${APP}/auth`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    
     const res = await user.json();
     return res
};

export async function sendMail(email){
    
    var user = await fetch(`${APP}/auth/sendemail`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            email:email
        })
    })
        const res = user.json();
        return res
}

export async function  passModifi(datos){
    var user = await fetch(`${APP}/auth/recoverpass`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        
        body: JSON.stringify(datos)
    })
        const res = await user.json();
        return res
}
export async function  changePass(datos){
    var user = await fetch(`${APP}/auth/changepass`,{
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=utf-8'
        },
        
        body: JSON.stringify(datos)
    })
    const res = await user.json();
    return res
}

