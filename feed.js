function main(response) {
    console.log(`received response of ${response.data.length}`) 
    
    let i = 0
    for (post of response.data) {
        i++
        // post.message and post.
        console.log(post.from)
        setTimeout(function() {
            FB.api(
            `/${post.id}/comments`,
            function (response) {
                if (response && !response.error) {
                    get_comments(response.data)
                    /* handle the result */
                } else {
                    console.log(response.error)
                }
            }
            )}, i*100)
    }
}

function get_comments(comments) {
    for (comment of comments) {
        FB.api(
            `/${comment.id}`,
            function (response) {
                if (response && !response.error) {
                    console.log(response)
                }
            }
        )
    }
}

function send_delayed_request(arr, endpoint_function) {
    let i = 0
    for (el of arr) {
        i++
        setTimeout(function(el) {
            FB.api(
                endpoint_function(el),
                function(response) {
                    if (response && !response.error) {
                        callback(response)
                    } else {
                        console.log(response.error)
                    }
                })
        }(el), i*500)
    }
}
// fb crap

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
            /*
              console.log(response.authResponse.accessToken);
              FB.api('/me', function(response) {
              console.log(JSON.stringify(response));
              });
            */
            FB.api(
                "/1473567402914154/feed",
                function (response) {
                    if (response && !response.error) {
                        main(response)
                    } else {
                        console.log(response.error)
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
