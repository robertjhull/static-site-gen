const { config } = require('../site.config');

// handle user data state
const READ_USER_DATA = 'READ_USER_DATA';
const UPDATE_SUMMARY = 'UPDATE_SUMMARY';
const UPDATE_PROJECTS = 'UPDATE_PROJECTS';
const UPDATE_CONTACT_METHOD = 'UPDATE_CONTACT_METHOD';

const initialState = {
    summary: {},
    projects: [],
    contactMethods: {}
}

// ACTION { ...actionData, type: 'type of action' }
// STATE 

const readUserData = (state, action) => {
    const { summary, projects, contactMethods } = config;
    state = {
        summary: { ...summary },
        projects: { ...projects },
        contactMethods: { ...contactMethods } 
    };
}

const handlers = {
    [READ_USER_DATA]: (state, action) => {
        return readUserData(state, action);
    },
    [UPDATE_SUMMARY]: (state, action) => {
        return // something
    },
    [UPDATE_PROJECTS]: (state, action) => {
        return // something
    },
    [UPDATE_CONTACT_METHOD]: (state, action) => {
        return // something
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