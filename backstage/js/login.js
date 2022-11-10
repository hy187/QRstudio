// const appId = "gw4laJU022aE9r8F8HgIlkur-gzGzoHsz";
// 	const appKey = "FSHBNc10OyrdSgB68dM5CYgm";
// 	const serverURL = "https://gw4laju0.lc-cn-n1-shared.com";
	
// 	LC.init({ appId, appKey, serverURL });
	
// 	function login() {
// 	  const username = $("#username").val();
// 	  const password = $("#password").val();
// 	  //console.log(username);
// 	  // LeanCloud - 登录
// 	  // https://leancloud.cn/docs/leanstorage_guide-js.html#hash964666
// 	  LC.User.login(username, password)
// 	    .then(() => {
// 	      window.location.href = "index.html";				//跳转页面
// 	    })
// 	    .catch(({ error }) => alert("账号或密码错误，请重试！"));
// 	}
	
// 	$(function () {
// 	  $(".form-signin").on("submit", function (e) {
// 	    e.preventDefault();
// 	    login();
// 	  });
// 	});

// $('.example-p-3').on('click', function () {
//     $.confirm({
//         title: '提示',
//         content: '' +
//         '<form action="" class="formName">' +
//         '<div class="form-group">' +
//         '<label>请输入您的姓名</label>' +
//         '<input type="text" placeholder="姓名" class="name form-control" required />' +
//         '</div>' +
//         '</form>',
//         buttons: {
//             formSubmit: {
//                 text: '提交',
//                 btnClass: 'btn-blue',
//                 action: function () {
//                     var name = this.$content.find('.name').val();
//                     if(!name){
//                         $.alert('请您输入您的姓名');
//                         return false;
//                     }
//                     $.alert('您的姓名是： ' + name);
//                 }
//             },
//             cancel: {
//                 text: '取消'
//             },
//         },
//         onContentReady: function () {
//             var jc = this;
//             this.$content.find('form').on('submit', function (e) {
//                 e.preventDefault();
//                 jc.$$formSubmit.trigger('click');
//             });
//         }
//     });
// });

// handlebars context
const context = {
  products: [],
};

//const currentUser = LC.User.current();
//console.log(currentUser);
console.log(context);
function getReleaseTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
  //console.log(day);
}


function setupData() {
  // LeanCloud - 查询
  // https://leancloud.cn/docs/leanstorage_guide-js.html#hash860317
  LC.CLASS("Product")
    .include("owner", "image")
    .orderBy("createdAt", "desc")
    .find()
    .then((products) => {
      products.forEach((product) => {										//循环遍历
        const owner = product.data.owner;
        const productImage = product.data.image;

        // handlebars context
        context.products.push({
          productImageUrl: productImage ? productImage.url : "./../storage.png",
          productTitle: product.data.title,
          productDescription: product.data.description,
          price: product.data.price,
          ownerUsername: owner ? owner.data.username : "unknown",
          releaseTime: getReleaseTime(product.createdAt),
        });
      });

      // use handlebars to update html
      const source = $("#products-list").html();
      const template = Handlebars.compile(source);
      const html = template(context);
      $(".products-detail").html(html);
    })
    .catch((error) => alert(error.error));
}
