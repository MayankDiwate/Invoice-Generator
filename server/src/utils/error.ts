export const errorHandler = (statusCode: number, message: string) => {
  const error = {
    statusCode,
    message,
  };
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
