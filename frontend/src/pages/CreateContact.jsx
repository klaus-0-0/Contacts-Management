import { useState } from "react";
import wall from "../assets/w7.jpg";
import config from "../config";
import axios from "axios";

function CreateContact() {
  const [activeView, setActiveView] = useState("home");
  const [contacts, setContacts] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // CREATE
  const handleContactSubmition = async () => {
    if (!name || !phone) {
      alert("Name and Phone are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${config.apiurl}/upload`, {
        name,
        email,
        phone,
        message,
      });

      alert("Contact saved");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      alert("Error saving contact");
    } finally {
      setLoading(false);
    }
  };

  // FETCH
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${config.apiurl}/contacts`);
      setContacts(res.data);
    } catch (error) {
      alert("Failed to fetch contacts");
    }
  };

  // DELETE
  const deleteContact = async (id) => {
    if (!window.confirm("Delete this contact?")) return;

    try {
      await axios.delete(`${config.apiurl}/contacts/${id}`);
      setContacts(contacts.filter((c) => c._id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* NAVBAR */}
      <nav className="p-6 bg-gray-700 flex">
        <div className="flex-1"></div>
        <div className="flex gap-3">
          <button className="text-white">Signup</button>
          <button className="text-white">Logout</button>
        </div>
      </nav>

      {/* BODY */}

      {/* SIDEBAR */}
      <aside className="p-4 flex gap-4 items-center flex-wrap">

        <button onClick={() => setActiveView("create")} className="hover:bg-emerald-600 p-2 rounded-sm cursor-pointer">
          Create Contact
        </button>

        <button
          onClick={() => {
            setActiveView("view");
            fetchContacts();
          }}
          className="hover:bg-emerald-600 p-2 rounded-sm cursor-pointer"
        >
          View Contacts
        </button>

        <button className="hover:bg-emerald-600 p-2 rounded-sm cursor-pointer">
          help
        </button>

        <button className="hover:bg-emerald-600 p-2 rounded-sm cursor-pointer">
          back
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1">

        {/* HOME */}
        {/* {activeView === "home" && (
            <img src={wall} className="w-full h-127" />
          )} */}

        {/* CREATE */}
        {/* CREATE CONTACT FORM - Well positioned */}
        {activeView === "create" && (
          <div className="max-w-lg mx-auto mt-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Contact</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter name"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />

                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter message"
                />

                <button
                  onClick={handleContactSubmition}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Contact"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW */}
        {activeView === "view" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Contacts</h2>

            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id}>
                    <td className="p-2 border">{c.name}</td>
                    <td className="p-2 border">{c.email}</td>
                    <td className="p-2 border">{c.phone}</td>
                    <td className="p-2 border text-center">
                      <button
                        onClick={() => deleteContact(c._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default CreateContact;
