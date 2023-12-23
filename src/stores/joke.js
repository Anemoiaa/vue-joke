import { defineStore } from "pinia";

import axiosInstance from "@/plugins/axios.js";
import ApiService from "@/API/index.js";

const api = new ApiService(axiosInstance);

export const useJokeStore = defineStore('joke', {
    state: () => ({
        jokeList: [],
        searchedJokeList: null,
    }),

    actions: {
        async getJokeList(amount=3) {
            let maxRequestAmount = amount * 3;
            do {
                const res = await api.getJoke();
                if(!this.jokeList.some(item => item.id === res.data.id)) {
                    this.jokeList.push(res.data);
                    amount--;
                }
                maxRequestAmount--;
            } while(amount > 0 && maxRequestAmount > 0)

        },

        async searchJokes(query) {
            const params = new URLSearchParams({
                query: query,
            });
            const response = await api.searchJokes(params);
            this.searchedJokeList = response.data.result;
        }

    },
});
