var kw = $('#kw');
var form = $('#form');

var  _csvData={};

function bindSetMoney(){

        var  setMoneyButton = $("<button style='margin-left:10px' class='btn btn-primary _setmoney'>设置最低竞价</button>")        

        var  container = $('.add-row').parent();

        container.append(setMoneyButton);
        
        var  bidInput = $(".bid");
        setMoneyButton.on('click',function(){

            bidInput.each(function () {
                var textData = bidInput.parent().siblings('.popover-help').children('i').attr("data-content");

                var reg = /([0-9]{1,}[.][0-9]*)/;
                var ms = textData.match(reg)

                var  money = $(ms)[1];

                
                $(this).val(money);

            });

       
        });
}

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action == "send") {


            var messageData = request.keyword.split("\n");

            for (var i = 0; i < messageData.length; i++) {
                if (messageData[i] != "") {
                    if(i!=0){ $(".add-row").click();}
                    var textString = messageData[i].split(',');
                    $(".product-id:last").val(textString[0]);

                    var wordArr = textString[1].split(':');
                    var  keyWordValue="";
                    for (var k = 0; k < wordArr.length; k++) {
    	                keyWordValue+=(wordArr[k]+",");
                    }
                    $(".token-input:last").val(keyWordValue);

                    $(".bid:last").val(textString[2]);
                }

            }

            bindSetMoney();
            sendResponse({ state: '关键词填写成功！' });
        }
        if (request.action == "submit") {
            sendResponse({ state: '提交成功！' });
        }
    }
);