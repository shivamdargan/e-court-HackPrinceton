const URL =
  process.env.NODE_ENV === "production"
    ? 'https://e-adalat.herokuapp.com'
    : 'http://localhost:5000'
export default URL;
