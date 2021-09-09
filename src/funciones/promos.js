export function promoDesc(libros, promo) {

    var librosEnPromo=[];
    var promosGenero=[];
    var date =  new Date().toDateString().split(' ')[0]
   
    promo.forEach(e=>promosGenero.push(e.genero));

    if(promo[0] && promo[0].genero[0] !== 'All'){  

        if(libros.length>0 ){
            libros.forEach(element=>{
                element.generos.forEach(genero=>{
                    if(promosGenero.flat(Infinity).includes(genero)){
                        librosEnPromo.push(element._id)
                    };
                });
            });

            if( promo[0].dias[0] === 'All' ){
                return librosEnPromo
            }else{
                if(promo[0].dias.includes(date)) return librosEnPromo
            } 

        }else{

            for (const i in libros) {
                libros[i].generos.forEach(genero=>{
                        if(promosGenero.flat(Infinity).includes(genero)){
                            librosEnPromo.push(libros[i]._id)
                        };
                });
            };

            if( promo[0].dias[0] === 'All' ){
                return librosEnPromo
            }else{
                if(promo[0].dias.includes(date)) return librosEnPromo
            }
        };

    }else if(promo[0]){

        if( promo[0].dias[0] === 'All' ){
            return libros.map(e=>e._id)
        }else{

            if(promo[0].dias.includes(date)) return libros.map(e=>e._id)
        }
    }
}

export function promoDescPrecioFinal(cart,promo,precioTotal) { 
    const librosDescuento=promoDesc(cart,promo)

    
      var precioFinal=0  

    for (const i in cart) {
        if(librosDescuento.includes(cart[i]._id)){
            promo.forEach(e=>{
                e.genero.forEach(a=>{
                    if(cart[i].generos.includes(a)){
                        let porcentaje= e.porcentaje/100
                        precioFinal+=cart[i].precio*cart[i].count - (cart[i].precio*cart[i].count * porcentaje)
                    }
                    
                })
            })
             
        }else{
            precioFinal+=cart[i].precio*cart[i].count
        }

       
    }
 return precioTotal- precioFinal !== 0? precioFinal : 0
        
}
