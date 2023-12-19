import { defineStore } from "pinia";

import axiosInstance from "@/plugins/axios.js";
import ApiService from "@/API/index.js";

const api = new ApiService(axiosInstance);

export const useJokeStore = defineStore('joke', {
    state: () => ({
        jokeList: new Set(),
        searchedJokeList: [],
    }),

    actions: {
        // Configurable amount and depth of joke requests
        async getJokeList(options = { amount: 3, maxDeep: 5 }) {
            const requests = [];

            for (let i = 0; i < options.amount; i++) {
                requests.push(api.getJoke());
            }

            const jokeItems = await Promise.all(requests);
            jokeItems.forEach(newJoke => {
                const jokeObject = {
                    id: newJoke.data.id,
                    value: newJoke.data.value,
                }
                this.jokeList.add(jokeObject);
            });

            if(this.jokeList.size < options.amount && options.maxDeep > 0) {
                const newAmount = options.amount - this.jokeList.size;
                const newMaxDeep = options.maxDeep - 1;

                this.getJokeList({ amount: newAmount, maxDeep: newMaxDeep });
            }

        },

    },
});