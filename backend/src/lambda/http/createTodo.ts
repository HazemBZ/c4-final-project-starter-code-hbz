import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
// import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos'

export const handler = middy(

  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)
    // DONE-SELF: oauth0 secret with middleware
    const newItem = await createTodo(newTodo, event)
    return {
      statusCode: 201,
      body: JSON.stringify({
        newItem
      })
    }
  })

handler
.use(httpErrorHandler())
.use(
  cors({
    credentials: true // + Headers that allow setting credentials from browser
  })
)
