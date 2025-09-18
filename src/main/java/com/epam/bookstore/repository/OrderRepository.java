package com.epam.bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.epam.bookstore.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> { }
