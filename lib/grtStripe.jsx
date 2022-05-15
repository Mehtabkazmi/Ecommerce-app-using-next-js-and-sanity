import { loadStripe } from '@stripe/stripe-js';
let stripePromise;

const grtStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51K5JddHXJ4qAJI8AAkPduZSArCnYpqjLfCG5v8159msDZO21NbAlvipCG1EkEvhijbEPnl04ltFCqnIdZ0Fey5CU00NBi32IXg');
    }
    return stripePromise;
}

export default grtStripe