export default function ({ app, route, store, redirect }) {
    if(!app.$cookiz.get('authData')){
        redirect('/')
    }

    if(app.$cookiz.get('authData').user.email_verified) {
        redirect('/')
    }
}