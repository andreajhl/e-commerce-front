export function ordenar(orden,array){
    switch (orden) {
        case "A-Z":
            array.sort((a, b) => {
                if (a.titulo < b.titulo) {
                    return -1;
                }
                if (a.titulo > b.titulo) {
                    return 1;
                }
                return 0;
            })
            return array
        case "Z-A":
            array.sort((b, a) => {
                    if (a.titulo < b.titulo) {
                        return -1;
                    }
                    if (a.titulo > b.titulo) {
                        return 1;
                    }
                    return 0;
            })
            return array
        case "Mayor_Precio":
            array.sort((b, a) => {
                if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
            })
            return array
        case "Menor_Precio":
            array.sort((a, b) => {
                if (a.precio < b.precio) {
                return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
                })
            return array
        
        default: return array
    }
}
