import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
	tagTypes: ['Todos'],
	endpoints: build => ({
		getTodos: build.query({
			query: () => '/todos',
			transformResponse: res => res.sort((a, b) => b.id - a.id),
			providesTags: ['Todos'],
		}),
		addTodo: build.mutation({
			query: todo => ({
				url: '/todos',
				method: 'POST',
				body: todo,
			}),
			invalidatesTags: ['Todos'],
		}),
		updateTodo: build.mutation({
			query: todo => ({
				url: `/todos/${todo.id}`,
				method: 'PATCH',
				body: todo,
			}),
			invalidatesTags: ['Todos'],
		}),
		deleteTodo: build.mutation({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: ['Todos'],
		}),
	}),
});

export const {
	useGetTodosQuery,
	useAddTodoMutation,
	useUpdateTodoMutation,
	useDeleteTodoMutation,
} = apiSlice;
