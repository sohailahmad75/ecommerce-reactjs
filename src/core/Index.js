import { API } from "../config";
import queryString from "query-string";
export const getProducts = (sortBy) => {
  
  return fetch(
    `${API}/products?sortBy=${sortBy}&order=${
      sortBy === "createdAt" ? "desc" : "asc"
    }&limit=6`,
    {
      method: "GET",
    }
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const list = params => {
  const query = queryString.stringify(params);
  
  return fetch(`${API}/products/search?${query}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};
export const getFilteredProducts = (skip, limit, filters = {}) => {
  const data = {
    limit,
    skip,
    filters,
  };
  return fetch(`${API}/products/by/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
export const read = productId => {
  return fetch(`${API}/product/${productId}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const readUserData = userId => {
  return fetch(`${API}/userInfo/${userId}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const listRelated = productId => {
  return fetch(`${API}/products/related/${productId}`, {
      method: "GET"
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const getMyAds = (userId , token) => {
  return fetch(`${API}/myads/${userId}`, {
      method: "GET",
      headers : {
        Accept : 'application/json',
        Authorization: `Bearer ${token}`
      },
  })
      .then(response => {
          return response.json();
      })
      .catch(err => console.log(err));
};

export const deleteMyProduct = (productId, userId , token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers : {
      Accept : 'application/json',
      Authorization: `Bearer ${token}`
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};