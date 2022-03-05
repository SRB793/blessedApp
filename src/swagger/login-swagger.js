export const LoginSwagger = {
    tags: ['Login for users'],
    description: "Return user's token and user's data",
    operationId: 'login',
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
                    $ref: '#/components/schemas/reqParameter'
                }
            }
        }
    },
    responses: {
        "200": {
            description: "User logged in successfully",
            "content": {
                "application/json": {
                    schema: {
                        type: "object",
                        user: {
                            type: 'object',
                            description: 'User data',
                        }
                    }
                }
            }
        }
    },
    parameters:[]
}