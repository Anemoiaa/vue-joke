import pinia from './pinia.js';
import axios from './axios';

export function registerPlugins(app) {
    app.use(pinia);
}
