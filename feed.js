function main(response) {
    console.log(`received response of ${response.data.length}`) 
    send_delayed_request({
        list: response.data,
        endpoint_function: function(post) {
            return `/${post.id}/comments`
        },
        callback: get_comments
    })       
}
function get_comments(comments) {
    send_delayed_request({
        list: comments.data,
        endpoint_function: function(comment) {
            return `/${comment.id}`
        },
        callback_function: default_callback
    })
}

function default_callback(result) {
    console.log(result)
}

function send_delayed_request(params) {
    let i = 0
    for (el of params.list) {
        i++
        setTimeout(function(elem) {
            facebook_request(params.endpoint_function(elem),
                             params.callback,
                             params.error_callback)
        }(el), i*500)
    }
}
// fb crap
function facebook_request(endpoint, callback, error_callback) {
    FB.api(
        endpoint,
        function(response) {
            if (response && !response.error) {
                callback && callback(response) || default_callback(response)
            } else {
                error_callback && error_callback(response.error) || default_callback(response.error)
            }
        })
}

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
