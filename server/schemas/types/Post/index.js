export default `
type Post {
    _id: ID!
    title: String!
    main_image: Media
    content: String!
    author: String
    postType : String
    slug: String
    createdAt: String!
}

type Query {
    post(_id: ID): Post
    post(slug : String) : Post
    posts: [Post]
}

input CreatePostInput {
    title: String!
    main_image: ID
    content: String!
    author: String
    postType: String
    slug: String
}

input UpdatePostInput {
    title: String!
    main_image: ID
    content: String!
    author: String
    postType: String
    slug: String
  }

type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(_id: ID!, input: UpdatePostInput!): Post!
    deletePost(_id: ID!): Post!
}
`