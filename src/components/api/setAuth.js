export const checkAuth = () =>{
    let tokens = localStorage.getItem('spotifyToken')
    if (tokens) {
        console.log(JSON.parse(tokens))
        return  tokens
    }
}

export const logout = () => {
  localStorage.removeItem('spotifyToken')
}
