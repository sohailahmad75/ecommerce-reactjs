export const signUp = user => {
  return fetch(`/api/signup` , {
    method: 'POST',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

export const signIn = user => {
  return fetch(`/api/signin` , {
    method: 'POST',
    headers : {
      Accept : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

export const authenticate = (data, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(data))
    next();
  }
}

export const signOut = (next) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt')
    next();
    return fetch(`/api/signout` , {
      method: 'GET'
    })
      .then(response => {
        
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const isAuthenticate = () => {
  if (typeof window == 'undefined') {
    return false;
  }
    if (localStorage.getItem('jwt')) {
      return JSON.parse(localStorage.getItem('jwt'))
    }
    else {
      return false;
  }
}
