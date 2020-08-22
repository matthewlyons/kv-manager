module.exports = {
  getErrors(error) {
    let errArray = [];
    if (error.name == 'ValidationError') {
      for (field in error.errors) {
        errArray.push({
          message: `Field: "${error.errors[field].path}" is required.`
        });
      }
    }
    if (error.name == 'CastError') {
      errArray.push({
        message: `Nothing found for that ID`
      });
    }

    if (errArray.length < 1) {
      errArray.push({
        message: `Something Went Wrong`
      });
    }
    return errArray;
  }
};
