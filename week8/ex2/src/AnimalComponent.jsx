export default function AnimalComponent({animalName, deleteFn, focusFn}) {
    return (
        <div className="animal-card">
            <strong>{animalName}</strong>

            <div className="button-row">
                <button type="button" onClick={() => focusFn(animalName)}>
                    Focus
                </button>
                <button type="button" onClick={() => deleteFn(animalName)}>
                    Delete
                </button>
            </div>
        </div>
    );
}