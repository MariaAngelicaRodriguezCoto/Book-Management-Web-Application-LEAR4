using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BookManagement.Models;
using BookManagement.Services;

namespace BookManagement.Controllers;

[Authorize]
public class BooksController : Controller
{
    private readonly IBookService _bookService;

    public BooksController(IBookService bookService)
    {
        _bookService = bookService;
    }

    public async Task<IActionResult> Index(string searchTerm)
    {
        var books = string.IsNullOrEmpty(searchTerm) 
            ? await _bookService.GetAllBooksAsync()
            : await _bookService.SearchBooksAsync(searchTerm);
        return View(books);
    }

    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Book book)
    {
        if (ModelState.IsValid)
        {
            await _bookService.CreateBookAsync(book);
            TempData["Success"] = "Book created successfully!";
            return RedirectToAction(nameof(Index));
        }
        return View(book);
    }

    public async Task<IActionResult> Edit(int id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return View(book);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int id, Book book)
    {
        if (id != book.Id)
        {
            return NotFound();
        }

        if (ModelState.IsValid)
        {
            await _bookService.UpdateBookAsync(book);
            TempData["Success"] = "Book updated successfully!";
            return RedirectToAction(nameof(Index));
        }
        return View(book);
    }

    public async Task<IActionResult> Details(int id)
    {
        var book = await _bookService.GetBookByIdAsync(id);
        if (book == null)
        {
            return NotFound();
        }
        return View(book);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Delete(int id)
    {
        await _bookService.DeleteBookAsync(id);
        TempData["Success"] = "Book deleted successfully!";
        return RedirectToAction(nameof(Index));
    }
}