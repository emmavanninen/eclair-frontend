export const checkAuth = () =>{
    let tokens = localStorage.getItem('spotifyToken')
    if (tokens) {
        return  tokens
    }
}
