export function obtenerPaginasPermitidas(usuario) {
    let arreglo;
    if (usuario === 'admin') {
        arreglo = ['/home','/about','/notas','/403','/estudiante'];
    }
    if (usuario === 'estudiante') {
        arreglo = ['/home','/about','/estudiante','403'];
    }
    return arreglo;
}