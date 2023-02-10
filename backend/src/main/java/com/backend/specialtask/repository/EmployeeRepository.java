package com.backend.specialtask.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.specialtask.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
  List<Employee> findByEmail(String email);

  List<Employee> findByNameContaining(String name);
}

