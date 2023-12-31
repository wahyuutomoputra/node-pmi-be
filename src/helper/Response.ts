import { ValidationError } from "class-validator";
import { Response } from "express";

export async function responseErrorInput(params: {
  error: ValidationError[];
  res: Response;
}) {
  let errorTexts = Array();
  for (const errorItem of params.error) {
    errorTexts = errorTexts.concat(errorItem.constraints);
  }

  params.res.status(400).json({
    meta: {
      code: 400,
      message: errorTexts,
    },
    data: null,
  });
}

export async function responseOk(params: {
  data?: any;
  res: Response;
  message?: string;
}) {
  const message = params.message || "success";
  const data = params.data || null;

  params.res.status(200).json({
    meta: {
      code: 200,
      message: message,
    },
    data: data,
  });
}

export async function responseError(params: {
  data?: any;
  res: Response;
  message?: string | unknown;
}) {
  let message: string = "something wrong...";
  const data = params.data || null;

  if (typeof params.message == "string") {
    message = params.message;
  }

  if (params.message instanceof Error) {
    message = params?.message.message;
  }

  params.res.status(500).json({
    meta: {
      code: 500,
      message: message,
    },
    data: data,
  });
}

export async function responseCode(params: {
  data?: any;
  res: Response;
  message?: string;
  code: number;
}) {
  const message = params.message || "something wrong...";
  const data = params.data || null;

  params.res.status(params.code).json({
    meta: {
      code: params.code,
      message: message,
    },
    data: data,
  });
}
