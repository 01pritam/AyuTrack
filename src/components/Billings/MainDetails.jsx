export default function MainDetails({ name, address }) {
    return (
        <section className="flex flex-col items-center mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 uppercase">{name}</h2>
            <p className="text-gray-600">{address}</p>
        </section>
    );
}
