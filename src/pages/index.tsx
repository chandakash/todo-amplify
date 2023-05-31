import Head from "next/head";
import React, { useState } from "react";

import { Amplify, API } from 'aws-amplify';
import awsconfig from '../../src/aws-exports';

import * as mutations from "../../src/graphql/mutations";
import * as queries from '../../src/graphql/queries';
import CreateTodo from "../components/CreateTodo";
import Todo from "../components/Todos";

Amplify.configure(awsconfig);

export default function Home({ todos }: any) {
  const [todoList, setTodoList] = useState(todos);

  const onCreateTodo = async (todo: string) => {
    const newTodo = {
      title: todo,
      completed: false,
    };

    try {
      const response: any = await API.graphql({
        query: mutations.createTodo,
        variables: { input: newTodo },
      });

      console.log(response.data.createTodo.id);
      setTodoList((list: any) => [...list, { ...newTodo, id: response.data.createTodo.id }]);

      console.log("Successfully created a todo!");
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const onDeleteTodo = async (id: string) => {
    try {
      await API.graphql({
        query: mutations.deleteTodo,
        variables: { input: { id } },
      });

      const filterTodo = todoList.filter((todo: any) => todo.id !== id);
      setTodoList(filterTodo);

      console.log("Successfully deleted a todo!");
    } catch (err) {
      console.log({ err });
    }
  };


  return (
    <>
      <Head>
        <title>Todo App</title>
      </Head>
      <main>
        <CreateTodo onCreateTodo={onCreateTodo} />
        <Todo todoList={todoList} onDeleteTodo={onDeleteTodo} />
      </main>
      
    </>
  );
}
export async function getStaticProps() {
  console.log('static props loaded')
  const todoData: any = await API.graphql({
    query: queries.listTodos,
  });

  return {
    props: {
      todos: todoData.data.listTodos.items,
    }
  };
}