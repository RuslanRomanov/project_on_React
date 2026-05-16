import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query API. Используется в ЛР 9 для рефакторинга на useGetFeedbackQuery.
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', 'Bearer ' + token);
            }
            return headers;
        },
    }),
    tagTypes: ['Feedback', 'Users'],
    endpoints: (builder) => ({
        getFeedback: builder.query({
            query: () => '/feedback',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((f) => ({ type: 'Feedback', id: f.id })),
                          { type: 'Feedback', id: 'LIST' },
                      ]
                    : [{ type: 'Feedback', id: 'LIST' }],
        }),
        addFeedback: builder.mutation({
            query: (body) => ({ url: '/feedback', method: 'POST', body }),
            invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
        }),
        deleteFeedback: builder.mutation({
            query: (id) => ({ url: '/feedback/' + id, method: 'DELETE' }),
            invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
        }),
        blockFeedback: builder.mutation({
            query: ({ id, isBlocked }) => ({
                url: '/feedback/' + id + '/block',
                method: 'PUT',
                body: { isBlocked },
            }),
            invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
        }),
        getUsers: builder.query({
            query: () => '/users',
            providesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        blockUser: builder.mutation({
            query: ({ id, isBlocked }) => ({
                url: '/users/' + id + '/block',
                method: 'PUT',
                body: { isBlocked },
            }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({ url: '/users/' + id, method: 'DELETE' }),
            invalidatesTags: [{ type: 'Users', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetFeedbackQuery,
    useAddFeedbackMutation,
    useDeleteFeedbackMutation,
    useBlockFeedbackMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useDeleteUserMutation,
} = api;
