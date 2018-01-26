// index.html
$(function () {
// 菜单导航
    $('.navs>li').click(function () {
        $(this).addClass('activ0').siblings().removeClass('activ0');
        if($(document).width() <= 1045){
            $('.navs').slideToggle();
        }
    })
    //切换
    $('.table0 .num>a').click(function () {
        var index =$(this).index();
        $(this).addClass('acti').siblings().removeClass('acti');
        if(index == 0){
            $('.box2').addClass('hidd');
            $('.box0').removeClass('hidd');
        }else if(index == 1){
            $('.box0').addClass('hidd');
            $('.box2').removeClass('hidd');
        }else {
            return;
        }


    })
    // 点击收缩
    $('.title0 span').click(function () {
        $(this).parents('.smallbox').find('.con0').slideToggle();
        
    })
    //判断屏幕宽度(判断是PC还是移动端)
    // var count=$(document).width();
    // if(count<=1045){
    //     // 移动端导航
    //     /*function stopPropagation(e) {
    //         if (e.stopPropagation)
    //             e.stopPropagation();//停止冒泡  非ie
    //         else
    //             e.cancelBubble = true;//停止冒泡 ie
    //     }
    //     $(document).bind('click',function(){
    //         $('.navs').slideUp();
    //         $('.list-btn').fadeOut();
    //     });
    //     $('.anniu').bind('click',function(e){
    //         //写要执行的内容..
    //         $('.navs').slideToggle();
    //         // $('.list-btn').fadeOut();
    //         stopPropagation(e);//调用停止冒泡方法,阻止document方法的执行
    //     });
    //     // $('.btn2').bind('click',function(e){
    //     //     //写要执行的内容..
    //     //     $('.list-btn').fadeToggle();
    //     //     $('.navs').slideUp();
    //     //     stopPropagation(e);//调用停止冒泡方法,阻止document方法的执行
    //     // });

    //     // 移动端导航结束
    //     */
    //     $('.anniu').on('click',function() {
    //         $('.navs').slideToggle();
    //     })
    //     $('.navs').on('click','li',function() {
    //         $('.navs').slideUp();     
    //     })

    // }else{
    //     $('.navs').slideDown(); 
    // }
    console.log($(document).width())
    $('.anniu').on('click',function() {
        if($(document).width() <= 1045){
            $('.navs').slideToggle();
        }else{
            console.log(23223)
            $('.navs').slideDown()
        }
        
    })
})
window.onresize=resizeBannerImage;

function resizeBannerImage(){
    var count=$(document).width();
    if($(document).width() <= 1045){
        $('.navs').slideUp();  
    }else{
        console.log(23223)
        $('.navs').slideDown()
    }
}
