export const singUp = user => {
  return fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const signIn = user => {
  return fetch("http://localhost:8080/signin", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
//signin Authentication
export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("Jwt", JSON.stringify(jwt));
    next();
  }
};

export const SignOut = next => {
  if (typeof window !== "undefined") localStorage.removeItem("Jwt");
  next();
  return fetch("http://localhost:8080/signout", {
    method: "GET"
  })
    .then(response => {
      console.log("signout", response);
      return response.json();
    })
    .catch(err => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("Jwt")) {
      return JSON.parse(localStorage.getItem("Jwt"));
    } else {
      return false;
    }
  }
};
