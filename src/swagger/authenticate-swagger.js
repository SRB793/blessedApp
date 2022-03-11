export const AuthenticateSwagger = {
    tags: ['Authenticate a user on behalf of apple id'],
    description: "Return user",
    operationId: 'authenticate',
    security: [
        {
            bearerAuth: []
        }
    ],
    requestBody: {
        description: 'Optional description in *Markdown*',
        required: true,
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        email: {
                            type: "string",
                        },
                        apple_id: {
                            type: "string",
                        },
                        firstName: {
                            type: "string",
                        },
                        lastName: {
                            type: "string",
                        },
                        subscribed: {
                            type: "number",
                            description: "0 for unsubscribed,1 for subscribed, 2 for free-trial",
                        },
                        role_id:{
                            type: "number",
                            description: "Fixed 1 for customer"
                        }
                    },
                }
            }
        }
    },
    responses: {
        "200": {
            description: "User authenticated successfully",
            "content": {
                "application/json": {
                    schema: {
                        type: "string",
                        message: {
                            type: 'string',
                            description: 'User authenticated successfully!',
                        }
                    }
                }
            }
        }
    },
    parameters:[]
}