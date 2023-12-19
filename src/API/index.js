class ApiService {

    constructor(httpInstance) {
        this.http = httpInstance;
    }
     async getJoke() {
        return await this.http.get('jokes/random');
    }

    async searchJokes(query) {
        return await this.http.get(`jokes/search?query=${query}`);
    }
}

export default ApiService;