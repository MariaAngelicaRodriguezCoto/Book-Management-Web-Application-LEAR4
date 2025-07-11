# Book Management Web Application

## Description
A web application developed in ASP.NET Core that enables book library management. This application implements CRUD operations (Create, Read, Update, Delete) for book management and uses modern development best practices in .NET.

## Main Features
- Complete book management (add, view, edit, delete)
- Intuitive user interface developed with ASP.NET MVC
- Relational database using Entity Framework Core
- Clean architecture with dependency injection
- Efficient queries using LINQ

## Technologies Used
- ASP.NET Core (.NET 6)
- Entity Framework Core
- SQL Server/SQLite (Database)
- LINQ for queries
- MVC Pattern
- .NET Dependency Injection system

## Tutorial Influences on Development

### MVC Architecture and Project Structure
*Based on: "Step-by-step ASP.NET MVC Tutorial for Beginners"*
- Implementation of Model-View-Controller pattern
- Folder and file organization
- Use of Razor Views
- Routing and controller handling

### Data Access and ORM
*Based on: "Entity Framework Core Tutorial" and "What is ORM?"*
- Entity Framework Core configuration
- Object-to-database mapping
- Repository pattern implementation
- Database management using Code First approach

### Database Management
*Based on: "Entity Framework Migrations Explained"*
- Migration system for database version control
- Safe schema updates
- Data integrity maintenance

### Queries and Data Manipulation
*Based on: "Advanced C# – LINQ Tutorial"*
- Use of LINQ for efficient queries
- Data filtering and sorting
- Data projections and transformations

### Architecture and Best Practices
*Based on: "Dependency Injection in .NET Core"*
- Implementation of dependency injection
- Service lifecycle management
- Decoupled and maintainable code

### Database Decisions
*Based on: "Which Is Better? SQL vs NoSQL"*
- Choice of SQL database to ensure data integrity
- Relational structure to maintain entity relationships

## Project Structure
BookManagement/
├── Controllers/ # MVC Controllers
├── Models/ # Data Models
├── Views/ # Razor Views
├── Services/ # Application Services
├── Data/ # EF Core Context and Migrations
└── ViewModels/ # View-specific Models
