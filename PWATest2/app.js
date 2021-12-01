const template = `<article>
  <img src='data/img/SLUG.png' data-src='data/img/SLUG.png' alt='NAME'>
  <h3>#POS. NAME</h3>
  <ul>
  <li><span>Author:</span> <strong>AUTHOR</strong></li>
  <li><span>Twitter:</span> <a href='https://twitter.com/TWITTER'>@TWITTER</a></li>
  <li><span>Website:</span> <a href='http://WEBSITE/'>WEBSITE</a></li>
  <li><span>GitHub:</span> <a href='https://GITHUB'>GITHUB</a></li>
  <li><span>More:</span> <a href='http://js13kgames.com/entries/SLUG'>js13kgames.com/entries/SLUG</a></li>
  </ul>
</article>`;
let content = '';
for (let i = 0; i < games.length; i++) {
    let entry = template.replace(/POS/g, (i + 1))
        .replace(/SLUG/g, games[i].slug)
        .replace(/NAME/g, games[i].name)
        .replace(/AUTHOR/g, games[i].author)
        .replace(/TWITTER/g, games[i].twitter)
        .replace(/WEBSITE/g, games[i].website)
        .replace(/GITHUB/g, games[i].github);
    entry = entry.replace('<a href=\'http:///\'></a>', '-');
    content += entry;
}
document.getElementById('content').innerHTML = content;



if ('serviceWorker' in navigator) {

    window.addEventListener('load', () => {
        console.log("registrando sw");
        navigator.serviceWorker.register('sw.js')
        .then(registration => {
            console.log("sw registrado", registration);
            })
        .catch(err => {
            console.log("sw error registro", err);
            });
        });

    // navigator.serviceWorker.register('sw.js');
};


const button = document.getElementById('notifications');
button.addEventListener('click', () => {
    Notification.requestPermission().then((result) => {
        if (result === 'granted') {
            randomNotification();
        }
    });
});


function randomNotification() {
    const randomItem = Math.floor(Math.random() * games.length);
    const notifTitle = games[randomItem].name;
    const notifBody = `Created by ${games[randomItem].author}.`;
    const notifImg = `data/img/${games[randomItem].slug}.png`;
    const options = {
        body: notifBody,
        icon: notifImg,
    };
    new Notification(notifTitle, options);
    // setTimeout(randomNotification, 30000);
}

function geolocate() {
    console.log("Geolocate");
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(position => {
            alert(position.coords.latitude);
            console.log(position);
        });
    }
}
