const Book = require('../models/booksModel')
const { getPostData } = require('../utils')
// @desc Gets All Books in stock
// @route GET /api/books
async function getBooks(req, res) {
    try {
        const books = await Book.stock()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(books))
    } catch (error) {
        console.log(error)
    }
}

// @desc Gets Single Book
// @route GET /api/books/:isbn
async function getBook(req, res, isbn) {
    try {
        const book = await Book.lookup(isbn)

        if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Book Not Found'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(book))
        }
    } catch (error) {
        console.log(error)
    }
}

// @desc Add Books in stock
// @route POST /api/books
async function insertBook(req, res) {
    try {
       const body = await getPostData(req)

       const { isbn, title, author, publication_date, copies, borrowed  } = JSON.parse(body)

       const book = {
        isbn, 
        title, 
        author, 
        publication_date, 
        copies, 
        borrowed 
    }

    const newBook = await Book.insert(book)

    res.writeHead(201, { 'Content-Type' : 'application/json' })
    return res.end(JSON.stringify(newBook)) 

    } catch (error) {
        console.log(error)
    }
}

// @desc Update Books in stock
// @route PUT /api/books
async function updateBook(req, res, isbn) {
    try {
       const book = await Book.lookup(isbn)

       if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Book Not Found'}))
       } else {
        const body = await getPostData(req)

        const { isbn, title, author, publication_date, copies, borrowed  } = JSON.parse(body)

        const bookData = {
            isbn : isbn || book.isbn, 
            title : title || book.title, 
            author : author || book.title, 
            publication_date :  publication_date || book.publication_date,
            copies : copies || book.copies, 
        }

        const updBook = await Book.update(isbn, bookData)

        res.writeHead(200, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updBook)) 
       }

    } catch (error) {
        console.log(error)
    }
}

// @desc Add Book in stock
// @route PUT /api/books
async function addBook(req, res, isbn) {
    try {
       const book = await Book.lookup(isbn)

       if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Book Not Found'}))
       } else {
        const body = await getPostData(req)

        const { copies, available } = JSON.parse(body)

        const bookData = {
            copies : copies || book.copies,
            available : available || book.available
        }
        console.log(bookData)
        const updBook = await Book.add(isbn, bookData)
        
        res.writeHead(200, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updBook)) 
       }

    } catch (error) {
        console.log(error)
    }
}

// @desc Borrow Books in stock
// @route PUT /api/books
async function borrowBook(req, res, isbn) {
    try {
       const book = await Book.lookup(isbn)

       if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Book Not Found'}))
       } else {
        const body = await getPostData(req)

        const { borrowed } = JSON.parse(body)

        const bookData = {
            borrowed : borrowed || book.borrowed
        }

        const updBook = await Book.borrow(isbn, bookData)

        res.writeHead(200, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updBook)) 
       }

    } catch (error) {
        console.log(error)
    }
}

// @desc Return Books in stock
// @route PUT /api/books
async function returnBook(req, res, isbn) {
    try {
       const book = await Book.lookup(isbn)

       if (!book) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message : 'Book Not Found'}))
       } else {
        const body = await getPostData(req)

        const { available } = JSON.parse(body)

        const bookData = {
            available : available || book.available
        }

        const updBook = await Book.refund(isbn, bookData)

        res.writeHead(200, { 'Content-Type' : 'application/json' })
        return res.end(JSON.stringify(updBook)) 
       }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBooks,
    getBook,
    insertBook,
    updateBook,
    borrowBook,
    returnBook,
    addBook
}