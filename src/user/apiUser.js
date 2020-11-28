import { API } from "../config";

export const read = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const addProfileImage = (userId, token, pofileImage) => {
    console.log('product', pofileImage)
    return fetch(`${API}/user/profile/${userId}` , {
      method: 'PUT',
      headers : {
        Accept : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body : pofileImage
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err)
      })
  }

export const update = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (user, next) => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("jwt")) {
            let auth = JSON.parse(localStorage.getItem("jwt"));
            auth.user = user;
            localStorage.setItem("jwt", JSON.stringify(auth));
            next();
        }
    }
};
export const addBid = (userId, token, bidData) => {
    console.log('bidData', bidData)
    return fetch(`${API}/updateBid/${userId}` , {
      method: 'PUT',
      headers : {
        Accept : 'application/json',
        Authorization: `Bearer ${token}`
      },
      body : bidData
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err)
      })
  }