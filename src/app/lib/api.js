const API_BASE = process.env.NEXT_PUBLIC_API_BASE


// To fetch all active categories
export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE}/product/category-filter/?active=true`, {
      cache: "no-store", // always fetch fresh data
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error("Failed to fetch categories:", res.status);
      return [];
    }

    const data = await res.json();
    // console.log(data);
    
    // If API returns {results:[...]} instead of [...], normalize it:
    return Array.isArray(data) ? data : data.results || [];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}


// To fetch seasons and events
export async function getSeason() {
  try {
    const res = await fetch(`${API_BASE}/product/season-change/`, {
      cache: "no-store", // always fetch fresh data
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error("Failed to fetch season:", res.status);
      return [];
    }

    const data = await res.json();
    // console.log(data);
    
    // If API returns {results:[...]} instead of [...], normalize it:
    return data
  } catch (err) {
    console.error("Error fetching season:", err);
    return [];
  }
}


// To fetch bestselling active products
export async function getBestSelling(){
  const resBestSellingProducts=await fetch(`${API_BASE}/product/list-filter/?active=true&best_selling=true`)
  const bestSellingProducts=await resBestSellingProducts.json();
  return bestSellingProducts

}


// To fetch a specific active category
export async function getSpecificCategory(slug) {
  const res=await fetch(`${API_BASE}/product/list-filter/?active=true&category__name=${slug}`)
  const products= await res.json();
  return products
}


// To fetch all active products
export async function getAllProducts() {
  const res=await fetch(`${API_BASE}/product/list-filter/?active=true`)
  const products= await res.json();
  return products
}



export async function getProduct(slug) {
  const res = await fetch(`${API_BASE}/product/list-filter/?title=${slug}`);
  const product=await res.json()
  // if (!res.ok) return null;
  // const data = await res.json();
  // // API may return an array or an object; normalize to single product
  // const list = Array.isArray(data) ? data : (data.results || []);
  // return Array.isArray(list) ? list[0] : data;
  return product
}

export async function postCheckout(payload) {
  const res = await fetch(`${API_BASE}/product/shipping/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    
    return res
  }



  
