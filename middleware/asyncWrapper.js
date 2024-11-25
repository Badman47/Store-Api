
const asyncWrapper = (fn) => {
	return async (err, req, res, next) => {
	try {
		await fn(req, res, next)
		console.log(`Error in asyncWrapper: ${fn}`);

	} catch (err) {
		console.log(`Error in asyncWrapper: ${err}`);
		next(err);
		}
	}
}

module.exports = asyncWrapper;
