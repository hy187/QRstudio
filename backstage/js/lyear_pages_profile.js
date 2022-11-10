	// LeanCloud - 初始化 - 将这里的 appId 、 appKey 和 serverURL 替换成自己的应用数据
	// https://leancloud.cn/docs/sdk_setup-js.html#hash14962003
	const appId = "gw4laJU022aE9r8F8HgIlkur-gzGzoHsz";
	const appKey = "FSHBNc10OyrdSgB68dM5CYgm";
	const serverURL = "https://gw4laju0.lc-cn-n1-shared.com";
	
	LC.init({ appId, appKey, serverURL });
	
	function releaseNewProfile() {
	  var number = document.getElementById("number").value;
	  if(number.length != 11){
	  	alert("手机号码输入错误！");
	  	return false;
	  }
	  
	  var id = document.getElementById("id").value;
	  if(id.length != 13){
	  	alert("学号输入错误！");
	  	return false;
	  }
	  
	  var tnumber = document.getElementById("tnumber").value;
	  if(tnumber.length != 11){
	  	alert("育人导师手机号码输入错误！");
	  	return false;
	  }
	  // LeanCloud - 当前用户
	  // https://leancloud.cn/docs/leanstorage_guide-js.html#hash748191977
	  const currentUser = LC.User.current();
	
	  // LeanCloud - 文件
	  // https://leancloud.cn/docs/leanstorage_guide-js.html#hash825935
	  const file = $("#img")[0].files[0];											//定义文件类型，存图片用
	  const imgname = file.name;
	  LC.File.upload(imgname, file).then((lcFile) => {
	    // LeanCloud - 对象
	    // https://leancloud.cn/docs/leanstorage_guide-js.html#hash799084270
	    LC.CLASS("Profile")
	      .add({
	        name: $("#name").val(),												
	        sex: $("#sex").val(),									
	        number: $("#number").val(),
			id: $("#id").val(),
			direction: $("#direction").val(),
			class: $("#class").val(),
			academy: $("#academy").val(),
			tname: $("#tname").val(),
			tnumber: $("#tnumber").val(),
	        owner: currentUser,																										
	        image: lcFile,																
	      })
	      .then(() => {
	        window.location.href = "index.html";
	      })
	      .catch(({ error }) => alert("保存失败"));
	  });
	}
	
	$(function () {
	  if (LC.User.current()) {
	    $(".new-product").on("submit", function (e) {
	      e.preventDefault();
	      releaseNewProduct();
	    });
	  } else {
	    window.location.href = "lyear_pages_login.html";
	  }
	});