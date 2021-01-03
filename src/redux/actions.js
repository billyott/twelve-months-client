import { USER_LOGIN, CREATE_USER, UPDATE_USER, DELETE_USER, LOGOUT } from './action-types'

export const setUser = (userCreds) => {
    return function (dispatch) {
        fetch('http://localhost:3000/users')
        .then(resp => resp.json())
        .then(users => {
            const foundUser = users.find(user => user.username === userCreds.username)
            if (foundUser && foundUser.password === userCreds.password) {
                dispatch({type: USER_LOGIN, payload: foundUser});
                window.localStorage.setItem("user", JSON.stringify(foundUser))
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

export const updateUser = (updatedUser) => {
    return function (dispatch) {
        fetch(`http://localhost:3000/users/${updatedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: updatedUser.email,
                username: updatedUser.username,
                password: updatedUser.password
            })
        })
        .then(resp => resp.json())
        .then(updatedUser => {
            dispatch({type: UPDATE_USER, payload: updatedUser})
        })
    }
}

export const deleteUser = (userId) => {
    return function (dispatch) {
        fetch(`http://localhost:3000/users/${userId}`, {method: 'DELETE'})
        .then(resp => resp.json())
        .then(deletedUser => {
            dispatch({type: DELETE_USER, payload: {}})
        })
    }
}


export const logUserOut = () => {
    return function (dispatch) {
        dispatch({type: LOGOUT, payload: {}})
        window.localStorage.setItem("user", JSON.stringify({}))
    }
}