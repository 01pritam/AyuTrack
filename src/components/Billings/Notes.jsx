export default function Notes({ notes }) {
    return (
        <section className="mt-10 mb-5">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Additional Notes</h3>
            <p className="text-gray-600 lg:w-1/2 text-justify">{notes}</p>
        </section>
    );
}
