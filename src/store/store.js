import {createStore} from "vuex";
import Vuex from 'vuex'

import account from "./model/account.js";

export default createStore({
    modules: {
        account
    },
    // strict: debug,
    strict: false,
})
