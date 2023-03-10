import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { updateTodo } from '../../businessLogic/todos'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest & {attachmentUrl?: string} = JSON.parse(event.body)
    // DONE: Update a TODO item with the provided id using values in the "updatedTodo" object
    const userId = getUserId(event)
    await updateTodo(todoId, userId, updatedTodo)
          .then(() => {
            return {
              statusCode: 201,
              body: JSON.stringify({
                  updatedTodo
              })
          } })
          .catch( () => {
            return {
              statusCode: 400,
              body: JSON.stringify({
                  msg: 'Failed to update'
              })
            }
          })

    return 
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
