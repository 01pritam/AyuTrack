import { useState, useRef } from "react";
import Footer from "../../components/Billings/Footer";
import Notes from "../../components/Billings/Notes";
import Table from "../../components/Billings/Table";
import Header from "../../components/Billings/Header";
import Dates from "../../components/Billings/Dates";
import MainDetails from "../../components/Billings/MainDetails";
import ClientDetails from "../../components/Billings/ClientDetails";
import TableForm from "../../components/Billings/TableForm";
import ReactToPrint from "react-to-print";

function Billings() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [website, setWebsite] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  return (
    <>
      <div className="mt-5 p-6 md:max-w-2xl lg:max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        {showInvoice ? (
          <>
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-600 mb-5 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                  Print / Download
                </button>
              )}
              content={() => componentRef.current}
            />
            <div ref={componentRef} className="p-6">
              <Header handlePrint={window.print} />

              <MainDetails name={name} address={address} />

              <ClientDetails clientName={clientName} clientAddress={clientAddress} />

              <Dates
                invoiceNumber={invoiceNumber}
                invoiceDate={invoiceDate}
                dueDate={dueDate}
              />

              <Table
                description={description}
                quantity={quantity}
                price={price}
                amount={amount}
                list={list}
                setList={setList}
                total={total}
                setTotal={setTotal}
              />

              <Notes notes={notes} />

              <Footer
                name={name}
                address={address}
                website={website}
                email={email}
                phone={phone}
                bankAccount={bankAccount}
                bankName={bankName}
              />
            </div>
            <button
              onClick={() => setShowInvoice(false)}
              className="mt-5 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-500 transition duration-300"
            >
              Edit Information
            </button>
          </>
        ) : (
          <>
            <div className="flex flex-col space-y-6">
              <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="name" className="text-gray-700 font-medium">Your Full Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name"
                    maxLength={56}
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="address" className="text-gray-700 font-medium">Your Address</label>
                  <input
                    type="text"
                    id="address"
                    placeholder="Enter your address"
                    maxLength={96}
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="email" className="text-gray-700 font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    maxLength={255}
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="website" className="text-gray-700 font-medium">Your Website</label>
                  <input
                    type="url"
                    id="website"
                    placeholder="Enter your website"
                    maxLength={96}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="phone" className="text-gray-700 font-medium">Your Phone</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="Enter your phone"
                    maxLength={12}
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="bankName" className="text-gray-700 font-medium">Bank Name</label>
                  <input
                    type="text"
                    id="bankName"
                    placeholder="Enter your bank name"
                    maxLength={56}
                    autoComplete="off"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="bankAccount" className="text-gray-700 font-medium">Bank Account Number</label>
                  <input
                    type="text"
                    id="bankAccount"
                    placeholder="Enter your bank account number"
                    maxLength={20}
                    autoComplete="off"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="flex flex-col">
                  <label htmlFor="clientName" className="text-gray-700 font-medium">Client's Name</label>
                  <input
                    type="text"
                    id="clientName"
                    placeholder="Enter your client's name"
                    maxLength={56}
                    autoComplete="off"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="clientAddress" className="text-gray-700 font-medium">Client's Address</label>
                  <input
                    type="text"
                    id="clientAddress"
                    placeholder="Enter your client's address"
                    maxLength={96}
                    autoComplete="off"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </article>

              <article className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber" className="text-gray-700 font-medium">Invoice Number</label>
                  <input
                    type="text"
                    id="invoiceNumber"
                    placeholder="Invoice Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate" className="text-gray-700 font-medium">Invoice Date</label>
                  <input
                    type="date"
                    id="invoiceDate"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="dueDate" className="text-gray-700 font-medium">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    autoComplete="off"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </article>

              <article>
                <TableForm
                  description={description}
                  setDescription={setDescription}
                  quantity={quantity}
                  setQuantity={setQuantity}
                  price={price}
                  setPrice={setPrice}
                  amount={amount}
                  setAmount={setAmount}
                  list={list}
                  setList={setList}
                  total={total}
                  setTotal={setTotal}
                />
              </article>

              <div className="flex flex-col">
                <label htmlFor="notes" className="text-gray-700 font-medium">Additional Notes</label>
                <textarea
                  id="notes"
                  cols="30"
                  rows="5"
                  placeholder="Additional notes for the client"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                onClick={() => setShowInvoice(true)}
                className="mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-500 transition duration-300"
              >
                Preview Invoice
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Billings;