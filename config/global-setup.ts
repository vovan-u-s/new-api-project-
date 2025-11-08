import fetch from 'node-fetch';

async function globalSetup(): Promise<void> {
  console.log('🚀 Starting API Tests Setup...');
  
  // Log test environment info
  console.log(`Base URL: https://automationexercise.com/api`);
  console.log(`Test Directory: ./tests`);
  
  // You can add global setup logic here such as:
  // - Setting up test database
  // - Creating test users
  // - Validating API availability
  
  try {
    // Simple health check
    const response = await fetch('https://automationexercise.com/api/productsList');
    if (response.ok) {
      console.log('✅ API is accessible');
    } else {
      console.log('⚠️ API health check failed');
    }
  } catch (error: any) {
    console.log('⚠️ Could not perform API health check:', error.message);
  }
  
  console.log('✅ Global setup completed');
}

export default globalSetup;
