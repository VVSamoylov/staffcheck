export const authConfig ={
    clientId: 'gtrkhr',
    authorizationEndpoint: 'https://sso.tvsamara.ru:9443/realms/gtrk/protocol/openid-connect/auth',
    tokenEndpoint: 'https://sso.tvsamara.ru:9443/realms/gtrk/protocol/openid-connect/token',
    redirectUri: 'https://staff.tvsamara.ru:8443',
    scope: 'openid profile email offline_access',
    onRefreshTokenExpire: (event) => event.logIn(),
};
