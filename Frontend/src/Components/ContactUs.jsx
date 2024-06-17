import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto my-16 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
              rows="4"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Send Message
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-700">
            <strong>Phone:</strong> +919509152990
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:contactbhagatsachin@gmail.com"
              className="text-green-500 hover:underline"
            >
              contactbhagatsachin@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
