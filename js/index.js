//封装函数===============

// 第四屏--动画散开
function Animat(num){
    $('span.img > div').animate({//显示虚线
        width:'show'
    },num,function () {
        $('span.img > img').show(200,function () {//显示图片
            $('.small-row .wen').css('visibility','visible')//显示文字
            $('.small-row .wen p').show(200)//显示文字段落
        });
    })
}
//第四屏--动画收起
function AnimatHide() {// 收起
    $('.small-row .wen').css('visibility',' hidden');
    $('.small-row .wen p').hide(100);
    $('span.img > img').hide(100)
    $('span.img > div').animate({
        width:'hide'
    },100)
}
//图表动画函数
function addEchart() {
    //判断屏幕宽度(判断是PC还是移动端)
    var count=$(document).width();
   if (count<=1024){
       $('.echar').html('<img src="images/img.png" style="width:100%;height: auto;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);">');
   }else if(count>1024){
       $('.echar').html('<video src="images/echerts.mp4" height="100%" width="100%" autoplay="autoplay"></video>');
   }
}
function removeEchart() {
    $('.echar').html('');
}
//boom是true or false 是否登录
function Login(boom) {
    if (boom === true){//登录后执行
        $('.head-row.unlisted').css('display','none');
        $('.head-row.login').css('display','flex');

        $('.login-phon').css('display','block');//移动端
        $('.unlisted-phon').css('display','none');//移动端

    }else if (boom === false){//未登录执行
        $('.head-row.unlisted').css('display','flex');
        $('.head-row.login').css('display','none');
        // 菜单回位
        $('.login-right strong').animate({marginLeft:'60px'},100);
        $('#menu').animate({width:'hide'},100);
        $('.colu-menu .btnn').hide(100);
        $('.colu-menu ul').slideUp(100);

        $('.login-phon').css('display','none');//移动端
        $('.unlisted-phon').css('display','block');//移动端
    }
}

//封装函数结束============
// 适用移动端
$(function () {
    //判断屏幕宽度(判断是PC还是移动端)
    // var count=$(document).width();
    //点击显示移动端导航栏
    $('#hearter-phone .leftbtn>a').click(function () {
        var src=$(this).children('img').attr('src');
        if(src==='images/left-btn2.png'){
            $(this).children('img').css("height","17");
            $('#hearter-phone .listphon').slideUp(200);
            src=$(this).children('img').attr('src').replace('left-btn2.png','left-btn.png');
        }else {
            $(this).children('img').css("height","22");
            $('#hearter-phone .listphon').slideDown(200);
            src=$(this).children('img').attr('src').replace('left-btn.png','left-btn2.png');
        }
        $(this).children('img').attr('src',src);
    })
    //点击显示移动端导航栏结束！
    //鼠标点击改变导航条样式
    $('#hearter-phone .listphon li').click(function () {
        $(this).addClass('activer').siblings().removeClass('activer');
    });
})
// 适用移动端结束
// PC头部
$(function () {
    $('.head-row span').click(function () {
        $('.head-row span .lang').stop().slideToggle(200)
    });
    $('.head-row span,.head-row span .lang').mouseenter(function () {
        $('.head-row span .lang').stop().slideDown(200);//显示语言
    }).mouseleave(function () {
        $('.head-row span .lang').stop().slideUp(200);//隐藏语言
    });
    $('.head-row span ul li').click(function () {
        $('.head-row span label').html($(this).find('a').html());//点击哪个语言则显示哪语言
        $('.head-row span .lang').stop().slideUp(200);
    });

    $('.logout').click(function ( ) {
        var mymessage=confirm("确定退出登录吗");
        if(mymessage==true){
            login= false;
            Login(login);
            window.location.href="login.html";
        }
        else if(mymessage==false) {
           return;
        }
    });


//点击按钮显示隐藏菜单栏
$('.login-right strong.index0').click(function () {//菜单栏出现
    $(this).animate({marginLeft:'160px'},300);
    $('#menu').animate({width:'show'},300);
    $('.colu-menu .btnn').show(300);
    $('.colu-menu ul').slideDown(100);
});
$('.colu-menu .btnn').click(function () {//菜单栏隐藏
        $('.login-right strong').animate({marginLeft:'60px'},300);
        $('#menu').animate({width:'hide'},300);
        $('.colu-menu .btnn').hide(200);
        $('.colu-menu ul').slideUp(100);
        //子页右边空出部分去掉
    //判断屏幕宽度(判断屏幕宽)
    var num=$(document).width();
    var paddingRight=40;
    if (num<=1300){
        paddingRight=10;
    }
    $('#trade .content0').animate({paddingRight:paddingRight+'px'},200);
    $('.user .user-content').animate({paddingRight:paddingRight+'px'},200)


    })
})
//第四屏
$(function () {
    $('.positioning .middlebtn').mouseenter(function () {
         return AnimatHide();
    }).mouseleave(function () {
        return Animat(100);
    })
    // login 切换部分
    $(".main-login .login-left div").click(function(){
        var index = $(this).index();
        $(this).addClass("current").siblings().removeClass("current");
        $(".login-right>div").eq(index).show().siblings().hide();
    })
    // 忘记密码 部分
    $(".main-login .forgotPass").click(function(){
        var mymessage=confirm("找回密码？");
        $(".signIn").hide();
        $('.forgetPassStep').show();
        $(".step1").show();
    })
    $(".nextTo2").click(function(){
        $(".leftStep").html('2');
        $(".step1").hide();
        $(".step2").show();
    })
    $(".nextTo3").click(function(){
        $(".leftStep").html('3');
        $(".step2").hide();
        $(".step3").show();
    })
    $(".nextToLogin").click(function(){
        window.location.href="login.html";
    })
})

