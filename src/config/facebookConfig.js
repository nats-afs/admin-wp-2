export const fb = (window.fbAsyncInit = function() {
  FB.init({
    appId: "599788120386719",
    autoLogAppEvents: true,
    xfbml: true,
    version: "v2.12"
  });
});

(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

// FB.api(
//   "/240951999799235/feed",
//   "POST",
//   { message: "Hello_from_Muni_App" },
//   function(response) {
//     // Insert your code here
//   }
// );