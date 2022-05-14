export default class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
    this._token = this._headers.authorization;
  }

  getCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(response.status);
    });
  };

  addCard = (place, image, submitButton) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: place,
        link: image,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .finally(() => {
        submitButton.textContent = "Создать";
      });
  };

  deleteCard = (cardId, submitButton) => {
    // https://mesto.nomoreparties.co/v1/cohort-41/cards/271dbbd520255b11e427177e
    // DELETE удалить карточку
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .finally(() => {
        submitButton.textContent = "Подтвердить";
      });
  };

  getUserData = () => {
    // GET получить данные пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
  };

  updateUserInfo = (name, about, submitButton) => {
    // PATCH заменить данные пользователя
    let initiText = submitButton.textContent;
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .finally(() => {
        submitButton.textContent = "Сохранить";
      });
  };

  updateUserAvatar = (avatarURL, submitButton) => {
    // PATCH заменить аватар
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(`Ошибка: ${response.status}`);
      })
      .finally(() => {
        submitButton.textContent = "Подтвердить";
      });
  };

  addLike = (cardId) => {
    // PUT лайкнуть карточку
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
  };

  removeLike = (cardId) => {
    // DELETE удалить лайк с карточки
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
    });
  };
}
