class RestError extends Error {
    static unexpected = new RestError(500, "Unexpeted error, please try again later.")
    static ok = new RestError(200, "OK, request successful.");
    static created = new RestError(201, "Resource created successfully.");
    static accepted = new RestError(202, "Request accepted, processing ongoing.");
    static noContent = new RestError(204, "No content, request successfully processed with no response body.");
    static notModified = new RestError(304, "Not modified, resource has not been modified since last requested.");
    static badRequest = new RestError(400, "Bad request, please check your input.");
    static unauthorized = new RestError(401, "Unauthorized, authentication required.");
    static forbidden = new RestError(403, "Forbidden, you don't have permission to access this resource.");
    static notFound = new RestError(404, "Resource not found.");

    constructor(status, message = "", data = null) {
        super(message)
        this.status = status
        this.data = data

        if (message) {
            this.msg = message
        } else {
            this.msg = status + " " + RestError.getHttpStatusText(status)
        }
    }


    static handle(err, res) {
        let out = this.processesError(err, res)

        res.send(out)
    }

    static handleWithApitFormat(err, res) {
        let out = this.processesError(err, res)

        res.send(Utils.createApiOutputFormat(out))
    }

    static processesError(err, res) {
        let out

        if (err instanceof RestError) {
            res.status(err.status)

            if (err.status >= 500) {
                console.error(err)
            }

            out = err
        }
        //check for mongoose validation error
        else if (err.name === "ValidationError") {
            res.status(400)

            out = new RestError(400, "ValidationError", err)
            console.warn(err.message)
        } else {
            res.status(500)
            console.error(err)
            out = new RestError(500, err.message, err)
        }

        return out
    }

    static getHttpStatusText(statusCode) {
        switch (statusCode) {
            case 100:
                return 'Continue';
            case 101:
                return 'Switching Protocols';
            case 102:
                return 'Processing';
            case 200:
                return 'OK';
            case 201:
                return 'Created';
            case 202:
                return 'Accepted';
            case 203:
                return 'Non-Authoritative Information';
            case 204:
                return 'No Content';
            case 205:
                return 'Reset Content';
            case 206:
                return 'Partial Content';
            case 207:
                return 'Multi-Status';
            case 208:
                return 'Already Reported';
            case 226:
                return 'IM Used';
            case 300:
                return 'Multiple Choices';
            case 301:
                return 'Moved Permanently';
            case 302:
                return 'Found';
            case 303:
                return 'See Other';
            case 304:
                return 'Not Modified';
            case 305:
                return 'Use Proxy';
            case 307:
                return 'Temporary Redirect';
            case 308:
                return 'Permanent Redirect';
            case 400:
                return 'Bad Request';
            case 401:
                return 'Unauthorized';
            case 402:
                return 'Payment Required';
            case 403:
                return 'Forbidden';
            case 404:
                return 'Not Found';
            case 405:
                return 'Method Not Allowed';
            case 406:
                return 'Not Acceptable';
            case 407:
                return 'Proxy Authentication Required';
            case 408:
                return 'Request Timeout';
            case 409:
                return 'Conflict';
            case 410:
                return 'Gone';
            case 411:
                return 'Length Required';
            case 412:
                return 'Precondition Failed';
            case 413:
                return 'Payload Too Large';
            case 414:
                return 'URI Too Long';
            case 415:
                return 'Unsupported Media Type';
            case 416:
                return 'Range Not Satisfiable';
            case 417:
                return 'Expectation Failed';
            case 418:
                return "I'm a teapot";
            case 421:
                return 'Misdirected Request';
            case 422:
                return 'Unprocessable Entity';
            case 423:
                return 'Locked';
            case 424:
                return 'Failed Dependency';
            case 425:
                return 'Too Early';
            case 426:
                return 'Upgrade Required';
            case 428:
                return 'Precondition Required';
            case 429:
                return 'Too Many Requests';
            case 431:
                return 'Request Header Fields Too Large';
            case 451:
                return 'Unavailable For Legal Reasons';
            case 500:
                return 'Internal Server Error';
            case 501:
                return 'Not Implemented';
            case 502:
                return 'Bad Gateway';
            case 503:
                return 'Service Unavailable';
            case 504:
                return 'Gateway Timeout';
            case 505:
                return 'HTTP Version Not Supported';
            case 506:
                return 'Variant Also Negotiates';
            case 507:
                return 'Insufficient Storage';
            case 508:
                return 'Loop Detected';
            case 510:
                return 'Not Extended';
            case 511:
                return 'Network Authentication Required';
            default:
                return 'Unknown Status Code';
        }
    }
}

module.exports = RestError;
