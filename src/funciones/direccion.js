export function direccion(array, location){
    var R= 6378.137
    var rad = function(x) {return x*Math.PI/180;}
    var distancia=[]
    array.forEach((e,i)=>{
        var dLat= rad(location.lat-e.location[0])
        var dLng= rad(location.lng-e.location[1])
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(e.location[0])) * Math.cos(rad(location.lat)) * Math.sin(dLng/2) * Math.sin(dLng/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        distancia.push({distancia:d.toFixed(3),pisition:i})
    })

    distancia.sort((a,b)=>a.distancia-b.distancia)
    var res= array[distancia[0].pisition]
    return res
}