const { config } = require('../site.config');

// ACTION TYPES

const READ_USER_DATA = 'READ_USER_DATA';
const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
const UPDATE_PROJECTS = 'UPDATE_PROJECTS';
const UPDATE_CONTACT_METHOD = 'UPDATE_CONTACT_METHOD';

const initialState = {
    summary: {},
    projects: [],
    contactMethods: {}
}

// REDUCER FUNCTIONS

const readUserData = (state, action) => {
    const { summary, projects, contactMethods } = config;
    return {
        summary: { ...summary },
        projects: {}, //...projects },
        contactMethods: { ...contactMethods } 
    };
}

const updateUserSummary = (state, newSummary) => {
    const { name, occupation, location, description } = newSummary;
    return {
        ...state,
        summary: {
            ...state.summary,
            name,
            occupation,
            location,
            description
        }
    }
}

const updateUserProjects = (state, newProjects) => {
    return {
        ...state,
        projects: [ ...newProjects ]
    }
}

const updateUserContactMethods = (state, action) => {
    const { name, occupation, location, description } = action;
    return {
        ...state,
        contactMethods: {
           ...newContactMethods
        }
    }
}

// HANDLERS
// expects (state: prevState, action: { ...actionData, type: 'type of action' })

const handlers = {
    [READ_USER_DATA]: (state, action) => {
        return readUserData(state, action);
    },
    [UPDATE_SUMMARY]: (state, action) => {
        return updateUserSummary(state, action.summary);
    },
    [UPDATE_PROJECTS]: (state, action) => {
        return updateUserProjects(state, action.projects);
    },
    [UPDATE_CONTACT_METHOD]: (state, action) => {
        return updateUserContactMethods(state, action.contactMethods);
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
        validateAction(action)
        state = reducer(state, action);
      },
      getState: () => state
    };
};
  
const store = createStore(reducer);

module.exports = { store };