//trade.html
$(function () {
    $('#trade .handl-right ul li').click(function () {//chart栏目
        $(this).addClass('activ0').siblings().removeClass('activ0');
    });
    $('.handl-btn i').click(function () {//栏目的显示隐藏动画
        $(this).parents('.handler').siblings('.bigbox').slideToggle();
        var clss=$(this).attr('class')
        // 切换图标
        if(clss=='iconfont icon-less'){
            $(this).removeClass('icon-less').addClass('icon-moreunfold');

        }else if (clss=='iconfont icon-moreunfold'){
            $(this).removeClass('icon-moreunfold').addClass('icon-less');

        }

    });
    $('#trade .market0 .manu0 li').click(function () {//market栏目
        $(this).addClass('act2').siblings().removeClass('act2');
    });
    $('.market0 .lists-bit ul li').click(function () {//market栏目列表
        $(this).addClass('activ-bit').siblings().removeClass('activ-bit');
        
    });
    // //子页共享菜单点击添加actives
    // $('.tradebody #menu ul li').click(function () {
    //     $(this).addClass('actives').siblings().removeClass('actives');
    //
    // })

    //  所有子页点击头部菜单
    $('.tradebody .login-right strong.trade0').click(function () {//菜单栏出现
        $(this).animate({marginLeft:'100px'},300);
        $('#menu').animate({width:'show'},300);
        $('.colu-menu .btnn').show(300);
        $('.colu-menu ul').slideDown(100);
        //子页右边空出部分去掉
        $('.tradebody #trade .content0').animate({paddingRight:"90px"},200);
        $('.tradebody .user .user-content').animate({paddingRight:'100px'},200)

    });
    //右边买卖
    $('.order0 .select0>span').click(function () {
        $(this).addClass('acty').siblings().removeClass('acty');

        if($(this).index()==0){
            $('.bigbox .sellbox').css('display','none');
            $('.bigbox .buybox').css('display','block');
        }else if($(this).index()==1){
            $('.bigbox .sellbox').css('display','block');
            $('.bigbox .buybox').css('display','none');
        }


    })


    $('.Balance0 .handler .handl-right>div').click(function () {//点击替换文字并bigbox显示切换
        var clickhtml=$(this).html();
        var bightml=$('.Balance0 .handl-btn span').html();
        $(this).html(bightml);
        $('.Balance0 .handl-btn span').html(clickhtml);

        if($('.Balance0 .handl-btn span').html()== 'Balance'){
            $('.Balance0 .bigbox>div:first-child').css('display','block').siblings().css('display','none')
        } else if($('.Balance0 .handl-btn span').html()=='Deposit'){
            $('.Balance0 .bigbox>div:nth-child(2)').css('display','block').siblings().css('display','none')

        }else {
            $('.Balance0 .bigbox>div:nth-child(3)').css('display','block').siblings().css('display','none')
        }
    });

    $('#trade .manu2 .lists0 ul li').click(function () { //Deposit栏目
        $(this).addClass('act3').siblings().removeClass('act3');
        // 选bit单位
        $(this).parents('.withdraw-bit').find('.boxlist label').html($(this).html());
    });
    $('#trade .manu2 .btn2').click(function () { //Deposit下拉
        $(this).find('.dowlist').slideToggle(200);
    });

    $('#trade .manu2 .dowlist ul li').click(function () { //Deposit下拉获取单位
        // 选bit单位
        $('.withdraw-box .boxlist label').html($(this).find('span').html());
    });
    // 右边菜单部分手机端显示隐藏--按钮移动端才显示
    $('#caidan').click(function () {
        $('#trade .content0 .content-right').slideToggle(200);
    });


})
//wallet.html
$(function () {
    $('.history0 .hand4 .handl-btn a>span').click(function () {
        var index=$(this).index();
        $(this).addClass('active-name').siblings().removeClass('active-name');
        if(index==0){
            $('.history0 .bigbox>div.deposit-history').css('display','block').siblings().css('display','none')
        }else if(index==1){
            $('.history0 .bigbox>div.withdrawal-history').css('display','block').siblings().css('display','none')
        }

    })

})

