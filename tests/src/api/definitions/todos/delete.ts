import { defineEndpoint, Empty } from '../../../../../src/shared';
import { Todo } from '../../models/todo';
import { HasId } from '../../models/hasId';

export const deleteTodo = defineEndpoint<HasId, Empty, Todo>('DELETE', '/todos/:id');