import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

class Wallet extends React.Component {
    state = {
        balance: 0,
        topUpAmount: 0,
    };

    handleTopUpChange = (amount) => {
        this.setState({ topUpAmount: amount });
    };

    componentDidMount() {
        const { location } = this.props;
        if (location.state && location.state.message) {
            alert(location.state.message);
            // Update balance logic here
        }
    }

    render() {
        return (
            <div>
                <p>Current Balance: {this.state.balance}</p>
                <input
                    type="number"
                    value={this.state.topUpAmount}
                    onChange={(e) => this.handleTopUpChange(e.target.value)}
                />
                {/* Render wallet UI */}
            </div>
        );
    }
}

export default Wallet;
