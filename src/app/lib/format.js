export const formatPrice = (n, currency = "EGP") =>
  new Intl.NumberFormat("en-EG", { style: "currency", currency }).format(n);
