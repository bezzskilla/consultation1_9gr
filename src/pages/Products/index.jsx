import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from '../../api/products'
import { ProductCard } from "../../components/ProductCard"
import { useAuth } from "../../hooks/useAuth"

export const Products = () => {
  const { token } = useAuth()

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['getAllProducts'],
    queryFn: async () => {
      const res = await getAllProducts(token)

      if (res.ok) {
        return await res.json();
      }
    }
  })

  if (isLoading) return <p>Загрузка...</p>

  if (isError) return <p>Произошла ошибка: {error}</p>

  return (
    <>
      <h1 className="text-center">Продукты</h1>
      <div className="d-flex justify-content-center flex-row flex-wrap">
        {data.products.map(currentProduct => {
          return <ProductCard product={currentProduct} key={currentProduct._id}
          />
        })}
      </div >
    </>
  )
}
