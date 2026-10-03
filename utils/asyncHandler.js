const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
            .catch(next);
    };
};

export default asyncHandler;


// to remove try catch from each function in controller, coz its repeating
//so with this util we create a dedicated resusable function for the replacement of trycatch and
//... use them at the router to call the function inside it