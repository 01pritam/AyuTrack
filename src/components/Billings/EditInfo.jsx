import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import TableForm from "./TableForm";
import Button from "./Button";

function EditInfo({ invoiceData, handleChange, setShowInvoice }) {
  return (
    <div className="flex flex-col justify-center">
      <article className="md:grid grid-cols-2 gap-10">
        <InputField
          label="Your full name"
          name="name"
          value={invoiceData.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        <InputField
          label="Enter your address"
          name="address"
          value={invoiceData.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </article>

      <article className="md:grid grid-cols-3 gap-10">
        <InputField
          label="Enter your email"
          name="email"
          type="email"
          value={invoiceData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        <InputField
          label="Enter your website"
          name="website"
          type="url"
          value={invoiceData.website}
          onChange={handleChange}
          placeholder="Enter your website"
        />
        <InputField
          label="Enter your phone"
          name="phone"
          value={invoiceData.phone}
          onChange={handleChange}
          placeholder="Enter your phone"
        />
      </article>

      <article className="md:grid grid-cols-2 gap-10">
        <InputField
          label="Enter your bank name"
          name="bankName"
          value={invoiceData.bankName}
          onChange={handleChange}
          placeholder="Enter your bank name"
        />
        <InputField
          label="Enter your bank account number"
          name="bankAccount"
          value={invoiceData.bankAccount}
          onChange={handleChange}
          placeholder="Enter your bank account number"
        />
      </article>

      <article className="md:grid grid-cols-2 gap-10 md:mt-16">
        <InputField
          label="Enter your client's name"
          name="clientName"
          value={invoiceData.clientName}
          onChange={handleChange}
          placeholder="Enter your client's name"
        />
        <InputField
          label="Enter your client's address"
          name="clientAddress"
          value={invoiceData.clientAddress}
          onChange={handleChange}
          placeholder="Enter your client's address"
        />
      </article>

      <article className="md:grid grid-cols-3 gap-10">
        <InputField
          label="Invoice Number"
          name="invoiceNumber"
          value={invoiceData.invoiceNumber}
          onChange={handleChange}
          placeholder="Invoice Number"
        />
        <InputField
          label="Invoice Date"
          name="invoiceDate"
          type="date"
          value={invoiceData.invoiceDate}
          onChange={handleChange}
        />
        <InputField
          label="Due Date"
          name="dueDate"
          type="date"
          value={invoiceData.dueDate}
          onChange={handleChange}
        />
      </article>

      <TableForm
        description={invoiceData.description}
        setDescription={(description) => setInvoiceData((prev) => ({ ...prev, description }))}
        quantity={invoiceData.quantity}
        setQuantity={(quantity) => setInvoiceData((prev) => ({ ...prev, quantity }))}
        price={invoiceData.price}
        setPrice={(price) => setInvoiceData((prev) => ({ ...prev, price }))}
        amount={invoiceData.amount}
        setAmount={(amount) => setInvoiceData((prev) => ({ ...prev, amount }))}
        list={invoiceData.list}
        setList={(list) => setInvoiceData((prev) => ({ ...prev, list }))}
        total={invoiceData.total}
        setTotal={(total) => setInvoiceData((prev) => ({ ...prev, total }))}
      />

      <TextAreaField
        label="Additional Notes"
        name="notes"
        value={invoiceData.notes}
        onChange={handleChange}
        placeholder="Additional Notes to the client"
      />

      <Button
        onClick={() => setShowInvoice(true)}
        text="Preview Invoice"
      />
    </div>
  );
}

export default EditInfo;