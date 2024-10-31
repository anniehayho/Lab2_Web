// Book class
class Book {
    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.availableCopies = availableCopies;
    }

    borrowBook() {
        if (this.availableCopies <= 0) {
            throw new Error(`'${this.title}' is currently unavailable.`);
        }
        this.availableCopies -= 1;
    }

    returnBook() {
        this.availableCopies += 1;
    }
}

// Abstract User class
class User {
    constructor(name, userType) {
        if (this.constructor === User) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.name = name;
        this.userType = userType;
        this.borrowedBooks = [];
    }

    borrow(book) {
        throw new Error("Abstract method 'borrow' must be implemented.");
    }

    returnBook(book) {
        const bookIndex = this.borrowedBooks.indexOf(book);
        if (bookIndex === -1) {
            throw new Error(`${this.name} did not borrow '${book.title}'.`);
        }
        book.returnBook();
        this.borrowedBooks.splice(bookIndex, 1);
    }
}

// Student class
class Student extends User {
    constructor(name) {
        super(name, "Student");
        this.borrowLimit = 3;
    }

    borrow(book) {
        if (this.borrowedBooks.length >= this.borrowLimit) {
            throw new Error(`${this.name} has reached the borrowing limit of ${this.borrowLimit} books.`);
        }
        book.borrowBook();
        this.borrowedBooks.push(book);
    }
}

// Teacher class
class Teacher extends User {
    constructor(name) {
        super(name, "Teacher");
        this.borrowLimit = 5;
    }

    borrow(book) {
        if (this.borrowedBooks.length >= this.borrowLimit) {
            throw new Error(`${this.name} has reached the borrowing limit of ${this.borrowLimit} books.`);
        }
        book.borrowBook();
        this.borrowedBooks.push(book);
    }
}

// Library class
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    addUser(user) {
        this.users.push(user);
    }

    borrowBook(user, book) {
        if (!this.books.includes(book)) {
            throw new Error(`'${book.title}' is not available in the library.`);
        }
        user.borrow(book);
    }

    returnBook(user, book) {
        user.returnBook(book);
    }

    listAvailableBooks() {
        console.log("Available Books:");
        this.books.forEach((book) => {
            if (book.availableCopies > 0) {
                console.log(`Title: ${book.title}, Author: ${book.author}, ISBN: ${book.isbn}, Available Copies: ${book.availableCopies}`);
            }
        });
    }
}

// Example Usage
try {
    // Creating books
    const book1 = new Book("1984", "JohnSmith", "123456789", 3);
    const book2 = new Book("ABC", "Harley", "987654321", 2);

    // Creating users
    const student = new Student("Alice");
    const teacher = new Teacher("Mr. Smith");

    // Creating library and adding books/users
    const library = new Library();
    library.addBook(book1);
    library.addBook(book2);
    library.addUser(student);
    library.addUser(teacher);

    // Borrowing books
    library.borrowBook(student, book1);
    library.borrowBook(teacher, book2);

    // List available books after borrowing
    console.log("\nAvailable Books after borrowing:");
    library.listAvailableBooks();

    // Returning books
    library.returnBook(student, book1);
    library.returnBook(teacher, book2);

    // List available books after returning
    console.log("\nAvailable Books after returning:");
    library.listAvailableBooks();
} catch (error) {
    console.error(error.message);
}
