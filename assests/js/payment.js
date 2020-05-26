function print(data)
{
    var options = {
        "key": "rzp_test_oNAPi75r3Iixih", // Enter the Key ID generated from the Dashboard
        "amount": 500*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "Acme Corp",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": data.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature);
        },
        "prefill": {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#F37254"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}
class paymentProcess
{
    constructor(price){
        console.log(price);
     this.payment(price);
    }
    payment(price)
    { 

            $.ajax({
                type:'get',
                url:'/payment/proceed',
                data:{
                    amount: price
                },
                success:function(data)
                {
                    console.log(data.data.order);
                    print(data);
                }
            })
       
        console.log('hello');
        }
        
    }
 
