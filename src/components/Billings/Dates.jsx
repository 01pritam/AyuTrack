export default function Dates({ invoiceNumber, invoiceDate, dueDate }) {
    return (
        <article className="mt-10 mb-14">
            <ul className="list-disc pl-5">
                <li className="py-1"><span className="font-semibold">Invoice Number:</span> {invoiceNumber}</li>
                <li className="py-1 bg-gray-100"><span className="font-semibold">Invoice Date:</span> {invoiceDate}</li>
                <li className="py-1"><span className="font-semibold">Due Date:</span> {dueDate}</li>
            </ul>
        </article>
    );
}