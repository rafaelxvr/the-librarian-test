const books = require('../data/books')
const { writeDataToFile } = require('../utils')

function stock() {
    return new Promise((resolve, reject) => {
        resolve(books)
    })
}

function lookup(isbn) {
    return new Promise((resolve, reject) => {
        const book = books.find((p) => p.isbn === isbn)
        resolve(book)
    })
}

function insert(book) {
    return new Promise((resolve, reject) => {
        const newBook = {...book}
        books.push(newBook)
        writeDataToFile('./data/books.json', books)
        resolve(newProduct)
    })
}

function update(isbn, book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex((p) => p.isbn === isbn)
        books[index] = {isbn, ...book}
        writeDataToFile('./data/books.json', books)
        resolve(books[index])
    })
}

function borrow(isbn, book) {
    return new Promise((resolve, reject) => {
    const index = books.findIndex((p) => p.isbn === isbn)
    books[index].borrowed = books[index].borrowed + 1
    books[index].available = books[index].available - 1
    books[index].isbn = isbn
    writeDataToFile('./data/books.json', books)
    resolve(books[index])
    })  
}

function refund(isbn, book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex((p) => p.isbn === isbn)
        books[index].borrowed = books[index].borrowed - 1
        books[index].available = books[index].available + 1
        books[index].isbn = isbn
        writeDataToFile('./data/books.json', books)
        resolve(books[index])
    })  
}

function add(isbn, book) {
    return new Promise((resolve, reject) => {
        const index = books.findIndex((p) => p.isbn === isbn)
        books[index].copies = books[index].copies + book
        books[index].available = books[index].available + book
        books[index].isbn = isbn
        writeDataToFile('./data/books.json', books)
        resolve(books[index])
    })
}


module.exports = {
    stock,
    lookup,
    insert,
    update,
    borrow,
    refund,
    add
}