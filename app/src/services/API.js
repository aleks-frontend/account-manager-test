// API Abstraction

// A single place where the maximum number of auto attempts should be set
const MAX_ATTEMPTS = 3;

const API = {
    url: 'http://localhost:8080/',
    attemptsLeft: MAX_ATTEMPTS,

    _resetAttempts() {
        this.attemptsLeft = MAX_ATTEMPTS;
    },

    _handleError({ response, method, endpoint, body = null, params = null }) {
        if (response.ok) {
            this._resetAttempts();
            return response;
        } else {
            if (this.attemptsLeft > 0) {
                const message = `Your request failed, we will try ${this.attemptsLeft} more time${this.attemptsLeft !== 1 ? 's' : ''}`;
                alert(message);

                this.attemptsLeft--;
                if ( method === 'get' ) {
                    return this.get(endpoint);
                } else {
                    return this.post({ endpoint, body, params });
                }
            } else {
                return Promise.reject(response.statusText);
            }
        }
    },

    _handleContentType(response) {
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else if (contentType && contentType.includes('text/html')) {
            return response.text();
        } else {
            return Promise.reject('Response is in neither JSON or text format!');
        }
    },

    // GET abstraction
    get(endpoint) {
        return window.fetch(this.url + endpoint, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json'
            })
        })
            .then((response) => this._handleError({ response, method: 'get', endpoint }))
            .then(this._handleContentType)
            .catch(error => {
                throw new Error(error);
            })
    },

    // POST abstraction
    post({ endpoint, body, params }) {
        return window.fetch(this.url + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...params
            },
            body: body
        })
            .then((response) => this._handleError({ response, method: 'post', endpoint, body, params }))
            .then(this._handleContentType)
            .catch(error => {
                this._resetAttempts();
                throw new Error(error);
            })
    }
};

export default API;
