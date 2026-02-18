import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock submission - in production connect to your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Contact form submitted:', { name, email, message });
    setSubmitted(true);
    setLoading(false);

    // Clear form
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-full max-w-lg shadow-lg space-y-6"
      >
        <h2 className="text-3xl font-bold text-center">Contact Us</h2>

        {submitted && (
          <p className="text-green-500 text-center bg-green-500/10 p-3 rounded">
            Message sent successfully! We'll get back to you soon.
          </p>
        )}

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
          className="w-full bg-red-600 hover:bg-red-700 py-3 rounded font-bold disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
