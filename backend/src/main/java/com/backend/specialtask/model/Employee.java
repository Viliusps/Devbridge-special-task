package com.backend.specialtask.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {

    @Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long Id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "phone")
    private String phone;

    public Employee() {

	}

	public Employee(String name, String email, String phone) {
		this.name = name;
		this.email = email;
		this.phone = phone;
	}

	public long getId() {
		return Id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "Empoyee [id=" + Id + ", name=" + name + ", email=" + email + ", phone=" + phone + "]";
	}

    
}
