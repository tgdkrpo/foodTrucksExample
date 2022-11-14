const config = {
  timeout: 450000,
  globalTimeout: 3000000,
  testDir: "./tests",
  use: { 
    retries: 3,
    headless: true
   }
};

module.exports = config;
