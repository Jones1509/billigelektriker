import { storefrontApiRequest, COLLECTIONS_QUERY } from "@/lib/shopify";

export async function fetchAllCollections() {
  try {
    const response = await storefrontApiRequest(COLLECTIONS_QUERY, { first: 20 });
    const collections = response.data.collections.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      handle: edge.node.handle
    }));
    
    console.log('📦 Available Shopify Collections:', collections);
    return collections;
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
}
