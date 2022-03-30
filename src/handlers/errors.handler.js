function logErrors(err, req, res, nex){
  console.log(err)
  nex(err)
}

function errorHandler(err, req, res, nex) {
  res.status(500).json({
    message: err.message,
    stack: err, stack
  })
}

module.exports = {logErrors, errorHandler}