export default function DetalleProducto({ product, onBack, onReserve }) {
    if (!product) {
        return (
            <section className="panel module-empty-panel">
                <span className="module-empty-icon" aria-hidden="true">◇</span>
                <h2>Selecciona un producto</h2>
                <p>Elige un producto para consultar sus detalles.</p>
                <button className="secondary-button" onClick={onBack} type="button">Volver a productos</button>
            </section>
        );
    }

    return (
        <section className="panel product-detail-panel">
            <button className="text-button product-back-button" onClick={onBack} type="button">← Volver a productos</button>
            <span className="product-detail-icon" aria-hidden="true">◇</span>
            <p className="section-eyebrow">DETALLE DEL PRODUCTO</p>
            <h2>{product.name}</h2>
            <p className="product-detail-description">{product.description || 'Sin descripción disponible.'}</p>
            {product.price != null && <strong className="product-detail-price">RD$ {Number(product.price).toLocaleString('es-DO')}</strong>}
            <button className="primary-button" onClick={() => onReserve?.(product)} type="button">Reservar este producto</button>
        </section>
    );
}