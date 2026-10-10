export default function Productos({ products = [], onSelect, onAdd }) {
    return (
        <section className="products-section" aria-label="Productos">
            {products.length === 0 ? (
                <div className="panel module-empty-panel">
                    <span className="module-empty-icon" aria-hidden="true">◇</span>
                    <h2>Aún no hay productos</h2>
                    <p>Cuando agregues productos, aparecerán aquí para poder asociarlos con tus reservas.</p>
                    <button className="secondary-button" onClick={onAdd} type="button">Agregar producto</button>
                </div>
            ) : (
                <div className="product-grid">
                    {products.map((product) => (
                        <button className="product-card" key={product.id} onClick={() => onSelect(product)} type="button">
                            <span className="product-card-icon" aria-hidden="true">◇</span>
                            <span className="product-card-name">{product.name}</span>
                            <span className="product-card-description">{product.description || 'Ver detalles del producto'}</span>
                            {product.price != null && <strong className="product-card-price">RD$ {Number(product.price).toLocaleString('es-DO')}</strong>}
                        </button>
                    ))}
                </div>
            )}
        </section>
    );
}