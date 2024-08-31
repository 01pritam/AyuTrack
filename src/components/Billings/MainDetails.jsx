export default function MainDetails({ name, address }) {
    return (
        <>
            <section className="flex flex-col items-center justify-end">
                <h2 className="font-bold text-xl mb-1 uppercase md:text-4xl">{name}</h2>
                <p>{address}</p>
            </section>
        </>
    );
}