import createApiClient from './api.service';

class UserService {
    constructor(baseURL = 'api/auth', customHeaders = {}) {
        this.api = createApiClient(baseURL, customHeaders);
    }
    async register(data) {
        return (await this.api.post('/register', data)).data;
    }
    async login(data) {
        return (await this.api.post('/login', data)).data;
    }
}

export default UserService;
