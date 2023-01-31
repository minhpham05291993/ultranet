export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  refreshTokenKeyName: 'refreshToken',
  userDataKeyName: 'userData',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
