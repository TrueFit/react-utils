export default response => {
  const responseInt = parseInt(response.status / 100, 10);

  response.success = responseInt === 2;

  return response;
};
