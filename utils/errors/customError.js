export default class AppError extends Error {
    constructor(message = "Une erreur a eu lieu", code = 500, showToUser = false) {
        super(message)
        this.name = "AppError"
        this.code = code
        this.showToUser = showToUser
    }
}