export const ProductCard = ({ product }) => {

  return (
    <div className="card" style={{ width: "150px", minHeight: '300px' }}>
      <img src={product.pictures} className="card-img-top" alt="Картинка продукта" />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <ul className="card-text">
          <li>Количество: {product.stock} ед. </li>
          <li>Цена товара: {product.price}р </li>
          <li>Скидка: {product.discount}% </li>
        </ul>
        <button className="btn btn-warning">В корзину</button>
      </div>
    </div>
  )
}
