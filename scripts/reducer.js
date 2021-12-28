const userData = require('../src/data/userData');
const fse = require('fs-extra');
const { srcDir } = require('../site.config').config;

const initialState = {
    summary: {},
    projects: [],
    contactMethods: {}
}

// ACTION TYPES

const READ_USER_DATA = 'READ_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const WRITE_USER_DATA = 'WRITE_USER_DATA';


// REDUCER FUNCTIONS

const readUserData = (state, action) => userData;

const updateUserData = (state, newData) => {
    let newState = { ...state };
    for (const heading of Object.keys(newData)) {
        if (heading === 'type') continue;
        
        else for (const [key, value] of Object.entries(newData[heading])) {
            if (newState[heading].hasOwnProperty(key)) {
                newState[heading][key] = value;
            }
        }
    }
    return newState;
}

const writeUserData = (state, action) => {
    const userData = state;
    if (action.isTest) return userData;
    else {
        console.log("Writing to userData.json.")
        fse.writeFile(srcDir + '/data/userData.json', JSON.stringify(userData))
        return state;
    }
}

// HANDLERS
// expects (state: prevState, action: { ...actionData, type: 'type of action' })

const handlers = {
    [READ_USER_DATA]: (state, action) => {
        return readUserData(state, action);
    },
    [UPDATE_USER_DATA]: (state, action) => {
        return updateUserData(state, action);
    },
    [WRITE_USER_DATA]: (state, action) => {
        return writeUserData(state, action);
    }
}

const reducer = (state = initialState, action) => {
    if (handlers[action.type]) {
        return handlers[action.type](state, action);
    }
    return state;
}

const validateAction = action => {
    if (!action || typeof action !== 'object' || Array.isArray(action)) {
      throw new Error('Action must be an object!');
    }
    if (typeof action.type === 'undefined') {
      throw new Error('Action must have a type!');
    }
  };
  
const createStore = (reducer) => {
    let state = undefined;
    return {
        dispatch: (action) => {
            console.log("ACTION::", action.type)
            console.log("\nPREV STATE::\n", state);
            validateAction(action);
            state = reducer(state, action);
            console.log("NEW STATE::\n", state);
        },
      getState: () => state
    };
};
  
const store = createStore(reducer);

const parseFormData = (formDataArray) => {
    const state = store.getState();
    const newData = {
        summary: {},
        projects: [],
        contactMethods: {}
    };
    Object.values(formDataArray).forEach(({ name, value }) => {
        if (value) {
            const [section, key] = name.split('-');
            if (state[section][key] !== value) {
                newData[section][key] = value;
            }
        }
    })
    return newData;
}

module.exports = { store, parseFormData };