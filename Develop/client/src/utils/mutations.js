import { gql } from '@aapollo/client'

export const LOGIN_USER = gql`
    mutation login(
        $email: String!
        $password: String!
) {
    login(
        email: $$email
        password: $$password
    ) {
        token
        user {
            _id
            username
        }
    }
}
`

export const ADD_USER = gql`
    mutation addUser(
        $username: String!
        $email: String!
        $password: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
        ) {
            token
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    image
                    title
                    description
                }
            }
        }
    }
`

export const REMOVE_BOOK = gql`
    mutation removeBook($bookid: ID!) {
        removeBook(bookId: $bookId) {
            _id
            username
            email
        }
    }
`