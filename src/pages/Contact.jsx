import { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import shop1 from "../assets/shop1.png";
import shop2 from "../assets/shop2.png";
import { Helmet } from "react-helmet";
import {
  Mail,
  User,
  Send,
  Instagram,
  Github,
  Info,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";

const developerContacts = [
  {
    label: "Email",
    value: "devsahushakti785@gmail.com",
    href: "mailto:devsahushakti785@gmail.com",
    Icon: Mail,
  },
  {
    label: "Instagram",
    value: "@dev_sahu_785",
    href: "https://instagram.com/dev_sahu_785",
    Icon: Instagram,
  },
  {
    label: "GitHub",
    value: "DEVS-shakti",
    href: "https://github.com/DEVS-shakti",
    Icon: Github,
  },
];

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending message...");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("Please fill all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "contact"), {
        ...formData,
        timestamp: new Date(),
        uid: user?.uid || null,
      });
      setStatus("Message sent successfully! — We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Helmet>
        <title>Contact | New Nirmal Musicals</title>
        <meta
          name="description"
          content="Developer contact details for New Nirmal Musicals. Reach out via email, Instagram, or GitHub."
        />
      </Helmet>

      <div className="px-4 py-10">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.6em] text-gray-500">
            developer-only
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900">
            This webstore is crafted by a single developer
          </h1>
          <p className="text-gray-600">
            The product catalogue lives here for public viewing. If you want to
            request a build, help with a patch, or ask about an instrument, drop
            a line through the icons below; those are the only channels that
            reach the developer directly.
          </p>
        </div>

        <section className="mt-10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 rounded-3xl shadow-2xl border border-transparent text-white px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {developerContacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col gap-3 rounded-3xl border border-white/20 bg-white/5 p-5 shadow-lg transition hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                  <contact.Icon className="text-white" size={18} />
                  {contact.label}
                </div>
                <p className="text-2xl font-bold text-white">{contact.value}</p>
                <span className="text-xs text-white/60">
                  Click to open in a new tab
                </span>
              </a>
            ))}
          </div>
          <div className="mt-8 text-xs uppercase tracking-[0.3em] text-blue-200 flex items-center justify-center gap-2">
            <Info size={16} />
            Nobody owns this webstore — contact the developer only
          </div>
        </section>

        <section className="mt-12 max-w-5xl mx-auto grid gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-6">
            <div>
              <p className="text-sm text-gray-500">Message the creator</p>
              <h2 className="text-2xl font-bold text-gray-900">
                Drop a quick brief about your idea
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 pl-10 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 pl-10 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  placeholder="What would you like the developer to know?"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm shadow-sm focus:border-transparent focus:ring-2 focus:ring-slate-500"
                />
              </div>
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
              >
                <Send size={18} /> Send the note
              </button>
              {status && (
                <p
                  className={`text-center text-sm font-medium ${
                    status.includes("successfully")
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
          <div className="bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 p-8 text-white space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles size={24} className="text-amber-300" />
              <h3 className="text-lg font-semibold">Why you reach out here?</h3>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed">
              This storefront is an artful prototype without a storefront team.
              Developer handles every update, question, and pickup note. If you
              need any instrument-related support, use one of the channels above
              so the request lands directly in their inbox.
            </p>
            <div className="rounded-2xl bg-white/10 p-4 border border-white/20">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-slate-200">
                <ClipboardCheck size={14} /> direct line
              </div>
              <p className="mt-2 text-xs text-slate-100">
                Email/Instagram/GitHub are the only official communication paths
                that receive attention. The webstore is not owned by anyone
                else.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;
