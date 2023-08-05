# Project

This GitHub repository presents a sample project that utilizes the axios-cache-interceptor middleware. The project is created to demonstrate how to use the axios-cache-interceptor caching middleware.

The sample project makes HTTP requests using Axios with a caching strategy that generates a cache key based on the request URL and parameters. The first time a request is made, the response is cached, and subsequent requests to the same URL utilize the cached response.

### Technologies Used

The project utilizes the following libraries:

- Expo
- react-navigation
- react-native-mmkv
- typescript
- await-to-js
- axios
- axios-cache-interceptor

### Installation

1.  Clone the project: `git clone https://github.com/caglar09/axios-cache-interceptor-example.git`
2.  Navigate to the project directory:`cd axios-cache-interceptor-example`
3.  Install the required packages: `npm install`
4.  Install the required packages for iOS: `cd ios && pod install && cd ..`
5.  Start the project: `npm run ios`

### Usage

There is no need for any additional development for usage. Once the blog posts are automatically fetched, they will be cached. When the same parameters are used in subsequent requests, the cached data will be returned. To customize, refer to axios-cache-interceptor guide.

### License
This project is licensed under the MIT license. For more information, see the LICENSE file.
