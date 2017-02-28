(function () {
	if (chrome && chrome.runtime && chrome.runtime.setUninstallURL) {
		chrome.runtime.setUninstallURL("https://nxtest.cloudapp.net/uninstall.html");
	}

	chrome.runtime.onInstalled.addListener(function (details) {
		if (details && details.reason && details.reason == 'install') {
			chrome.tabs.create({url: 'newtab.html'});
		}
	});

	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.create({url: 'newtab.html'});
	});

})();
