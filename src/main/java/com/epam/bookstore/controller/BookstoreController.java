package com.epam.bookstore.controller;

import com.epam.bookstore.repository.OrderRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.epam.bookstore.model.Book;
import com.epam.bookstore.model.Order;
import com.epam.bookstore.service.BookService;

import java.util.*;

    @Controller
    public class BookstoreController {

        private final BookService bookService;
        private final OrderRepository orderRepository;
        private List<Book> cart = new ArrayList<>();

        public BookstoreController(BookService bookService, OrderRepository orderRepository) {
            this.bookService = bookService;
            this.orderRepository = orderRepository;
        }

        @GetMapping("/")
        public String home(Model model) {
            model.addAttribute("books", bookService.getBooks());
            return "index";
        }

        @PostMapping("/add-to-cart")
        public String addToCart(@RequestParam Long bookId) {
            bookService.getBooks().stream()
                    .filter(b -> b.getId().equals(bookId))
                    .findFirst()
                    .ifPresent(cart::add);
            return "redirect:/cart";
        }

        @GetMapping("/cart")
        public String cart(Model model) {
            model.addAttribute("cart", cart);
            return "cart";
        }

        @GetMapping("/checkout")
        public String checkoutForm(Model model) {
            model.addAttribute("order", new Order());
            return "checkout";
        }

        @PostMapping("/checkout")
        public String checkout(@ModelAttribute Order order, Model model) {
            List<String> bookTitles = cart.stream().map(Book::getTitle).toList();
            order.setBooks(bookTitles);
            orderRepository.save(order);
            cart.clear();
            model.addAttribute("orderId", order.getOrderId());
            return "success";
        }
    }

