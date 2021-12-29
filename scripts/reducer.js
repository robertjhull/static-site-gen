const fse = require('fs-extra');
const { srcDir } = require('../site.config').config;

const initialState = {
    summary: {},
    projects: [],
    contactMethods: {}
}

const initialProject = {
    name: "",
    description: "",
    deployed:"",
    repo: "",
    tools: ""
}

// ACTION TYPES

const READ_USER_DATA = 'READ_USER_DATA';
const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
const WRITE_USER_DATA = 'WRITE_USER_DATA';
const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';

// REDUCER FUNCTIONS

const readUserData = (state, action) => {
    if (action.isTest) return initialState;
    return JSON.parse(fse.readFileSync(srcDir + '/data/userData.json', 'utf-8'));
}

const addProject = (state) => {
    return {
        ...state,
        projects: [
            ...state.projects,
            initialProject
        ]
    }
}

const deleteProject = (state) => {
    return {
        ...state,
        projects: [
            ...state.projects.slice(0, state.projects.length - 1)
        ]
    }
}

const updateUserData = (state, newData) => {
    let newState = { ...state };
    for (const heading of Object.keys(newData)) {
        if (heading === 'type') continue;

        else if (heading === 'projects') {
            for (let i = 0; i < newData[heading].length; i++) {
                newState[heading][i] = Object.assign({}, newState[heading][i], newData[heading][i]);
            }
        }
        
        else {
            newState[heading] = Object.assign({}, newState[heading], newData[heading]);
        }
    }
    return newState;
}

const writeUserData = (state, action) => {
    fse.writeFile(srcDir + '/data/userData.json', JSON.stringify(state));
    return state;
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
    },
    [ADD_PROJECT]: (state, action) => {
        return addProject(state);
    },
    [DELETE_PROJECT]: (state, action) => {
        return deleteProject(state);
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
  
const getStateChanges = (state, form) => {
    const newData = {
        summary: {},
        projects: [],
        contactMethods: {}
    };

    // Checks if form data contains any values that are different from state
    Object.values(form).forEach(({ name, value }) => {
        const [section, key, idx] = name.split('-');

        if (section === 'projects') {
            if (state[section][idx][key] !== value) {
                newData[section][idx] = { [key]: value }
            }
        }

        else if (state[section][key] !== value) {
            newData[section][key] = value;
        }
    })
    return newData;
}
  
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
        getState: () => state,
        getChanges: (form) => getStateChanges(state, form)
    };
};
  
const store = createStore(reducer);

module.exports = { store };