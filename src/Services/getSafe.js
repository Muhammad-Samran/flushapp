export const getSafe = (fn) => {
    try { 
        return fn(); 
    }
    catch(e) { 
        return "" 
    }
}