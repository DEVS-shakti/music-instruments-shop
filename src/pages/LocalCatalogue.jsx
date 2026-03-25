import React, { useState } from "react";
import { instruments } from "../Data/Instrument";
import { Dialog } from "@headlessui/react";
import { Mail, Instagram, Github, Info } from "lucide-react";

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

const LocalCatalogue = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {instruments.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-md p-4 bg-white flex flex-col transition hover:shadow-xl"
          >
            {item.image && (
              <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 overflow-hidden rounded mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}

            <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600 text-sm mt-1 mb-2">{item.description}</p>
            <p className="text-lg font-bold text-green-700">₹{item.price}</p>
            <button
              onClick={() => openDialog(item)}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              Buy It
            </button>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onClose={closeDialog} className="relative z-50">
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="max-w-sm w-full rounded-lg bg-white p-6 shadow-xl overflow-y-auto max-h-[90vh]">
            <Dialog.Title className="text-lg font-bold mb-2">
              Contact the Developer
            </Dialog.Title>
            <p className="mb-4 text-gray-700">
              Interested in <span className="font-semibold">{selectedItem?.name}</span>?
              <br />
              Nobody owns this webstore — reach out directly to the developer
              using one of the channels below when you are ready to buy.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {developerContacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:border-blue-500 transition-colors"
                >
                  <contact.Icon className="text-blue-600" size={20} />
                  <span className="text-sm text-gray-700">
                    {contact.label}: <strong>{contact.value}</strong>
                  </span>
                </a>
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
              <Info size={14} />
              These are the only developer channels for inquiries and purchases.
            </p>

            <button
              onClick={closeDialog}
              className="mt-6 w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default LocalCatalogue;
