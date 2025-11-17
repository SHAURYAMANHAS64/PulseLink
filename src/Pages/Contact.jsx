import { useState } from "react";
import { gql, useMutation } from "@apollo/client";


// GraphQL mutation
const CREATE_CONTACT = gql`
  mutation CreateContact($name: String!, $email: String!, $message: String!) {
    createContact(name: $name, email: $email, message: $message) {
      id
      name
    }
  }
`;

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [createContact, { loading, error }] = useMutation(CREATE_CONTACT);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createContact({
        variables: { name, email, message },
      });

      alert("Message Sent Successfully!");

      // Clear form
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>

        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
          placeholder="Your Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          className="w-full p-3 rounded bg-gray-800 border border-gray-700 h-32"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {error && (
          <p className="text-red-500 text-center mt-3">
            Something went wrong!
          </p>
        )}
      </form>
    </div>
  );
}
