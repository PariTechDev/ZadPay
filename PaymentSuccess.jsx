import React from 'react';
import { withRouter } from 'react-router-dom';

class PaymentSuccess extends React.Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.history.push({
                pathname: '/wallet',
                state: { message: `Top-up added: ${this.props.topUpAmount}` }
            });
        }, 25000);
    }

    render() {
        return (
            <div>
                <p>Payment Successful!</p>
                <p>Redirecting to wallet...</p>
            </div>
        );
    }
}

export default withRouter(PaymentSuccess);
