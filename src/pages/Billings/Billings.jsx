import { useState, useRef, useContext, useEffect } from "react";
import Footer from "../../components/Billings/Footer";
import Notes from "../../components/Billings/Notes";
import Table from "../../components/Billings/Table";
import Header from "../../components/Billings/Header";
import Dates from "../../components/Billings/Dates";
import MainDetails from "../../components/Billings/MainDetails";
import ClientDetails from "../../components/Billings/ClientDetails";
import TableForm from "../../components/Billings/TableForm";
import ReactToPrint from "react-to-print";
import { AuthContext } from "../../context/AuthContext";
import jsPDF from 'jspdf';
function Billings() {
  const { billingDetails ,token} = useContext(AuthContext);

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
  const [batchNo, setBatchNo] = useState(""); // Updated state name
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  useEffect(() => {
    if (billingDetails) {
      setName(billingDetails.manufacturer.name);
      setClientName(billingDetails.distributor.name);
      setList(billingDetails.medicines.map((medicine) => ({
        description: medicine.name,
        batchNo: medicine.batchNo, // Updated field name
        quantity: medicine.qty,
        price: medicine.mrp,
        amount: medicine.qty * medicine.mrp,
      })));
      setTotal(billingDetails.medicines.reduce((acc, medicine) => acc + medicine.qty * medicine.mrp, 0));
    }
  }, [billingDetails]);
  const generatePdfBlob = () => {
    const doc = new jsPDF();
    doc.text('Invoice Details:', 10, 10);
    doc.text(`Name: ${name}`, 10, 20);
    doc.text(`Address: ${address}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Phone: ${phone}`, 10, 50);
    // Add other details as needed
    doc.text(`Total: ${total}`, 10, 60);

    return doc.output('arraybuffer');
  };

  const handleSendToDistributor = async () => {
    try {
      const orderId = billingDetails?._id;
      console.log("orderId, ")
      if (!orderId) {
        throw new Error('Order ID is missing');
      }

      const pdfBinaryData = await generatePdfBlob();
      const pdfBlob = new Blob([pdfBinaryData], { type: 'application/pdf' });

      const formData = new FormData();
      formData.append('totalAmount', total);
      formData.append('invoiceNumber', invoiceNumber);
      formData.append('billingPdf', pdfBlob, 'invoice.pdf');

      const response = await fetch(`https://med-tech-server.onrender.com/api/manufacturers/orders/${orderId}/billing`, {
        method: 'PATCH',
        headers: {
          
          authorization: `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send data to distributor');
      }

      alert('Data sent to distributor successfully!');
    } catch (error) {
      console.error('Error:', error.message);
      alert('Error: ' + error.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen p-6 bg-gray-100">
        <div className="w-full max-w-full bg-white shadow-lg rounded-lg p-8 space-y-8 mx-auto">
          {showInvoice ? (
            <>
              <ReactToPrint
                trigger={() => (
                  <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300">
                    Print / Download
                  </button>
                )}
                content={() => componentRef.current}
              />
              <div ref={componentRef} className="p-6">
                <Header handlePrint={() => window.print()} />

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
                className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300"
              >
                Edit Information
              </button>
            <button
            onClick={handleSendToDistributor}
            className="mt-4 bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-green-500 transition duration-300"
            >
            Send to Distributor
          </button>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <article className="grid grid-cols-4 gap-6 md:grid-cols-6">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name" className="text-gray-800 font-medium">Your Full Name</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      maxLength={56}
                      autoComplete="off"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="address" className="text-gray-800 font-medium">Your Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Enter your address"
                      maxLength={96}
                      autoComplete="off"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </article>
                
                <article className="grid grid-cols-3 gap-1 md:grid-cols-2">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="text-gray-800 font-medium">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      maxLength={255}
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="website" className="text-gray-800 font-medium">Your Website</label>
                    <input
                      type="url"
                      id="website"
                      placeholder="Enter your website"
                      maxLength={96}
                      autoComplete="off"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="text-gray-800 font-medium">Your Phone</label>
                    <input
                      type="text"
                      id="phone"
                      placeholder="Enter your phone"
                      maxLength={12}
                      autoComplete="off"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </article>

                <article className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="bankName" className="text-gray-800 font-medium">Bank Name</label>
                    <input
                      type="text"
                      id="bankName"
                      placeholder="Enter your bank name"
                      maxLength={56}
                      autoComplete="off"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="bankAccount" className="text-gray-800 font-medium">Bank Account Number</label>
                    <input
                      type="text"
                      id="bankAccount"
                      placeholder="Enter your bank account number"
                      maxLength={20}
                      autoComplete="off"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </article>

                <article className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="invoiceNumber" className="text-gray-800 font-medium">Invoice Number</label>
                    <input
                      type="text"
                      id="invoiceNumber"
                      placeholder="Enter invoice number"
                      maxLength={56}
                      autoComplete="off"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="invoiceDate" className="text-gray-800 font-medium">Invoice Date</label>
                    <input
                      type="date"
                      id="invoiceDate"
                      autoComplete="off"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="dueDate" className="text-gray-800 font-medium">Due Date</label>
                    <input
                      type="date"
                      id="dueDate"
                      autoComplete="off"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </article>

                <TableForm
                  description={description}
                  batchNo={batchNo} // Updated prop name
                  quantity={quantity}
                  price={price}
                  amount={amount}
                  setDescription={setDescription}
                  setBatchNo={setBatchNo} // Updated function name
                  setQuantity={setQuantity}
                  setPrice={setPrice}
                  setAmount={setAmount}
                  list={list}
                  total={total}
                  setList={setList}
                  setTotal={setTotal}
                  />
                 
              </div>
              <button
                onClick={() => setShowInvoice(true)}
                className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-500 transition duration-300"
              >
                Generate Invoice
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Billings;