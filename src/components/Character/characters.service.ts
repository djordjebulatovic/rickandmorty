
export const getLocalStorage = () => {
    return JSON.parse(window.localStorage.getItem("favorites"));
}


export const setLocalStorage = (list) => {
    return window.localStorage.setItem("favorites", JSON.stringify(list));
}