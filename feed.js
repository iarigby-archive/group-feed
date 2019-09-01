import { main } from './'

window.fbAsyncInit = function() {
    FB.init({
        // TODO
        appId      : '374750150106427',
        cookie     : true,
        xfbml      : true,
        version    : 'v4.0'
    }); 
    
    FB.getLoginStatus(function(response) {
        if(response.status == "connected") {
            /**
               Also keep in mind that the access tokens that are generated in browsers generally have a lifetime of only a couple of hours and are automatically refreshed by the JavaScript SDK. If you are making calls from a server, you will need to generate a long lived token, which is covered at length in our access token documentation.
            **/
            console.log(response.authResponse.accessToken);
            FB.api('/me', function(response) {
                console.log(JSON.stringify(response));
            }); 
            FB.api(
                "/1473567402914154/feed",
                function (response) {
                    if (response && !response.error) {
                        /* handle the result */
                        console.log(response)
                    }
                }
            );
        } else {
            FB.login(function(response) {
                console.log(response)
            }, {scope: 'user_birthday'})
        }
    });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
