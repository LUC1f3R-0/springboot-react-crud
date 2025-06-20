package com.example.demo.Controller;


import com.example.demo.Model.Customer;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Responses.CustomerResponse;
import com.example.demo.Responses.ReturnResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin({"http://localhost:5173/"})
@RequestMapping({"/api/protected"})
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping({"/test"})
    private ReturnResponse testMethod() {
        return new ReturnResponse(true, "test run success");
    }

    @PostMapping({"/add"})
    private ReturnResponse addUser(@RequestBody Customer customer) {
        userRepository.save(customer);
        return new ReturnResponse(true, "customer added success");
    }

    @GetMapping("/customers")
    public List<CustomerResponse> showCustomers() {
        return userRepository.findAll().stream()
                .map(customer -> new CustomerResponse(
                        customer.getId(),
                        customer.getProduct_name(),
                        customer.getDescription(),
                        customer.getPrice(),
                        customer.getQuantity(),
                        customer.getCategory(),
                        customer.getCreated_at(),
                        customer.getUpdated_at()
                ))
                .collect(Collectors.toList());
    }

    @DeleteMapping("/user/{id}")
    public ReturnResponse deleteCustomer(@PathVariable Long id) {
        userRepository.deleteById(id);
        return new ReturnResponse(true, "deleted successfully");
    }
}