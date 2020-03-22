export const checkAuth = () =>{
    let tokens = localStorage.getItem('spotifyToken')
    if (tokens) {
        return  tokens
    }
}

// export const logout = () => {
//   localStorage.removeItem('spotifyToken')
// }
