import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Message = {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
};

type MessagePayload = {
    content: string;
};

type UpdateMessagePayload = {
    id: number;
    content: string;
};

export const messagesApi = createApi({
    reducerPath: "messagesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "http://localhost:4000/api"
    }),
    tagTypes: ["Messages"],
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => "/messages",
            providesTags: ["Messages"]
        }),
        addMessage: builder.mutation<Message, MessagePayload>({
            query: (body) => ({
                url: "/messages",
                method: "POST",
                body
            }),
            invalidatesTags: ["Messages"]
        }),
        updateMessage: builder.mutation<Message, UpdateMessagePayload>({
            query: ({ id, content }) => ({
                url: `/messages/${id}`,
                method: "PUT",
                body: { content }
            }),
            invalidatesTags: ["Messages"]
        }),
        deleteMessage: builder.mutation<void, number>({
            query: (id) => ({
                url: `/messages/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Messages"]
        })
    })
});

export const {
    useGetMessagesQuery,
    useAddMessageMutation,
    useUpdateMessageMutation,
    useDeleteMessageMutation
} = messagesApi;
