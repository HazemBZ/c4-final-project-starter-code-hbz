import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
// import { getUserId } from '../utils'
// import { TodosAccess } from '../../helpers/todosAcess'
// import { stringify } from 'querystring'



export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId

    const response = await deleteTodo(todoId, event).then(() => {
      return {
        statusCode: 200,
        body: JSON.stringify({
          msg: 'item deleted'
        })
      }
    }).catch(err => {
      return {
        statusCode: 400,
        body: JSON.stringify({
          'Error': err
        })
      }
    })

    return response

  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
