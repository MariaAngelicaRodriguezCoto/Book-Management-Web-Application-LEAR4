using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using BookManagement.Models;
using BookManagement.Services;

namespace BookManagement.Controllers;

[Authorize]
public class BooksController : Controller
{
    private readonly IBookService _bookService;
    private readonly UserManager<ApplicationUser> _userManager;

    public BooksController(IBookService bookService, UserManager<ApplicationUser> userManager)
    {
        _bookService = bookService;
        _userManager = userManager;
    }

    public async Task<IActionResult> Index(string searchTerm)
    {
        var user = await _userManager.GetUserAsync(User);
        ViewData["UserFullName"] = $"{user?.FirstName} {user?.LastName}".Trim();
        
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
            try
            {
                await _bookService.UpdateBookAsync(book);
                ViewData["Success"] = "Book updated successfully!";
                return View(book);
            }
            catch (Exception)
            {
                ModelState.AddModelError("", "An error occurred while updating the book.");
            }
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