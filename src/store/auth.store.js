import {
    Login
} from '../components/APIS/AuthApi'
export default {
    state: {
        currentUser: {},

    },

    getters: {
        getCurrentUser(state) {
            return state.currentUser
        }
    },
    mutations: {
        setCurrentUser(state, output) {
            state.currentUser = output
        }
    },
    actions: {
        async loginAction(context, user) {
            let loggedInUser = await Login(user);
            console.log("trying", loggedInUser.data.SecretInfo)
            context.commit('setCurrentUser', loggedInUser.data.SecretInfo)
            return loggedInUser.data.SecretInfo
        },
           async singleUserAction(context, user) {
               let loggedInUser = await Login(user);
               console.log("trying", loggedInUser.data.SecretInfo)
               context.commit('setCurrentUser', loggedInUser.data.SecretInfo)
               return loggedInUser.data.SecretInfo
           },

        // async logout(context) {
        //     let usr = await logout()
        //     context.commit('setCurrentUser', {})
        // },

        async logout(context) {
            context.commit('setCurrentUser', {})
            return localStorage.clear();
        }


    }
}