class ApiService {

    constructor(httpInstance) {
        this.http = httpInstance;
    }
     async getJoke() {
        return await this.http.get('jokes/random');
    }
}

export default ApiService;