import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle, BookOpen, ShoppingBag } from "lucide-react";

import AddBookTab from "./AddBookTab";
import MyBooksTab from "./MyBooksTab";
import LibrarianOrdersTab from "./LibrarianOrdersTab";

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState("addBook");

  return (
    <div className="max-w-7xl mx-auto">
      {/* Navigation */}
      <div className="tabs tabs-boxed bg-base-100 mb-6 p-1 shadow-sm w-fit">
        <button
          onClick={() => setActiveTab("addBook")}
          className={`tab gap-2 ${activeTab === "addBook" ? "tab-active" : ""}`}
        >
          <PlusCircle size={16} /> Add Book
        </button>

        <button
          onClick={() => setActiveTab("myBooks")}
          className={`tab gap-2 ${activeTab === "myBooks" ? "tab-active" : ""}`}
        >
          <BookOpen size={16} /> My Books
        </button>

        <button
          onClick={() => setActiveTab("orders")}
          className={`tab gap-2 ${activeTab === "orders" ? "tab-active" : ""}`}
        >
          <ShoppingBag size={16} /> Orders
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "addBook" && <AddBookTab />}
          {activeTab === "myBooks" && <MyBooksTab />}
          {activeTab === "orders" && <LibrarianOrdersTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LibrarianDashboard;
