$(function () {
  $('#send').click(function () {//给对象绑定事件


    var inputFile = $('#uploadFile').get(0).files;//获取到文件列表

    if (inputFile.length == 0) {
      alert('请选择文件');
      return;
    }
    else {
      var reader = new FileReader();//新建一个FileReader


      reader.readAsText(inputFile[0], "UTF-8");//读取文件 


      reader.onload = function (evt) { //读取完文件之后会回来这里

        var fileString = evt.target.result;


        chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {//获取当前tab
          chrome.tabs.sendMessage(tab[0].id, {
            action: "send",
            keyword: fileString
          }, function (response) {
            console.log(response);
            state.html(response.state)
          });
        });
      }
      // form.vm.value = fileString; //设置隐藏input的内容
    }


    $('#submit').click(function () {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {
          action: "submit"
        }, function (response) {
          state.html(response.state)
        });
      });
    })
  })
})
