import RecentProducts from "../RecentProducts/RecentProducts";
import { Helmet } from "react-helmet";

function Products() {
  return (
    <>
      <RecentProducts></RecentProducts>
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
    </>
  );
}

export default Products;
