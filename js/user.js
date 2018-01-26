var infoForm = {
    btn1: '.infoID',
    idInput: '#loginID',
    email: '#infoEmail',
    closeBtn: '.iconClose',
    dom: '.showDialog',
    box: '.dialog',
    btn2:'.ForgetBtn',
    dom2: '#forgetPinDom',
    dom3: '#changePinDom',
    init: function(){
        this.modifyID()
        // this.isSave()
        this.closeDialog()
        this.according()
        this.submission()
    },
    modifyID: function(){
        var that = this
        $(this.btn1).on('click',function(e){
            $(this).prev().removeAttr('readonly')
            $(this).prev().focus();

            that.isSave()
        })
    },
    isSave: function(){
        var that = this;
        $(this.idInput).blur(function(){
            //失去焦点的时候，调用ajax
            alert(121)
            // $.ajax({
            //     url: '',
            //     data: {
            //         id: $(that.idInput)
            //     },
            //     success: function(data){
            //         console.log(data)
            //     },
            //     error: function(data){
            //         console.log(data)
            //     }
            // })
        });
    },
    closeDialog: function(){
        var $box = $(this.box)
        $(this.closeBtn).on('click',function(){
            $box.addClass('hide')
            $('body').removeClass('forbidden')
        })
    },
    according: function(){
        var $box = $(this.box)
        var that = this
        $(this.dom).on('click',function(){
            $box.removeClass('hide')
            $('body').addClass('forbidden')
            $box.find('.show-classify').addClass('hide')
            if($(this).is('#changePwdText')){
                $box.find('#changePwdContent').removeClass('hide');
            }else{
                $box.find('#changePinContent').removeClass('hide')
                $box.find('.show-classify').find(that.dom3).removeClass('hide').siblings().addClass('hide');
            }
            
        })
    },
    submission: function() {
        // change pin
        this.formVerify('#changePin','#oldpin','#newpin','#againpin','.forPinSub')
        this.formOnFun('.forPinSub','#changePin','#oldpin','#newpin','#againpin','pin')
        // change pin

        this.forgetBtn(this.btn2,this.box,this.dom2);

        //change pwd
        this.formVerify('#changePwd','#oldpwd','#newpwd','#againpwd','.forPinSub')
        this.formOnFun('.forPwdSub','#changePwd','#oldpwd','#newpwd','#againpwd','pwd')
        //change pwd

        // idCard
        this.idCard('#idCard','#card1','#card2','#card3')
        this.passPort('#passPort','#protImg1','#protImg2')

        this.security('#verifyAuthy','#verifyBtn1','email')
        this.security('#verifySms','#verifyBtn2','sms')
        
        this.gooleVer('#gooleVerify','#verifyGoole')
    },
    formVerify: function(dom,oldP,newP,againP,btn) {
        $(dom).find(':input').blur(function(){
            // console.log($(dom).find(':input').length)
            $(this).parent().next().removeClass("error").text("");
            var regExp = /^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{8,18}$/;
            if( $(this).is(oldP)){
                var uname = $(this).val();
                
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter your old password';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else if( !regExp.test(uname) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter an old password of 8-18 bits';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else{
                    $(this).next('i').removeClass('hide')
                }
            }
            if( $(this).is(newP) ){
                var pwd = $(this).val();
                // var regExp = /^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{6,18}$/;
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter your old password';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else if( !regExp.test(pwd) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter an old password of 8-18 bits';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else{
                    $(this).next('i').removeClass('hide')
                }
            }
            if( $(this).is(againP) ){
                var repwd = $(this).val();
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please confirm the password.';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else if( repwd != $(newP).val() ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>The two passwords don\'t match';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(this).next('i').addClass('hide')
                }else{
                    $(this).next('i').removeClass('hide')
                }
            }
            if($(oldP).val() != '' && $(newP).val() !== '' &&  $(againP).val() !=''  ){
                $(btn).removeClass('notPoint')
            }else{
                $(btn).addClass('notPoint')
            }
        }).keyup(function()
        {
            $(this).triggerHandler("blur");
        });
    },
    forgetBtn: function(btn,dom,dom2) {
        var $box = $(dom)
        
        $(btn).on('click',function() {
            $box.removeClass('hide')
            $('body').addClass('forbidden')
            $box.find('.show-classify').addClass('hide')
            $box.find('#changePinContent').removeClass('hide')
            $box.find('.show-classify').find(dom2).removeClass('hide').siblings().addClass('hide');
        })
    },
    formOnFun:function(btn,dom,v1,v2,v3,part){
        var that = this
        $(btn).on("click", function(){
            $(dom).find(':input').trigger("blur");
            var numError = $(dom).find('.error').length;
            console.log(numError)
            if(numError){
                return false;
            }
            var para1 = $(v1).val();
            var para2 = $(v2).val();
            var para3 = $(v3).val();
            

            if(part == 'pin'){
                /*ajax 成功后失败后的时候调用*/
                //0为false 1位true，或者传值false 或者 true
                that.showResult(0,'.show-status','Submitted fail');
                $(dom).find(':input').val('');
                $(dom).find('span.tips').text('')
                $(dom).find(':input').next('i').addClass('hide')
                /*ajax 成功后失败后的时候调用*/

                // $.ajax({
                //     type: "POST",
                //     url: "url",
                //     data: {
                //         'para1':para1,
                //         'para2':para2,
                //         'para3':para3
                //     },
                //     dataType: "json",
                //     async: true,
                //     success: function(data){
                //         //修改成功
                //         $(dom).find(':input').val('');//成功后，清空文本框
                //     },
                //     error: function(data){

                //     }
                // });
            }else{
                //0为false 1位true，或者传值false 或者 true 
                that.showResult(1,'.show-status','Submitted successfully');
                $(dom).find(':input').val('');
                $(dom).find('span.tips').text('')
                $(dom).find(':input').next('i').addClass('hide')

                // $.ajax({
                //     type: "POST",
                //     url: "url",
                //     data: {
                //         'para1':para1,
                //         'para2':para2,
                //         'para3':para3
                //     },
                //     dataType: "json",
                //     async: true,
                //     success: function(data){
                //         //修改成功
                //         $(dom).find(':input').val('');//成功后，清空文本框
                //     },
                //     error: function(data){

                //     }
                // });
    
            }
            
        });
        
    },
    showResult: function(status,ele,msg) {
        $(this.box).addClass('hide')
        $(ele).removeClass('hide');
        if(status == 'true' || status == 1){
            //正确信息
            $(ele).find('i').removeClass().addClass('iconfont icon-dui')
        }else{
            //错误信息
            $(ele).find('i').removeClass().addClass('iconfont icon-open-warn')
        }
        $(ele).find('p').text(msg);

        setTimeout(function() {
            $(ele).addClass('hide');
        }, 4000);
    },
    idCard: function(formid,id1,id2,id3){
        // idCard
        $(formid).find(':input').blur(function(){
            $(this).next('span.tips').removeClass("error").text("");
            if( $(this).is("#fname") ){
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter fist name';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            if( $(this).is("#lname") ){
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter fist name';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            
            if( $(this).is("#idnum") ){
                var idnum = $(this).val();
                var regExp = /^[0-9A-Za-z]{8,30}$/
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter ID Number';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }else if( !regExp.test(idnum) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter ID Number';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            // /^[0-9A-Za-z]+$/
            if( $(this).is("#raddress") ){
                
                
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter residential address';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            
            if( $(this).is("#phone") ){
                var tel = $(this).val();
                var regExp = /^1[3|4|5|7|8]\d{9}$/
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter phone';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }else if( !regExp.test(tel) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter the correct mobile number';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            if($('#raddress').val() != '' && $('#phone').val() != '' && $('#idnum').val() != ''){
                $('.saveIdCard').removeClass('notPoint')
            }else{
                $('.saveIdCard').addClass('notPoint')
            }
        }).keyup(function()
        {
            $(this).triggerHandler("blur");
        });
        $(".saveIdCard").on("click", function()
        {
            $(formid).find(':input').trigger("blur");
            if($(id1).val() == '' || $(id2).val() == '' || $(id3).val() == '' ){
                layer.msg('<span style="color:#fff;">Please upload photos of your ID card</span>',{icon:5})
                return
            }
            var numError = $(formid).find('.error').length;
            if(numError){
                return false;
            }

            
            // var iphone = $("#iphone").val();
            // var pwd = $("#pwd").val();
            // var repwd = $("#rePwd").val();
            // $.ajax({
            //     type: "POST",
            //     url: "url?iphone="+iphone+"&pwd="+pwd+"&repwd="+repwd,
            //     dataType: "json",
            //     async: true,
            //     success: function(arr)
            //     {
            //         //注册成功
            //     }
            // });
        });
    },
    passPort: function(dom,val1,val2){
        $(dom).find(':input').blur(function(){
            $(this).next().removeClass("error").text("");

            if( $(this).is("#fname2") ){
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter fist name';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            if( $(this).is("#lname2") ){
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter fist name';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }

            if( $(this).is(".portid") ){
                var uname = $(this).val();
                var regExp = /^\d{9}$/;
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter your license number';
                    $(this).next().addClass("error").html(onMessage);
                    $('.licenseId').addClass('notPoint')
                }else if( !regExp.test(uname) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>The driver\'s license number is incorrect';
                    $(this).next().addClass("error").html(onMessage);
                    $('.licenseId').addClass('notPoint')
                }else{
                    $('.licenseId').removeClass('notPoint')
                }
            }
            if( $(this).is("#raddress2") ){


                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter residential address';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }

            if( $(this).is("#phone2") ){
                var tel = $(this).val();
                var regExp = /^1[3|4|5|7|8]\d{9}$/
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter phone';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }else if( !regExp.test(tel) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter the correct mobile number';
                    $(this).next('span.tips').addClass("error").html(onMessage);
                }
            }
            if($('#raddress2').val() != '' && $('#phone2').val() != '' && $('.portid').val() != ''){
                $('.licenseId').removeClass('notPoint')
            }else{
                $('.licenseId').addClass('notPoint')
            }
            
        }).keyup(function()
        {
            $(this).triggerHandler("blur");
        });
        $(".licenseId").on("click", function(){
            $(dom).find(':input').trigger("blur");
            if($(val1).val() == '' || $(val2).val() == ''){
                layer.msg('<span style="color:#fff;">Please upload your passport</span>',{icon:5})
                return
            }
            var numError = $(dom).find('.error').length;
            if(numError){
                return false;
            }
            var id = $('.portid').val();
            var img1 = $(val1).val()
            var img2 = $(val2).val()

            $.ajax({
                type: "POST",
                url: "url",
                data: {},
                dataType: "json",
                async: true,
                success: function(arr)
                {
                    //注册成功
                }
            });
        });
    },
    security: function(form,btn,type){
        $(form).find(':input').blur(function(){
            $(this).parent().next().removeClass("error").text("");
            if( $(this).is(".verifyPhone") ){
                var tel = $(this).val();
                var regExp = /^1[3|4|5|7|8]\d{9}$/;
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter your phone number';
                    $(this).parent().next().addClass("error").html(onMessage);
                }else if( !regExp.test(tel) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>The phone number is incorrect';
                    $(this).parent().next().addClass("error").html(onMessage);
                }
            }
            
            if( $(this).is(".authEmail") ){
                var email = $(this).val();
                var regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Enter the email';

                    $(this).parent().next().addClass("error").html(onMessage);
                }else if( !regExp.test(email) ){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter the correct email address';
                    $(this).parent().next().addClass("error").html(onMessage);
                }
            }
            if( $(this).is(".verifyCode") ){
                var regExp = /^\d{4,6}$/;
                var code = $(this).val();
                
                if( this.value == ""){
                    var onMessage = '<i class="iconfont icon-cuo"></i>Enter the code';
                    $(this).parent().next('span.tips').addClass("error").html(onMessage);
                }else if( !regExp.test(code) ){
                    var onMessage = 'Please enter 4-6 bit verification code';
                    $(this).parent().next('span.tips').addClass("error").html(onMessage);
                }
            }

            if($('.verifyPhone').val() == '' || $('.verifyCode').val() == ''){
                $(btn).addClass('notPoint')
            }else{
                $(btn).removeClass('notPoint')
            }

        }).keyup(function()
        {
            $(this).triggerHandler("blur");
        });
        $(btn).on("click", function()
        {
            $(form).find(':input').trigger("blur");
            var numError = $(form).find('.error').length;
            if(numError){
                return false;
            }
            if(type=='email'){
                var area = $(".verifyArea1 option:selected").val();
                var iphone = $(".authPnum").val();
                var authemail = $('.authEmail').val();
                var code = $('.codePhone').val();
                console.log(area,iphone,authemail,code)
                // $.ajax({
                //     type: "POST",
                //     url: 'url',
                //     data: {},
                //     dataType: "json",
                //     async: true,
                //     success: function(arr)
                //     {
                //         //注册成功
                //     }
                // });
            }
            if(type=='sms'){
                var area = $(".verifyArea2 option:selected").val();
                var iphone = $(".authPhone").val();
                var code = $('.codeSMS').val();
                console.log(area,iphone,code)
                // $.ajax({
                //     type: "POST",
                //     url: 'url',
                //     dataType: "json",
                //     data: {},
                //     async: true,
                //     success: function(arr)
                //     {
                //         //注册成功
                //     }
                // });
            }
            
        });
    },
    gooleVer: function(dom,btn){
        $(dom).find(':input').blur(function(){
            $(this).parent().next().removeClass("error").html("");
            if( $(this).is(".gooleCode") ){
                var code = $(this).val();
                var regExp = /^\d{6}$/;
                if( this.value == "")
                {
                    var onMessage = '<i class="iconfont icon-cuo"></i>Please enter Google Verification Code';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(btn).addClass('notPoint');
                }
                else if( !regExp.test(code) )
                {
                    var onMessage = '<i class="iconfont icon-cuo"></i>The Google Verification Code is incorrect';
                    $(this).parent().next().addClass("error").html(onMessage);
                    $(btn).addClass('notPoint');
                }else{
                    $(btn).removeClass('notPoint');
                }
            }
        }).keyup(function()
        {
            $(this).triggerHandler("blur");
        });
        $(btn).on("click", function()
        {
            $(dom).find(':input').trigger("blur");
            var numError = $(dom).find('.error').length;
            if(numError){
                return false;
            }
            var goolecode = $(".gooleCode").val();

            $.ajax({
                type: "POST",
                url: 'url',
                dataType: "json",
                data: {},
                async: true,
                success: function(arr)
                {
                    //注册成功
                }
            });
        });
    }
}

$(function () {
    /*change img*/
    upload('#idfile1','#card1')
    upload('#idfile2','#card2')
    upload('#idfile3','#card3')
    upload('#port1','#protImg1')
    upload('#port2','#protImg2')
    /*change img*/
})

function upload(dom,input) {
    $(dom).on('change',function(){
        var imgFile = $(dom)[0].files[0];
        var reader = new FileReader();
        var $this = $(this)
        reader.readAsDataURL(imgFile)
        reader.onload = function(e){
            $this.parent().parent().find('img').attr('src',this.result)
            $(input).val(this.result)
        }
    })
}


//发送短信验证码
var GetCode = {
    sendEmailCode: function(input,button){
        var regExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
        var $input = $(input);
        var count = 60;

        $(button).on('click',function(){
            if($input.val() == ''){
                layer.msg('<span style="color:#fff">The mailbox address cannot be empty</span>',{icon:5});
                return;
            }else if(!(regExp.test($input.val()))){
                layer.msg('<span style="color:#fff">Please enter the correct email address</span>',{icon:5});
                return;
            }else{
                
                $(button).attr('disabled','disabled');
                layer.msg('<span style="color:#fff">发送成功</span>',{icon:6});
                var getMessage;
                getMessage = setInterval(function(){
                    count--;
                    if(count == 0){
                        clearInterval(getMessage);
                        $(button).removeAttr('disabled')
                        $(button).removeClass('undisabled').find('span').text('Send');
                        count = 60
                        return;
                    }
                    $(button).addClass('undisabled').find('span').text('resend('+count+')');
                    
                },1000)
                /*
                $.ajax({
                    url: 'xxx',
                    type: 'post',
                    data: {
                        mobile: $input.val()
                    },
                    success: function(data){
                        console.log(data)
    
                        //倒计时
                        getMessage = setInterval(function(){
                            count--;
                            if(count == 0){
                                clearInterval(getMessage);
                                $(button).removeAttr('disabled')
                                $(button).removeClass('ftgray').find('span').text('Send');
                                count = 60
                                return;
                            }
                            $(button).addClass('ftgray').find('span').text('resend('+count+')');
                            
                        },1000)
    
                    },
                    error: function(data){
                        console.log(data)
                    }
                })
                */
            }
        })
    },
    sendPhoneCode: function(input,button){
        var regExp = /^1[3|4|5|7|8]\d{9}$/;
    
        var $input = $(input);
    
        var count = 60;
        
        $(button).on('click',function(){
            if($input.val() == ''){
                layer.msg('<span style="color:#fff">The phone number can\'t be empty</span>',{icon:5});
                return;
            }else if(!(regExp.test($input.val()))){
                layer.msg('<span style="color:#fff">Please fill in the correct cell phone number</span>',{icon:5});
                return;
            }else{
                
                $(button).attr('disabled','disabled');
                layer.msg('<span style="color:#fff">发送成功</span>',{icon:6});
                var getMessage;
                getMessage = setInterval(function(){
                    count--;
                    if(count == 0){
                        clearInterval(getMessage);
                        $(button).removeAttr('disabled')
                        $(button).removeClass('undisabled').find('span').text('Send');
                        count = 60
                        return;
                    }
                    $(button).addClass('undisabled').find('span').text('resend('+count+')');
                    
                },1000)
                /*
                $.ajax({
                    url: 'xxx',
                    type: 'post',
                    data: {
                        mobile: $input.val()
                    },
                    success: function(data){
                        console.log(data)
    
                        //倒计时
                        getMessage = setInterval(function(){
                            count--;
                            if(count == 0){
                                clearInterval(getMessage);
                                $(button).removeAttr('disabled')
                                $(button).removeClass('notPoint').find('span').text('Send');
                                count = 60
                                return;
                            }
                            $(button).addClass('notPoint').find('span').text('resend('+count+')');
                            
                        },1000)
    
                    },
                    error: function(data){
                        console.log(data)
                    }
                })
                */
            }
        })
    }
}

GetCode.sendEmailCode('.authEmail','.sendAuthEmail')
GetCode.sendPhoneCode('.authPhone','#sendAuthPhone')

function keyFun(input,num){
    $(input).find('input').each(function (r, a) {
        $(a).on("focus", function (e) {
            $(e.target).val("");
            $('#verifyGoole').attr('disabled','disabled')
            $('#verifyGoole').addClass('notPoint');
        })
        $(a).on("keydown", function () {
            return !1
        })
        $(a).on("keyup", function (a) {
            if (a.keyCode >= 96 && a.keyCode <= 105 || a.keyCode >= 48 && a.keyCode <= 57) {
                if (num != (r+1)) {
                    $(this).val(a.key);
                    $(input).find("input")[r + 1].focus();
                    
                    
                } else {
                    $(this).val(a.key);
                    $(this).blur();
                    
                    $('#verifyGoole').removeAttr('disabled');
                    $('#verifyGoole').removeClass('notPoint');
                    
                }
            }
            if (8 !== a.keyCode) {
                return !1;
            } else {
                if (0 !== r) {
                    $(input).find("input")[r-1].focus();
                }
            }
        })
        

    })
}

function enable(btn) {
    $(btn).on('click',function(){
        var result = ''
        $('#authy-code input').each(function(){     
            result=result+ $(this).val();     
        });
        console.log(result)
    })
}
