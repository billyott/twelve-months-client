import { USER_LOGIN, CREATE_USER, LOGOUT } from './action-types'

export const setUser = (userCreds) => {
    return function (dispatch) {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            const foundUser = users.find(user => user.username === userCreds.username)
            if (foundUser && foundUser.password === userCreds.password) {
                dispatch({type: USER_LOGIN, payload: foundUser});
            } else {
                window.alert("incorrect username or password. please try again.")
            }
        })
    }
}

export const createUser = (userCreds) => {
    return function (dispatch) {
        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userCreds.email,
                username: userCreds.username,
                password: userCreds.password
            })
        })
        .then(resp => resp.json())
        .then(newUser => {dispatch({type: CREATE_USER, payload: newUser})
        })
    }

}

export const logUserOut = () => ({type: LOGOUT, payload: {}})