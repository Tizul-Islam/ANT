import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import productsData from '../../data/mock/products.json';
import shopsData from '../../data/mock/shops.json';

export const mock = new MockAdapter(axios, { delayResponse: 500 });

export const setupMockAdapter = () => {
  console.log("🔧 [API] Mock Adapter Initialized. Intercepting API calls...");

  // --- Auth Endpoints ---
  mock.onPost('/auth/login').reply(config => {
    const { email, role } = JSON.parse(config.data);
    return [200, {
      token: "mock-jwt-token-12345",
      user: {
        id: "u1",
        name: "Test User",
        email,
        role,
        avatar: "https://i.pravatar.cc/150?u=" + email
      }
    }];
  });

  // --- Marketplace Endpoints ---
  mock.onGet('/api/business-settings/').reply(200, {
    site_name: "ANT Marketplace",
    currency_symbol: "৳",
    support_email: "support@ant.com"
  });

  mock.onGet('/products').reply(config => {
    return [200, productsData];
  });
  
  mock.onGet('/shops').reply(config => {
    return [200, shopsData];
  });
  
  mock.onGet(/\/products\/\d+/).reply(config => {
    const id = config.url.split('/').pop();
    const product = productsData.find(p => p.id === id);
    if (product) return [200, product];
    return [404, { message: "Product not found" }];
  });

  // Default passthrough for unmatched routes (if any real APIs are called)
  mock.onAny().passThrough();
};
