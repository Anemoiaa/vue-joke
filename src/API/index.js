class ApiService {

    constructor(httpInstance) {
        this.http = httpInstance;
    }
     async getJoke() {
        return await this.http.get('jokes/random');
    }

    async searchJokes(params) {
        return await this.http.get(`jokes/search?${params}`);
    }
}

export default ApiService;