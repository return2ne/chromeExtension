function setButtonListener() {
    var oAudio = document.getElementById('myAudio');
    var btnPlayAudio = document.getElementById('playAudio');

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
    document.getElementById('playAudio').addEventListener('click', function () {
        oAudio.src = "demo.mp3";
        if (oAudio.paused) {
            oAudio.play();
            btnPlayAudio.textContent = "Pause";
        }
        else {
            oAudio.pause();
            btnPlayAudio.textContent = "Play";
        }
    });
    document.getElementById('rewindAudio').addEventListener('click', function () {
        oAudio.currentTime -= 30.0;
    });
    document.getElementById('forwardAudio').addEventListener('click', function () {
        oAudio.currentTime += 30.0;
    });
    document.getElementById('restartAudio').addEventListener('click', function () {
        oAudio.currentTime = 0;
    });
}

function setBgImage() {
    var bgImg = "https://unsplash.it/1024/768/?random";
    document.body.style.backgroundImage = "url('" + bgImg + "')";
}

function printTime() {
    var clock = window.document.getElementById("clock");
    var now = new Date();
    var nowTime = now.getFullYear() + "/" + (now.getMonth() + 1) + "/" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    clock.innerHTML = nowTime;
    window.setTimeout(function () {
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

window.addEventListener("load", windowLoaded, false);
function windowLoaded() {
    setBgImage();
    printTime();
    geoFindMe();
    setButtonListener();
}