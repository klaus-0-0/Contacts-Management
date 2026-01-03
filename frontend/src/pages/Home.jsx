import { useState } from "react";
import wall from "../assets/w8.jpg"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config";
import create from "../assets/accountant.png"
import search from "../assets/loupe.png"
import help from "../assets/help.png"
import setting from "../assets/settings.png";
import Signout from "../assets/exit.png";
import signup from "../assets/signup.png";
import logo from "../assets/profile.png";

function Home() {
    const navigate = useNavigate();

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
        } catch (error) {
            alert("Error saving contact");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // FETCH
    const fetchContacts = async () => {
        try {
            const res = await axios.get(`${config.apiurl}/contacts`);
            setContacts(res.data);
            console.log(res);

        } catch (error) {
            console.error(error);
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
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-sky-100">
            <nav className="sticky top-0 z-50 p-3 bg-sky-300 flex items-center shadow-xl gap-2">
                <img src={logo} className="w-14 h-14" />
                <p className="text-4xl font-bold text-gray-800">Contact</p>
                <div className="flex-1"></div>
                <div className="flex gap-3 justify-end">
                    {/* <button className="flex gap-1 cursor-pointer font-semibold text-black" onClick={() => navigate("/CreateContact")}>CreateContact</button> */}
                    <button className="flex gap-1 cursor-pointer font-semibold text-black" onClick={() => navigate("/Signup")}><img src={signup} className="h-6 w-6"></img>Signup</button>
                    <button className="flex gap-1 cursor-pointer font-semibold text-black"><img src={Signout} className="h-6 w-6"></img>SignOut</button>
                </div>
            </nav>

            {/* BODY */}
            {/* SIDEBAR */}
            <aside className="p-4 flex gap-4 items-center flex-wrap">

                <button onClick={() => setActiveView("create")} className="flex gap-2 hover:bg-sky-500 p-2 rounded-sm cursor-pointer">
                    <img src={create} className="h-6 w-6"></img>
                    Create Contact
                </button>

                <button
                    onClick={() => {
                        setActiveView("view");
                        fetchContacts();
                    }}
                    className="flex gap-2 hover:bg-sky-500 p-2 rounded-sm cursor-pointer"
                >
                    <img src={search} className="h-6 w-6"></img>
                    View Contacts
                </button>

                <button className="flex gap-2 hover:bg-sky-500 p-2 rounded-sm cursor-pointer">
                    <img src={help} className="h-7 w-7"></img>
                    help
                </button>

                <button className="flex gap-2 hover:bg-sky-500 p-2 rounded-sm cursor-pointer">
                    <img src={setting} className="h-7 w-7"></img>
                    setting
                </button>
            </aside>

            {/* MAIN */}
            <main className="flex-1">

                {/* HOME */}
                {/* {activeView === "home" && (
            <img src={wall} className="w-full h-127" />
          )} */}

                {/* CREATE */}
                {activeView === "create" && (
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-md bg-gray-700 p-8 rounded-lg shadow-2xl">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                Create New Contact
                            </h2>

                            <div className="space-y-4">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none text-white"
                                    placeholder="Enter name"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none text-white"
                                    placeholder="Enter email"
                                />

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full px-4 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none text-white"
                                    placeholder="Enter phone number"
                                />

                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="3"
                                    className="w-full px-4 py-2 rounded focus:ring-2 focus:ring-sky-500 outline-none text-white border-b-2"
                                    placeholder="Enter message"
                                />

                                <button
                                    onClick={handleContactSubmition}
                                    disabled={loading}
                                    className="w-full bg-sky-600 text-white py-3 rounded font-semibold hover:bg-sky-700 disabled:opacity-50"
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
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="p-2 border">Name</th>
                                    <th className="p-2 border">Email</th>
                                    <th className="p-2 border">Phone</th>
                                    <th className="p-2 border">message</th>
                                    <th className="p-2 border">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contacts.map((val) => (
                                    <tr key={val._id}>
                                        <td className="p-2 border">{val.name}</td>
                                        <td className="p-2 border">{val.email}</td>
                                        <td className="p-2 border">{val.phone}</td>
                                        <td className="p-2 border">{val.message}</td>
                                        <td className="p-2 border text-center">
                                            <button
                                                onClick={() => deleteContact(val._id)}
                                                className="text-red-600 hover:underline cursor-pointer"
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
    )
}

export default Home;