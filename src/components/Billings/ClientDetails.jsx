export default function ClientDetails({ clientName, clientAddress }) {
    return (
        <section className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{clientName}</h2>
            <p className="text-gray-600">{clientAddress}</p>
        </section>
    );
}
