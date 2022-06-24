const http = require('http');
const { getBooks, getBook, insertBook, borrowBook, returnBook, addBook } = require('./controllers/booksController')

const server = http.createServer((req, res) => {
    if (req.url === '/api/books/stock' && req.method === 'GET') {
        getBooks(req, res)
    } else if (req.url.match(/\/api\/books\/([0-9]+)/) && req.method === 'GET') {
        const isbn = req.url.split('/')[3]
        getBook(req, res, isbn)
    } else if (req.url === '/api/books/insert' && req.method === 'POST') {
        insertBook(req, res)
    } else if (req.url.match(/\/api\/books\/borrow\/([0-9]+)/) && req.method === 'PUT') { 
        const isbn = req.url.split('/')[4]
        borrowBook(req, res, isbn)  
    } else if (req.url.match(/\/api\/books\/return\/([0-9]+)/) && req.method === 'PUT') { 
        const isbn = req.url.split('/')[4]
        returnBook(req, res, isbn) 
    } else if (req.url.match(/\/api\/books\/add\/([0-9]+)/) && req.method === 'PUT') { 
        const isbn = req.url.split('/')[4]
        addBook(req, res, isbn)    
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Route Not Found'}))   
    }
})

const PORT = 6000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

