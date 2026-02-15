import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { getEntitlements, purchasePackage, getPackages, Package } from '@revenuecat/purchases';
// Note: In production, install @revenuecat/purchases
// For now, we'll use a mock implementation

export const PRODUCT_IDS = {
  MONTHLY: 'telehealth_premium_monthly',
  ANNUAL: 'telehealth_premium_annual',
};

export type SubscriptionStatus = {
  isPremium: boolean;
  expirationDate: Date | null;
  productId: string | null;
};

export function useRevenueCat() {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isPremium: false,
    expirationDate: null,
    productId: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  const checkSubscriptionStatus = async () => {
    try {
      // In production, this would call RevenueCat API
      // For now, check AsyncStorage for demo
      setIsLoading(false);
    } catch (error) {
      console.error('Error checking subscription status:', error);
      setIsLoading(false);
    }
  };

  const purchaseSubscription = async (productId: string): Promise<boolean> => {
    try {
      // In production, this would initiate RevenueCat purchase
      // For now, simulate successful purchase
      setStatus({
        isPremium: true,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        productId,
      });
      return true;
    } catch (error) {
      console.error('Purchase error:', error);
      return false;
    }
  };

  const restorePurchases = async (): Promise<boolean> => {
    try {
      // In production, this would restore purchases from RevenueCat
      return false;
    } catch (error) {
      console.error('Restore error:', error);
      return false;
    }
  };

  return {
    status,
    isLoading,
    purchaseSubscription,
    restorePurchases,
  };
}

// Mock packages for display
export const MOCK_PACKAGES = [
  {
    identifier: PRODUCT_IDS.MONTHLY,
    packageType: 'MONTHLY' as const,
    product: {
      priceString: '$9.99',
      productId: PRODUCT_IDS.MONTHLY,
    },
  },
  {
    identifier: PRODUCT_IDS.ANNUAL,
    packageType: 'ANNUAL' as const,
    product: {
      priceString: '$49.99',
      productId: PRODUCT_IDS.ANNUAL,
    },
  },
];
