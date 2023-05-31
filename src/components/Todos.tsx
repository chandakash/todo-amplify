import React from "react";
import TodoItem from "./TodoItem";

const Todo = ({ todoList, onDeleteTodo }: any) => {
  return (
    <>
      <div className="h-screen">
        <div>
          {todoList.map((todo: any, index: number) => {
            console.log(todo);
            return (
            <TodoItem
              key={index}
              todo={todo}
              onDeleteTodo={onDeleteTodo}
            />
          )})}
        </div>
      </div>
    </>
  );
};

export default Todo;