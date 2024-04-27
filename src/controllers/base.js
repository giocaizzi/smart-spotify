export function getController(serviceFunction) {
  // return a function that takes a request and a response
  return function (req, res) {
    // add the access token to the args array
    const args = [req.session.access_token];
    // if the service function requires more than just the access token
    // then add the other params to the args array
    if (req.params) {
      for (let param in req.params) {
        args.push(req.params[param]);
      }
    }
    try {
      // call the service function with the args
      const response = serviceFunction(...args);
      // return the response
      res.status(200).json(response);
    } catch (error) {
      // if there is an error, return the error
      res.status(500).json({ Message: "Error 500", Error: error });
    }
  };
}