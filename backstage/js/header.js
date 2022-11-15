	const appId = "gw4laJU022aE9r8F8HgIlkur-gzGzoHsz";
	const appKey = "FSHBNc10OyrdSgB68dM5CYgm";
	const serverURL = "https://gw4laju0.lc-cn-n1-shared.com";
	LC.init({ appId, appKey, serverURL});
	
	// function logout() {
	//   LC.User.logOut();
	//   window.location.href = "lyear_pages_login.html";
	// }
	
	$(function () {
	  if (LC.User.current()) {
	    setupData();
	  } else {
	    window.location.href = "lyear_pages_login.html";
	  }
	});
	