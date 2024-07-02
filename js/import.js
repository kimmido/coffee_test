IMP.init("imp15784011");

function requestPay(merchant_uid, amount) {
    const host = window.location.protocol + "//" + window.location.host;
    IMP.request_pay({
            pg: "html5_inicis.INIpayTest",
            pay_method: "card",
            merchant_uid: merchant_uid,
            name: "CRC 로봇 카페",
            amount: amount,
            buyer_email : '',
            buyer_name : '',
            buyer_tel: '',
            buyer_addr: '',
            buyer_postcode: '',
            m_redirect_url : host + "/payments/callback"
        },
        function (rsp) {
            if (rsp.success) {
                // for pc
                window.location.href = host + "/payments/callback"
                + "?"
                + "imp_uid" + "=" + rsp.imp_uid
                + "&"
                + "merchant_uid" + "=" + rsp.merchant_uid
                + "&"
                + "imp_success" + "=" + true
            } else {
                alert(`결제에 실패하였습니다. 에러 내용: ${rsp.error_msg}`);
                return false;
            }
        }
    );
}