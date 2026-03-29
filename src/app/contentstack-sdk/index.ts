import contentstack, {
  Region,
} from "@contentstack/delivery-sdk";

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: Region.EU,
});

export const getHomePage = async <T>(
  contentType: string,
  options?: {
    entryUid?: string;
    includeReferences?: string[];
  }
): Promise<T | null> => {
  try {
    let query;

    if (options?.entryUid) {
      query = stack
        .contentType(contentType)
        .entry(options.entryUid);

      if (options?.includeReferences) {
        query = query.includeReference(options.includeReferences);
      }

      const entry = await query.fetch<T>();
      return entry || null;
    }

    query = stack.contentType(contentType).entry();

    if (options?.includeReferences) {
      query = query.includeReference(options.includeReferences);
    }

    const entry = await query.find<T>();
    return entry?.entries?.[0] || null;

  } catch (err) {
    console.error("Failed to fetch entry:", err);
    return null;
  }
};