export class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponseStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUser() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
    .then(this._checkResponseStatus);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
    .then(this._checkResponseStatus);
  }

  editProfile(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponseStatus);
  }

  addNewCard(data) {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify(data)
    })
    .then(this._checkResponseStatus);
  }

  deleteCard(cardID) {
    return fetch(`${this._options.baseUrl}/cards/${cardID}`, {
      method: 'DELETE',
      headers: this._options.headers,
    })
    .then(this._checkResponseStatus);
  }

  activateLike(cardID) {
    return fetch(`${this._options.baseUrl}/cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._options.headers
    })
    .then(this._checkResponseStatus);
  }

  disactivateLike(cardID) {
    return fetch(`${this._options.baseUrl}/cards/${cardID}/likes`, {
      method: 'DELETE',
      headers: this._options.headers
    })
    .then(this._checkResponseStatus);
  }

  changeAvatar(data) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({ avatar: data.link })
    })
    .then(this._checkResponseStatus);
  }

}
