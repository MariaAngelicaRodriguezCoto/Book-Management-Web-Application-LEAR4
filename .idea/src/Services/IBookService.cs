namespace DefaultNamespace;

public class BookService
{
    Task<IEnumerable<Book>> GetAllBooksAsync();
    Task<Book> GetBookByIdAsync(int id);
    Task<Book> CreateBookAsync(Book book);
    Task UpdateBookAsync(Book book);
    Task DeleteBookAsync(int id);
    Task<IEnumerable<Book>> SearchBooksAsync(string searchTerm);

}