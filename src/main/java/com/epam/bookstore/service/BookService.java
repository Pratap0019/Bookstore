package com.epam.bookstore.service;

import org.springframework.stereotype.Service;
import com.epam.bookstore.model.Book;
import java.util.Arrays;
import java.util.List;

@Service
public class BookService {
    public List<Book> getBooks() {
        return Arrays.asList(
                new Book(1L, "EPAM ELITEA HANDBOOK", "EPAM", 299.0),
                new Book(2L, "EDWARD JONES WORKING MANUAL", "EDJO", 199.0)
        );
    }
}
