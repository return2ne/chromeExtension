function setButtonListener() {

    document.getElementById('request').addEventListener('click', function () {
        chrome.cookies.get({"url": "http://www.nexon.com", "name": "NPP"}, function (cookie) {
            if (cookie.value) {
                alert(cookie.value);
            } else {
                chrome.windows.create({
                    //url: "https://nxtest.cloudapp.net/pop.html?id=" + tabId,
                    url: "http://www.nexon.com",
                    width: 400,
                    height: 400,
                    type: 'popup'
                }, function (win) {
                    chrome.tabs.reload(tabId.id);
                });
            }
        });
    });

}

function getRandomNumber(min, max) {
    var ranNum = Math.floor(Math.random()*(max-min+1)) + min;
    return ranNum;
}

function setBgImage() {
    var rand = getRandomNumber(1, 10);
    var bgImg = "bgimages/" + rand + ".jpg";
    document.body.style.backgroundImage = "url('" + bgImg + "')";
}

function playAudio() {
    var rand = getRandomNumber(1,4);

    var audio = document.getElementById("audioPlayer");
    var source = document.getElementById("audioSource");
    source.src = "music/" + rand + ".mp3";

    audio.load();
    audio.play();
}

function printTime() {
    var timer;
    var clock = window.document.getElementById("clock");
    var now = new Date();
    var month = (now.getMonth() + 1 < 10) ? "0" + (now.getMonth() + 1) : now.getMonth() + 1;
    var date = (now.getDate() < 10) ? " 0" + now.getDate() : now.getDate();
    var hour = (now.getHours() < 10) ? "0" + now.getHours() : now.getHours();
    var minutes = (now.getMinutes() < 10) ? "0" + now.getMinutes() : now.getMinutes();
    var nowTime = now.getFullYear() + "/" + month + "/" + date + " " + hour + ":" + minutes;
    if(now.getSeconds() == 0 || !timer) {
        clock.innerHTML = nowTime;
    }
    timer = window.setTimeout(function () {
        printTime();
    }, 1000);
}

function geoFindMe() {
    var output = document.getElementById("out");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>사용자의 브라우저는 지오로케이션을 지원하지 않습니다.</p>";
        return;
    }

    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        output.innerHTML = '<p>latitude : ' + latitude + '<br>longitude : ' + longitude + '</p>';

        var img = new Image();
        img.src = "http://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=200x200&sensor=false";

        output.appendChild(img);
    };

    function error() {
        output.innerHTML = "사용자의 위치를 찾을 수 없습니다.";
    };

    output.innerHTML = "Locating…";

    navigator.geolocation.getCurrentPosition(success, error);
}

/**
window.addEventListener("load", windowLoaded, false);
function windowLoaded() {
    setBgImage();
    printTime();
    geoFindMe();
    setButtonListener();
}
**/

chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {

    chrome.tabs.getCurrent(function(tab) {
        if (tabId != tab.id || changedProps.status != "complete")
            return;
        chrome.tabs.onUpdated.removeListener(listener);

        setBgImage();
        printTime();
        geoFindMe();
        setButtonListener();
        playAudio();
    });

});