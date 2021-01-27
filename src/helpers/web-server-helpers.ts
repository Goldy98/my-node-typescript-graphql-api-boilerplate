import { Request, Response } from "express";

export interface Result {
  done: boolean;
  data?: any;
  message: string;
}

export class ServerError extends Error {
  readonly httpCode?: number;

  constructor(httpCode: number, message: string);
  constructor(message: string);
  constructor(arg1: any, arg2?: any) {
    const httpCode = arg2 ? arg1 : undefined;
    const message = arg2 || arg1;
    super(message);
    this.httpCode = httpCode;
  }
}

export function writeJsonError(
  res: Response,
  err: any,
  httpCode?: number,
  reqBody?: string
) {
  // appLog.error("[ERR]", err, err.stack, "Request body:", reqBody);
  const { message, code } = normalizeError(err, httpCode);
  writeJsonResponse(res, code, {
    error: message,
    request: reqBody
  });
}

export function writeJsonResponse(res: Response, httpCode: number, data: any) {
  res.setHeader("Content-Type", "application/json");
  res.status(httpCode);
  res.send(JSON.stringify(data));
  res.end();
}

export function waitForRequestBody(req: Request): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const body: string[] = [];
    req.on("data", chunk =>
      body.push(typeof chunk === "string" ? chunk : chunk.toString())
    );
    req.on("error", err => {
      reject(err);
    });
    req.on("end", () => {
      resolve(body.join(""));
    });
  });
}

export function writeServerError(res: Response, err: Error, reqBody?: string) {
  writeError(res, 500, `Error: ${err.message}\nRequest: ${reqBody}`);
}

export function writeError(res: Response, httpCode: number, message?: string) {
  res.status(httpCode);
  res.send(message || httpErrorMessage(httpCode));
  res.end();
}

export function httpErrorMessage(httpCode: number) {
  switch (httpCode) {
    case 400:
      return "400 Bad Request";
    case 403:
      return "403 Forbidden";
    case 404:
      return "404 Not Found";
    case 500:
      return "500 Internal Server Error";
    default:
      return `Error ${httpCode}`;
  }
}

export type ErrorCode = string | number;

export interface NormalizedError<C extends ErrorCode = ErrorCode> {
  code: C;
  message: string;
}

export function normalizeError<C extends ErrorCode = ErrorCode>(
  error: any,
  forceCode?: C
): NormalizedError<C> {
  const code = forceCode || (error && error.httpStatus) || 500;
  let message: string | undefined;
  if (typeof code === "number") {
    if (code >= 500 && code < 600) message = "Server internal error";
    else if (code === 404) message = "Resource not found";
    else if (code === 400) message = "Bad request";
  }
  if (error) {
    message =
      message +
      " [" +
      (error.message
        ? error.message
        : typeof error === "string"
        ? error
        : undefined) +
      "]";
  }
  return {
    code,
    message: message || `Unexpected error (${typeof error})`
  };
}
