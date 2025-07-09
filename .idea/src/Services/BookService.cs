using Microsoft.EntityFrameworkCore;
using BookManagement.Data;
using BookManagement.Models;

namespace BookManagement.Services;

public class BookService : IBookService
{
    private readonly ApplicationDbContext _context;

    public BookService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Book>> GetAllBooksAsync()
    {
        return await _context.Books
            .OrderByDescending(b => b.PublicationDate)
            .ToListAsync();
    }

    public async Task<Book?> GetBookByIdAsync(int id)
    {
        return await _context.Books.FindAsync(id);
    }

    public async Task<Book> CreateBookAsync(Book book)
    {
        _context.Books.Add(book);
        await _context.SaveChangesAsync();
        return book;
    }

    public async Task UpdateBookAsync(Book book)
    {
        _context.Entry(book).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteBookAsync(int id)
    {
        var book = await GetBookByIdAsync(id);
        if (book != null)
        {
            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
        }
    }

    public async Task<IEnumerable<Book>> SearchBooksAsync(string searchTerm)
    {
        if (string.IsNullOrWhiteSpace(searchTerm))
            return await GetAllBooksAsync();

        searchTerm = searchTerm.ToLower();
        return await _context.Books
            .Where(b => b.Title.ToLower().Contains(searchTerm) || 
                       b.Author.ToLower().Contains(searchTerm) || 
                       b.Genre.ToLower().Contains(searchTerm))
            .OrderByDescending(b => b.PublicationDate)
            .ToListAsync();
    }
}