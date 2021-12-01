// https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
function getLocation() {
    console.log("Location!!");
    if (!navigator.geolocation) {
        $("#geoLocMsgBox").text('Geolocation is not supported by your browser');
    } else {
        $("#geoLocMsgBox").text('Locating…');

        navigator.geolocation.getCurrentPosition(getLocationSuccess, getLocationError);
    }
}

function getLocationSuccess(position) {
    console.log(position);

    /*
    position.timestamp
    position.coords.accuracy
    position.coords.altitude
    position.coords.altitudeAccuracy
    position.coords.heading
    position.coords.latitude
    position.coords.longitude
    position.coords.speed
    */

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const date = new Date(position.timestamp);

    let msg = "Latitude " + latitude +
        " longitude " + longitude +
        " date " + date.toISOString() + 
        " heading " + position.coords.heading + 
        " speed " + position.coords.speed;
    $("#geoLocMsgBox").text(msg);
}

function getLocationError(geolocationError) {
    console.error(geolocationError);
    let msg = "No se puede obtener tu localizacion";

    if (geolocationError && geolocationError.code && geolocationError.code == 1) {
        // Error 1 : el usuario ha denegado el permiso de localizacion
        // geoLocationError.message es User denied geolocation
        msg = "Localizacion denegada por el usuario";
    }

    $("#geoLocMsgBox").text(msg);
}

// https://developer.mozilla.org/en-US/docs/Web/API/Notification
function sendNotification() {
    let title = "This is a message";

    let options = {
        body: "Esto es el cuerpo de la notificacion. Alegre la mañana que nos habla de ti, alegre la mañana.",
        silent: false,
        vibrate: [200, 100, 200]
    };
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification(title, options);
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification(title, options);
        }
      });
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/Storage_API
// https://developer.mozilla.org/en-US/docs/Web/API/Storage_Access_API
function storeData() {
    console.log("storeData");
    localStorage.setItem("key", "value");
}
