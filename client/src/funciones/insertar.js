const APP = 'http://localhost:4000'

export async function insertaReview(review, token) {

    var a = await fetch (`${APP}/productos/review`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(review)
    })
   var res = await a.json()
    return res;
};

export async function createPromo (promo,token){
    var promoCreate= await fetch (`${APP}/promo`, {
        method: 'post',
        headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo)
    });
    promoCreate= await promoCreate.json()

    return promoCreate
}

export function colorea(e){
    let { id } = e.target
    id = Number(id)
    for(let i = 1 ; i < 6 ; i++ ) {
        if( i <= id ){
            let star = document.getElementById(i)
            let starCheckbox = document.getElementById('radio'+i)
            starCheckbox.checked = true;
            star.style.color = 'orange';
        }else{
            let star = document.getElementById(i)
            let starCheckbox = document.getElementById('radio'+i)
            starCheckbox.checked = false;
            star.style.color = 'grey';
        }
    }
}