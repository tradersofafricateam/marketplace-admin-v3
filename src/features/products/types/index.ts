export type SupportedLanguage = "en" | "fr" | "ar" | "sw" | "pt";
export type TranslationObject = Partial<Record<SupportedLanguage, string>>;

export type ProductType = "simple" | "variable";
export type ProductStatus = "draft" | "pending_approval" | "rejected" | "active" | "inactive" | "archived" | "deleted";
export type InventoryStatus = "in_stock" | "out_of_stock";

export type ProductImage = {
  id: string;
  productId: string;
  url: string;
  sortOrder: number;
  isPrimary: boolean;
  createdAt: string;
};

export type ProductVariantOption = {
  id: string;
  productId: string;
  name: string;
  values: string[];
  sortOrder: number;
};

export type ProductVariant = {
  id: string;
  productId: string;
  sku: string;
  attributes: Record<string, string>;
  price: number;
  discount: number | null;
  quantity: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ProductSellerSummary = {
  id: string;
  storeName: string;
  slug?: string;
  isVerified?: boolean;
  isCompanyVerified?: boolean;
  companyName?: string;
  country?: string;
};

export type AdminProduct = {
  id: string;
  sellerId: string;
  seller?: ProductSellerSummary;
  productName: TranslationObject;
  productDescription: TranslationObject;
  categoryIds: string[];
  countryOfOrigin: string;
  currency: string;
  price: number | null;
  discount: number | null;
  productType: ProductType;
  barcode?: string | null;
  supplyCapacity: number;
  unitForSupplyCapacity: string;
  minOrdersAllowed: number;
  unitForMinOrder: string;
  minDuration: number;
  maxDuration: number;
  durationUnit: string;
  status: ProductStatus;
  inventoryStatus: InventoryStatus;
  totalStock: number;
  images: ProductImage[];
  variantOptions?: ProductVariantOption[];
  variants?: ProductVariant[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ProductsQuery = {
  search?: string;
  status?: ProductStatus | "";
  categoryId?: string;
  page: number;
  limit: number;
};

export type ProductsResponse = {
  success: boolean;
  data: AdminProduct[];
  pagination: Pagination;
};

export type ProductActionResponse = { success: boolean; message: string };
