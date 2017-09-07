/**
 * Created by weiyuqin on 17-9-6.
 */
$(function () {

    var access_token,oid,imgId,initSlide;
    $(".search_btn_1").click(function () {
        $(".content_search").hide();
        $(".content_detail").show();
        $("#search_text_2").val($("#search_text_1").val())
    });
    $(".search_btn").click(function () {
        $(".info").html("");
        //EW1000192OBT
        // var contractorNumber = "EW1000192OBT";
        var contractorNumber = $(this).prev().val();
        // console.log(contractorNumber)
        var url_access_token = "http://10.5.16.211/oauth2/access_token?client_id=57d69a8fb1231bbf17a52e9b&client_secret=B6811011A66D97A939A8F3B12E3B4385&grant_type=client_credentials"
        $.ajax({
            type: "post",
            url: url_access_token,
            contentType:"application/x-www-form-urlencoded",
            success:function (data) {
                access_token = data.access_token;
                // oid = data.oid
                var url = "http://10.5.16.211/api/contractor/company/info/insurance?contractorNumber="+contractorNumber+"&access_token="+data.access_token;
                $.ajax({
                    type: "get",
                    url: url,
                    success:function (value) {
                        var info = value.result;
                        console.log(info)
                        oid = info.oid
                        if(info){
                            if(info.name){
                                $(".name").html(info.name)
                            }
                            if(info.adminEmail){
                                $(".adminEmail").html(info.adminEmail)
                            }
                            if(info.contractorNumber){
                                $(".contractorNumber").html(info.contractorNumber)
                            }
                            if(info.country){
                                $(".country").html(info.country)
                            }
                            if(info.state){
                                $(".state").html(info.state)
                            }
                            if(info.city){
                                $(".city").html(info.city)
                            }
                            if(info.address){
                                $(".address").html(info.address)
                            }
                            if(info.zipCode){
                                $(".zipCode").html(info.zipCode)
                            }
                            if(info.telephone){
                                $(".telephone").html(info.telephone)
                            }
                            if(info.fax){
                                $(".fax").html(info.fax)
                            }
                            if(info.ein){
                                $(".ein").html(info.ein)
                            }
                            if(info.authState){
                                $(".authState").html(info.authState)
                            }

                            if(info.proofOfLiabilityInsuranceCoverage){
                                imgId = info.proofOfLiabilityInsuranceCoverage
                                addImages(info.proofOfLiabilityInsuranceCoverage,access_token,oid);
                            }
                        }
                        // else{
                        //     alert("No Info!")
                        // }

                    }
                })

            }
        })
    });


    $(".company_info_pics div").live("click",function () {
        $(".window").show();
        initSlide = $(this).attr("indexId");
        $.each(imgId,function (key,one) {
            // console.log(one)
            $('.company-swiper').append("<div class='swiper-slide'>" +
                "<img src='http://10.5.16.211/api/contractor/company/picture/"+one+"?access_token="+access_token+"&oid="+oid+"'></div>");
            $('.company-swiper-thumbs').append("<div class='swiper-slide'>" +
                "<img src='http://10.5.16.211/api/contractor/company/picture/"+one+"?access_token="+access_token+"&oid="+oid+"'></div>");
        })

        var galleryTop = new Swiper('.gallery-top', {
            initialSlide: initSlide,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 10,
        });
        var galleryThumbs = new Swiper('.gallery-thumbs', {
            initialSlide: initSlide,
            spaceBetween: 10,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true
        });
        galleryTop.params.control = galleryThumbs;
        galleryThumbs.params.control = galleryTop;
    });



    $('.window_close').click(function () {
        $(".window").hide();
        $(".swiper-wrapper").html('');
    });



});


function addImages(urls,access_token,oid) {
    // access_token = "69d6643ac7147e0d2e6113d27eb4c41b"
    $.each(urls,function (key,one) {
        console.log(one)
        $('.company_info_pics').append("<div indexId="+key+">" +
            "<img src='http://10.5.16.211/api/contractor/company/picture/"+one+"?access_token="+access_token+"&oid="+oid+"'></div>");

    })

}