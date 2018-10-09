# todoGraphql
query {
whatsForDinner
}

-- run this query
You can try it our and play around the API using GraphQL playground. For example, to delete the todo with ID 0:
mutation {
deleteTodo(id: "0") {
id
content
}
}
mutation {
createTodo(content: "Take a little nap 🛌", isCompleted: false) {
content
isCompleted
}
}
