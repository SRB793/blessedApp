export const RegisterSwagger = {
    tags: ['Register a new user'],
    description: "Return user registered successfully",
    operationId: 'register',
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
                        password: {
                            type: "string",
                        },
                        firstName: {
                            type: "string",
                        },
                        lastName: {
                            type: "string",
                        },
                        username: {
                            type: "string",
                        },
                    },
                }
            }
        }
    },
    responses: {
        "200": {
            description: "User registered successfully",
            "content": {
                "application/json": {
                    schema: {
                        type: "string",
                        message: {
                            type: 'string',
                            description: 'User registered successfully!',
                        }
                    }
                }
            }
        }
    },
    parameters:[]
}