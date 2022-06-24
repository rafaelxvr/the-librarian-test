const my_library = require('./models/booksModel')


// const lookup = my_library.lookup('9780143111597')
// console.log(lookup)

// const stock = my_library.stock()
// console.log(stock)

const add = my_library.add('9780143111597', 1)
console.log(add)

//  const borrow = my_library.borrow('9780143111597')
//  console.log(borrow)

// const refund = my_library.refund('9780143111597')
// console.log(refund)
