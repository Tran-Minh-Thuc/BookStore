import axiosClient from "../api/axiosClient"

class BookService {

    getAll = async () => {
        const url = 'http://localhost:8080/api/book'
        return await axiosClient.get(url);
    }

    newBook = async (book) => {
        const url = 'http://localhost:8080/api/book'
        return await axiosClient.post(url, book);
    }

    deleteBook = async (id) => {
        const url = 'http://localhost:8080/api/book/' + id;
        return await axiosClient.delete(url);
    }

    async getByPagination(filter) {
        const url = 'http://localhost:8080/api/book/pagination';
        return await axiosClient.post(url, filter);
    }

    getBookById = async (id) => {
        const url = 'http://localhost:8080/api/book/' + id;
        return await axiosClient.get(url);
    }

}


export default BookService;