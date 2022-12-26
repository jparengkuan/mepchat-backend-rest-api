import AppError from "./appError";

export class APIError extends AppError {
    constructor(message: string, httpCode: number = 500) {
        super(message, httpCode);
    }
}
