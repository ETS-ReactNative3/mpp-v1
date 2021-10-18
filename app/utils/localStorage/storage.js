
export const SetLocalStorage = (key, item) => {
    localStorage.setItem(key,item);
}

export const GetLocalStorage = (key) => {
    if(localStorage.getItem(key) !== undefined && localStorage.getItem(key) !== null) {
        return JSON.parse(localStorage.getItem(key));
    }
    return null;
}

export const RemoveLocalStorage = (key) => {
    localStorage.removeItem(key);
}
