import { injectable } from 'inversify';
import * as httpStatusCodes from 'http-status-codes';

import { EndpointHandler } from '../../../../../server';

import { deleteTodo } from '../../definitions';
import { TodoService } from '../../services/todoService';

@injectable()
export class DeleteTodoHandler extends EndpointHandler {
  constructor(private todoService: TodoService) {
    super();

    this.define(deleteTodo, context => {
      this.todoService.remove(context.request.params.id);
      context.response.statusCode = httpStatusCodes.NO_CONTENT;
    });
  }
}