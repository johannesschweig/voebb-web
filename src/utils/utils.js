// returns a loading obj with component, status and message
export function getLoadingObject (component, status = '', msg = '') {
  return {
    component: component,
    data: {
      status: status,
      msg: msg
    }
  }
}

// creates a custom error to catch
export function CustomError (msg) {
  this.message = msg
}
