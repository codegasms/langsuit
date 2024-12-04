'use client';

import { Button } from "@/components/ui/button";
import { useState } from "react";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    feedback: "",
    rating: "",
    languagelearned : "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    rating: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    let errorMsg = "";

    switch (name) {
        case "name":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errorMsg = "Name can only contain letters and spaces.";
        }
        break;
        case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMsg = "Invalid email format.";
        }
        break;
        case "phone":
        if (!/^\d{10}$/.test(value)) {
          if (/\D/.test(value)) {
            errorMsg = "Invalid characters for a mobile number.";
          } else {
            errorMsg = "Phone number must be exactly 10 digits.";
          }
        }
        break;
        case "rating":
        if (!/^[1-5]$/.test(value)) {
          errorMsg = "Rating must be between 1 and 5.";
          }
          break;
        case "languagelearned":
          if (!/^[a-zA-Z\s]+$/.test(value)) {
              errorMsg = "It can only contain letters and spaces.";
          }
          break;      
        default:
          break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (hasErrors) {
      alert("Please fix errors before submitting.");
      return;
    }
  
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          feedback: "",
          rating: "",
          languagelearned: "",
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-full max-w-6xl bg-slate-50 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.name ? "border-red-500" : ""}`}
            id="name"
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? "border-red-500" : ""}`}
            id="email"
            name="email"
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.phone ? "border-red-500" : ""}`}
            id="phone"
            name="phone"
            type="tel"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="service">
            Service
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="service"
            name="service"
            type="text"
            placeholder="Service Availed"
            value={formData.service}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
            Feedback
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="feedback"
            name="feedback"
            placeholder="Your Feedback"
            value={formData.feedback}
            onChange={handleChange}
            rows={6}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
            Rating (1-5)
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.rating ? "border-red-500" : ""}`}
            id="rating"
            name="rating"
            type="number"
            placeholder="Rate us"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
          />
          {errors.rating && <p className="text-red-500 text-xs italic mt-1">{errors.rating}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="languagelearned">
            Language(s) learned
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="languagelearned"
            name="languagelearned"
            type="text"
            placeholder="language(specify with space)"
            value={formData.languagelearned}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Button variant="default" type="submit">
            Submit Feedback
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
