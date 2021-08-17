/// <reference types="react-scripts" />
declare namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PUBLIC_URL: 'https://localhost:3000'
      API_URL : 'https://localhost:44315/'
    }
  }