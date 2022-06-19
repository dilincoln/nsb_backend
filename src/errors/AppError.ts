class AppError {
  public readonly message: string

  public readonly statusCode: number

  /**
   * 400 Bad Request
   *
   * 401 Unauthorized
   *
   * 403 Forbidden
   */
  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}

export default AppError
