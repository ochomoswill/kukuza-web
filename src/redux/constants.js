// Object structure for the dynamic redux store.
export const initialEntityVal = {
    tracker: {
        status: '',
        errors: null
    },
    data: {},
    timestamp: new Date().getTime()
};


export const Entities = {
  login: {
    url: "o/token",
    name: "login"
  }
}

