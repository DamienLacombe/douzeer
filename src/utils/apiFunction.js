// export function getCode() {
//     const url = window.location; 
//     const searchParams = new URLSearchParams(url.search)

//     if (!(searchParams.has("code"))) {
//         window.location.replace("https://connect.deezer.com/oauth/auth.php?app_id=553742&redirect_uri=http://localhost:3000/")
//     } else {
//         window.sessionStorage.setItem("code", searchParams.get("code")); 
//         searchParams.delete("code");
//         window.location.replace("http://localhost:3000/")
//     }
// }

// export function getToken(code) {
//     const body = {
//         url :  `https://connect.deezer.com/oauth/access_token.php?app_id=553742&secret=08241d2290c641833cd348765c09f3fe&code=${code}`
//     }
      
//     if (code !== null) {
//     return fetch("http://localhost:5000/api/nocors/", {
//         headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//         },        
//         method: "POST",
//         body: JSON.stringify(body)
//     })
//     .then(resp => resp.json())
//     .then(token => {
//         return token
//     } )
//     }
// }

export function getSongs(url) {
   
    const body = {
        url : url
    }

    return fetch("http://localhost:5000/api/nocors/", {
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },        
        method: "POST",
        body: JSON.stringify(body)
    })
    .then(resp => resp.json())
    .then(songs => {
        return songs
    } )
} 
