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

function boomErrorHandler(err, req, res, nex) {
  if(erro.isBoom){
    const {output} = err
    res.status(output.statusCode).json(output.payload)
  }
  next(err)
}

module.exports = {logErrors, errorHandler, boomErrorHandler}